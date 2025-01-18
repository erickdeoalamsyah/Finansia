import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

export default function TransactionPage({ setTransactions, transactions }) {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState("expense");
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    account: "",
    note: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      amount: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(formData.amount, 10) || 0;

    if (amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    const newTransaction = {
      date: formData.date,
      day: new Date(formData.date).toLocaleString("en-US", { weekday: "short" }),
      income: transactionType === "income" ? amount : 0,
      expense: transactionType === "expense" ? amount : 0,
      items: [
        {
          icon: transactionType === "income" ? "💰" : "💸",
          category: formData.category || "Other",
          account: formData.account || "Unknown",
          amount,
          type: transactionType,
          note: formData.note || "",
        },
      ],
    };

    const updatedTransactions = [...transactions];
    const existingTransactionIndex = updatedTransactions.findIndex(
      (t) => t.date === newTransaction.date
    );

    if (existingTransactionIndex !== -1) {
      updatedTransactions[existingTransactionIndex].items.unshift(...newTransaction.items);
      updatedTransactions[existingTransactionIndex].income += newTransaction.income;
      updatedTransactions[existingTransactionIndex].expense += newTransaction.expense;
    } else {
      updatedTransactions.unshift(newTransaction);
    }

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      account: "",
      note: "",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-between p-4 lg:px-[12.5rem] border-b border-gray-800">
        <button onClick={() => navigate("/")} className="text-white">
          <GrPrevious />
        </button>
        <h1 className="text-lg text-white">Add Transaction</h1>
        <div></div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6 lg:px-[12.5rem]">
        <div className="flex gap-2">
          {["income", "expense"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTransactionType(type)}
              className={`flex-1 py-1 rounded-md text-white capitalize ${
                transactionType === type ? "border-2 border-red-500 text-red-500" : "bg-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full text-left bg-transparent border-b border-gray-700 text-white p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleAmountChange}
            placeholder="Rp.0"
            className="w-full bg-transparent border-b border-red-600 text-white p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="E.g., Food, Transport"
            className="w-full bg-transparent border-b border-gray-700 text-white p-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-400">Notes</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Optional notes"
            className="w-full bg-transparent border-b border-gray-700 text-white p-2"
          />
        </div>

        <button
          type="submit"
          className="w-fit bg-red-600 text-white p-2 text-md font-medium rounded-sm"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}
