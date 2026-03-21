import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';

const ResumeUpload = (resumeText) => {
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileParsing = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setSuccess(false);
        try {
            await pdfToText(file).then((text) => {
                setExtractedText(text);
            });
            setSuccess(true);
        } catch (error) {
            console.error('Error extracting PDF text:', error);
            setExtractedText('Error extracting text from PDF');
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpload = () => {
        console.log('Uploading resume:', extractedText);
        resumeText.onValueChange(extractedText);
    };

    return (
        <div>
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileParsing}
                disabled={loading}
            />
            <p>{success ? 'File parsed successfully!' : null}</p>
            <h3 disabled={success}>Review your resume:</h3>
            <textarea
                value={extractedText}
                readOnly
                rows="10"
                cols="50"
                placeholder="Extracted text will appear here"
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );

};

export default ResumeUpload;