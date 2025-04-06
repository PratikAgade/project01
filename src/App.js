import React, { useState, useEffect } from 'react';
import './styles/App.css';
import DashboardPage from './components/DashboardPage';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

/**
 * Main App component for the Budget Calculator
 * @returns {JSX.Element} App component
 */
function App() {
  /**
   * Initializes transactions state from localStorage
   * If no saved data exists, uses empty array
   */
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  /**
   * Tracks the currently active tab (dashboard or transactions)
   */
  const [activeTab, setActiveTab] = useState('dashboard');

  /**
   * Saves transactions to localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  /**
   * Adds a new transaction to the transactions array
   * @param {Object} transaction - Transaction object to add
   */
  const addTransaction = (transaction) => {
    // Create a new transaction with an ID and date
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  /**
   * Deletes a transaction from the transactions array
   * @param {number} id - ID of the transaction to delete
   */
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  /**
   * Renders content based on the active tab
   * @returns {JSX.Element} Component for the active tab
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage transactions={transactions} />;
      case 'transactions':
        return (
          <div className="transactions-page">
            <TransactionForm addTransaction={addTransaction} />
            <TransactionList 
              transactions={transactions} 
              deleteTransaction={deleteTransaction} 
            />
          </div>
        );
      default:
        return <DashboardPage transactions={transactions} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Budget Calculator</h1>
        <p className="app-subtitle">Track your expenses, borrowings, and lendings</p>
      </header>

      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </div>
        <div 
          className={`tab ${activeTab === 'transactions' ? 'active' : ''}`} 
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </div>
      </div>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
