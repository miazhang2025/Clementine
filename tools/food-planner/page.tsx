"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const calorieOptions = [1500, 1800, 2000, 2500];

export default function FoodPlanner() {
  const [craving, setCraving] = useState("");
  const [calories, setCalories] = useState(calorieOptions[0]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setResult("");
    const apiKey = localStorage.getItem("clementine_api_key");
    const system =
      "You are a meal planning assistant. Generate a 7-day meal plan as a Markdown table (Day | Breakfast | Lunch | Dinner) based on the user's cravings/ingredients and calorie goal. Meals should be realistic and not repeated. Output only the table.";
    const prompt = `Cravings/Ingredients: ${craving}\nDaily Calories: ${calories}`;
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
    <div className="max-w-3xl mx-auto card mt-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text mb-2">Meal Planner</h1>
        <p className="text-text/60">Generate a healthy weekly meal plan based on your preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
            <label className="label">Cravings & Ingredients</label>
            <input
                className="input-field"
                value={craving}
                onChange={e => setCraving(e.target.value)}
                placeholder="e.g. Pasta, Chicken, No Dairy..."
            />
        </div>
        <div>
            <label className="label">Daily Calorie Goal</label>
            <div className="relative">
                <select
                    className="input-field appearance-none cursor-pointer"
                    value={calories}
                    onChange={e => setCalories(Number(e.target.value))}
                >
                    {calorieOptions.map(opt => (
                    <option key={opt} value={opt}>{opt} Calories</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
            </div>
        </div>
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={handleGenerate}
        disabled={loading || !craving}
      >
        {loading ? (
             <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-text border-t-transparent"></div>
                Planning Meals...
            </>
        ) : "Generate Weekly Plan"}
      </button>

      {result && (
        <div className="mt-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <label className="label mb-0">Your Meal Plan</label>
            <button
               className="btn btn-secondary text-xs px-3 py-1.5"
               onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy Plan
            </button>
          </div>
          <div className="prose bg-gray-50 p-6 rounded-xl border border-gray-100 overflow-x-auto max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

