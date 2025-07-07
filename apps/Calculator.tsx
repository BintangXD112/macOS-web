
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<null | string>(null);
  const [operator, setOperator] = useState<null | string>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    if (firstOperand === null) {
      setFirstOperand(String(inputValue));
    } else if (operator) {
      const result = calculate(firstOperand, operator, String(inputValue));
      setDisplay(String(result));
      setFirstOperand(String(result));
    }
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const calculate = (first: string, op: string, second: string): number => {
      const firstNum = parseFloat(first);
      const secondNum = parseFloat(second);
      if (op === '+') return firstNum + secondNum;
      if (op === '-') return firstNum - secondNum;
      if (op === '*') return firstNum * secondNum;
      if (op === '/') return firstNum / secondNum;
      return secondNum;
  }

  const handleEquals = () => {
    if(operator && firstOperand !== null) {
        const result = calculate(firstOperand, operator, display);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    }
  }

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
      setDisplay(String(parseFloat(display) * -1));
  }

  const percentage = () => {
      setDisplay(String(parseFloat(display) / 100));
  }

  const buttonClasses = "text-white text-3xl font-light rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50";
  const opButtonClasses = "bg-[#FF9500] hover:bg-orange-400";
  const topButtonClasses = "bg-[#D4D4D2] text-black hover:bg-gray-400";
  const numButtonClasses = "bg-[#505050] hover:bg-gray-600";

  return (
    <div className="h-full w-full bg-black flex flex-col p-2 gap-2">
      <div className="h-1/4 text-white text-7xl font-thin flex items-end justify-end pr-6">
        {display}
      </div>
      <div className="flex-grow calculator-grid">
        <button onClick={clearAll} className={`${buttonClasses} ${topButtonClasses}`}>AC</button>
        <button onClick={toggleSign} className={`${buttonClasses} ${topButtonClasses}`}>+/-</button>
        <button onClick={percentage} className={`${buttonClasses} ${topButtonClasses}`}>%</button>
        <button onClick={() => performOperation('/')} className={`${buttonClasses} ${opButtonClasses}`}>÷</button>
        
        <button onClick={() => inputDigit('7')} className={`${buttonClasses} ${numButtonClasses}`}>7</button>
        <button onClick={() => inputDigit('8')} className={`${buttonClasses} ${numButtonClasses}`}>8</button>
        <button onClick={() => inputDigit('9')} className={`${buttonClasses} ${numButtonClasses}`}>9</button>
        <button onClick={() => performOperation('*')} className={`${buttonClasses} ${opButtonClasses}`}>×</button>

        <button onClick={() => inputDigit('4')} className={`${buttonClasses} ${numButtonClasses}`}>4</button>
        <button onClick={() => inputDigit('5')} className={`${buttonClasses} ${numButtonClasses}`}>5</button>
        <button onClick={() => inputDigit('6')} className={`${buttonClasses} ${numButtonClasses}`}>6</button>
        <button onClick={() => performOperation('-')} className={`${buttonClasses} ${opButtonClasses}`}>-</button>

        <button onClick={() => inputDigit('1')} className={`${buttonClasses} ${numButtonClasses}`}>1</button>
        <button onClick={() => inputDigit('2')} className={`${buttonClasses} ${numButtonClasses}`}>2</button>
        <button onClick={() => inputDigit('3')} className={`${buttonClasses} ${numButtonClasses}`}>3</button>
        <button onClick={() => performOperation('+')} className={`${buttonClasses} ${opButtonClasses}`}>+</button>

        <button onClick={() => inputDigit('0')} className={`${buttonClasses} ${numButtonClasses}`}>0</button>
        <button onClick={inputDecimal} className={`${buttonClasses} ${numButtonClasses}`}>.</button>
        <button onClick={handleEquals} className={`${buttonClasses} ${opButtonClasses}`}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
