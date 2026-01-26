"use client";
import { useState } from "react";

export default function EmailRefiner() {
  const [draft, setDraft] = useState("");
  const [instructions, setInstructions] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRefine() {
    setLoading(true);
    setResult("");
    const apiKey = localStorage.getItem("clementine_api_key");
    const system =
      "You are an expert writing assistant. Refine the following email draft, preserving the original tone unless the user specifies otherwise.";
    const prompt = `${draft}\n\nInstructions: ${instructions}`;
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
        <h1 className="text-3xl font-bold text-text mb-2">Email Refiner</h1>
        <p className="text-text/60">Polish your drafts to sound professional while keeping your voice.</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
            <label className="label">Your Draft</label>
            <textarea
                className="input-field h-40 resize-none"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Paste your email draft here..."
            />
        </div>
        <div>
            <label className="label">Instructions (Optional)</label>
            <input
                className="input-field"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="e.g. 'Make it more formal' or 'Be more concise'"
            />
        </div>
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={handleRefine}
        disabled={loading || !draft}
      >
        {loading ? (
             <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-text border-t-transparent"></div>
                Polishing...
            </>
        ) : "Refine Draft"}
      </button>

      {result && (
        <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-3">
             <label className="label mb-0">Polished Email</label>
             <button
                className="btn btn-secondary text-xs px-3 py-1.5"
                onClick={() => navigator.clipboard.writeText(result)}
             >
                Copy Text
             </button>
          </div>
          <textarea className="input-field h-48" value={result} readOnly />
        </div>
      )}
    </div>
  );
}
