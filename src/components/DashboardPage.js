import React from 'react';
import Dashboard from './Dashboard';
import Calculator from './Calculator';
import '../styles/DashboardPage.css';

/**
 * Dashboard page component that combines financial dashboard and calculator
 * @param {Object} props - Component props
 * @param {Array} props.transactions - Array of transaction objects
 * @returns {JSX.Element} Dashboard page component
 */
const DashboardPage = ({ transactions }) => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-section">
        <h1 className="dashboard-title">Dashboard</h1>
        <Dashboard transactions={transactions} />
      </div>
      <div className="calculator-section">
        <Calculator />
      </div>
    </div>
  );
};

export default DashboardPage; 