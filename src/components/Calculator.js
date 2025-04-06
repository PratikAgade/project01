import React, { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  /**
   * Handles digit input on calculator
   * @param {string} digit - The digit pressed by user
   */
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  /**
   * Handles decimal point input
   */
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  /**
   * Clears the calculator display and resets all states
   */
  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * Handles operator input (+, -, *, /)
   * @param {string} nextOperator - The operator pressed by user
   */
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  /**
   * Performs the calculation based on operands and operator
   * @returns {number} The result of the calculation
   */
  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '*') {
      return firstOperand * inputValue;
    } else if (operator === '/') {
      return firstOperand / inputValue;
    }

    return inputValue;
  };

  /**
   * Handles equals button press, finalizes calculation
   */
  const handleEquals = () => {
    if (!operator) return;

    // eslint-disable-next-line no-unused-vars
    const inputValue = parseFloat(display);
    const result = performCalculation();

    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * Formats the current display value as Indian Rupees
   * @returns {string} Formatted rupee value
   */
  const formatAsRupees = () => {
    if (display === '0' || !display) return '₹0';
    
    try {
      const num = parseFloat(display);
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: display.includes('.') ? 2 : 0,
        maximumFractionDigits: 2
      }).format(num);
    } catch (e) {
      return display;
    }
  };

  return (
    <div className="calculator">
      <h2>Simple Calculator</h2>
      <div className="calculator-display">{display}</div>
      <div className="calculator-display">{formatAsRupees()}</div>
      <div className="calculator-keypad">
        <button className="calculator-key clear" onClick={clearDisplay}>C</button>
        <button className="calculator-key operator" onClick={() => handleOperator('/')}>/</button>
        <button className="calculator-key operator" onClick={() => handleOperator('*')}>×</button>
        <button className="calculator-key operator" onClick={() => handleOperator('-')}>-</button>
        
        <button className="calculator-key" onClick={() => inputDigit('7')}>7</button>
        <button className="calculator-key" onClick={() => inputDigit('8')}>8</button>
        <button className="calculator-key" onClick={() => inputDigit('9')}>9</button>
        <button className="calculator-key operator" onClick={() => handleOperator('+')}>+</button>
        
        <button className="calculator-key" onClick={() => inputDigit('4')}>4</button>
        <button className="calculator-key" onClick={() => inputDigit('5')}>5</button>
        <button className="calculator-key" onClick={() => inputDigit('6')}>6</button>
        <button className="calculator-key" onClick={inputDecimal}>.</button>
        
        <button className="calculator-key" onClick={() => inputDigit('1')}>1</button>
        <button className="calculator-key" onClick={() => inputDigit('2')}>2</button>
        <button className="calculator-key" onClick={() => inputDigit('3')}>3</button>
        <button className="calculator-key" onClick={() => inputDigit('0')}>0</button>
        
        <button className="calculator-key equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

export default Calculator; 