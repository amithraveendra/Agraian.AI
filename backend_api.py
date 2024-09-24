# backend_api.py
from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error
import pandas as pd
#from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)

#app = Flask(__name__)

# Load the dataset
data = pd.read_csv("C:/xampp2/htdocs/FYP/dataset.csv")

# Preprocessing
label_encoders = {}
categorical_cols = ['state', 'district', 'market', 'commodity', 'variety']
for col in categorical_cols:
    label_encoders[col] = LabelEncoder()
    data[col] = label_encoders[col].fit_transform(data[col])

# Training Random Forest
rf_model = RandomForestRegressor()
rf_model.fit(data[['state', 'district', 'market', 'commodity', 'variety']], data['modal_price'])

# Training SVM
svm_model = SVR(kernel='rbf')
svm_model.fit(data[['state', 'district', 'market', 'commodity', 'variety']], data['modal_price'])

@app.route('/predict', methods=['POST'])
def predict():
    req_data = request.get_json()

    # Transform producer input
    producer_input = pd.DataFrame(req_data, index=[0])
    for col in categorical_cols:
        producer_input[col] = label_encoders[col].transform(producer_input[col])

    # Making predictions
    rf_prediction = rf_model.predict(producer_input)
    svm_prediction = svm_model.predict(producer_input)

    # Combining predictions (Simple averaging)
    combined_prediction = (rf_prediction + svm_prediction) / 2

    return jsonify({
        'rf_prediction': rf_prediction[0],
        'svm_prediction': svm_prediction[0],
        'combined_prediction': combined_prediction[0]
    })

if __name__ == '__main__':
    app.run(debug=True)
