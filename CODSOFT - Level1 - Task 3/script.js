"use strict";

///////////////Elements------------------------------------------------------
const display = document.getElementById("display");
let input = "";
let operator = "";
let previousInput = "";
let operationString = "";

///////////////Updating Display------------------------------------------------------
const updateDisplay = function (value) {
  display.textContent = value;
  display.scrollLeft = display.scrollWidth;
};

///////////////clearing Calculator------------------------------------------------------
const clearCalculator = () => {
  input = "";
  previousInput = "";
  operator = "";
  operationString = "";
  updateDisplay("0");
};

///////////////giving Numbers------------------------------------------------------
const appendNumber = function (number) {
  if (input.includes(".") && number === ".") return;
  input += number;
  operationString += number;
  updateDisplay(operationString);
};

///////////////Operations------------------------------------------------------
const chooseOperator = function (op) {
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

///////////////Calculations------------------------------------------------------
const calculate = function () {
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

///////////////Handlers------------------------------------------------------
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
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
