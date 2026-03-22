from flask import Flask, jsonify, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from llm_calls import generate_questions, generate_feedback

app = Flask(__name__)

# This will return code 429 if the user is rate limited. The frontend can use this to display a clearer message if needed
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["40 per hour"],
    storage_uri="memory://", # This is fine for our non-production storage
)

# Route to generate interview questions
# Expects a POST request containing JSON with the keys:
#   - resume - the text contents of a resume to ask question about
#   - job-posting - the text of the job posting to target questions towards
# Queries the LLM to generate questions based on these documents, and returns content-type application/json containing the key:
#   - questions - a list of (plaintext) questions
# In case of failure, returns an error code and application/json containing the key "Error" and an error message. In particular:
#   - 415 - if request mimetype is not JSON
#   - 400 - if invalid data (data not containing a resume and job-description)
#   - 500 - if the LLM cannot be accessed or doesn't generate a list of questions
@app.route('/api/questions', methods=['POST'])
@limiter.limit("5 per minute") # Rate limiting to ensure that the limit API calls are conserved
def questions():
    # Attempt to load the JSON
    try:
        data = request.get_json()
    except:
        return jsonify({"Error": "Unsupported media type"}), 415

    # Check if the request contains a resume and job description and load them if present, otherwise return an error
    if "resume" in data and "job-posting" in data:
        resume_text = data["resume"]
        job_description = data["job-posting"]
    else: 
        return jsonify({"Error": "Invalid data received"}), 400

    # Generate questions using the LLM
    try:   
        questions = generate_questions(resume_text, job_description)
    except:
        return jsonify({"Error": "Unable to access LLM, try again later"}), 500
    
    # Respond with the generated questions
    return jsonify({"questions": questions}), 200

# Route to generate feedback on a mock interview session
# Expects a POST request containing JSON with the keys:
#   - resume - the text contents of the applicant's resume
#   - job-posting - the position the (mock) interview is being conducted for
#   - questions - the questions asked by the interviewer
#   - question-answers - the responses of the applicant
# Queries the LLM to generate constructive feedback on the applicant's responses, and returns JSON containing the key:
#   - feedback - feedback on the applicants responses
# In case of failure, returns an error code and application/json containing the key "Error" and an error message. In particular:
#   - 415 - if request mimetype is not JSON
#   - 400 - if invalid JSON (not containing the required keys) is received
#   - 500 - if the LLM cannot be accessed or doesn't generate a list of questions
@app.route('/api/feedback', methods=['POST'])
@limiter.limit("5 per minute") # Rate limiting to ensure that the limit API calls are conserved
def feedback():
    # Attempt to load the JSON
    try:
        data = request.get_json()
    except:
        return jsonify({"Error": "Unsupported media type"}), 415

    # Load the necessary data if it is present in the request, otherwise return an error message
    if "resume" in data and "job-posting" in data and "questions" in data and "question-answers" in data:
        resume_text = data["resume"]
        job_description = data["job-posting"]
        questions = data["questions"]
        answers = data["question-answers"]
    else: 
        return jsonify({"Error": "Invalid data received"}), 400
    
    # Generate feedback using the LLM
    try:
        feedback = generate_feedback(resume_text, job_description, questions, answers)
    except:
        return jsonify({"Error": "Unable to access LLM, try again later"}), 500

    # Respond with the generated feedback
    return jsonify({"feedback": feedback}), 200

if __name__ == '__main__':
    app.run(debug=True)