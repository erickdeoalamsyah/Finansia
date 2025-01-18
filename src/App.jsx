import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DailyView from './components/DailyView';
import CalendarView from './components/CalendarView';
import TransactionPage from './components/TransactionPage';
import TransactionDetailPage from './components/TransactionDetailPage'; 
import { FaPlus } from "react-icons/fa";


function HomePage({ transactions, setTransactions }) {
  const [activeTab, setActiveTab] = useState('Daily');
  const navigate = useNavigate();

  
  return (
    <>
      <Header/>
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        transactions={transactions} 
      />
      
      {activeTab === 'Daily' && <DailyView transactions={transactions} />}
      {activeTab === 'Calendar' && <CalendarView transactions={transactions} />}

      <button 
        onClick={() => navigate('/transaction')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl"
      >
        <FaPlus />
      </button>
    </>
  );
}

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const storedData = localStorage.getItem('transactions');
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Failed to parse localStorage data:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage transactions={transactions} setTransactions={setTransactions} />} 
        />
        <Route 
          path="/transaction" 
          element={<TransactionPage setTransactions={setTransactions} transactions={transactions} />} 
        />
        <Route 
          path="/transaction/:date/:index" 
          element={<TransactionDetailPage transactions={transactions} setTransactions={setTransactions} />} 
        />
      </Routes>
    </Router>
  );
}
