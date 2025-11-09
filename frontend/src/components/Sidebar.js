import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, PlusCircle, PieChart, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={24} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FileText size={24} />, label: "Transactions", path: "/transactions" },
    { icon: <PlusCircle size={24} />, label: "Add Transaction", path: "/add-transaction" },
    { icon: <PieChart size={24} />, label: "Budget", path: "/set-budget" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-20 bg-gradient-to-b from-blue-500 via-teal-400 to-cyan-300 shadow-lg flex flex-col items-center justify-between py-6">
      
      <div className="flex flex-col items-center">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`group relative w-full flex justify-center mb-6 cursor-pointer transition-all ${
                isActive ? "bg-white/30 rounded-xl" : ""
              } hover:bg-white/20 rounded-xl p-3`}
            >
              {item.icon}
              <span className="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div
        onClick={handleLogout}
        className="group relative w-full flex justify-center mb-6 cursor-pointer p-3 hover:bg-white/20 rounded-xl"
      >
        <LogOut size={24} />
        <span className="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Logout
        </span>
      </div>
    </div>
  );
}

export default Sidebar;

