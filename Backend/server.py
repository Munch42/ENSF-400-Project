from flask import Flask, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all origins and all routes

# This will return code 429 if the user is rate limited. The frontend can use this to display a clearer message if needed
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["40 per hour"],
    storage_uri="memory://", # This is fine for our non-production storage
)

# Method to use to request questions to be generated
# Takes in:
# User Resume
# User Job Posting
# Then query the LLM and ask it to generate questions
# Return the questions in the specified format for the front end
@app.route('/api/questions', methods=['POST'])
# @limiter.limit("1 per minute") # Limit the LLM routes to once a minute to ensure that the limit API calls are conserved
@limiter.exempt
def questions():
    data = request.get_json()
    if "resume" in data and "job-posting" in data:
        resumeText = data["resume"]
        jobPostingText = data["job-posting"]
    else: 
        return jsonify({"Error": "Invalid data received"}), 400
    
    print(resumeText)

    return jsonify({"received resume": resumeText, "received job posting": jobPostingText}), 200

# Method to use to request feedback to be generated
# Takes in:
# User Resume
# User Job Posting
# Provided questions
# User answers to each question
# Then, it queries the LLM and asks it to generate feedback for these questions based on the user info
@app.route('/api/feedback', methods=['POST'])
@limiter.limit("1 per minute") # Limit the LLM routes to once a minute to ensure that the limit API calls are conserved
def feedback():
    data = request.get_json()

    if "resume" in data and "job-posting" in data and "questions" in data and "question-answers" in data:
        resumeText = data["resume"]
        jobPostingText = data["job-posting"]
        questions = data["questions"]
        answers = data["question-answers"]
    else: 
        return jsonify({"Error": "Invalid data received"}), 400

    return jsonify({"received questions": questions, "received answers": answers, "received resume": resumeText, "received posting": jobPostingText}), 200

if __name__ == '__main__':
    app.run(debug=True)