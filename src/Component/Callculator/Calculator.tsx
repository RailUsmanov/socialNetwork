import React, { useState } from "react";
import s from "./Calculator.module.css";
const Calculator = () => {
    const [result, setResult] = useState(0);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [operation, setOperation] = useState('+');

    const handleFirstNumberChange = (event: { target: { value: string; }; }) => {
        setFirstNumber(parseFloat(event.target.value));
    };

    const handleSecondNumberChange = (event: { target: { value: string; }; }) => {
        setSecondNumber(parseFloat(event.target.value));
    };

    const handleOperationChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setOperation(event.target.value);
    };

    const calculateResult = () => {
        switch (operation) {
            case '+':
                setResult(firstNumber + secondNumber);
                break;
            case '-':
                setResult(firstNumber - secondNumber);
                break;
            case '*':
                setResult(firstNumber * secondNumber);
                break;
            case '/':
                setResult(firstNumber / secondNumber);
                break;
            default:
                setResult(0);
        }
    };

    return (
        <div className={s.calculatorContainer}>
            <div className={s.calculatorBox}>
                <h1 className={s.calculatorTitle}>Калькулятор</h1>
                <div className={s.calculatorInputs}>
                    <input
                        className={s.calculatorNumber}
                        type="number"
                        value={firstNumber}
                        onChange={handleFirstNumberChange}
                    />
                    <select className={s.calculatorOperation} value={operation} onChange={handleOperationChange}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                    </select>
                    <input
                        className={s.calculatorNumber}
                        type="number"
                        value={secondNumber}
                        onChange={handleSecondNumberChange}
                    />
                    <button className={s.calculatorButton} onClick={calculateResult}>
                        =
                    </button>
                </div>
                <p className={s.calculatorResult}>Результат: {result}</p>
            </div>
        </div>
    );
};

export default Calculator;
