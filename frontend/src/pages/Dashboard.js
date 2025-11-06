import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch transactions
    fetch(`${process.env.REACT_APP_API_URL}/api/transaction`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          setTransactions([]);
        }
      })
      .catch((err) => console.error(err));

    // Fetch budget
    fetch(`${process.env.REACT_APP_API_URL}/api/budget/get`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.monthlyBudget) setBudget(data.monthlyBudget);
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  // 🧮 Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // 💸 Remaining = Budget - Expense
  const remaining = budget - totalExpense;

  const pageStyle = {
    minHeight: "100vh",
    background: "#fdf7ff",
    fontFamily: "Poppins, sans-serif",
    padding: "30px",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    padding: "25px",
    textAlign: "center",
    width: "300px",
    transition: "all 0.3s ease",
  };

  const valueStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "8px",
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "40px" }}>
        📊 Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        {/* 💰 Total Income */}
        <div style={{ ...cardStyle, borderTop: "5px solid #a3d8ce" }}>
          <h3>💰 Total Income</h3>
          <p style={{ ...valueStyle, color: "#27ae60" }}>₹{totalIncome}</p>
        </div>

        {/* 🛍 Total Expense */}
        <div style={{ ...cardStyle, borderTop: "5px solid #f7c8e0" }}>
          <h3>🛍 Total Expense</h3>
          <p style={{ ...valueStyle, color: "#e74c3c" }}>₹{totalExpense}</p>
        </div>

        {/* 🎯 Remaining Budget */}
        <div
          style={{
            ...cardStyle,
            borderTop:
              remaining < 0 ? "5px solid #ff6b6b" : "5px solid #a3d8ce",
          }}
        >
          <h3>🎯 Remaining Budget</h3>
          <p
            style={{
              ...valueStyle,
              color: remaining < 0 ? "#ff6b6b" : "#2ecc71",
            }}
          >
            ₹{remaining}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;







