const displayElement = document.getElementById("display"); // Get the display element by its ID
const digitButtons = document.querySelectorAll(".digit"); // Get all digit buttons
const operatorButtons = document.querySelectorAll(".operator"); // Get all operator buttons
const decimalButton = document.querySelector(".decimal"); // Get the decimal button
const clearButton = document.getElementById("clear"); // Get the clear button
const backspaceButton = document.getElementById("backspace"); // Get the backspace button
const equalsButton = document.getElementById("equals"); // Get the equals button

let displayValue = "0"; // Initialize the display value
let firstNumber = ""; // Store the first number for calculation
let operator = ""; // Store the selected operator
let secondNumber = ""; // Store the second number for calculation

function updateDisplay() {
  displayElement.textContent = displayValue; // Update the display with the current display value
}

function appendNumber(number) {
  if (displayValue === "0" || operator) {
    displayValue = ""; // Clear the display if it's zero or an operator has been selected
  }
  displayValue += number; // Append the number to the display value
  updateDisplay();
}

function clear() {
  firstNumber = ""; // Clear the first number
  operator = ""; // Clear the operator
  secondNumber = ""; // Clear the second number
  displayValue = "0"; // Reset the display value to zero
  updateDisplay();
}

function setOperator(op) {
  if (firstNumber && operator && displayValue) {
    calculate(); // If there is a first number, operator, and display value, perform the calculation
  }
  operator = op; // Set the selected operator
  firstNumber = displayValue; // Store the current display value as the first number
  displayValue = ""; // Clear the display value
}

function calculate() {
  if (!operator || !firstNumber || !displayValue) return; // If any of the required values is missing, return without calculation
  secondNumber = displayValue; // Set the second number as the current display value
  let result;

  switch (operator) {
    case "+":
      result = parseFloat(firstNumber) + parseFloat(secondNumber); // Perform addition
      break;
    case "-":
      result = parseFloat(firstNumber) - parseFloat(secondNumber); // Perform subtraction
      break;
    case "x":
      result = parseFloat(firstNumber) * parseFloat(secondNumber); // Perform multiplication
      break;
    case "/":
      if (parseFloat(secondNumber) === 0) {
        displayValue = "Error: Division by 0";
        updateDisplay();
        return;
      }
      result = parseFloat(firstNumber) / parseFloat(secondNumber); // Perform division
      break;
  }

  displayValue = Math.round(result * 100) / 100; // Round the result to 2 decimal places
  firstNumber = displayValue; // Update the first number with the result
  operator = ""; // Reset the operator
  secondNumber = ""; // Reset the second number
  updateDisplay();
}

function handleDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += "."; // Add decimal point only if it doesn't already exist in the display value
    updateDisplay();
  }
}

function handleBackspace() {
  displayValue = displayValue.slice(0, -1); // Remove the last character from the display value
  updateDisplay();
}

function handleKeyPress(event) {
  const key = event.key; // Get the pressed key from the event
  if (key >= "0" && key <= "9") {
    appendNumber(key); // Append the number if it's a digit key
  } else if (key === ".") {
    handleDecimal(); // Handle decimal point key
  } else if (key === "+") {
    setOperator("+"); // Set the operator to addition
  } else if (key === "-") {
    setOperator("-"); // Set the operator to subtraction
  } else if (key === "x") {
    setOperator("*"); // Set the operator to multiplication
  } else if (key === "/") {
    setOperator("/"); // Set the operator to division
  } else if (key === "=" || key === "Enter") {
    calculate(); // Perform the calculation if it's the equals key
  } else if (key === "Backspace") {
    handleBackspace(); // Handle backspace key
  }
}

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent); // Append the clicked digit to the display value
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperator(button.textContent); // Set the clicked operator
  });
});

decimalButton.addEventListener("click", handleDecimal); // Handle decimal button click

clearButton.addEventListener("click", clear); // Handle clear button click

backspaceButton.addEventListener("click", handleBackspace); // Handle backspace button click

equalsButton.addEventListener("click", () => {
  calculate();
  firstNumber = displayValue; // Update firstNumber with the final result
  displayValue = firstNumber; // Update the display with the final result
});

window.addEventListener("keydown", handleKeyPress); // Handle keyboard key press events
