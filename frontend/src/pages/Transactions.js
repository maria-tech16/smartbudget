import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

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
      .then(() => {
        setTransactions(transactions.filter((t) => t._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#FDF7FF",
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
  };

  const listContainer = {
    maxWidth: "600px",
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "16px",
    margin: "auto",
    boxShadow: "0px 6px 16px rgba(0,0,0,0.08)",
  };

  const itemCard = {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "12px",
    background: "#F7F9F8",
    border: "1px solid #eee",
  };

  const deleteBtn = {
    background: "#F7C8E0",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    color: "#4A4A4A",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={listContainer}>
        <h2 style={{ color: "#4A4A4A", textAlign: "center" }}>📄 Your Transactions</h2>

        {budgetExceeded && (
          <p
            style={{
              background: "#ffeaea",
              color: "#d63031",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            ⚠️ You have exceeded your monthly budget!
          </p>
        )}

        {transactions.length === 0 ? (
          <p style={{ textAlign: "center", paddingTop: "10px" }}>No transactions yet.</p>
        ) : (
          transactions.map((t) => (
            <div key={t._id} style={itemCard}>
              <div>
                <b>{t.title}</b> <br />
                ₹{t.amount} • {t.type} <br />
                <small>{new Date(t.date).toLocaleDateString()}</small>
              </div>
              <button style={deleteBtn} onClick={() => deleteTransaction(t._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;






