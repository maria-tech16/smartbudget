import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import SetBudget from "./pages/SetBudget";
import Goals from "./pages/Goals";
import PlannedPayments from "./pages/PlannedPayments";
import MonthlyReport from "./pages/MonthlyReport";

function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/transactions"
          element={isAuth ? <Transactions /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-transaction"
          element={isAuth ? <AddTransaction /> : <Navigate to="/login" />}
        />
        <Route
          path="/set-budget"
          element={isAuth ? <SetBudget /> : <Navigate to="/login" />}
        />
        <Route
          path="/goals"
          element={isAuth ? <Goals /> : <Navigate to="/login" />}
        />
        <Route
          path="/planned-payments"
          element={isAuth ? <PlannedPayments /> : <Navigate to="/login" />}
        />
        <Route
          path="/monthly-report"
          element={isAuth ? <MonthlyReport /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
