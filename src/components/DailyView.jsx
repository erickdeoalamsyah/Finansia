import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DailyView({ transactions }) {
  const navigate = useNavigate();

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-gray-900 text-white ">
      {sortedTransactions.map((day, index) => (
        <div key={`${day.date}-${index}`} className="border-b border-gray-800 ">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{day.date.split('-')[2]}</span>
              <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                {day.day}
              </span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-blue-400">
                Rp {new Intl.NumberFormat('id-ID').format(day.income)}
              </span>
              <span className="text-red-600">
                Rp {new Intl.NumberFormat('id-ID').format(day.expense)}
              </span>
            </div>
          </div>

          {day.items.map((item, itemIndex) => (
            <div
              key={`${day.date}-${itemIndex}`}
              onClick={() => navigate(`/transaction/${day.date}/${itemIndex}`)} 
              className="flex justify-between items-center p-4 border-t border-gray-800 cursor-pointer hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="text-sm">{item.category}</div>
                  <div className="text-gray-400 text-sm">{item.note}</div>
                </div>
              </div>
              <div
                className={
                  item.type === 'income'
                    ? 'text-blue-400 text-sm'
                    : 'text-red-600 text-sm'
                }
              >
                Rp {new Intl.NumberFormat('id-ID').format(item.amount)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
