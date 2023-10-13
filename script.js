const calculator_container = document.querySelector(".buttons");
const output = document.querySelector(".display-output");
const output_bottom = document.querySelector(".output-bottom");
const output_top = document.querySelector(".output-top");
output_bottom.innerText = "0";

const ROWS = 4;
const COLUMNS = 5;

const operators = ["+", "-", "/", "*", "%"];

let hasOperator = false;

const buttonLabels = [
  "o/f",
  operators[0],
  operators[1],
  "del",
  "AC",

  operators[2],
  "7",
  "6",
  "3",
  "0",

  operators[4],
  "8",
  "5",
  "2",
  ".",

  operators[3],
  "9",
  "4",
  "1",
  "=",
];

const clearButton = (buttonText) => {
  if (buttonText === "AC") {
    output_bottom.innerText = "0";
    output_top.innerText = "";
  }
};

const deleteButton = (buttonText) => {
  if (buttonText === "del") {
    const currentOutput = output_bottom.innerText;
    output_bottom.innerText = currentOutput.slice(0, -1);
    if (output_bottom.innerText === "") {
      output_bottom.innerText = "0";
    }
  }
};

const expression = (buttonText) => {
  let decimalAdded = false;
  if (operators.includes(buttonText)) {
    output_top.innerText += output_bottom.innerText + buttonText;
    output_bottom.innerText = ""; // Reset the bottom display
    decimalAdded = false;
  }
  if (!isNaN(buttonText)) {
    if (output_bottom.innerText === "0" && buttonText !== "0") {
      output_bottom.innerText = buttonText;
    } else {
      output_bottom.innerText += buttonText;
    }
  }

  console.log(`Button clicked: ${buttonText}`);

  if (buttonText === ".") {
    if (!decimalAdded) {
      output_bottom.innerText += ".";
      decimalAdded = true;
    }
  }
};

const evaluateExpression = (equation) => {
  const operands = equation.split(/[\+\-\*\%\/]/);
  const operator = equation.match(/[\+\-\*\%\/]/);

  if (!operator) {
    return "";
  }

  const operatorMatch = operator[0];

  const operand1 = parseFloat(operands[0]);
  const operand2 = parseFloat(operands[1]);

  switch (operatorMatch) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    case "%":
      return operand1 % operand2;
    default:
      return "";
  }
};

const operateExpression = (buttonText) => {
  if (buttonText === "=") {
    const equation = output_top.innerText + output_bottom.innerText;
    const result = evaluateExpression(equation);
    output_bottom.innerText = result;
    output_top.innerText = "";
  }
};

const handleButtonClick = (e) => {
  const buttonText = e.target.innerText;
  clearButton(buttonText);
  deleteButton(buttonText);
  expression(buttonText);
  operateExpression(buttonText);
  evaluateExpression(buttonText);
};

const targetButtonsStyle = (i, j, row, column, num, cell, buttonText) => {
  if (i === 1 && j === 1) {
    cell.classList.add("top-left");
  } else if (i === 1 && j === column) {
    cell.classList.add("top-right");
  } else if (i === row && j === 1) {
    cell.classList.add("bottom-left");
  } else if (i === row && j === column) {
    cell.classList.add("bottom-right");
  } else if (i === 1 && j === num) {
    cell.classList.add("bottom-left-top");
  }

  const button_text = document.createElement("span");
  button_text.classList.add("button-text");
  button_text.innerText = buttonText;
  cell.appendChild(button_text);

  return cell;
};

const displayButtons = () => {
  for (let i = 1; i <= ROWS; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 1; j <= COLUMNS; j++) {
      const cell = document.createElement("div");

      cell.classList.add("cell");
      row.appendChild(cell);
      calculator_container.appendChild(row);

      const buttonText = buttonLabels.shift();
      targetButtonsStyle(i, j, ROWS, COLUMNS, ROWS, cell, buttonText);

      cell.addEventListener("click", (e) => {
        handleButtonClick(e);
      });
    }
  }
};

displayButtons();
