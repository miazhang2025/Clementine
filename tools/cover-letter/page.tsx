"use client";
import { useState } from "react";

export default function CoverLetterGen() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function getResume() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("clementine_resume") || "";
    }
    return "";
  }

  async function handleGenerate() {
    setLoading(true);
    setResult("");
    const resume = getResume();
    const apiKey = localStorage.getItem("clementine_api_key");
    const system =
      "You are a helpful career assistant. Write a cover letter for this JD [Insert JD] using ONLY the relevant experience from my resume [Insert Resume]. Do not invent facts.";
    const prompt = `Job Description: ${jd}\n\nMy Resume: ${resume}`;
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, system, apiKey }),
    });
    const data = await res.json();
    setResult(data.result || "");
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto card mt-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text mb-2">Cover Letter Generator</h1>
        <p className="text-text/60">Create a tailored cover letter based on your resume and job description.</p>
      </div>
      
      <div className="mb-6">
        <label className="label">Job Description</label>
        <textarea
          className="input-field h-40 resize-none"
          value={jd}
          onChange={e => setJd(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={handleGenerate}
        disabled={loading || !jd}
      >
        {loading ? (
            <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-text border-t-transparent"></div>
                Generating...
            </>
        ) : "Generate Cover Letter"}
      </button>

      {result && (
        <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Your Cover Letter</label>
            <button
               className="btn btn-secondary text-xs px-3 py-1.5"
               onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy Text
            </button>
          </div>
          <textarea className="input-field h-64 font-mono text-sm leading-relaxed" value={result} readOnly />
        </div>
      )}
    </div>
  );
}
