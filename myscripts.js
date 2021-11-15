const buttons = document.querySelectorAll('button');
const displayValue = document.querySelector('p')
const operators = ['+', '-', '*', '/'];

let num1 = '';
let operator1 = '';
let num2 = '';

//keyboard support
document.addEventListener('keydown', function(event) {
    let clicked = event.key;
    if ((clicked >= 0 && clicked <= 9) || operators.includes(clicked) || clicked == '.'){
        document.getElementById(`${event.key}`).click();
    } else {
        switch (clicked) {
            case 'Enter':
                document.getElementById(`=`).click();
                break;
            case 'Backspace':
                document.getElementById(`backspace`).click();
                break;
            case 'Escape':
                document.getElementById(`clear`).click();
                break;
            default:
                break;
        }
    }
  });


//calculator and buttons functionality
buttons.forEach(button => {
    button.addEventListener('click', () => {

        // modifying num1
        if ((button.id >= 0 && button.id <= 9 || button.id == '.' || button.id == 'backspace') && (operator1 == '' || operator1 == '=')) {
            if (operator1 == '=' && button.id != 'backspace') {
                num1 = `${button.id}`;
                operator1 = '';
                displayValue.textContent = `num1 ${num1}`;
            } else {
                if (button.id == 'backspace' && num1.length > 0) {
                    let newText = num1.slice(0, -1);
                    num1 = newText;
                    displayValue.textContent = `num1 ${num1}`;
                } else {
                    if (num1.includes('.')) {
                        if (button.id >= 0 && button.id <= 9) {
                            num1 += `${button.id}`;
                            displayValue.textContent = `num1 ${num1}`;
                        }
                    } else if (button.id >= 0 && button.id <= 9 || button.id == '.') {
                        num1 += `${button.id}`;
                        displayValue.textContent = `num1 ${num1}`;
                    }
                }
            }
        }
        
        // adding operator
        if (operators.includes(button.id) && num2 == '') {
            operator1 = `${button.id}`;
            displayValue.textContent = `operator ${operator1}`;
        }

        //modifying num2
        if ((button.id >= 0 && button.id <= 9 || button.id == '.' || button.id == 'backspace') && (operator1 != '' && operator1 != '=')){
            if (button.id == 'backspace' && num2.length > 0) {
                let newText = num2.slice(0, -1);
                num2 = newText;
                displayValue.textContent = `num2 ${num2}`;
            } else if (num2.includes('.')) {
                if (button.id >= 0 && button.id <= 9) {
                    num2 += `${button.id}`;
                    displayValue.textContent = `num2 ${num2}`;
                }
                } else if (button.id >= 0 && button.id <= 9 || button.id == '.'){
                    num2 += `${button.id}`;
                    displayValue.textContent = `num2 ${num2}`;
                }
        }

        // getting result
        if (operators.includes(button.id) && num2 != '' || button.id == '=' && num2 != '') {
            if (num2 == '0' && operator1 == '/') {
                displayValue.textContent = 'You Fool!'
                num1 = '';
                operator1 = '';
                num2 = '';
            } else {
                num1 = operate(operator1, num1, num2);
                if (Number.isInteger(num1)) {
                    num1 = String(num1);
                } else {
                    num1 = num1.toPrecision(3);
                    num1 = String(num1);
                }
                operator1 = `${button.id}`;
                num2 = '';
                displayValue.textContent = num1;
            }
        }

        if (button.id == 'clear') {
            num1 = '';
            operator1 = '';
            num2 = '';
            displayValue.textContent = ' ';
        }

    })
});

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}


function operate (operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            break;
    }
}

