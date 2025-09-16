import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

DATA_DIR = './backend/data'
USERS_FILE = os.path.join(DATA_DIR, 'users.json')

# Ensure data directory and users.json file exist
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        f.write('[]')

def load_users():
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400
    users = load_users()

    # Check for existing email
    if any(u['email'] == data.get('email') for u in users):
        return jsonify({'message': 'Email already registered'}), 400

    # Add user
    users.append(data)
    save_users(users)
    return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
