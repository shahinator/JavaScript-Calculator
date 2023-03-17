//Previous input on the display
const previousOperand = document.querySelector(".previous-operand");

//Current input on the display
const currentOperand = document.querySelector(".current-operand");
let operation = "";

const numberButtons = document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    })
});

const operationButtons = document.querySelectorAll(".operation").forEach((button) => {
    button.addEventListener('click', () => operationButtonPressed(button.innerText))
});

const percentageButton = document.querySelector(".percentage").addEventListener('click', percentage);

const equalButton = document.querySelector(".equal").addEventListener('click', equalButtonPressed);

const deleteButton = document.querySelector(".delete").addEventListener('click', backspace);

const allClearButton = document.querySelector(".all-clear").addEventListener('click', allClear);

const positiveNegativeButton = document.querySelector(".pos-neg").addEventListener('click', () => {
    if (currentOperand.innerText.includes("-")) currentOperand.innerText = currentOperand.innerText.slice(1);
    else currentOperand.innerText = "-" + currentOperand.innerText;
});

// Function that calculates the operations
function operate (operation) {
    const previousnumber = parseFloat(previousOperand.innerText.slice(0, -2));
    const currentNumber = parseFloat(currentOperand.innerText);
    
    switch (operation) {
        case "+":
            return previousnumber + currentNumber;
        case "-":
            return previousnumber - currentNumber;
        case "*":
            return previousnumber * currentNumber;
        case "/":
            return previousnumber / currentNumber;
        default:
            return;
    }
}

// Function that divide the number by 100
function percentage () {
    if (currentOperand.innerText === "") return;
    currentOperand.innerText = parseFloat(currentOperand.innerText) / 100;
}

// Function that clears the display
function allClear () {
    operation = "";
    previousOperand.innerText = "";
    currentOperand.innerText = "";
}

/*
Function that firts check if the current operand already has a decimal point
and check if the current operand is zero.
- If the input number is a decimal point and the operand already has one, do nothing.
- If the input number is zero and the operand is already zero, do nothing.
- If the operand is currently zero and the input number is not a decimal point,
  replace the operand with the input number.
- If the operand is currently empty and the input number is a decimal point,
  set the operand to "0."
- Otherwise, append the input number to the operand.
*/
function appendNumber(InputedNumber) {
    const hasDecimal = currentOperand.innerText.includes(".");
    const isZero = currentOperand.innerText === "0";
    
    if (InputedNumber === "." && hasDecimal) {
      return;
    }
    
    if (InputedNumber === "0" && isZero) {
      return;
    }
    
    if (isZero && InputedNumber !== ".") {
      currentOperand.innerText = InputedNumber;
      return;
    }
    
    if (currentOperand.innerText === "" && InputedNumber === ".") {
      currentOperand.innerText = "0.";
      return;
    }
    
    currentOperand.innerText += InputedNumber;
  }
  

// Function that raises an alert for divisions by 0
function divisionByZero () {
    alert ("Division by 0 isn't possible, please change the divisor!");
}

/*
Function that handles the "equal" button press event.
- If either operand is empty, return without doing anything.
- If the operation is division and the current operand is 0, call the divisionByZero() function.
- Evaluate the operation and store the result in a separate variable.
- Update the current operand with the result.
- Clear the previous operand and operation.
*/
function equalButtonPressed() {
    if (!currentOperand.innerText || !previousOperand.innerText) {
      return;
    }
  
    if (operation === "/" && currentOperand.innerText === "0") {
      return divisionByZero();
    }
  
    const result = operate(operation);
    currentOperand.innerText = result;
    previousOperand.innerText = "";
    operation = "";
  }


 /*  
 Function that handles the press event of the operation buttons (+, -, *, /).
 - If both operands are empty, return without doing anything.
 - If an operation button has already been pressed, handle it.
 - If the current operand is empty, update the operation and previous operand.
 - If dividing by zero, call the function divisionByZero().
 - Evaluate the previous operation, update the previous operand, and clear the current operand
 - If no operation has been pressed yet, update the operation and previous operand, and clear the current operand.
 */
function operationButtonPressed (keyPressed) {
    if (currentOperand.innerText === "" && previousOperand.innerText === "") return;
    if (operation !== "") {
        if (currentOperand.innerText === "") {
            operation = keyPressed;
            previousOperand.innerText = previousOperand.innerText.slice(0, -2) + " " + operation;
            return;
        }
        if (currentOperand.innerText === "0" && operation === "/") return divisionByZero();
        previousOperand.innerText = operate(operation) + " " + keyPressed;
        operation = keyPressed;
        currentOperand.innerText = "";
    } else {
        operation = keyPressed;
        previousOperand.innerText = currentOperand.innerText + " " + operation;
        currentOperand.innerText = "";
    }
}


// Function that clear the last input
function backspace() {
    currentOperand.innerText = currentOperand.innerText.slice(0,-1);
}

//keyboard
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "Escape":
            allClear();
            break;
        case "Digit5":
            if(event.shiftKey) {
                percentage();
                break;
            }
            break;
        case "Digit8":
            if(event.shiftKey) {
                operationButtonPressed("*");                                
            }
            break;
        case "NumpadDecimal":
            appendNumber(".");
            break;
        case "Period":
            appendNumber(".");
            break;
        case "NumpadDivide":
            operationButtonPressed("/");
            break;
        case "IntlRo":
            operationButtonPressed("/");
            break;
        case "Slash":
            operationButtonPressed("/");
            break;
        case "NumpadMultiply":
            operationButtonPressed("*");
            break;
        case "NumpadSubtract":
            operationButtonPressed("-");
            break;
        case "Minus":
            operationButtonPressed("-");
            break;
        case "NumpadAdd":
            operationButtonPressed("+");
            break;
        case "Backspace":
            backspace();
            break;
        case "Delete":
            allClear();
        case "NumpadEnter":
            event.preventDefault();
            equalButtonPressed();
            break;
        case "Enter":
            event.preventDefault();
            equalButtonPressed();
            break;
        case "Equal":
            if (event.shiftKey) {
                operationButtonPressed("+");                
            }
            equalButtonPressed();
            break;
        default:
            break;  
    }

    if(!isNaN(event.key)) {
        appendNumber(event.key);
    }   
});