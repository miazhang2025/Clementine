"use client";
import React, { useState } from 'react';

interface InterviewQuestionAnswererProps {
    question: string;
    setQuestion: (value: string) => void;
    onGenerate: () => void;
    generatedAnswer: string;
    isLoading?: boolean;
}

const InterviewQuestionAnswerer: React.FC<InterviewQuestionAnswererProps> = ({
    question,
    setQuestion,
    onGenerate,
    generatedAnswer,
    isLoading = false
}) => {
    return (
        <div className="max-w-4xl mx-auto card mt-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-text mb-2">Interview Question Answerer</h1>
                <p className="text-text/60">Answer career-related questions based on your personal experiences.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="label">Career Question</label>
                    <textarea
                        className="input-field h-32 resize-none"
                        placeholder="Enter your interview or career question here... (e.g., 'Tell me about a time you overcame a challenge')"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary w-full"
                    onClick={onGenerate}
                    disabled={isLoading || !question.trim()}
                >
                    {isLoading ? 'Generating...' : 'Generate Answer'}
                </button>

                {generatedAnswer && (
                    <div className="mt-6">
                        <label className="label">Generated Answer</label>
                        <div className="input-field h-auto min-h-[200px] whitespace-pre-wrap bg-background/50">
                            {generatedAnswer}
                        </div>
                        <button
                            className="btn btn-secondary mt-4"
                            onClick={() => navigator.clipboard.writeText(generatedAnswer)}
                        >
                            Copy Answer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewQuestionAnswerer;
