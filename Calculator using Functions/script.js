// console.log("JS Loaded");

const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");




let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;


numberButtons.forEach(button => {
  button.addEventListener("click", () => {

    if (display.textContent === "0" || shouldResetDisplay) {
      display.textContent = "";
      shouldResetDisplay = false;
    }

    display.textContent += button.textContent;

    if(operator===""){
      firstNumber+=button.textContent;
    }else{
      secondNumber+=button.textContent;
    }
  });
});

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  switch (op) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
  }
}

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {

    // console.log("Operator clicked:", button.textContent);
    if (operator !== "" && shouldResetDisplay) {
      operator = button.textContent;
      return;
    }

    if (firstNumber !== "" && secondNumber !== "") {
      const result = operate(operator, firstNumber, secondNumber);

      if (typeof result === "string") {
        display.textContent = result;
        shouldResetDisplay = true;
        return;
      }

      display.textContent = roundResult(result);

      firstNumber = result;
      secondNumber = "";
    }

    operator = button.textContent;
    display.textContent += button.textContent;
    shouldResetDisplay = false;
    secondNumber = "";
    // shouldResetDisplay = true;
  });
});


equalsButton.addEventListener("click", () => {
  if (firstNumber === "" || operator === "" || secondNumber === "") return;

  const result = operate(operator, firstNumber, secondNumber);

  if (typeof result === "string") {
    display.textContent = result;
    shouldResetDisplay = true;
    return;
  }

  display.textContent = roundResult(result);

  firstNumber = result;
  secondNumber = "";
  operator = "";
  shouldResetDisplay = true;
});

clearButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
});

function roundResult(num){
  return Math.round(num*1000)/1000;
}

function divide(a,b){
  if(b===0) return "Nice try. Can't divide by 0"
  return a/b;
}

// const result=operate(operate, firstNumber, secondNumber);

// if(typeof result=== "string"){
//   display.textContent=result;
//   shouldResetDisplay=true;
//   return;
// }
