import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AddTransaction() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/transaction/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, amount, type, date }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Transaction Added!");
      setTitle("");
      setAmount("");
      setDate("");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-50 font-poppins">
      <Sidebar />
      <div className="ml-20 p-8 flex-1 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">➕ Add Transaction</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSubmit}
            className="w-full p-3 rounded-lg bg-blue-400 text-white font-semibold hover:bg-blue-500 transition mb-2"
          >
            Save Transaction
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

export default AddTransaction;







