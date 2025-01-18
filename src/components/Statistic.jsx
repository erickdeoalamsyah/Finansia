import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistic({ income, expense, total }) {
  const data = {
    labels: ["Income", "Expense", "Total"],
    datasets: [
      {
        label: "Amount (IDR)",
        data: [income, expense, total],
        backgroundColor: ["#0284c7", "#dc2626", "#ffffff"], 
        borderColor: ["#2563EB", "#DC2626", "#059669"], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#4B5563", 
          font: {
            size: 14, 
          },
        },
        grid: {
          color: "#4B5563",
        },
      },
      y: {
        ticks: {
          color: "#4B5563", 
          font: {
            size: 14, 
          },
        },
        grid: {
          color: "#4B5563",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#4B5563", 
          font: {
            size: 14, 
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 min-h-screen px-4 mt-5 mb-5">
      <Bar data={data} options={options} />
    </div>
  );
}
