import React, { useState } from 'react';
import '../styles/TransactionList.css';

const TransactionList = ({ transactions, deleteTransaction }) => {
  const [filter, setFilter] = useState('all');

  /**
   * Filters transactions based on selected filter type
   * @returns {Array} Filtered array of transactions
   */
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(transaction => transaction.type === filter);

  /**
   * Sorts transactions by date (newest first)
   * @returns {Array} Sorted array of transactions
   */
  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  /**
   * Formats amount as Indian Rupees currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency string
   */
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  /**
   * Formats date string to a readable format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string (e.g. "Jan 15, 2023")
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  /**
   * Returns the label for a transaction type
   * @param {string} type - Transaction type (income, expense, borrowed, lent)
   * @returns {string} User-friendly label for the transaction type
   */
  const getTransactionTypeLabel = (type) => {
    switch(type) {
      case 'income': return 'Income';
      case 'expense': return 'Expense';
      case 'borrowed': return 'Borrowed';
      case 'lent': return 'Lent';
      default: return type;
    }
  };

  return (
    <div className="transaction-list-container">
      <div className="transaction-list-header">
        <h2 className="transaction-list-title">Transaction History</h2>
      </div>
      
      <div className="filter-container">
        <div className="filter-label">Filter by:</div>
        <div className="filter-options">
          <div 
            className={`filter-option ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </div>
          <div 
            className={`filter-option expense ${filter === 'expense' ? 'active' : ''}`}
            onClick={() => setFilter('expense')}
          >
            Expenses
          </div>
          <div 
            className={`filter-option income ${filter === 'income' ? 'active' : ''}`}
            onClick={() => setFilter('income')}
          >
            Income
          </div>
          <div 
            className={`filter-option borrowed ${filter === 'borrowed' ? 'active' : ''}`}
            onClick={() => setFilter('borrowed')}
          >
            Borrowed
          </div>
          <div 
            className={`filter-option lent ${filter === 'lent' ? 'active' : ''}`}
            onClick={() => setFilter('lent')}
          >
            Lent
          </div>
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="empty-list">
          <p>No transactions found.</p>
          {filter !== 'all' && (
            <button className="btn" onClick={() => setFilter('all')}>
              Show All Transactions
            </button>
          )}
        </div>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              {(filter === 'all' || filter === 'borrowed' || filter === 'lent') && <th>Contact</th>}
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{getTransactionTypeLabel(transaction.type)}</td>
                {(filter === 'all' || filter === 'borrowed' || filter === 'lent') && (
                  <td>
                    {transaction.type === 'borrowed' || transaction.type === 'lent' 
                      ? transaction.contact 
                      : '-'}
                  </td>
                )}
                <td className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' || transaction.type === 'borrowed' ? '+' : '-'}
                  {formatAmount(transaction.amount)}
                </td>
                <td>
                  <div className="transaction-actions">
                    <button 
                      className="action-btn delete" 
                      onClick={() => deleteTransaction(transaction.id)}
                      title="Delete transaction"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList; 