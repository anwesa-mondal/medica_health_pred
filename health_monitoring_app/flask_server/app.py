from joblib import load
import tensorflow as tf
import numpy as np
from flask_cors import CORS
from flask import Flask, request, jsonify
import pickle
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
diabetes_model = load('diabetes_model.pkl') 
diabetes_scaler = load('diabetes_scaler.pkl')  

@app.route('/api/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.get_json(force=True)
    features = []
    for key in data:
        features.append(data[key])
    features = np.array(features).reshape(1, -1)
    features = diabetes_scaler.transform(features)
    prediction = diabetes_model.predict(features)
    output = prediction[0]
    output = int(output)
    verdict = "Diabetic" if output == 2 else ("Not Diabetic" if output == 0 else "Pre-Diabetic")
    return jsonify({'prediction': verdict})

cardio_model = tf.keras.models.load_model('heart_disease_model.h5')
cardio_scaler = load('scaler.pkl')

@app.route('/api/predict/cardio', methods=['POST'])
def predict_cardio():
    data = request.get_json(force=True)
    features = []
    for key in data:
        features.append(data[key])
    features = np.array(features).reshape(1, -1)
    features = cardio_scaler.transform(features)
    prediction = cardio_model.predict(features)
    output = prediction[0]
    output = int(output)
    verdict = "High risk" if output == 1 else "Low risk"
    return jsonify({'prediction': verdict})

cancer_model = tf.keras.models.load_model('Model.h5')

@app.route('/api/predict/cancer', methods=['POST'])
def predict_cancer():
    print(request)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img = Image.open(file.stream)
        img = img.resize((224, 224))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)
        prediction = cancer_model.predict(img_array)
        maxi = 0
        index = 0
        for i in range(len(prediction[0])):
            if prediction[0][i] > maxi:
                maxi = prediction[0][i]
                index = i
        classes = ['Colon adenocarcinoma', 'Colon benign tissue', 'Lung adenocarcinoma', 'Lung benign tissue', 'Lung squamous cell carcinoma']
        output = classes[index]
        return jsonify({'prediction': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)