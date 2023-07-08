const displayElement = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const equalsButton = document.getElementById("equals");
let displayValue = "0";
let firstNumber = "";
let operator = "";
let secondNumber = "";

function updateDisplay() {
  displayElement.textContent = displayValue;
}

function appendNumber(number) {
  if (displayValue === "0" || operator) {
    displayValue = "";
  }
  displayValue += number;
  updateDisplay();
}

function clear() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  displayValue = "0";
  updateDisplay();
}

function setOperator(op) {
  if (firstNumber && operator && displayValue) {
    calculate();
  }
  operator = op;
  firstNumber = displayValue;
  displayValue = "";
}

function calculate() {
  if (!operator || !firstNumber || !displayValue) return;
  secondNumber = displayValue;
  let result;

  switch (operator) {
    case "+":
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
      break;
    case "-":
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
      break;
    case "x":
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
      break;
    case "/":
      if (parseFloat(secondNumber) === 0) {
        displayValue = "Error: Division by 0";
        updateDisplay();
        return;
      }
      result = parseFloat(firstNumber) / parseFloat(secondNumber);
      break;
  }

  displayValue = Math.round(result * 100) / 100;
  firstNumber = displayValue;
  operator = "";
  secondNumber = "";
  updateDisplay();
}

function handleDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
    updateDisplay();
  }
}

function handleBackspace() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function handleKeyPress(event) {
  const key = event.key;
  if (key >= "0" && key <= "9") {
    appendNumber(key);
  } else if (key === ".") {
    handleDecimal();
  } else if (key === "+") {
    setOperator("+");
  } else if (key === "-") {
    setOperator("-");
  } else if (key === "x") {
    setOperator("*");
  } else if (key === "/") {
    setOperator("/");
  } else if (key === "=" || key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    handleBackspace();
  }
}

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperator(button.textContent);
  });
});

decimalButton.addEventListener("click", handleDecimal);

clearButton.addEventListener("click", clear);

backspaceButton.addEventListener("click", handleBackspace);

equalsButton.addEventListener("click", () => {
  calculate();
  firstNumber = displayValue; // Mettre à jour firstNumber avec le résultat final
  displayValue = firstNumber; // Mise à jour du display avec le résultat final
});

window.addEventListener("keydown", handleKeyPress);
