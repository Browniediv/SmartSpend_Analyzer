import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ expenses }) => {
  // Calculate totals
  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  // Sassy comment pools
  const goodComments = [
    "Money’s listening to you. Keep flexing 💪💰",
    "Your wallet is proud of you 😎",
    "Saving like a boss. Future you says thanks 🙌",
    "Bank balance smiling right now 😁"
  ];

  const badComments = [
    "Your money is leaving faster than it’s coming 🚶‍♂️💸",
    "You are spending like there’s no tomorrow… but there is 😭",
    "Your expenses are partying without permission 💸",
    "Wallet on survival mode ⚠️"
  ];

  const neutralComments = [
    "Perfectly balanced… for now ⚖️",
    "Breaking even, but let’s aim higher 🚀",
    "Surviving, not thriving (yet) 😌",
    "Not bad, not great — just mid 😐"
  ];

  const getRandom = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  let comment = "";
  let commentClass = "";

  if (income > expense) {
    comment = getRandom(goodComments);
    commentClass = "comment-good";
  } else if (expense > income) {
    comment = getRandom(badComments);
    commentClass = "comment-bad";
  } else {
    comment = getRandom(neutralComments);
    commentClass = "comment-neutral";
  }

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#00ff99", "#ff4d4d"],
        borderColor: "#ffffff",
        borderWidth: 2
      }
    ]
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Income vs Expense</h3>

      <div style={{ width: "320px", margin: "0 auto" }}>
        <Pie data={data} />
      </div>

      {/* RANDOM SASSY COMMENT */}
      <p className={`finance-comment ${commentClass}`}>
        {comment}
      </p>
    </div>
  );
};

export default Charts;
