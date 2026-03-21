import React, { useState } from 'react';

export default function JobDescriptionUpload() {
    const [description, setDescription] = useState('');

    const handleUpload = () => {
        description.trim()
        console.log('Uploading:', description);
        // TODO: Add upload logic here (e.g., send description to backend)
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
}