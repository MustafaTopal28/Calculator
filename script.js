const displayElement = document.getElementById("display");
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

// Sélectionner tous les boutons de classe "digit" et ajouter des écouteurs d'événements
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.textContent;
    appendNumber(digit);
  });
});

// Sélectionner tous les boutons de classe "operator" et ajouter des écouteurs d'événements
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const op = button.textContent;
    setOperator(op);
  });
});

// Sélectionner le bouton "Clear" et ajouter un écouteur d'événement
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

// Sélectionner le bouton "=" et ajouter un écouteur d'événement
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", calculate);
