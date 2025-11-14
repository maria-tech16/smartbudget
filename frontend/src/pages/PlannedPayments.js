import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function PlannedPayments() {
  const user = JSON.parse(localStorage.getItem("user")); // current logged-in user
  const userId = user?._id || "guest"; // fallback if not logged in

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem(`plannedPayments_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    amount: "",
    dueDate: "",
    status: "Pending",
  });

  // Save to localStorage whenever payments change
  useEffect(() => {
    localStorage.setItem(`plannedPayments_${userId}`, JSON.stringify(payments));
  }, [payments, userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addPayment = () => {
    if (!form.name || !form.amount || !form.dueDate)
      return alert("Please fill all fields");
    const newPayment = { ...form, id: Date.now() };
    setPayments([...payments, newPayment]);
    setForm({ name: "", amount: "", dueDate: "", status: "Pending" });
  };

  const markAsPaid = (id) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, status: "Paid" } : p)));
  };

  const upcoming = payments.filter((p) => p.status === "Pending").length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-24 w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">📅 Planned Payments</h2>
        <p className="mb-4 text-gray-600">Upcoming payments: {upcoming}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Payee Name"
            className="border p-2 rounded w-48"
          />
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded w-32"
          />
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className="border p-2 rounded w-48"
          />
          <button
            onClick={addPayment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Payment
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 border">Payee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Due Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">₹{p.amount}</td>
                <td className="p-2 border">{p.dueDate}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      p.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-2 border">
                  {p.status === "Pending" && (
                    <button
                      onClick={() => markAsPaid(p.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlannedPayments;
