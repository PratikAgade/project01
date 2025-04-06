import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ transactions }) => {
  /**
   * Calculates financial summary from all transactions
   * @returns {Object} Object containing totals for income, expense, borrowed, lent and balance
   */
  const calculateSummary = () => {
    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      totalBorrowed: 0,
      totalLent: 0,
      balance: 0
    };

    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      
      switch(transaction.type) {
        case 'income':
          summary.totalIncome += amount;
          summary.balance += amount;
          break;
        case 'expense':
          summary.totalExpense += amount;
          summary.balance -= amount;
          break;
        case 'borrowed':
          summary.totalBorrowed += amount;
          summary.balance += amount;
          break;
        case 'lent':
          summary.totalLent += amount;
          summary.balance -= amount;
          break;
        default:
          break;
      }
    });

    return summary;
  };

  const summary = calculateSummary();

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

  // Get recent transactions (latest 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  /**
   * Formats date string to a readable format
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string (e.g. "Jan 15")
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Income</h3>
          <div className="amount">{formatAmount(summary.totalIncome)}</div>
        </div>
        <div className="summary-card expense">
          <h3>Expenses</h3>
          <div className="amount">{formatAmount(summary.totalExpense)}</div>
        </div>
        <div className="summary-card borrowed">
          <h3>Borrowed</h3>
          <div className="amount">{formatAmount(summary.totalBorrowed)}</div>
        </div>
        <div className="summary-card lent">
          <h3>Lent</h3>
          <div className="amount">{formatAmount(summary.totalLent)}</div>
        </div>
      </div>
      
      <div className="balance-card summary-card">
        <h3>Balance</h3>
        <div className="amount">{formatAmount(summary.balance)}</div>
      </div>

      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        
        {recentTransactions.length === 0 ? (
          <div className="empty-transactions">
            <p>No transactions yet. Add a transaction to get started.</p>
          </div>
        ) : (
          <ul className="transaction-list">
            {recentTransactions.map(transaction => (
              <li key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className={`transaction-category ${transaction.type}`}></div>
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.description}</div>
                    <div className="transaction-date">{formatDate(transaction.date)}</div>
                  </div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' || transaction.type === 'borrowed' ? '+' : '-'}
                  {formatAmount(transaction.amount)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 