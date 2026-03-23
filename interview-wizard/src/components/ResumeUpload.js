import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import { useDropzone } from 'react-dropzone'
import styles from './ResumeUpload.module.css'
import uploadCloud from '../upload-cloud-icon.png'

const ResumeUpload = (resumeText) => {
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);

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
        try {
            await pdfToText(file).then((text) => {
                console.log('Uploading resume:', text);
                resumeText.onValueChange(text);
                setExtractedText(text);
            });
        } catch (error) {
            console.error('Error extracting PDF text:', error);
            setExtractedText('Error extracting text from PDF');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <main className={styles.resumeMain}>
                <div
                    {...getRootProps({ className: 'dropzone' })}>
                    <section className={styles.dropzone}>
                        <img
                            className={styles.uploadImg}
                            src={uploadCloud}
                            alt="uploadCloud"
                        />
                        <input {...getInputProps()} />
                        <p >Drag and drop your resume here</p>
                    </section>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <input
                        className={styles.fileInputHidden}
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleUpload(e.target.files[0])}
                        disabled={loading}
                    />
                    <label
                        htmlFor="file-upload"
                        className={styles.fileInputButton}>
                        Browse Files
                    </label>
                </div>
                <p style={{
                    marginTop: '30px',
                    marginBottom: '10px',
                    color: 'gray'
                }}>
                    Supported formats: PDF
                </p>
                <h3 style={{
                    marginTop: '0px',
                }}>
                    Resume preview:
                </h3>
                <textarea
                    style={{margin: "0 50px"}}
                    value={extractedText}
                    readOnly
                    rows="5"
                    cols="50"
                    placeholder="Your resume will appear here"
                />
            </main>
        </div>
    );

};

export default ResumeUpload;