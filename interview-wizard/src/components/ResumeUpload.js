import React, { useState, useCallback } from 'react';
import pdfToText from 'react-pdftotext';
import Dropzone, { useDropzone } from 'react-dropzone'

const ResumeUpload = (resumeText) => {
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'application/pdf': [".pdf"],
        },
        maxFiles: 1,
        onDrop: files => handleFileParsing(files.at(0))
    });

    const parseByInput = async (event) => {
        handleFileParsing(event.target.files[0]);
    }

    const handleFileParsing = async (file) => {
        if (!file) return;
        console.log(file);

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
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop your resume here</p>
            </div>
            <input
                type="file"
                accept=".pdf"
                onChange={parseByInput}
                disabled={loading}
            />
            <p>Supported formats: PDF</p>
            <p>{success ? 'File parsed successfully!' : null}</p>
            <h3>Resume preview:</h3>
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