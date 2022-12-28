const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "=": equal,
}
const availableButtons = ["1","2"]

const calculator = {
    "display": "0",
    "currentOperator": "+",
    "storeType": "normal",
    "prev": "0",
    "currentlyWorkOnNumber": true
}

function add(x, y) {
    console.log(x, y)
    return (parseFloat(x) + parseFloat(y));
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}
function equal(x,y){
    return y
}
function operate(operator, x, y) {
    console.log(`opearting with ${x} ${operator} ${y}`)
    let output = operations[operator](parseFloat(x), parseFloat(y));
    console.log("OP", output)
    output = output.toFixed(12)
    return output
}

const display = document.getElementById("display")
const buttons = document.querySelectorAll("button.bn5");
const sign = document.getElementById("sign");
[...buttons].forEach(btn => {

    btn.addEventListener("click", e => {
        console.log("Pressing ", e.target.textContent)
        if (parseFloat(btn.textContent) || btn.textContent === "0" || btn.textContent === ".") {
            pressNumber(btn.textContent)
        }
        else if (btn.textContent === "CLR") {
            clearDisplay();
        } else {
            signPressed(btn.textContent);
        }
    })

});

function pressNumber(x) {
    if (calculator.currentlyWorkOnNumber) {
        if (x!="." || !calculator.display.includes("."))
        calculator.display += x;
    }
    else {
        calculator.prev = calculator.display
        calculator.display = x
        if (x==".") calculator.display = "0."
    }
    calculator.currentlyWorkOnNumber = true
    updateDisplay();
}

function clearDisplay() {
    calculator.display = "0";
    calculator.prev = "0";
    calculator.currentOperator = "+";
    calculator.currentlyWorkOnNumber = true;
    updateDisplay()
}

function signPressed(sign) {
    if (calculator.currentlyWorkOnNumber) {
        calculator.display = operate(calculator.currentOperator, calculator.prev, calculator.display);
        calculator.prev = "0";
    }
    calculator.currentOperator = sign;
    calculator.currentlyWorkOnNumber = false;
    updateDisplay()
}

function updateDisplay() {
    display.value = parseFloat(calculator.display);
    console.log(calculator)
    sign.textContent = "";
    if (!calculator.currentlyWorkOnNumber) {
        sign.textContent = calculator.currentOperator
    }
}

document.addEventListener("keypress",e=>{
    console.log(e.key)
    let btn = document.querySelector(`.bn5[data-val="${e.key}"]`);
    if(btn){
        e.preventDefault();
        btn.click()
    }
})

