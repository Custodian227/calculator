class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
    }

    currentOperand = '';
    previousOperand = '';
    operation = undefined;

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;previousOperandTextElement.textContent = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand + number;
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    operate(){
        let computation;
        const previousValue = parseFloat(this.previousOperand);
        const currentValue = parseFloat(this.currentOperand);

        if(isNaN(previousValue) || isNaN(currentValue)) return;

        switch(this.operation){
            case '+':
                computation = previousValue + currentValue;
                break;
            case '-':
                computation = previousValue - currentValue;
                break;
            case '*':
                computation = previousValue * currentValue;
                break;
            case '/':
                computation = previousValue / currentValue;
                break;
            case 'mod':
                computation = previousValue % currentValue;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandTextElement.textContent = this.currentOperand;
        if(this.operation != null){
            this.previousOperandTextElement.textContent = 
            `${this.previousOperand} ${this.operation}`;
        }

    }
}

const numberButtons = document.querySelectorAll('.button-number');
const operatorButtons= document.querySelectorAll('.button-operator');
const buttonClearAll = document.querySelector('#button-clear-all')
const buttonEquals = document.querySelector('#button-equals');
const buttonDelete = document.querySelector('#button-delete');
const previousOperandTextElement = document.querySelector('#data-previous-operand');
const currentOperandTextElement = document.querySelector('#data-current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', function(){
        calculator.appendNumber(numberButton.textContent)
        calculator.updateDisplay();
    });
})

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', function(){
        calculator.chooseOperation(operatorButton.textContent)
        calculator.updateDisplay();
    });
});

buttonEquals.addEventListener('click', function(){
    calculator.operate();
    calculator.updateDisplay();
 });
 
buttonClearAll.addEventListener('click', function(){
    calculator.clear();
    calculator.updateDisplay();
});

buttonDelete.addEventListener('click', function(){
    calculator.delete();
    calculator.updateDisplay();
})






