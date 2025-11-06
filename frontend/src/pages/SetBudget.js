import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SetBudget() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const fetchBudget = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.monthlyBudget) setBudget(data.monthlyBudget);
    };

    fetchBudget();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

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
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "#FDF7FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  };

  const cardStyle = {
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    width: "350px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={cardStyle}>
        <h2 style={{ color: "#4A4A4A" }}>🎯 Set Monthly Budget</h2>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          placeholder="Enter monthly amount"
          style={inputStyle}
        />

        <button
          onClick={handleSave}
          style={{ ...buttonStyle, background: "#A3D8CE", color: "#4A4A4A" }}
        >
          Save Budget
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{ ...buttonStyle, background: "#F7C8E0", color: "#4A4A4A" }}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SetBudget;

