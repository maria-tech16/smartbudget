import React, { useState, useEffect } from "react";

function Goals() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    saved: "",
    date: "",
  });

  const [addMoney, setAddMoney] = useState({}); // track input for each goal

  // Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target) return;
    setGoals([...goals, { ...newGoal, id: Date.now() }]);
    setNewGoal({ name: "", target: "", saved: "", date: "" });
  };

  const calculateProgress = (saved, target) => {
    const s = Number(saved) || 0;
    const t = Number(target) || 1;
    return Math.min((s / t) * 100, 100);
  };

  const handleAddMoney = (id) => {
    const amount = Number(addMoney[id] || 0);
    if (amount <= 0) return alert("Enter a valid amount");

    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, saved: Number(goal.saved || 0) + amount }
          : goal
      )
    );

    setAddMoney({ ...addMoney, [id]: "" });
  };

  return (
    <div className="p-8 ml-20">
      <h1 className="text-2xl font-bold mb-6">🎯 Savings Goals</h1>

      {/* Add Goal Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md">
        <input
          type="text"
          placeholder="Goal Name"
          value={newGoal.name}
          onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.target}
          onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="number"
          placeholder="Saved So Far"
          value={newGoal.saved}
          onChange={(e) => setNewGoal({ ...newGoal, saved: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="date"
          value={newGoal.date}
          onChange={(e) => setNewGoal({ ...newGoal, date: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
        />
        <button
          onClick={handleAddGoal}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Add Goal
        </button>
      </div>

      {/* Goal List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-100"
          >
            <h2 className="text-lg font-semibold mb-2">{goal.name}</h2>
            <p>Target: ₹{goal.target}</p>
            <p>Saved: ₹{goal.saved}</p>
            <p>Target Date: {goal.date || "Not set"}</p>

            <div className="w-full bg-gray-200 h-3 rounded mt-3">
              <div
                className="bg-teal-500 h-3 rounded"
                style={{ width: `${calculateProgress(goal.saved, goal.target)}%` }}
              ></div>
            </div>

            {/* Add Money Section */}
            <div className="mt-4 flex gap-2">
              <input
                type="number"
                placeholder="Add amount"
                value={addMoney[goal.id] || ""}
                onChange={(e) =>
                  setAddMoney({ ...addMoney, [goal.id]: e.target.value })
                }
                className="border p-2 rounded w-28"
              />
              <button
                onClick={() => handleAddMoney(goal.id)}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goals;


