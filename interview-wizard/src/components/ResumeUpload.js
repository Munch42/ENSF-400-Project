import React from 'react';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';

const ResumeUpload = () => {
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setSuccess(false);
        try {
            pdfToText(file).then((text) => {
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

    // TODO: Remove textarea and send text to backend
    return (
        <div>
            <h1>TODO: Complete Resume Upload Component</h1>
            <div>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={loading}
                />
                <p>{success ? 'File uploaded successfully!' : null}</p>
                <textarea
                    value={extractedText}
                    readOnly
                    rows="10"
                    cols="50"
                    placeholder="Extracted text will appear here"
                />
            </div>
        </div>
    );
};

export default ResumeUpload;