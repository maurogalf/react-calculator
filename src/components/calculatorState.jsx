import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
  memory: null,
  operation: null,
  currentValue: 0,

  addNumber: (value) => {},
  addOperation: (operation) => {},
  getResult: () => {},
  executeAction: (action) => {},
});

const CalculatorState = ({ children }) => {
  const [memory, setMemory] = useState(0);
  const [operation, setOperation] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [isReset, setIsReset] = useState(true);

  const handleAddNumber = (value) => {
    if (isReset) {
      if (value !== 0) {
        setCurrentValue(value.toString());
        setIsReset(false);
        console.log(isReset);
      }
    } else {
      const newValue = currentValue.toString() + value.toString();
      setCurrentValue(newValue);
    }
  };
  const handleAddOperation = (op) => {
    if (currentValue) {
      if (operation) {
        handleGetResult();
        setOperation(op);
      } else {
        setOperation(op);
        setMemory(currentValue.toString());
        setCurrentValue(0);
        setIsReset(true);
      }
    }
  };

  const clean = () => {
    setCurrentValue(0);
    setOperation(null);
    setMemory(0);
    setIsReset(true);
  };

  const delelteNumber = () => {
    setCurrentValue(
      currentValue.length === 1
        ? "0"
        : currentValue
            .toString()
            .substring(0, currentValue.toString().length - 1)
    );
  };

  const changeSign = () => {
    if (currentValue[0] === "-") {
      setCurrentValue(currentValue === "-" ? 0 : currentValue.slice(1));
      setIsReset(true);
    } else {
      setCurrentValue(currentValue === 0 ? "-" : "-" + currentValue);
      setIsReset(false);
    }
  };

  const convertToFloat = () => {
    if (currentValue.toString().indexOf(".") > 0) {
    } else {
      currentValue === 0 ? handleAddNumber("0.") : handleAddNumber(".");
    }
  };

  const handleExecuteAction = (action) => {
    switch (action) {
      case "=":
        handleGetResult();
        break;
      case "AC":
        clean();
        break;
      case "⇐":
        delelteNumber();
        break;
      case "+/-":
        changeSign();
        break;
      case ".":
        convertToFloat();
        break;

      default:
    }
  };
  const handleGetResult = () => {
    let result = 0;
    if (currentValue && operation && memory) {
      switch (operation) {
        case "+":
          result = Number(currentValue) + Number(memory);
          break;
        case "-":
          result = parseFloat(memory) - parseFloat(currentValue);
          break;
        case "X":
        case "*":
          result = parseFloat(memory) * parseFloat(currentValue);
          break;
        case "/":
          result = parseFloat(memory) / parseFloat(currentValue);
          break;
        case "%":
          result = (parseFloat(memory) / 100) * parseFloat(currentValue);
          break;
        default:
      }
      setCurrentValue(result);
      setOperation(null);
      setMemory(result.toString());
      setIsReset(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        memory,
        operation,
        currentValue,
        addNumber: handleAddNumber,
        addOperation: handleAddOperation,
        executeAction: handleExecuteAction,
        getResult: handleGetResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default CalculatorState;

export const useAppContext = () => {
  return useContext(AppContext);
};
