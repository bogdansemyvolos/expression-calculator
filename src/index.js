function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.split(' ').join('');
    if (expr.includes('(') || expr.includes(')')) {
        if (expr.split('(').length - 1 !== expr.split(')').length - 1) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
        let firsBracketIndex = expr.toString().indexOf('(');
        let lastBracketIndex = -1;
        let openingBrackets = -1;
        let exprArray = expr.split('');
        for (let i = 0; i < exprArray.length; i++) {
            if (exprArray[i] == '(') {
                openingBrackets += 1;
            }
            if (exprArray[i] == ')') {
                if (openingBrackets === 0) {
                    lastBracketIndex = i;
                    break;
                } else {
                    openingBrackets -= 1;
                }
            }
        }
        if (firsBracketIndex > lastBracketIndex) {
            throw new Error('ExpressionError: Brackets must be paired');
        } else {
            exprArray.splice(firsBracketIndex, lastBracketIndex - firsBracketIndex + 1, expressionCalculator(exprArray.slice(firsBracketIndex + 1, lastBracketIndex).join('')));
        }
        return expressionCalculator(exprArray.join(''));
    } else {
        return parseFloat(calculateExprWithoutBrackets(expr));
    }
}

module.exports = {
    expressionCalculator
}

function calculateExprWithoutBrackets(expr) {
    let exprArray = expr.split('');
    for (let i = 1; i < exprArray.length; i++) {
        if (exprArray[i] === '*' || exprArray[i] === '/') {
            let j = i - 1;
            let k = i + 1;
            let firsNumber = '';
            let secondNumber = '';
            while (!isNaN(exprArray[j]) || exprArray[j] === '.' || (exprArray[j] === '-' && isNaN(exprArray[j - 1]))) {
                firsNumber = exprArray[j] + firsNumber;
                j--;
            }
            while (!isNaN(exprArray[k]) || exprArray[k] === '.' || (exprArray[k] === '-' && isNaN(exprArray[k - 1]))) {
                secondNumber += exprArray[k];
                k++;
            }
            exprArray.splice(j + 1, k - j - 1, calculate(firsNumber, secondNumber, exprArray[i]));
            i = 0;
        }
    }
    for (let i = 1; i < exprArray.length; i++) {
        if (exprArray[i] === '+' || exprArray[i] === '-') {
            let j = i - 1;
            let k = i + 1;
            let firsNumber = '';
            let secondNumber = '';
            while (!isNaN(exprArray[j]) || exprArray[j] === '.' || (exprArray[j] === '-' && isNaN(exprArray[j - 1]))) {
                firsNumber = exprArray[j] + firsNumber;
                j--;
            }
            while (!isNaN(exprArray[k]) || exprArray[k] === '.' || (exprArray[k] === '-' && isNaN(exprArray[k - 1]))) {
                secondNumber += exprArray[k];
                k++;
            }
            exprArray.splice(j + 1, k - j - 1, calculate(firsNumber, secondNumber, exprArray[i]));
            i = 0;
        }
    }
    return exprArray.join('');
}

function calculate(firsNumber, secondNumber, expression) {
    firsNumber = parseFloat(firsNumber);
    secondNumber = parseFloat(secondNumber);
    let result;
    switch (expression) {
        case '*':
            result = firsNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                throw new Error('TypeError: Division by zero.');
            }
            result = firsNumber / secondNumber;
            break
        case '+':
            result = firsNumber + secondNumber;
            break
        case '-':
            result = firsNumber - secondNumber;
            break
        default:
            throw new Error();
    }
    return result;
}