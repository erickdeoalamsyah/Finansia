import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

export default function TransactionDetailPage({
  transactions,
  setTransactions,
}) {
  const { date, index } = useParams(); // Ambil date dan index dari URL
  const navigate = useNavigate();

  const day = transactions.find((t) => t.date === date);
  const transaction = day ? day.items[parseInt(index, 10)] : null;

  const [formData, setFormData] = useState(transaction || {});

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedTransactions = [...transactions];
    const dayIndex = transactions.findIndex((t) => t.date === date);

    if (dayIndex !== -1) {
      updatedTransactions[dayIndex].items[parseInt(index, 10)] = formData;
      setTransactions(updatedTransactions);
    }

    navigate("/");
  };

  const handleDelete = () => {
    const updatedTransactions = [...transactions];
    const dayIndex = transactions.findIndex((t) => t.date === date);

    if (dayIndex !== -1) {
      updatedTransactions[dayIndex].items.splice(parseInt(index, 10), 1);
      if (updatedTransactions[dayIndex].items.length === 0) {
        updatedTransactions.splice(dayIndex, 1);
      }
      setTransactions(updatedTransactions);
    }

    navigate("/"); // Kembali ke halaman utama
  };

  if (!transaction) {
    return <div className="text-white p-4">Transaction not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-between lg:px-[12.5rem] p-4  border-b border-gray-800">
        <button onClick={() => navigate("/")} className="text-white">
          <GrPrevious />
        </button>
        <h1 className="text-lg text-white">Detail Transaction</h1>
        <div></div>
      </div>
      <div className="space-y-4 p-4 lg:px-[12.5rem]">
        <div>
          <label className="block text-gray-400">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            className="w-full bg-transparent border-b border-gray-700 text-white p-2"
          />
        </div>
        <div>
          <label className="block text-gray-400">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleInputChange}
            className="w-full bg-transparent border-b border-gray-700 text-white p-2"
          />
        </div>
        <div>
          <label className="block text-gray-400">Notes</label>
          <input
            type="text"
            name="note"
            value={formData.note || ""}
            onChange={handleInputChange}
            className="w-full bg-transparent border-b border-gray-700 text-white p-2"
          />
        </div>
      </div>
      <div className="flex gap-2 p-4 lg:px-[12.5rem] ">
        <button
          onClick={handleUpdate}
          className="flex-1 bg-blue-500 py-2 rounded text-white"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 py-2 rounded text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
