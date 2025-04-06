import React, { useState } from 'react';
import '../styles/TransactionForm.css';

const TransactionForm = ({ addTransaction }) => {
  /**
   * Initial state for the transaction form
   */
  const initialFormState = {
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    contact: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  /**
   * Predefined categories for each transaction type
   */
  const categories = {
    income: ['Salary', 'Freelance', 'Gift', 'Investment', 'Other'],
    expense: ['Food', 'Transport', 'Utilities', 'Rent', 'Entertainment', 'Shopping', 'Health', 'Other'],
    borrowed: ['Friend', 'Family', 'Bank', 'Other'],
    lent: ['Friend', 'Family', 'Other']
  };

  /**
   * Handles input changes for form fields
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * Handles transaction type selection
   * @param {string} type - Selected transaction type (income, expense, borrowed, lent)
   */
  const handleTypeChange = (type) => {
    setFormData(prevState => ({
      ...prevState,
      type,
      category: '', // Reset category when type changes
      contact: ''   // Reset contact when type changes
    }));
  };

  /**
   * Handles form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.amount || !formData.description) {
      alert('Please enter amount and description');
      return;
    }

    if (formData.amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    // Validate contact for borrowed and lent transactions
    if ((formData.type === 'borrowed' || formData.type === 'lent') && !formData.contact) {
      alert('Please enter a contact name for borrowed/lent transaction');
      return;
    }

    // Add transaction
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    // Reset form
    setFormData(initialFormState);
  };

  /**
   * Determines if contact field should be shown based on transaction type
   */
  const showContactField = formData.type === 'borrowed' || formData.type === 'lent';

  return (
    <div className="transaction-form">
      <h2>Add New Transaction</h2>
      
      <div className="transaction-types">
        <div 
          className={`transaction-type expense ${formData.type === 'expense' ? 'active' : ''}`}
          onClick={() => handleTypeChange('expense')}
        >
          Expense
        </div>
        <div 
          className={`transaction-type income ${formData.type === 'income' ? 'active' : ''}`}
          onClick={() => handleTypeChange('income')}
        >
          Income
        </div>
        <div 
          className={`transaction-type borrowed ${formData.type === 'borrowed' ? 'active' : ''}`}
          onClick={() => handleTypeChange('borrowed')}
        >
          Borrowed
        </div>
        <div 
          className={`transaction-type lent ${formData.type === 'lent' ? 'active' : ''}`}
          onClick={() => handleTypeChange('lent')}
        >
          Lent
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="amount">Amount (₹)</label>
            <input
              type="number" 
              className="form-input"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount in ₹"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <input
              type="text" 
              className="form-input"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <div className="select-wrapper">
              <select
                className="form-input"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories[formData.type].map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={`form-group contact-field ${showContactField ? 'show' : ''}`}>
            <label className="form-label" htmlFor="contact">Contact Name</label>
            <input
              type="text" 
              className="form-input"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder={formData.type === 'borrowed' ? 'Who did you borrow from?' : 'Who did you lend to?'}
              required={showContactField}
            />
          </div>
          
          {!showContactField && (
            <div className="form-group">
              <label className="form-label" htmlFor="notes">Notes (Optional)</label>
              <input
                type="text" 
                className="form-input"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes"
              />
            </div>
          )}
        </div>
        
        {showContactField && (
          <div className="form-group">
            <label className="form-label" htmlFor="notes">Notes (Optional)</label>
            <input
              type="text" 
              className="form-input"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes"
            />
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" className="btn btn-submit">Add Transaction</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm; 