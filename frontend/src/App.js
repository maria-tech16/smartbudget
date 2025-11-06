import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import SetBudget from "./pages/SetBudget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/set-budget" element={<SetBudget />} />


        {/* ✅ Protected Route */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token")
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
