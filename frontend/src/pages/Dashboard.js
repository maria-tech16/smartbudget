import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch(`${process.env.REACT_APP_API_URL}/api/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(Array.isArray(data.transactions) ? data.transactions : []))
      .catch((err) => console.error(err));

    fetch(`${process.env.REACT_APP_API_URL}/api/budget/get`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => data.monthlyBudget && setBudget(data.monthlyBudget))
      .catch((err) => console.error(err));
  }, [navigate]);

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum,t)=> sum + Number(t.amount),0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum,t)=> sum + Number(t.amount),0);
  const remaining = budget - totalExpense;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-50 font-poppins">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-8">
        <div>
          <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">📊 Dashboard</h2>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-72 text-center border-t-4 border-emerald-400">
              <h3 className="text-lg font-semibold">💰 Total Income</h3>
              <p className="mt-2 text-xl font-bold text-emerald-500">₹{totalIncome}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-72 text-center border-t-4 border-rose-400">
              <h3 className="text-lg font-semibold">🛍 Total Expense</h3>
              <p className="mt-2 text-xl font-bold text-rose-500">₹{totalExpense}</p>
            </div>

            <div className={`bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-72 text-center border-t-4 ${remaining >=0 ? 'border-teal-400' : 'border-rose-400'}`}>
              <h3 className="text-lg font-semibold">🎯 Remaining Budget</h3>
              <p className={`mt-2 text-xl font-bold ${remaining >=0 ? 'text-teal-500' : 'text-rose-500'}`}>₹{remaining}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
















