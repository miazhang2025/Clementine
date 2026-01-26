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

    const generateCoverLetter = (jobDesc: string, resume: string) => {
        // Placeholder logic for generating a cover letter
        const generatedLetter = `Dear Hiring Manager,\n\nI am writing to express my interest in the position described as: ${jobDesc}.\n\nMy qualifications include:\n${resume}\n\nSincerely,\n[Your Name]`;
        setCoverLetter(generatedLetter);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Generate Cover Letter
                </button>
            </form>
            {coverLetter && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Generated Cover Letter:</h2>
                    <pre className="whitespace-pre-wrap border p-2 border-gray-300 rounded">
                        {coverLetter}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default CoverLetterGenerator;