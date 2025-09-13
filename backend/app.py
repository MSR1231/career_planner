from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)
DATA_DIR = "data"

def load_json(fn): return json.load(open(os.path.join(DATA_DIR, fn)))
def save_json(fn, data): json.dump(data, open(os.path.join(DATA_DIR, fn), "w"), indent=2)

@app.route("/api/login", methods=["POST"])
def login():
    users = load_json("users.json")
    data = request.get_json()
    for u in users:
        if u["email"] == data["email"] and u["password"] == data["password"]:
            return jsonify({"success": True, "username": u["username"]}), 200
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route("/api/signup", methods=["POST"])
def signup():
    users = load_json("users.json")
    data = request.get_json()
    if any(u["email"] == data["email"] for u in users):
        return jsonify({"success": False, "message": "Email already exists"}), 400
    users.append(data)
    save_json("users.json", users)
    return jsonify({"success": True}), 200

@app.route("/api/colleges")
def colleges(): return jsonify(load_json("colleges.json"))
@app.route("/api/internships")
def internships(): return jsonify(load_json("internships.json"))
@app.route("/api/scholarships")
def scholarships(): return jsonify(load_json("scholarships.json"))
@app.route("/api/mentors")
def mentors(): return jsonify(load_json("mentors.json"))
@app.route("/api/mentorsignup", methods=["POST"])
def mentorsignup():
    mentors = load_json("mentors.json")
    data = request.get_json()
    mentors.append(data)
    save_json("mentors.json", mentors)
    return jsonify({"success": True})
@app.route("/api/quiz")
def quiz(): return jsonify(load_json("quiz_questions.json"))
@app.route("/api/motivation")
def motivation(): return jsonify([
    "Education unlocks your future!",
    "If others can, you can too.",
    "Stay motivated—graduation opens doors."
])
@app.route("/api/timeline")
def timeline(): return jsonify([
    {"event": "Admission Start", "date": "2025-09-20"},
    {"event": "Scholarship Deadline", "date": "2025-09-30"}
])
if __name__ == "__main__": app.run(debug=True)