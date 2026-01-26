import React from 'react';

interface EmailRefinerProps {
    draft: string;
    setDraft: (value: string) => void;
    instructions: string;
    setInstructions: (value: string) => void;
    onRefine: () => void;
    refinedText: string;
}

const EmailRefiner: React.FC<EmailRefinerProps> = ({
    draft,
    setDraft,
    instructions,
    setInstructions,
    onRefine,
    refinedText
}) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Email Refiner</h1>
            <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter your email draft here..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
            />
            <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter refinement instructions (optional)..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onRefine}
            >
                Refine Email
            </button>
            {refinedText && (
                <div className="mt-4 p-2 border border-gray-300 rounded">
                    <h2 className="font-bold">Refined Email:</h2>
                    <pre>{refinedText}</pre>
                </div>
            )}
        </div>
    );
};

export default EmailRefiner;