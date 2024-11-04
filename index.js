let currentinput = ""; 
let previousinput = ""; 
let operator = ""; 
let resultdisplayed = false;
let lastAnswer = 0;
let isDegree = false; // Toggle for radians and degrees

function pressnumber(num) {
    const display = document.getElementById("display");
    if (resultdisplayed) {
        currentinput = "";
        resultdisplayed = false;
    }
    currentinput += num;
    display.innerText = currentinput;
}

function clearD() {
    const display = document.getElementById("display");
    currentinput = "";
    previousinput = "";
    operator = "";
    display.innerText = "";
}

function calculate() {
    const display = document.getElementById("display");
    let result;

    if (operator === "x!") {  // Factorial special case
        result = factorial(parseInt(currentinput));
        currentinput = result.toString();
        display.innerText = currentinput;
        previousinput = "";
        operator = "";
        resultdisplayed = true;
        lastAnswer = result;
        return;
    }
    if (operator === "Exp") {  // Special case for Exponential
        result = Math.exp(parseFloat(currentinput));
        currentinput = result.toString();
        display.innerText = currentinput;
        previousinput = "";
        operator = "";
        resultdisplayed = true;
        lastAnswer = result;
        return;
    }
    
    
    if (currentinput !== "" && previousinput !== "" && operator !== "") {
        const prev = parseFloat(previousinput);
        const current = parseFloat(currentinput);

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
            case "ln":
                result = Math.log(current);
                break;
            case "sin":
                result = isDegree ? Math.sin(current * Math.PI / 180) : Math.sin(current);
                break;
            case "cos":
                result = isDegree ? Math.cos(current * Math.PI / 180) : Math.cos(current);
                break;
            case "tan":
                result = isDegree ? Math.tan(current * Math.PI / 180) : Math.tan(current);
                break;
            case "Exp":
                result = Math.exp(current);
                break;
            case "xy":
                result = Math.pow(prev, current);
                break;
            default:
                return;
        }

        currentinput = result.toString();
        display.innerText = currentinput;
        previousinput = "";
        operator = "";
        resultdisplayed = true;
        lastAnswer = result;
    }
}

function setoperator(op) {
    const display = document.getElementById("display");
    
    if (op === "x!" || op === "Exp") { // Direct calculate for factorial and exponential
        operator = op;
        calculate();
        return;
    }
    
    if (currentinput === "") return;
    if (previousinput !== "") {
        calculate();
    }

    operator = op;
    previousinput = currentinput;
    currentinput = "";
    display.innerText = previousinput + " " + operator;
}

function useANS() {
    currentinput = lastAnswer.toString();
    document.getElementById("display").innerText = currentinput;
}

function toggleRadDeg() {
    isDegree = !isDegree;
    document.getElementById("radDeg").innerText = isDegree ? "Deg" : "Rad";
}

function pressParenthesis(paren) {
    currentinput += paren;
    document.getElementById("display").innerText = currentinput;
}

function factorial(n) {
    if (n < 0) return "Invalid"; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1; // Base case
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

