import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyReport() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState({
    income: 0,
    expense: 0,
    remaining: 0,
    highestCategory: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ✅ Fetch real data for logged-in user
  useEffect(() => {
    const fetchMonthlyData = async () => {
      if (!month) return;

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/transaction/monthly?month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching monthly report:", error);
      }
    };

    fetchMonthlyData();
  }, [month]);

  const chartData = [
    { name: "Income", amount: data.income },
    { name: "Expense", amount: data.expense },
    { name: "Remaining", amount: data.remaining },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-24 w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">📈 Monthly Report</h2>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded-lg mb-6"
        >
          <option value="">Select Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {month && (
          <div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-green-700">Total Income</h3>
                <p className="text-2xl font-semibold">${data.income}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-red-700">Total Expense</h3>
                <p className="text-2xl font-semibold">${data.expense}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-700">
                  Remaining Balance
                </h3>
                <p className="text-2xl font-semibold">${data.remaining}</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>

            <p className="mt-6 text-lg">
              🏷️ <strong>Highest Spending Category:</strong>{" "}
              {data.highestCategory || "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthlyReport;

