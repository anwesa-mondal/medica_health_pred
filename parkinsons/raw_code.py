#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pandas as pd
import numpy as np
import tensorflow as tf
import seaborn as sns
import matplotlib.pyplot as plt
from tensorflow import keras
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load dataset
df = pd.read_csv("parkinsons.csv")

# Drop 'name' column (not useful for predictions)
df = df.drop(columns=['name'])

# Drop least correlated (blue) features based on correlation matrix
drop_cols = ['MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)', 'NHR', 'spread2', 'DFA']
df = df.drop(columns=drop_cols)

# Define features (X) and target label (Y)
X = df.drop(columns=['status'])
Y = df['status']

# Normalize feature values
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split into train and test sets (80-20 split)
X_train, X_test, Y_train, Y_test = train_test_split(X_scaled, Y, test_size=0.2, random_state=42)

# Build Neural Network Model
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', kernel_regularizer=keras.regularizers.l2(0.001), input_shape=(X_train.shape[1],)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(64, activation='relu', kernel_regularizer=keras.regularizers.l2(0.001)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(32, activation='relu', kernel_regularizer=keras.regularizers.l2(0.001)),
    keras.layers.Dense(16, activation='relu', kernel_regularizer=keras.regularizers.l2(0.001)),
    keras.layers.Dense(1, activation='sigmoid')  # Binary classification (0 = Healthy, 1 = Parkinson's)
])

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Implement Early Stopping
early_stopping = keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# Train the model
history = model.fit(X_train, Y_train, epochs=100, batch_size=16, validation_data=(X_test, Y_test), callbacks=[early_stopping])

# Evaluate the model
test_loss, test_acc = model.evaluate(X_test, Y_test)
print(f"Test Accuracy: {test_acc:.4f}")



# In[9]:


import pickle
# Save the model in H5 format
model.save("parkinsons_model.h5")

# Save the scaler and model in Pickle format
with open("parkinsons_scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)
with open("parkinsons_model.pkl", "wb") as f:
    pickle.dump(model, f)


# In[ ]:





# In[ ]:




