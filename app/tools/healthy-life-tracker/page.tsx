"use client";
import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

interface WorkoutEntry {
    id: string;
    date: string;
    exercise: string;
    duration: number;
    caloriesBurned: number;
}

interface DietEntry {
    id: string;
    date: string;
    meal: string;
    caloriesConsumed: number;
}

const HealthyLifeTrackerPage = () => {
    const [lastMaintenanceLog, setLastMaintenanceLog] = useState('');
    
    const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([]);
    const [dietEntries, setDietEntries] = useState<DietEntry[]>([]);
    
    // Workout logging state
    const [workoutDate, setWorkoutDate] = useState('');
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    
    // Diet logging state
    const [dietDate, setDietDate] = useState('');
    const [meal, setMeal] = useState('');
    const [caloriesConsumed, setCaloriesConsumed] = useState('');
    
    // Edit states
    const [editingWorkout, setEditingWorkout] = useState<string | null>(null);
    const [editingDiet, setEditingDiet] = useState<string | null>(null);
    
    // Load data from localStorage on mount
    useEffect(() => {
        const savedWorkouts = localStorage.getItem('healthTracker_workouts');
        const savedDiets = localStorage.getItem('healthTracker_diets');
        const savedLastLog = localStorage.getItem('healthTracker_lastMaintenanceLog');
        
        if (savedWorkouts) setWorkoutEntries(JSON.parse(savedWorkouts));
        if (savedDiets) setDietEntries(JSON.parse(savedDiets));
        if (savedLastLog) setLastMaintenanceLog(savedLastLog);
    }, []);
    
    // Save workouts to localStorage
    useEffect(() => {
        localStorage.setItem('healthTracker_workouts', JSON.stringify(workoutEntries));
    }, [workoutEntries]);
    
    // Save diets to localStorage
    useEffect(() => {
        localStorage.setItem('healthTracker_diets', JSON.stringify(dietEntries));
    }, [dietEntries]);
    
    // Auto-log maintenance calories daily
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const maintenanceCalories = localStorage.getItem('healthTracker_maintenance');
        
        if (maintenanceCalories && lastMaintenanceLog !== today) {
            const newEntry: DietEntry = {
                id: `maint-${Date.now()}`,
                date: today,
                meal: 'Daily Maintenance Calories',
                caloriesConsumed: parseInt(maintenanceCalories),
            };
            setDietEntries(prev => [...prev, newEntry]);
            setLastMaintenanceLog(today);
            localStorage.setItem('healthTracker_lastMaintenanceLog', today);
        }
    }, [lastMaintenanceLog]);

    const logWorkout = () => {
        if (workoutDate && exercise && duration && caloriesBurned) {
            if (editingWorkout) {
                // Update existing entry
                setWorkoutEntries(prev => prev.map(entry => 
                    entry.id === editingWorkout
                        ? { ...entry, date: workoutDate, exercise, duration: parseInt(duration), caloriesBurned: parseInt(caloriesBurned) }
                        : entry
                ));
                setEditingWorkout(null);
            } else {
                // Add new entry
                const newEntry: WorkoutEntry = {
                    id: `workout-${Date.now()}`,
                    date: workoutDate,
                    exercise,
                    duration: parseInt(duration),
                    caloriesBurned: parseInt(caloriesBurned),
                };
                setWorkoutEntries([...workoutEntries, newEntry]);
            }
            setWorkoutDate('');
            setExercise('');
            setDuration('');
            setCaloriesBurned('');
        }
    };

    const logDiet = () => {
        if (dietDate && meal && caloriesConsumed) {
            if (editingDiet) {
                // Update existing entry
                setDietEntries(prev => prev.map(entry => 
                    entry.id === editingDiet
                        ? { ...entry, date: dietDate, meal, caloriesConsumed: parseInt(caloriesConsumed) }
                        : entry
                ));
                setEditingDiet(null);
            } else {
                // Add new entry
                const newEntry: DietEntry = {
                    id: `diet-${Date.now()}`,
                    date: dietDate,
                    meal,
                    caloriesConsumed: parseInt(caloriesConsumed),
                };
                setDietEntries([...dietEntries, newEntry]);
            }
            setDietDate('');
            setMeal('');
            setCaloriesConsumed('');
        }
    };
    
    const editWorkout = (entry: WorkoutEntry) => {
        setWorkoutDate(entry.date);
        setExercise(entry.exercise);
        setDuration(entry.duration.toString());
        setCaloriesBurned(entry.caloriesBurned.toString());
        setEditingWorkout(entry.id);
    };
    
    const deleteWorkout = (id: string) => {
        setWorkoutEntries(prev => prev.filter(entry => entry.id !== id));
    };
    
    const editDiet = (entry: DietEntry) => {
        setDietDate(entry.date);
        setMeal(entry.meal);
        setCaloriesConsumed(entry.caloriesConsumed.toString());
        setEditingDiet(entry.id);
    };
    
    const deleteDiet = (id: string) => {
        setDietEntries(prev => prev.filter(entry => entry.id !== id));
    };
    
    const cancelEdit = () => {
        setEditingWorkout(null);
        setEditingDiet(null);
        setWorkoutDate('');
        setExercise('');
        setDuration('');
        setCaloriesBurned('');
        setDietDate('');
        setMeal('');
        setCaloriesConsumed('');
    };

    const getTotalCaloriesBurned = () => {
        return workoutEntries.reduce((acc, entry) => acc + entry.caloriesBurned, 0);
    };

    const getTotalCaloriesConsumed = () => {
        return dietEntries.reduce((acc, entry) => acc + entry.caloriesConsumed, 0);
    };

    const getNetCalories = () => {
        return getTotalCaloriesConsumed() - getTotalCaloriesBurned();
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 space-y-6">
            <div className="card">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-text mb-2">Healthy Life Tracker</h1>
                    <p className="text-text/60">Track your workouts and diet calories.</p>
                </div>

                {/* Workout & Diet Logging */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
                    {/* Log Workout */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">
                            {editingWorkout ? 'Edit Workout' : 'Log Workout'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="label">Date</label>
                                <input
                                    type="date"
                                    value={workoutDate}
                                    onChange={(e) => setWorkoutDate(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="label">Exercise</label>
                                <input
                                    type="text"
                                    value={exercise}
                                    onChange={(e) => setExercise(e.target.value)}
                                    placeholder="e.g., Running, Weight Training"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="label">Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="label">Calories Burned</label>
                                <input
                                    type="number"
                                    value={caloriesBurned}
                                    onChange={(e) => setCaloriesBurned(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <button
                                onClick={logWorkout}
                                className="btn btn-primary w-full"
                            >
                                {editingWorkout ? 'Update Workout' : 'Log Workout'}
                            </button>
                            {editingWorkout && (
                                <button
                                    onClick={cancelEdit}
                                    className="btn btn-secondary w-full"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Log Diet */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">
                            {editingDiet ? 'Edit Diet' : 'Log Diet'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="label">Date</label>
                                <input
                                    type="date"
                                    value={dietDate}
                                    onChange={(e) => setDietDate(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="label">Meal</label>
                                <input
                                    type="text"
                                    value={meal}
                                    onChange={(e) => setMeal(e.target.value)}
                                    placeholder="e.g., Breakfast, Lunch, Snack"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="label">Calories Consumed</label>
                                <input
                                    type="number"
                                    value={caloriesConsumed}
                                    onChange={(e) => setCaloriesConsumed(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <button
                                onClick={logDiet}
                                className="btn btn-primary w-full"
                            >
                                {editingDiet ? 'Update Diet' : 'Log Diet'}
                            </button>
                            {editingDiet && (
                                <button
                                    onClick={cancelEdit}
                                    className="btn btn-secondary w-full"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-text">Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-theme/10 p-4 rounded-xl border border-theme/20">
                            <p className="text-xs uppercase tracking-wide text-text/60 mb-1">Total Calories Consumed</p>
                            <p className="text-3xl font-bold text-text">{getTotalCaloriesConsumed()}</p>
                        </div>
                        <div className="bg-theme/10 p-4 rounded-xl border border-theme/20">
                            <p className="text-xs uppercase tracking-wide text-text/60 mb-1">Total Calories Burned</p>
                            <p className="text-3xl font-bold text-text">{getTotalCaloriesBurned()}</p>
                        </div>
                        <div className="bg-theme/10 p-4 rounded-xl border border-theme/20">
                            <p className="text-xs uppercase tracking-wide text-text/60 mb-1">Net Calories</p>
                            <p className="text-3xl font-bold text-text">{getNetCalories()}</p>
                        </div>
                    </div>
                </div>

                {/* Workout History */}
                {workoutEntries.length > 0 && (
                    <div className="mb-8 pb-8 border-b border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 text-text">Workout History</h2>
                        <div className="overflow-x-auto -mx-8 px-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Date</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Exercise</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Duration (min)</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Calories Burned</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workoutEntries.map((entry, index) => (
                                        <tr key={entry.id} className="border-b border-gray-50 hover:bg-background/30 transition-colors">
                                            <td className="px-4 py-3 text-text">{entry.date}</td>
                                            <td className="px-4 py-3 text-text">{entry.exercise}</td>
                                            <td className="px-4 py-3 text-text">{entry.duration}</td>
                                            <td className="px-4 py-3 text-text">{entry.caloriesBurned}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => editWorkout(entry)}
                                                        className="text-theme hover:opacity-70 transition-opacity p-1"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteWorkout(entry.id)}
                                                        className="text-red-600 hover:opacity-70 transition-opacity p-1"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Diet History */}
                {dietEntries.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">Diet History</h2>
                        <div className="overflow-x-auto -mx-8 px-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Date</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Meal</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Calories Consumed</th>
                                        <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-text/60 font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dietEntries.map((entry, index) => (
                                        <tr key={entry.id} className="border-b border-gray-50 hover:bg-background/30 transition-colors">
                                            <td className="px-4 py-3 text-text">{entry.date}</td>
                                            <td className="px-4 py-3 text-text">{entry.meal}</td>
                                            <td className="px-4 py-3 text-text">{entry.caloriesConsumed}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => editDiet(entry)}
                                                        className="text-theme hover:opacity-70 transition-opacity p-1"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDiet(entry.id)}
                                                        className="text-red-600 hover:opacity-70 transition-opacity p-1"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthyLifeTrackerPage;
