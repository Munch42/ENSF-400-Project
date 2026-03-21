import React from 'react';
import NavigationRibbon from './NavigationRibbon';
import ResumeUpload from './ResumeUpload';
import JobDescriptionUpload from './JobDescriptionUpload';

const UploadPage = () => {
    return (
        <div>
            <NavigationRibbon />
            <h1>TODO: Complete Upload Page</h1>
            <h2>Resume Upload</h2>
            <ResumeUpload />
            <h2>Job Description Upload</h2>
            <JobDescriptionUpload />
        </div>
    );
};

export default UploadPage;