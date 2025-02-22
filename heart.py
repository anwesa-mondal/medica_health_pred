#!/usr/bin/env python
# coding: utf-8

# In[10]:


import pandas as pd
import glob
import os

# Load the Heart Disease dataset
heart_df = pd.read_csv(r"C:\Users\REET\OneDrive\Desktop\Reet\heart.csv.csv")
diabetes_df = pd.read_csv(r"C:\Users\REET\OneDrive\Desktop\Reet\diabetes.csv.csv")
folder_path = r"C:\Users\REET\OneDrive\Desktop\Reet\mimic-iii-clinical-database-demo-1.4"
csv_files = glob.glob(os.path.join(folder_path, "*.csv"))

# Read each CSV file into a list of DataFrames
dfs = [pd.read_csv(file) for file in csv_files]

# If you want to merge all DataFrames into one
df_combined = pd.concat(dfs, ignore_index=True)

# Print the filenames and first few rows
print("Files Imported:", csv_files)


# In[11]:


print(df_combined.head())


# In[14]:


get_ipython().system('pip install scikit-learn')
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


# In[17]:


heart_df = pd.read_csv(r"C:\Users\REET\OneDrive\Desktop\Reet\heart.csv.csv")
heart_df.shape


# In[18]:


heart_df.info()


# In[20]:


heart_df.isnull().sum()


# In[21]:


heart_df.describe()


# In[22]:


heart_df['target'].value_counts()


# In[25]:


X=heart_df.drop(columns='target',axis=1)
Y=heart_df['target']
print(X)
print(Y)


# In[47]:


X_train,X_test,y_train,y_test=train_test_split(X,Y,test_size=0.2,stratify=Y,random_state=2)
print(X.shape,X_train.shape,X_test.shape)


# In[50]:


from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.metrics import accuracy_score

# Initialize Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Perform K-Fold Cross-Validation
k = 10
cv_scores = cross_val_score(model, X, Y, cv=k, scoring='accuracy')

# Train the model on the full training set
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Calculate test accuracy
test_accuracy = accuracy_score(y_test, y_pred)

# Print results
print(f"Random Forest - K-Fold Mean Accuracy: {cv_scores.mean():.4f}, Std Dev: {cv_scores.std():.4f}")
print(f"Random Forest - Test Accuracy: {test_accuracy:.4f}")


# In[33]:





# In[35]:





# In[46]:





# In[ ]:




