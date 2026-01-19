import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ExpenseTable from "../components/ExpenseTable";
import AddTransactionModal from "../components/AddTransactionModal";
import Charts from "../components/Charts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [range, setRange] = useState("all");
  const [showGraph, setShowGraph] = useState(false);

  const fetchExpenses = async (selectedRange = "all") => {
    const url =
      selectedRange === "all"
        ? "/expenses"
        : `/expenses?range=${selectedRange}`;

    const res = await API.get(url);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses(range);
  }, [range]);

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>
  Spend <span className="or-text">OR</span> Regret
</h2>


        <div>
          <select
            className="filter"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>

          <button
            className="btn-secondary"
            onClick={() => setShowGraph(!showGraph)}
          >
            {showGraph ? "Hide Graph" : "Show Graph"}
          </button>

          <button
            className="btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>

          <button
            className="btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* TABLE */}
      <ExpenseTable
        expenses={expenses}
        refresh={() => fetchExpenses(range)}
      />

      {/* GRAPH BELOW TABLE */}
      {showGraph && (
  <div className="graph-wrapper">
    <Charts expenses={expenses} />
  </div>
)}


      {/* ADD TRANSACTION MODAL */}
      {showModal && (
        <AddTransactionModal
          closeModal={() => setShowModal(false)}
          refresh={() => fetchExpenses(range)}
        />
      )}
    </div>
  );
};

export default Dashboard;
