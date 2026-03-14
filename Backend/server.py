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

if __name__ == '__main__':
    app.run(debug=True)