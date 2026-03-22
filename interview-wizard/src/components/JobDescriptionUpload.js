import React from 'react';

const JobDescriptionUpload = (jobDescriptionText) => {

    const handleUpload = (description) => {
        console.log('Uploading job description:', description);
        jobDescriptionText.onValueChange(description);
    };

    return (
        <div>
            <textarea
                onChange={(e) => handleUpload(e.target.value)}
                placeholder="Paste job description here..."
                rows="10"
                cols="50"
            />
        </div>
    );
};

export default JobDescriptionUpload;