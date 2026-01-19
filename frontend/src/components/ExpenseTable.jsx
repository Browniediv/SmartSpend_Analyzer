import React from "react";
import API from "../api/axios";
import { FaTrash } from "react-icons/fa";

const ExpenseTable = ({ expenses, refresh }) => {
  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    refresh();
  };

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((e) => (
          <tr key={e._id}>
            <td>{new Date(e.date).toLocaleDateString()}</td>
            <td>{e.title}</td>
            <td>₹ {e.amount}</td>
            <td className={e.type === "income" ? "income" : "expense"}>
              {e.type}
            </td>
            <td>{e.category}</td>
            <td>
              <FaTrash
                className="delete-icon"
                onClick={() => deleteExpense(e._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
