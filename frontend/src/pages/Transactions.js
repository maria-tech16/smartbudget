import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch(`${process.env.REACT_APP_API_URL}/api/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(Array.isArray(data.transactions) ? data.transactions : []))
      .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    const budget = localStorage.getItem("monthlyBudget");
    if (!budget) return;

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    setBudgetExceeded(totalExpense > Number(budget));
  }, [transactions]);

  const deleteTransaction = (id) => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/api/transaction/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setTransactions(transactions.filter((t) => t._id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-50 font-poppins">
      <Sidebar />
      <div className="ml-20 p-8 flex-1">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">📄 Transactions</h2>

        {budgetExceeded && (
          <p className="bg-rose-100 text-rose-500 p-4 rounded-md mb-6 border border-rose-300">
            ⚠️ You have exceeded your monthly budget!
          </p>
        )}

        {transactions.length === 0 ? (
          <p className="text-gray-600">No transactions yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <b>{t.title}</b> <br />
                  <span className={t.type === "income" ? "text-emerald-500" : "text-rose-500"}>
                    ₹{t.amount} • {t.type}
                  </span>
                  <br />
                  <small className="text-gray-500">{new Date(t.date).toLocaleDateString()}</small>
                </div>

                <button
                  onClick={() => deleteTransaction(t._id)}
                  className="bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;

