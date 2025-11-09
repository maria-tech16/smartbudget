import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function SetBudget() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const fetchBudget = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.monthlyBudget) setBudget(data.monthlyBudget);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBudget();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ monthlyBudget: Number(budget) }),
      });

      const data = await res.json();
      alert(data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-50 font-poppins">
      <Sidebar />
      <div className="ml-20 p-8 flex-1 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 Set Monthly Budget</h2>

          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter monthly amount"
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSave}
            className="w-full p-3 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition mb-2"
          >
            Save Budget
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full p-3 rounded-lg bg-cyan-300 text-gray-800 font-semibold hover:bg-cyan-400 transition"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetBudget;




