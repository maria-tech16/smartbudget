import React, { useState } from "react";
import Navbar from "../components/Navbar";

function AddTransaction() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      alert(data.message || "Something went wrong");
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#FDF7FF",
    fontFamily: "Poppins, sans-serif",
    flexDirection: "column",
  };

  const cardStyle = {
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.08)",
    width: "400px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "15px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    background: "#A3D8CE",
    border: "none",
    borderRadius: "10px",
    color: "#4A4A4A",
    fontSize: "17px",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={cardStyle}>
        <h2 style={{ color: "#4A4A4A", marginBottom: "18px", textAlign: "center" }}>
          ➕ Add Transaction
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Title e.g. Food / Salary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="number"
            placeholder="Amount ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            style={inputStyle}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button style={buttonStyle} type="submit">
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;







