import React, { useState } from 'react';

const MealPlanner = () => {
    const [cravings, setCravings] = useState('');
    const [calorieGoal, setCalorieGoal] = useState('');
    const [mealPlan, setMealPlan] = useState('');

    const generateMealPlan = () => {
        // Logic to generate meal plan based on cravings and calorie goal
        const meals = [
            { meal: 'Breakfast', dish: 'Oatmeal with fruits', calories: 300 },
            { meal: 'Lunch', dish: 'Grilled chicken salad', calories: 500 },
            { meal: 'Dinner', dish: 'Quinoa and roasted vegetables', calories: 400 },
        ];

        const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
        setMealPlan(`| Meal       | Dish                          | Calories |\n|------------|-------------------------------|----------|\n` +
            meals.map(meal => `| ${meal.meal} | ${meal.dish} | ${meal.calories} |\n`).join('') +
            `| **Total**  |                               | **${totalCalories}** |`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>
            <div className="mb-4">
                <label className="block mb-2">Cravings:</label>
                <input
                    type="text"
                    value={cravings}
                    onChange={(e) => setCravings(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Daily Calorie Goal:</label>
                <input
                    type="number"
                    value={calorieGoal}
                    onChange={(e) => setCalorieGoal(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <button
                onClick={generateMealPlan}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Generate Meal Plan
            </button>
            {mealPlan && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Your Meal Plan:</h2>
                    <pre className="bg-gray-100 p-4 overflow-x-auto">{mealPlan}</pre>
                </div>
            )}
        </div>
    );
};

export default MealPlanner;