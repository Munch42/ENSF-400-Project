from flask import Flask, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import pymupdf

app = Flask(__name__)

# This will return code 429 if the user is rate limited. The frontend can use this to display a clearer message if needed
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["40 per hour"],
    storage_uri="memory://", # This is fine for our non-production storage
)

# Route to generate interview questions
# Expects a POST request containing form-data with:
#   - resume - a pdf document containing the user's resume
#   - job-posting - the text of the job posting to target questions towards
# Queries the LLM to generate questions based on these documents, and returns content-type application/json containing the key:
#   - questions - a list of the text for each generated question
# In case of exceptions, returns an error code and application/json containing the key "Error" with an error message:
#   - 400 - if invalid data (data not containing a resume and job-description) received
#   - 400 - if file mimetype is not application/pdf
@app.route('/api/questions', methods=['POST'])
@limiter.limit("5 per minute") # Limit the LLM routes to once a minute to ensure that the limit API calls are conserved
def questions():
    # Check if the request contains a resume and job-description and load them if present, otherwise return an error
    if "resume" in request.files and "job-description" in request.form:
        resume = request.files["resume"]
        job_description = request.form["job-description"]
    else: 
        return jsonify({"Error": "Invalid data received"}), 400
    
    # Ensure the uploaded document is a pdf
    if resume.content_type != "application/pdf":
        return jsonify({"Error": "Invalid file type"}), 400

    # Extract complete resume text using pymupdf
    resume_text = ""
    with pymupdf.open(stream=resume.stream.read()) as document:
        for page in document:
            resume_text += str(page.get_text(sort=True))
    
    return jsonify({"received resume": resume_text, "received job posting": job_description}), 200

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