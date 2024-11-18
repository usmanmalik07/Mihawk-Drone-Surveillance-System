from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/models/predict', methods=['GET'])
def predict():
    # Example response
    return jsonify({"prediction": "This is a sample prediction from the model."})

if __name__ == '__main__':
    app.run(port=4000)