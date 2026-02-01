"use client";
import { useEffect, useState } from "react";

export default function ResumeSettings() {
  const [resume, setResume] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [maintenanceCalories, setMaintenanceCalories] = useState("");

  useEffect(() => {
    const savedResume = localStorage.getItem("clementine_resume");
    const savedKey = localStorage.getItem("clementine_api_key");
    const savedMaintenance = localStorage.getItem("healthTracker_maintenance");
    if (savedResume) setResume(savedResume);
    if (savedKey) setApiKey(savedKey);
    if (savedMaintenance) setMaintenanceCalories(savedMaintenance);
  }, []);

  function handleSave() {
    localStorage.setItem("clementine_resume", resume);
    localStorage.setItem("clementine_api_key", apiKey);
    localStorage.setItem("healthTracker_maintenance", maintenanceCalories);
    alert("Settings saved!");
  }

  return (
    <div className="max-w-2xl mx-auto card mt-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text mb-2">Settings</h1>
        <p className="text-text/60">Manage your profile and API configuration.</p>
      </div>

      <div className="space-y-6">
        <div>
            <label className="label">OpenAI API Key</label>
            <input
                type="password"
                className="input-field"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-..."
            />
            <p className="text-xs text-text/50 mt-2">Your key is stored locally in your browser and sent securely to the API.</p>
        </div>

        <div>
            <label className="label">My Master Resume</label>
            <textarea
                className="input-field h-64 resize-none font-mono text-sm"
                value={resume}
                onChange={e => setResume(e.target.value)}
                placeholder="Paste your master resume here..."
            />
        </div>

        <div>
            <label className="label">Daily Maintenance Calories</label>
            <input
                type="number"
                className="input-field"
                value={maintenanceCalories}
                onChange={e => setMaintenanceCalories(e.target.value)}
                placeholder="e.g., 2000"
            />
            <p className="text-xs text-text/50 mt-2">Used for automatic daily calorie tracking in Healthy Life Tracker.</p>
        </div>

        <button
            className="btn btn-primary w-full"
            onClick={handleSave}
        >
            Save Settings
        </button>
      </div>
    </div>
  );
}
