from flask import Flask, jsonify, request

app = Flask(__name__)

# Method to use to request questions to be generated
# Takes in:
# User Resume
# User Job Posting
# Then query the LLM and ask it to generate questions
# Return the questions in the specified format for the front end
@app.route('/api/questions', methods=['POST'])
def questions():
    data = request.get_json()
    resumeText = data["resume"]
    jobPostingText = data["job-posting"]

    return jsonify({"received resume": resumeText, "received job posting": jobPostingText}), 200

# Method to use to request feedback to be generated
# Takes in:
# User Resume
# User Job Posting
# Provided questions
# User answers to each question
# Then, it queries the LLM and asks it to generate feedback for these questions based on the user info
@app.route('/api/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    return jsonify({"received": data}), 200

if __name__ == '__main__':
    app.run(debug=True)