from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load dataset from CSV file
dataset = pd.read_csv("C:/xampp2/htdocs/FYP/dataset.csv")

@app.route('/get_prices', methods=['POST'])
def get_prices():
    state = request.json.get('state')
    district = request.json.get('district')
    commodity = request.json.get('commodity')
    variety = request.json.get('variety')

    # Filter data based on provided query parameters
    filtered_data = dataset
    if state:
        filtered_data = filtered_data[filtered_data['state'] == state]
    if district:
        filtered_data = filtered_data[filtered_data['district'] == district]
    if commodity:
        filtered_data = filtered_data[filtered_data['commodity'] == commodity]
    if variety:
        filtered_data = filtered_data[filtered_data['variety'] == variety]

    return jsonify({'prices': filtered_data.to_dict(orient='records')})

if __name__ == '__main__':
    app.run(debug=True)