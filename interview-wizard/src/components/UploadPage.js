import React, { useState } from 'react';
import NavigationRibbon from './NavigationRibbon';
import ResumeUpload from './ResumeUpload';
import JobDescriptionUpload from './JobDescriptionUpload';

const UploadPage = () => {
    const [resumeText, setResumeText] = useState("Sample resume text.");
    const [jobDescriptionText, setJobDescriptionText] = useState("Sample job description text.");
    const [test, setTest] = useState("Test");

    const updateResumeText = (newValue) => {
        setResumeText(newValue);
    };

    const updateJobDescriptionText = (newValue) => {
        setJobDescriptionText(newValue)

    };

    // TODO: Update route
    const sendQuestionRequest = async (resumeText, jobPostingText) => {
        try {
            const response = await fetch("http://localhost:5000/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resume: resumeText,
                    "job-posting": jobPostingText,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.Error || "Request failed");
            }

            console.log("Success:", data);
            setTest(data.resume) // TODO: remove
            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <NavigationRibbon />
            <h1>TODO: Complete Upload Page</h1>
            <h2>Resume Upload</h2>
            <ResumeUpload onValueChange={updateResumeText} />
            <h2>Job Description Upload</h2>
            <JobDescriptionUpload onValueChange={updateJobDescriptionText} />
            <p>{resumeText}</p>
            <p>{jobDescriptionText}</p>
            <button onClick={() =>
                sendQuestionRequest(resumeText, jobDescriptionText)}>
                Generate Questions
            </button>
            <p>{test}</p>
        </div>
    );
};

export default UploadPage;