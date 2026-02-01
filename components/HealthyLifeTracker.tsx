"use client";
import React, { useState } from 'react';

interface WorkoutEntry {
    date: string;
    exercise: string;
    duration: number;
    caloriesBurned: number;
}

interface DietEntry {
    date: string;
    meal: string;
    caloriesConsumed: number;
}

const HealthyLifeTracker = () => {
    const [workoutGoal, setWorkoutGoal] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('beginner');
    const [workoutPlan, setWorkoutPlan] = useState('');
    
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

    const generateWorkoutPlan = () => {
        // Generate a simple workout plan based on fitness level
        const plans = {
            beginner: [
                { day: 'Monday', workout: 'Full Body Strength', exercises: ['Push-ups: 3x10', 'Squats: 3x15', 'Plank: 3x30s'] },
                { day: 'Wednesday', workout: 'Cardio', exercises: ['Brisk Walk/Jog: 20 min', 'Jumping Jacks: 3x20'] },
                { day: 'Friday', workout: 'Full Body Strength', exercises: ['Lunges: 3x10', 'Mountain Climbers: 3x15', 'Dead Bug: 3x10'] },
            ],
            intermediate: [
                { day: 'Monday', workout: 'Upper Body', exercises: ['Push-ups: 4x15', 'Dumbbell Rows: 4x12', 'Shoulder Press: 3x12'] },
                { day: 'Tuesday', workout: 'Cardio + Core', exercises: ['Running: 30 min', 'Plank: 3x60s', 'Bicycle Crunches: 3x20'] },
                { day: 'Thursday', workout: 'Lower Body', exercises: ['Squats: 4x15', 'Lunges: 3x12', 'Calf Raises: 4x20'] },
                { day: 'Saturday', workout: 'Full Body HIIT', exercises: ['Burpees: 4x10', 'Jump Squats: 4x15', 'High Knees: 4x30s'] },
            ],
            advanced: [
                { day: 'Monday', workout: 'Upper Body Strength', exercises: ['Weighted Push-ups: 5x12', 'Pull-ups: 4x8', 'Bench Press: 4x10'] },
                { day: 'Tuesday', workout: 'Lower Body Strength', exercises: ['Weighted Squats: 5x12', 'Deadlifts: 4x8', 'Bulgarian Split Squats: 3x10'] },
                { day: 'Wednesday', workout: 'Cardio Endurance', exercises: ['Running: 45 min', 'Cycling: 30 min'] },
                { day: 'Thursday', workout: 'Upper Body Hypertrophy', exercises: ['Dumbbell Rows: 4x12', 'Arnold Press: 4x10', 'Dips: 3x12'] },
                { day: 'Friday', workout: 'Lower Body + Core', exercises: ['Front Squats: 4x10', 'Romanian Deadlifts: 4x10', 'Weighted Planks: 4x45s'] },
                { day: 'Saturday', workout: 'HIIT + Conditioning', exercises: ['Burpees: 5x15', 'Box Jumps: 4x12', 'Battle Ropes: 4x30s'] },
            ],
        };

        const selectedPlan = plans[fitnessLevel as keyof typeof plans];
        let planText = `# ${fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)} Workout Plan\n\n`;
        planText += `**Goal:** ${workoutGoal || 'General Fitness'}\n\n`;
        
        selectedPlan.forEach(day => {
            planText += `### ${day.day} - ${day.workout}\n`;
            day.exercises.forEach(ex => {
                planText += `- ${ex}\n`;
            });
            planText += '\n';
        });

        setWorkoutPlan(planText);
    };

    const logWorkout = () => {
        if (workoutDate && exercise && duration && caloriesBurned) {
            const newEntry: WorkoutEntry = {
                date: workoutDate,
                exercise,
                duration: parseInt(duration),
                caloriesBurned: parseInt(caloriesBurned),
            };
            setWorkoutEntries([...workoutEntries, newEntry]);
            setWorkoutDate('');
            setExercise('');
            setDuration('');
            setCaloriesBurned('');
        }
    };

    const logDiet = () => {
        if (dietDate && meal && caloriesConsumed) {
            const newEntry: DietEntry = {
                date: dietDate,
                meal,
                caloriesConsumed: parseInt(caloriesConsumed),
            };
            setDietEntries([...dietEntries, newEntry]);
            setDietDate('');
            setMeal('');
            setCaloriesConsumed('');
        }
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Healthy Life Tracker</h1>

                {/* Workout Plan Generator */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Generate Workout Plan</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Fitness Goal:</label>
                            <input
                                type="text"
                                value={workoutGoal}
                                onChange={(e) => setWorkoutGoal(e.target.value)}
                                placeholder="e.g., Build muscle, lose weight, improve endurance"
                                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Fitness Level:</label>
                            <select
                                value={fitnessLevel}
                                onChange={(e) => setFitnessLevel(e.target.value)}
                                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="beginner">Beginner (3 days/week)</option>
                                <option value="intermediate">Intermediate (4 days/week)</option>
                                <option value="advanced">Advanced (6 days/week)</option>
                            </select>
                        </div>
                        <button
                            onClick={generateWorkoutPlan}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors duration-200 w-full"
                        >
                            Generate Plan
                        </button>
                    </div>
                    {workoutPlan && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-700">Your Workout Plan:</h3>
                            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm border border-gray-200">{workoutPlan}</pre>
                        </div>
                    )}
                </div>

                {/* Workout & Diet Logging */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Log Workout */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Log Workout</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Date:</label>
                                <input
                                    type="date"
                                    value={workoutDate}
                                    onChange={(e) => setWorkoutDate(e.target.value)}
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Exercise:</label>
                                <input
                                    type="text"
                                    value={exercise}
                                    onChange={(e) => setExercise(e.target.value)}
                                    placeholder="e.g., Running, Weight Training"
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Duration (minutes):</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Calories Burned:</label>
                                <input
                                    type="number"
                                    value={caloriesBurned}
                                    onChange={(e) => setCaloriesBurned(e.target.value)}
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={logWorkout}
                                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition-colors duration-200 w-full"
                            >
                                Log Workout
                            </button>
                        </div>
                    </div>

                    {/* Log Diet */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Log Diet</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Date:</label>
                                <input
                                    type="date"
                                    value={dietDate}
                                    onChange={(e) => setDietDate(e.target.value)}
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Meal:</label>
                                <input
                                    type="text"
                                    value={meal}
                                    onChange={(e) => setMeal(e.target.value)}
                                    placeholder="e.g., Breakfast, Lunch, Snack"
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Calories Consumed:</label>
                                <input
                                    type="number"
                                    value={caloriesConsumed}
                                    onChange={(e) => setCaloriesConsumed(e.target.value)}
                                    className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={logDiet}
                                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg font-semibold transition-colors duration-200 w-full"
                            >
                                Log Diet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-600 mb-1">Total Calories Consumed</p>
                            <p className="text-3xl font-bold text-blue-600">{getTotalCaloriesConsumed()}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-600 mb-1">Total Calories Burned</p>
                            <p className="text-3xl font-bold text-green-600">{getTotalCaloriesBurned()}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="text-sm text-gray-600 mb-1">Net Calories</p>
                            <p className="text-3xl font-bold text-purple-600">{getNetCalories()}</p>
                        </div>
                    </div>
                </div>

                {/* Workout History */}
                {workoutEntries.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Workout History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Exercise</th>
                                        <th className="px-4 py-2 text-left">Duration (min)</th>
                                        <th className="px-4 py-2 text-left">Calories Burned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workoutEntries.map((entry, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{entry.date}</td>
                                            <td className="px-4 py-2">{entry.exercise}</td>
                                            <td className="px-4 py-2">{entry.duration}</td>
                                            <td className="px-4 py-2">{entry.caloriesBurned}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Diet History */}
                {dietEntries.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Diet History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Meal</th>
                                        <th className="px-4 py-2 text-left">Calories Consumed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dietEntries.map((entry, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{entry.date}</td>
                                            <td className="px-4 py-2">{entry.meal}</td>
                                            <td className="px-4 py-2">{entry.caloriesConsumed}</td>
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

export default HealthyLifeTracker;
