"use client";
import React, { useState } from 'react';
import InterviewQuestionAnswerer from '@/components/InterviewQuestionAnswerer';

const InterviewQuestionAnswererPage = () => {
  const [question, setQuestion] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedAnswer('');

    try {
      const resume = localStorage.getItem("clementine_resume") || "";
      const apiKey = localStorage.getItem("clementine_api_key") || "";

      if (!resume) {
        alert("Please add your resume in Settings first.");
        setIsLoading(false);
        return;
      }

      if (!apiKey) {
        alert("Please add your OpenAI API key in Settings first.");
        setIsLoading(false);
        return;
      }

      const systemPrompt = `You are a career coach helping someone prepare for interviews. Based on the user's resume and experiences below, generate a compelling, personalized answer to their career question. The answer should be authentic, use specific examples from their background, and follow the STAR method (Situation, Task, Action, Result) when appropriate. Format your response as ONE cohesive paragraph. IMPORTANT: Always write the answer in first person using "I" as if the user is speaking directly about their own experience.

User's Resume/Experience:
${resume}`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
          system: systemPrompt,
          apiKey: apiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate answer");
      }

      setGeneratedAnswer(data.result);
    } catch (error) {
      console.error("Error generating answer:", error);
      alert(error instanceof Error ? error.message : "Failed to generate answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InterviewQuestionAnswerer
      question={question}
      setQuestion={setQuestion}
      onGenerate={handleGenerate}
      generatedAnswer={generatedAnswer}
      isLoading={isLoading}
    />
  );
};

export default InterviewQuestionAnswererPage;
