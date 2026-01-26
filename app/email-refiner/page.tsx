"use client";
import React, { useState } from 'react';
import EmailRefiner from '@/components/EmailRefiner';

const EmailRefinerPage = () => {
  const [draft, setDraft] = useState('');
  const [instructions, setInstructions] = useState('');
  const [refinedText, setRefinedText] = useState('');

  const handleRefine = () => {
    // Logic to refine the email draft based on instructions
    // This is a placeholder for the actual refinement logic
    setRefinedText(`Refined Email: ${draft} \nInstructions: ${instructions}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Email Refiner</h1>
      <EmailRefiner
        draft={draft}
        setDraft={setDraft}
        instructions={instructions}
        setInstructions={setInstructions}
        onRefine={handleRefine}
        refinedText={refinedText}
      />
    </div>
  );
};

export default EmailRefinerPage;