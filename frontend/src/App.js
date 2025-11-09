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
        {/* Redirect "/" to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/transactions"
          element={
            localStorage.getItem("token") ? <Transactions /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-transaction"
          element={
            localStorage.getItem("token") ? <AddTransaction /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/set-budget"
          element={
            localStorage.getItem("token") ? <SetBudget /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
