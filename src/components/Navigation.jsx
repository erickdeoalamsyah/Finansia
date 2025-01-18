import React, { useState } from "react";
import Statistic from "./Statistic";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Navigation({ activeTab, onTabChange, transactions }) {
  const tabs = ["Daily", "Calendar", "Statistic"];

  const income = transactions.reduce((sum, t) => sum + t.income, 0);
  const expense = transactions.reduce((sum, t) => sum + t.expense, 0);
  const total = income - expense;

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const monthYear = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-900 text-gray-400 border-b border-gray-500">
      <div className="flex justify-between items-center px-4 p-3">
        <button onClick={handlePrevMonth} className="text-2xl">
        <GrPrevious />
        </button>
        <h2 className="text-lg text-white">{monthYear}</h2>
        <button onClick={handleNextMonth} className="text-2xl">
        <GrNext />
        </button>
      </div>

      <div className="flex border-b border-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 font-semibold ${
              activeTab === tab
                ? "text-white border-b-2 border-red-600"
                : ""
            }`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 text-center">
        <div>
          <div className="text-blue-400 text-[clamp(1rem, 2vw, 2.5rem)]">
            {new Intl.NumberFormat("id-ID").format(income)}
          </div>
          <div className="text-sm">Income</div>
        </div>
        <div>
          <div className="text-red-600 text-[clamp(1rem, 2vw, 2.5rem)]">
            {new Intl.NumberFormat("id-ID").format(expense)}
          </div>
          <div className="text-sm">Expense</div>
        </div>
        <div>
          <div className="text-white text-[clamp(1rem, 2vw, 2.5rem)]">
            {new Intl.NumberFormat("id-ID").format(total)}
          </div>
          <div className="text-sm">Total</div>
        </div>
      </div>

      {activeTab === "Statistic" && (
        <Statistic income={income} expense={expense} total={total} />
      )}
    </div>
  );
}
