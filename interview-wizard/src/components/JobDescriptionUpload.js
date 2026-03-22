import React, { useState } from 'react';

const JobDescriptionUpload = (jobDescriptionText) => {
    const [description, setDescription] = useState('');

    const handleUpload = () => {
        console.log('Uploading job description:', description);
        jobDescriptionText.onValueChange(description);
    };

    return (
        <div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste job description here..."
                rows="10"
                cols="50"
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default JobDescriptionUpload;