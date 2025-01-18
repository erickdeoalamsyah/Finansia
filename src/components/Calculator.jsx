import React from 'react';

export default function Calculator({ onNumberClick, onOperatorClick, onSubmit, onClear }) {
  return (
    <div className="bg-gray-900">
      <div className="flex items-center justify-between bg-gray-800 p-4">
        <div className="text-xl text-white">Amount</div>
        <div className="flex gap-4">
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
            </svg>
          </button>
          <button onClick={onClear} className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {['+', '-', '×', '÷'].map((op) => (
          <button
            key={op}
            onClick={() => onOperatorClick(op)}
            className="p-4 text-xl text-white border border-gray-800 hover:bg-gray-800"
          >
            {op}
          </button>
        ))}
        {[7, 8, 9, '=', 4, 5, 6, ',', 1, 2, 3, 
          <svg key="backspace" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ].map((num, index) => (
          <button
            key={index}
            onClick={() => typeof num === 'number' ? onNumberClick(num) : null}
            className="p-4 text-xl text-white border border-gray-800 hover:bg-gray-800"
          >
            {num}
          </button>
        ))}
        <button
          className="p-4 text-xl text-white border border-gray-800 hover:bg-gray-800"
          onClick={() => onNumberClick(0)}
        >
          0
        </button>
        <button
          className="p-4 text-xl text-white border border-gray-800 hover:bg-gray-800 col-span-2 bg-red-500"
          onClick={onSubmit}
        >
          OK
        </button>
      </div>
    </div>
  );
}

