const display = document.getElementById("display");
let current = "0";
let prev = "";
let operator = "";

function updateDisplay() {
  display.textContent = current;
}

function clear() {
  current = "0";
  prev = "";
  operator = "";
  updateDisplay();
}

function appendNumber(num) {
  if (current === "0" && num !== ".") {
    current = num;
  } else if (num === "." && current.includes(".")) {
    return;
  } else {
    current += num;
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (current === "") return;
  if (prev !== "") calculate();
  operator = op;
  prev = current;
  current = "";
}

function calculate() {
  let computation;
  const a = parseFloat(prev);
  const b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) return;

  switch (operator) {
    case "+":
      computation = a + b;
      break;
    case "-":
      computation = a - b;
      break;
    case "*":
      computation = a * b;
      break;
    case "/":
      computation = b !== 0 ? a / b : "Error";
      break;
    default:
      return;
  }

  current = computation.toString();
  operator = "";
  prev = "";
  updateDisplay();
}

document.querySelectorAll(".number").forEach(btn =>
  btn.addEventListener("click", () => appendNumber(btn.textContent))
);

document.getElementById("clear").addEventListener("click", clear);
document.getElementById("equals").addEventListener("click", calculate);

document.getElementById("add").addEventListener("click", () => chooseOperator("+"));
document.getElementById("subtract").addEventListener("click", () => chooseOperator("-"));
document.getElementById("multiply").addEventListener("click", () => chooseOperator("*"));
document.getElementById("divide").addEventListener("click", () => chooseOperator("/"));

document.getElementById("decimal").addEventListener("click", () => appendNumber("."));
