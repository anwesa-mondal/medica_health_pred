# Medica Health Prediction

Medica Health Prediction is a comprehensive repository for developing and demonstrating machine learning models dedicated to various medical diagnostic tasks. The project is designed to address health prediction challenges such as cardiovascular disease, diabetes, Parkinson’s disease, lung-colon cancer, and includes an interactive medical chatbot. The repository contains modular implementations for each task to facilitate easy testing, improvement, and adaptation of models.

## Overview

This repository features a collection of predictive tools and applications structured around several key health conditions. The main objectives are:
- **Disease Prediction:** Models that predict the risk or presence of cardiovascular diseases, diabetes, Parkinson’s disease, and lung-colon cancer.
- **Chatbot Integration:** An interactive chatbot that provides medical-related assistance based on predictive analysis.
- **Interactive Analysis:** Jupyter notebooks and Python scripts with extensive data exploratory analysis, preprocessing, and visualizations.

## Tech Stack

The project is built using a variety of modern technologies and libraries to ensure robust development and ease of use:
- **Programming Language:** Python (version 3.6 or later)
- **Development Environment:** Jupyter Notebook, Python scripts
- **Data Handling:** NumPy, Pandas
- **Data Visualization:** Matplotlib, Seaborn
- **Machine Learning:** scikit-learn, with possible use of algorithms including Logistic Regression, Random Forest, Support Vector Machine, and K-Nearest Neighbors for different tasks
- **Chatbot Frameworks:** Basic rule-based Python implementations (with scope for integrating NLP libraries)

## Datasets and Models

Each prediction module in this repository is designed with its own dataset and corresponding model. While specific dataset details (such as dataset names or sources) should be verified within the code or documentation files provided in each subfolder, here is an overview:

| **Task**                   | **Dataset**                                             | **Model/Algorithm**                              |
|----------------------------|---------------------------------------------------------|--------------------------------------------------|
| Cardiovascular Disease     | Heart disease dataset (e.g., UCI repository or Kaggle)  | Logistic Regression, Decision Trees, etc.        |
| Diabetes                   | Pima Indians Diabetes dataset or similar              | Random Forest, SVM, Logistic Regression            |
| Parkinson’s Disease        | Voice measurement dataset (common in Parkinson’s research) | Support Vector Machine, K-Nearest Neighbors         |
| Lung-Colon Cancer          | Cancer datasets from medical open data repositories      | Ensemble methods, Decision Trees, or Neural Networks |
| Medical Chatbot            | Predefined medical conversation data or rules           | Rule-based system (extendable to NLP models)       |

_**Note:** Specific model hyperparameters and dataset sources can be found within the individual notebooks and Python module comments._

## Project Structure

Below is an overview of the key files and directories in the repository:

| **File/Folder**                           | **Description**                                                      |
|-------------------------------------------|----------------------------------------------------------------------|
| `cardiovascular dis 2.0/`                  | Contains notebooks and scripts for cardiovascular disease prediction. |
| `diabetes/`                                | Code and analysis for developing diabetes prediction models.          |
| `parkinsons/`                              | Notebooks and scripts dedicated to Parkinson’s disease prediction.     |
| `lung-colon-cancer.ipynb`                   | Notebook for building prediction models for lung and colon cancer.       |
| `Medica.ipynb` / `Medica.py`                | Main integration files that combine all predictive modules.             |
| `heart.py`                                  | Specialized module handling heart disease detection algorithms.         |
| `medica_chatbot_final.ipynb` / `medica_chatbot_final.py` | Files for the interactive medical chatbot implementation.  |
| `health_monitoring_app/`                   | Contains code for a broader health monitoring application.              |

## Local Setup and Running the Code

Follow these steps to run the repository locally:

1. **Clone the Repository:**
`git clone https://github.com/anwesa-mondal/medica_health_pred.git`

3. **Navigate to the Repository Directory:**
`cd medica_health_pred`

4. **Create and Activate a Virtual Environment:**
- On macOS/Linux:
  ```
  python3 -m venv env
  source env/bin/activate
  ```
- On Windows:
  ```
  python -m venv env
  env\Scripts\activate
  ```

4. **Ensure the following packages (and any additional project-specific libraries) are installed:**
- numpy
- pandas
- scikit-learn
- matplotlib
- seaborn
- jupyter

5. **Running Notebooks:**
Launch Jupyter Notebook or Jupyter Lab:
`jupyter notebook`

6. **Running the app:**
- Locate to the `health_monitoring_app/client` folder and run
  ```
  npm i
  npm run dev
  ```
- Locate to the `health_monitoring_app/server` folder and run
  ```
  npm i
  npm run dev
  ```
- Locate to the `health_monitoring_app/flask_server` folder and run
  `python app.py`
- Start the chatbot feature by running the `medica_chatbot_final.ipynb` notebook
  And you are good to go !!

## Contributing

Contributions are welcome to enhance the project further. If you wish to contribute:
- Fork the repository and create a feature branch.
- Follow consistent coding styles and write clear commit messages.
- Ensure you test your changes and update relevant documentation.
- Open a pull request describing your modifications and improvements.

## License

This project is distributed under the MIT License. Refer to the `LICENSE` file for detailed information.
