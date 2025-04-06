# Budget Calculator

A clean, modern budget calculator web application built with React that helps you track your expenses, income, borrowings, and lendings all in one place.

## Features

- **Track Multiple Transaction Types**:
  - Expenses: Record your everyday spending
  - Income: Keep track of your earnings
  - Borrowings: Log money you've borrowed from others
  - Lendings: Track money you've lent to others

- **Dashboard**: View a summary of your financial situation with totals for each transaction type and a current balance.

- **Transaction Management**:
  - Add transactions with descriptions, categories, and amounts
  - Filter transactions by type
  - View transaction history chronologically
  - Delete transactions as needed

- **Offline Functionality**: All data is stored locally in your browser, making it usable without an internet connection.

## How to Use

1. **Add a Transaction**:
   - Select transaction type (Expense, Income, Borrowed, Lent)
   - Enter amount and description
   - Select a category
   - For borrowings and lendings, enter a contact name
   - Add optional notes if needed
   - Click "Add Transaction"

2. **View Your Financial Summary**:
   - The dashboard displays total income, expenses, borrowed amounts, and lent amounts
   - See your current balance calculated from all transactions

3. **Manage Transactions**:
   - View all transactions in the transaction history table
   - Filter transactions by type
   - Delete unwanted transactions

## Technical Details

This project was built using:
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3

Data persistence is achieved through browser's localStorage.

## Getting Started

To run this project locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Future Enhancements

Potential future improvements:
- Data export/import functionality
- Budget setting and tracking
- Charts and visual analytics
- Dark/light theme options
- Categories management
- Recurring transactions

## License

This project is open source and available under the MIT License.
