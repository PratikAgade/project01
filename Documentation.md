# Budget Calculator Documentation

## Application Overview

The Budget Calculator is a React-based web application that helps users track their finances, including expenses, income, borrowings, and lendings. The application works completely offline, storing all data in the browser's localStorage.

## Components and Functions

### App Component (`App.js`)

The main container component that manages the application state and renders different views based on the active tab.

**Functions:**

1. **useState for transactions**
   - **Purpose:** Initializes the transactions state from localStorage
   - **Description:** Retrieves previously saved transactions from localStorage if available, otherwise starts with an empty array
   - **Usage:** Manages the main data store for all financial transactions

2. **useState for activeTab**
   - **Purpose:** Tracks the currently active tab (dashboard or transactions)
   - **Description:** Controls which view is displayed to the user - either the dashboard or the transactions page
   - **Usage:** Used for navigation between application sections

3. **useEffect for localStorage**
   - **Purpose:** Saves transactions to localStorage whenever they change
   - **Description:** Persists all transaction data in browser storage whenever the transactions state is updated
   - **Usage:** Ensures data persistence across browser sessions

4. **addTransaction**
   - **Purpose:** Adds a new transaction to the transactions array
   - **Description:** Creates a new transaction with unique ID and timestamp, then adds it to the existing transactions
   - **Parameters:** `transaction` - Transaction object to add
   - **Usage:** Called when the user submits a new transaction form

5. **deleteTransaction**
   - **Purpose:** Deletes a transaction from the transactions array
   - **Description:** Filters out the transaction with the specified ID from the transactions array
   - **Parameters:** `id` - ID of the transaction to delete
   - **Usage:** Called when the user clicks the delete button for a transaction

6. **renderContent**
   - **Purpose:** Renders content based on the active tab
   - **Description:** Returns different components based on which tab is currently active
   - **Returns:** JSX Element for the active tab content
   - **Usage:** Used to dynamically render either the Dashboard or Transactions page

### Dashboard Component (`Dashboard.js`)

Displays financial summaries and recent transactions.

**Functions:**

1. **calculateSummary**
   - **Purpose:** Calculates financial summary from all transactions
   - **Description:** Processes all transactions to calculate totals for income, expenses, borrowed money, lent money, and the overall balance
   - **Returns:** Object containing financial summary data
   - **Usage:** Used to generate and display financial overview

2. **formatAmount**
   - **Purpose:** Formats amount as Indian Rupees currency
   - **Description:** Converts a number to a properly formatted currency string with the ₹ symbol
   - **Parameters:** `amount` - Number to format
   - **Returns:** Formatted currency string
   - **Usage:** Used to display monetary values in a readable format

3. **formatDate**
   - **Purpose:** Formats date string to a readable format
   - **Description:** Converts an ISO date string to a more user-friendly format
   - **Parameters:** `dateString` - ISO date string
   - **Returns:** Formatted date string (e.g., "Jan 15")
   - **Usage:** Used to display transaction dates in the recent transactions list

### TransactionForm Component (`TransactionForm.js`)

Form component for adding new transactions.

**Functions:**

1. **initialFormState**
   - **Purpose:** Initial state for the transaction form
   - **Description:** Defines the default values for a new transaction
   - **Usage:** Used to initialize and reset the form

2. **categories**
   - **Purpose:** Predefined categories for each transaction type
   - **Description:** Contains lists of categories for different transaction types (income, expense, etc.)
   - **Usage:** Used to populate the category dropdown based on transaction type

3. **handleChange**
   - **Purpose:** Handles input changes for form fields
   - **Description:** Updates the form state when the user types in any input field
   - **Parameters:** `e` - Event object from the input change
   - **Usage:** Attached to all form input elements

4. **handleTypeChange**
   - **Purpose:** Handles transaction type selection
   - **Description:** Updates the transaction type and resets category and contact fields
   - **Parameters:** `type` - Selected transaction type (income, expense, borrowed, lent)
   - **Usage:** Called when user selects a different transaction type

5. **handleSubmit**
   - **Purpose:** Handles form submission
   - **Description:** Validates form inputs, creates a new transaction, and resets the form
   - **Parameters:** `e` - Event object from form submission
   - **Usage:** Called when the form is submitted

6. **showContactField**
   - **Purpose:** Determines if contact field should be shown
   - **Description:** Returns true if the transaction type is borrowed or lent
   - **Usage:** Controls the visibility of the contact input field

### TransactionList Component (`TransactionList.js`)

Displays a filterable, sortable list of all transactions.

**Functions:**

1. **filteredTransactions**
   - **Purpose:** Filters transactions based on selected filter type
   - **Description:** Returns either all transactions or only those matching the selected type
   - **Returns:** Filtered array of transactions
   - **Usage:** Used to show only relevant transactions based on user's filter selection

2. **sortedTransactions**
   - **Purpose:** Sorts transactions by date (newest first)
   - **Description:** Takes filtered transactions and sorts them chronologically
   - **Returns:** Sorted array of transactions
   - **Usage:** Ensures transactions are displayed in order of recency

3. **formatAmount**
   - **Purpose:** Formats amount as Indian Rupees currency
   - **Description:** Converts a number to a properly formatted currency string
   - **Parameters:** `amount` - Number to format
   - **Returns:** Formatted currency string
   - **Usage:** Used to display monetary values in the transaction list

4. **formatDate**
   - **Purpose:** Formats date string to a readable format
   - **Description:** Converts an ISO date string to a more user-friendly format
   - **Parameters:** `dateString` - ISO date string
   - **Returns:** Formatted date string (e.g., "Jan 15, 2023")
   - **Usage:** Used to display transaction dates in the transaction list

5. **getTransactionTypeLabel**
   - **Purpose:** Returns the label for a transaction type
   - **Description:** Converts internal transaction type names to user-friendly labels
   - **Parameters:** `type` - Transaction type (income, expense, borrowed, lent)
   - **Returns:** User-friendly label for the transaction type
   - **Usage:** Used in the transaction list to display transaction types

### Calculator Component (`Calculator.js`)

A simple calculator with basic arithmetic operations.

**Functions:**

1. **inputDigit**
   - **Purpose:** Handles digit input on calculator
   - **Description:** Adds the pressed digit to the calculator display
   - **Parameters:** `digit` - The digit pressed by user
   - **Usage:** Called when a number button is clicked

2. **inputDecimal**
   - **Purpose:** Handles decimal point input
   - **Description:** Adds a decimal point to the display if one doesn't already exist
   - **Usage:** Called when the decimal point button is clicked

3. **clearDisplay**
   - **Purpose:** Clears the calculator display and resets all states
   - **Description:** Resets the calculator to its initial state
   - **Usage:** Called when the clear (C) button is clicked

4. **handleOperator**
   - **Purpose:** Handles operator input (+, -, *, /)
   - **Description:** Sets the operator and prepares for the second operand
   - **Parameters:** `nextOperator` - The operator pressed by user
   - **Usage:** Called when an operator button is clicked

5. **performCalculation**
   - **Purpose:** Performs the calculation based on operands and operator
   - **Description:** Executes the arithmetic operation between the first and second operands
   - **Returns:** The result of the calculation
   - **Usage:** Called when equals button is pressed or a new operator is selected

6. **handleEquals**
   - **Purpose:** Handles equals button press, finalizes calculation
   - **Description:** Completes the current calculation and displays the result
   - **Usage:** Called when the equals (=) button is clicked

7. **formatAsRupees**
   - **Purpose:** Formats the current display value as Indian Rupees
   - **Description:** Converts the calculator display value to a formatted currency string
   - **Returns:** Formatted rupee value
   - **Usage:** Used to show the calculator result in currency format

### DashboardPage Component (`DashboardPage.js`)

Container component that combines the financial dashboard and calculator.

**Purpose:** Acts as a container for both the Dashboard and Calculator components
**Description:** Provides a layout for the dashboard page, organizing the financial summary and calculator
**Props:** 
- `transactions` - Array of transaction objects
**Usage:** Rendered when the Dashboard tab is active

## Data Flow

1. User adds transactions through the TransactionForm component
2. Transactions are stored in the App component's state and persisted in localStorage
3. Dashboard component calculates and displays summaries based on these transactions
4. TransactionList component displays, filters, and allows deletion of transactions
5. Calculator component provides a simple calculator functionality independent of transaction data

## State Management

The application uses React's built-in state management:
- `transactions` state in App.js is the single source of truth for all transaction data
- Component-specific state (like form inputs or active filters) is managed locally in each component
- localStorage is used for data persistence across browser sessions

## Styling

The application uses custom CSS with:
- CSS variables for consistent theming
- Responsive design for mobile and desktop layouts
- Card-based UI components
- Color-coding for different transaction types 