import React, { useState, useEffect } from 'react';

const CoverLetterGenerator = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    useEffect(() => {
        const masterResume = localStorage.getItem('masterResume');
        if (masterResume) {
            // Logic to generate cover letter based on job description and master resume
            generateCoverLetter(jobDescription, masterResume);
        }
    }, [jobDescription]);

    const generateCoverLetter = (jobDesc, resume) => {
        // Placeholder logic for generating cover letter
        setCoverLetter(`Dear Hiring Manager,\n\nI am writing to express my interest in the position described as: ${jobDesc}.\n\nBest regards,\n[Your Name]`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const masterResume = localStorage.getItem('masterResume');
        if (masterResume) {
            generateCoverLetter(jobDescription, masterResume);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Cover Letter Generator</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Enter job description"
                    className="w-full h-32 p-2 border border-gray-300 rounded mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Generate Cover Letter
                </button>
            </form>
            {coverLetter && (
                <div className="mt-4 p-2 border border-gray-300 rounded">
                    <h2 className="font-semibold">Generated Cover Letter:</h2>
                    <pre className="whitespace-pre-wrap">{coverLetter}</pre>
                </div>
            )}
        </div>
    );
};

const Page = () => {
    return <CoverLetterGenerator />;
};

export default Page;