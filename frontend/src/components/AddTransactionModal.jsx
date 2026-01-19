import React, { useState } from "react";
import API from "../api/axios";

const AddTransactionModal = ({ closeModal, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await API.post("/expenses", form);
    refresh();
    closeModal();
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h3>Add Transaction</h3>

        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="amount" placeholder="Amount" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />

        <select name="type" onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input type="date" name="date" onChange={handleChange} />

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AddTransactionModal;
