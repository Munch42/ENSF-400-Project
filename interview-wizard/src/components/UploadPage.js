import React, { useState } from 'react';
import NavigationRibbon from './NavigationRibbon';
import ResumeUpload from './ResumeUpload';
import JobDescriptionUpload from './JobDescriptionUpload';
import Footer from './Footer';
import styles from './UploadPage.module.css';

const UploadPage = () => {
    const [resumeText, setResumeText] = useState("");
    const [jobDescriptionText, setJobDescriptionText] = useState("");
    const [error, setError] = useState("");

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
                setError(data.Error);
                throw new Error(data.Error || "Request failed");
            }

            console.log("Success:", data);
            setError("");
            return data;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavigationRibbon />
            <main>
                <section className={styles.startSection}>
                    <h2>Upload Your Resume</h2>
                    <p>Let the AI Interview you</p>
                    <ResumeUpload onValueChange={updateResumeText} />
                    <h2>Upload Job Description</h2>
                    <JobDescriptionUpload onValueChange={updateJobDescriptionText} />
                    {resumeText.length > 0 && jobDescriptionText.length > 0
                        ? <button onClick={() =>
                            sendQuestionRequest(resumeText, jobDescriptionText)}>
                            Interview Me!
                        </button>
                        : <button disabled>Upload to Continue</button>
                    }
                    <p style={{ color: "red" }}>{error}</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default UploadPage;