"use strict";

const display = document.getElementById("display");
let input = "";
let operator = "";
let previousInput = "";
let operationString = "";

const updateDisplay = (value) => {
  display.textContent = value;
  display.scrollLeft = display.scrollWidth;
};

const clearCalculator = () => {
  input = "";
  previousInput = "";
  operator = "";
  operationString = "";
  updateDisplay("0");
};

const appendNumber = (number) => {
  if (input.includes(".") && number === ".") return;
  input += number;
  operationString += number;
  updateDisplay(operationString);
};

const chooseOperator = (op) => {
  if (input === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operator = op;
  previousInput = input;
  input = "";
  operationString += ` ${operator} `;
  updateDisplay(operationString);
};

const calculate = () => {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(input);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  input = +result.toFixed(10);
  operator = "";
  previousInput = "";
  operationString = input;
  updateDisplay(input);
};

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    if (!isNaN(key) || key === ".") {
      appendNumber(key);
    } else if (key === "C") {
      clearCalculator();
    } else if (key === "=") {
      calculate();
    } else {
      chooseOperator(key);
    }
  });
});

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (key === "Escape") {
    clearCalculator();
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    operationString += ` ${input}`;
    updateDisplay(operationString);
    calculate();
  } else if (["+", "-", "*", "/"].includes(key)) {
    chooseOperator(key);
  }
});
