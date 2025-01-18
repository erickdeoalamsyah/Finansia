import React from 'react';

export default function CalendarView({ transactions }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const calculateTotalsByDate = () => {
    const totals = {};

    transactions.forEach((transaction) => {
      const date = transaction.date;
      if (!totals[date]) {
        totals[date] = { income: 0, expense: 0, total: 0 };
      }

      transaction.items.forEach((item) => {
        if (item.type === 'income') {
          totals[date].income += item.amount;
        } else if (item.type === 'expense') {
          totals[date].expense += item.amount;
        }
      });

      totals[date].total = totals[date].income - totals[date].expense;
    });

    return totals;
  };

  const totalsByDate = calculateTotalsByDate();

  return (
    <div className="bg-gray-900 text-white p-4 ">
      <div className="grid grid-cols-5 text-xs sm:text-sm md:text-base">
        {Array.from({ length: 35 }).map((_, index) => {
          const day = index + 1;
          const dateKey = `2025-01-${String(day).padStart(2, '0')}`; 
          const totals = totalsByDate[dateKey];

          return (
            <div
              key={index}
              className={`min-h-[80px] sm:min-h-[100px] border border-gray-800 ${
                totals ? 'bg-gray-900' : ''
              }`}
            >
              <div className="text-sm sm:text-base font-semibold px-1">{day}</div>

              {totals && (
                <div className="mt-1 px-1 text-xs sm:text-sm md:text-base">
                  <div className="text-blue-400">
                    {totals.income > 0 && `${new Intl.NumberFormat('id-ID').format(totals.income)}`}
                  </div>
                  <div className="text-red-600">
                    {totals.expense > 0 && `${new Intl.NumberFormat('id-ID').format(totals.expense)}`}
                  </div>
                  <div className="text-gray-300">
                    {`${new Intl.NumberFormat('id-ID').format(totals.total)}`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
