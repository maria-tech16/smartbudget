import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const navbarStyle = {
    width: "100%",
    background: "linear-gradient(90deg, #A3D8CE, #F7C8E0)",
    color: "#333",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 40px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Poppins, sans-serif",
  };

  const logoStyle = {
    fontWeight: "700",
    fontSize: "22px",
    cursor: "pointer",
    color: "#333",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "10px",
  };

  const buttonStyle = {
    background: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    color: "#333",
    transition: "0.2s",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={navbarStyle}>
      <div style={logoStyle} onClick={() => navigate("/dashboard")}>
        💰 BudgetEase
      </div>

      <div style={buttonGroupStyle}>
        <button style={buttonStyle} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
        <button style={buttonStyle} onClick={() => navigate("/transactions")}>
          Transactions
        </button>
        <button style={buttonStyle} onClick={() => navigate("/add-transaction")}>
          Add
        </button>
        <button style={buttonStyle} onClick={() => navigate("/set-budget")}>
          Budget
        </button>
        <button style={{ ...buttonStyle, background: "#ff6b6b", color: "white" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
