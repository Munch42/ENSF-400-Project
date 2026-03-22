import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import { useDropzone } from 'react-dropzone'

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
        onDrop: files => handleUpload(files.at(0))
    });

    const handleUpload = async (file) => {
        if (!file) return;
        console.log(file);

        setLoading(true);
        setSuccess(false);
        try {
            await pdfToText(file).then((text) => {
                console.log('Uploading resume:', text);
                resumeText.onValueChange(text);
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

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop your resume here</p>
            </div>
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleUpload(e.target.files[0])}
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
        </div>
    );

};

export default ResumeUpload;