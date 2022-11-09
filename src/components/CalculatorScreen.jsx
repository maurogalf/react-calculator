import React, { useEffect } from "react";
import { useAppContext } from "./calculatorState";

const CalculatorScreen = () => {
  const calculator = useAppContext();

  const presskey = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        calculator.addNumber(parseInt(e.key));
        break;
      case "Delete":
        calculator.executeAction("AC");
        break;
      case "-":
        calculator.currentValue === 0 || calculator.currentValue === "-"
          ? calculator.executeAction("+/-")
          : calculator.addOperation("-");
        break;
      case "+":
      case "*":
      case "/":
      case "%":
        calculator.addOperation(e.key);
        break;
      case "Enter":
      case "=":
        calculator.executeAction("=");
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", presskey);
  }, []);

  return (
    <div className="calculatorScreen">
      <div className="helpers">
        <span>Memory: {calculator.memory}</span>
        <span>Operation: {calculator.operation}</span>
      </div>
      <div className="calculatorCurrentValue">{calculator.currentValue}</div>
    </div>
  );
};

export default CalculatorScreen;
