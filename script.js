const operations = {
  add: (num1, num2) => num1 + num2,
  subtract: (num1, num2) => num1 - num2,
  multiply: (num1, num2) => num1 * num2,
  divide: (num1, num2) => num1 / num2,
};

let num1 = "";
let num2 = "";
let operator = "";

// Selecting digit buttons
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.innerText;

    if (!operator) {
      num1 += digit;
    } else {
      num2 += digit;
    }

    console.log("Num1:", num1);
    console.log("Num2:", num2);
  });
});

// Selecting operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.innerText;
    console.log("Operator: ", operator);
  });
});

// Selecting the result button
const resultButton = document.querySelector("#result");
resultButton.addEventListener("click", () => {
  let result;

  if (operator === "+") {
    result = operations.add(parseInt(num1), parseInt(num2));
  } else if (operator === "-") {
    result = operations.subtract(parseInt(num1), parseInt(num2));
  } else if (operator === "x") {
    result = operations.multiply(parseInt(num1), parseInt(num2));
  } else if (operator === "/") {
    result = operations.divide(parseInt(num1), parseInt(num2));
  }

  console.log("Result: ", result);
});

// Selecting the clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  console.log("Cleared values");
});
