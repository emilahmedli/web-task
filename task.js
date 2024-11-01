let input1 = ''; // first input
let input2 = ''; // second input
let operator = ''; // operation (+, -, *, /, %)
let result = document.getElementById('result');
let inputDisplay = document.getElementById('input');
let resetAfterCalculate = false; // "Input reset flag after computation"

function appendNumber(number) {
    if (resetAfterCalculate) {
        input1 = '';  // Clear previous result
        result.textContent = '0'; // Reset result
        resetAfterCalculate = false; // Reset flag
    }

    // If the operator has not been selected, add to input1
    if (!operator) {
        if (input1 === '-' && isNaN(number)) return;
        input1 += number;
    } else {
        if (input2 === '-' && isNaN(number)) return;
        input2 += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (input1 === '-') {
        input1 = '0';
    }
    
    if (input1 && !operator) {
        operator = op;
    } else if (input2 || operator === '%') {
        calculate();
        if (op !== '%') { // If not a percent operation, update operator
            operator = op;
        }
    }
    
    if (op === '%') {
        calculate(); // Calculate immediately for percent
    }
    
    resetAfterCalculate = false;
    updateDisplay();
}

function clearInput() {
    input1 = '';
    input2 = '';
    operator = '';
    result.textContent = '0';
    inputDisplay.classList.remove('input-small'); 
    result.classList.remove('result-large'); 
    resetAfterCalculate = false; 
    updateDisplay();
}

function calculate() {
    try {
        let calculatedResult;
        const num1 = parseFloat(input1);
        const num2 = parseFloat(input2);

        if (operator === '%') {
            
            calculatedResult = num1 * 0.01; 
        } else if (input2 === '') {
            return; 
        } else {
            switch (operator) {
                case '+':
                    calculatedResult = num1 + num2;
                    break;
                case '-':
                    calculatedResult = num1 - num2;
                    break;
                case '*':
                    calculatedResult = num1 * num2;
                    break;
                case '/':
                    calculatedResult = num2 !== 0 ? num1 / num2 : 'Error';
                    break;
                default:
                    calculatedResult = 'Error';
            }
        }

        calculatedResult = parseFloat(calculatedResult.toFixed(10));

        result.textContent = calculatedResult;

        inputDisplay.classList.add('input-small');
        result.classList.add('result-large');      

        input1 = calculatedResult.toString();
        input2 = '';
        operator = '';
        resetAfterCalculate = true;

        
        setTimeout(() => {
            inputDisplay.classList.remove('input-small');
            result.classList.remove('result-large');
        }, 1000);
    } catch (error) {
        result.textContent = 'Error';
    }
}

function deleteLast() {
    if (resetAfterCalculate) {
        input1 = '';
        result.textContent = '0';
        resetAfterCalculate = false;
    } else if (input2) {
        input2 = input2.slice(0, -1);
    } else if (operator) {
        operator = '';
    } else {
        input1 = input1.slice(0, -1);
    }
    updateDisplay();
}

function appendDot() {
    if (!operator) {
        if (input1 === '') {
            input1 = '0.'; // Set to '0.' if input1 is empty
        } else if (!input1.includes('.')) {
            input1 += '.';
        }
    } else {
        if (input2 === '') {
            input2 = '0.'; // Set to '0.' if input2 is empty
        } else if (!input2.includes('.')) {
            input2 += '.';
        }
    }
    updateDisplay();
}

function toggleSign() {
    if (!operator) {
        input1 = input1 ? (input1.startsWith('-') ? input1.slice(1) : '-' + input1) : '-';
    } else {
        input2 = input2 ? (input2.startsWith('-') ? input2.slice(1) : '-' + input2) : '-';
    }
    updateDisplay();
}

function updateDisplay() {
    let displayInput2 = input2;
    if (input2.startsWith('-')) {
        displayInput2 = `(${input2})`;
    }
    
    inputDisplay.textContent = input1 + (operator ? ' ' + operator + ' ' : '') + displayInput2;
}
