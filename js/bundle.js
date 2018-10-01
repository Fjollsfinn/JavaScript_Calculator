(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
    DOMelements: {
        mainScreen: '.output__score',
        subScreen: '.output__equation'
    }
}
},{}],2:[function(require,module,exports){
let UIController = require('./UIController');
module.exports = {
    enterNumber: (num) => {
        if (document.querySelector(UIController.DOMelements.mainScreen).textContent === "0") {
            if (num == ".") {
                return "0."
            }
            else {
                return num;
            }
        } else {
            return document.querySelector(UIController.DOMelements.mainScreen).textContent + num;
        }
    },

    changeToFloat: () => {
        if (document.querySelector(UIController.DOMelements.mainScreen).textContent.substr(document.querySelector(UIController.DOMelements.mainScreen).textContent.length - 1) === ".") {
            return document.querySelector(UIController.DOMelements.mainScreen).textContent;
        }
       else {
           return document.querySelector(UIController.DOMelements.mainScreen).textContent + ".";
       }

    },

    updateScreen: (arg) => {
        document.querySelector(UIController.DOMelements.mainScreen).textContent = arg;
    },

    addition: (firstNumber, secoundNumber) => {
        if ((parseFloat(firstNumber) + parseFloat(secoundNumber) > 999999999)) {
            return (parseFloat(firstNumber) + parseFloat(secoundNumber)).toPrecision(8);
        } 
        else {
            return Math.round((parseFloat(firstNumber) + parseFloat(secoundNumber)) * 100) / 100;
        }
    },

    subtraction: (firstNumber, secoundNumber) => {
        if ((parseFloat(firstNumber) - parseFloat(secoundNumber) > 999999999)) {
            return (parseFloat(firstNumber) - parseFloat(secoundNumber)).toPrecision(8);
        } 
        else {
            return Math.round((parseFloat(firstNumber) - parseFloat(secoundNumber)) * 100) / 100;
        }
    },

    multiplication: (firstNumber, secoundNumber) => {
        if ((parseFloat(firstNumber) * parseFloat(secoundNumber) > 999999999)) {
            return (parseFloat(firstNumber) * parseFloat(secoundNumber)).toPrecision(8);
        } 
        else {
            return Math.round((parseFloat(firstNumber) * parseFloat(secoundNumber)) * 100) / 100;
        }
    },

    division: (firstNumber, secoundNumber) => {
        if ((parseFloat(firstNumber) / parseFloat(secoundNumber) > 999999999)) {
            return (parseFloat(firstNumber) / parseFloat(secoundNumber)).toPrecision(8);
        } 
        else {
            return Math.round((parseFloat(firstNumber) / parseFloat(secoundNumber)) * 100) / 100;
        }
    },

    delete: () => {
        document.querySelector(UIController.DOMelements.mainScreen).textContent = "0";
    },

    removeLast: () => {
        let currNumber = document.querySelector(UIController.DOMelements.mainScreen).textContent;
        if (currNumber.length < 2) {
            return "0";
        } else {
            return currNumber.substring(0, currNumber.length - 1);
        }
    }       
}
},{"./UIController":1}],3:[function(require,module,exports){
//IMPORTS
let calcFunctions = require('./calcFunctions');

//REAL SCRIPT
let globalVariables = {
    equation: null,
    firstNumber: null,
    secondNumber: null,
    score: null,
    clickCounter: 0
}
document.addEventListener('click', e => {
    try {
        let nodeValue = e.srcElement.attributes.value.nodeValue;
        if (isNaN(parseInt(nodeValue))) {
            //NaN click events
            //1. AC button - deletes all
            if (nodeValue === 'remove-all') {
                calcFunctions.delete();
                globalVariables.firstNumber = "0";
                globalVariables.secondNumber = "0";
                globalVariables.clickCounter = 0;
            }
            //2. CE button - removes last number
            else if (nodeValue === 'remove-last') {
                let newNumber = calcFunctions.removeLast();
                if (globalVariables.clickCounter === 0) {
                    globalVariables.firstNumber = newNumber;
                    calcFunctions.updateScreen(globalVariables.firstNumber);
                    console.log(`First Number changed to: ${globalVariables.firstNumber}`);
                } else {
                    globalVariables.secondNumber = newNumber;
                    calcFunctions.updateScreen(globalVariables.secondNumber);
                    console.log(`Second Number changed to: ${globalVariables.secondNumber}`);
                }
            } 
            //3. PLUS button - updating Equation to addition
            else if (nodeValue === 'plus') {
                globalVariables.clickCounter++;
                calcFunctions.updateScreen("0");
                globalVariables.equation = '+';
            } 
            //4. MINUS button - updating Equation to subtraction
            else if (nodeValue === 'minus') {
                globalVariables.clickCounter++;
                calcFunctions.updateScreen("0");
                globalVariables.equation = '-';
            } 
            //5. MULTIPLY button - updating Equation to multplication
            else if (nodeValue === 'multiply') {
                globalVariables.clickCounter++;
                calcFunctions.updateScreen("0");
                globalVariables.equation = '*';
            } 
            //5. DIVIDE button - updating Equation to division
            else if (nodeValue === 'divide') {
                globalVariables.clickCounter++;
                calcFunctions.updateScreen("0");
                globalVariables.equation = '/';
            } 
            //5. DOT button - converting ints to floats
            else if (nodeValue === 'dot') {
                if (globalVariables.clickCounter === 0) {
                    globalVariables.firstNumber = calcFunctions.changeToFloat();
                    calcFunctions.updateScreen(globalVariables.firstNumber);
                    console.log(`First Number: ${globalVariables.firstNumber}`);
                }
                else {
                    globalVariables.secondNumber = calcFunctions.changeToFloat();
                    calcFunctions.updateScreen(globalVariables.secondNumber);
                    console.log(`Second Number: ${globalVariables.secondNumber}`);
                }
            }
            //X. EQUAL button - executing calc functions depending on equation
            else if (nodeValue === 'equal') {
                // 1. addiotion
                if (globalVariables.equation === '+') {
                    globalVariables.score = calcFunctions.addition(globalVariables.firstNumber, globalVariables.secondNumber);
                    calcFunctions.updateScreen(globalVariables.score);
                    globalVariables.firstNumber = globalVariables.score;
                    console.log(`Score: ${globalVariables.score}`);
                } 
                //2. subtraction
                else if (globalVariables.equation === '-') {
                    globalVariables.score = calcFunctions.subtraction(globalVariables.firstNumber, globalVariables.secondNumber);
                    calcFunctions.updateScreen(globalVariables.score);
                    globalVariables.firstNumber = globalVariables.score;
                }
                //3. multiplication
                else if (globalVariables.equation === '*') {
                    globalVariables.score = calcFunctions.multiplication(globalVariables.firstNumber, globalVariables.secondNumber);
                    calcFunctions.updateScreen(globalVariables.score);
                    globalVariables.firstNumber = globalVariables.score;
                }
                //4. division
                else if (globalVariables.equation === '/') {
                    globalVariables.score = calcFunctions.division(globalVariables.firstNumber, globalVariables.secondNumber);
                    calcFunctions.updateScreen(globalVariables.score);
                    globalVariables.firstNumber = globalVariables.score;
                }
            }
            //Number click events 
        } else {
            if (document.querySelector('.output__score').textContent.length > 12) {
                throw "Number Limit Error";
            } else {
                if (globalVariables.clickCounter === 0 ) {
                    globalVariables.firstNumber = calcFunctions.enterNumber(nodeValue);
                    calcFunctions.updateScreen(globalVariables.firstNumber);
                    console.log(`First Number: ${globalVariables.firstNumber}`);
                } else {
                    globalVariables.secondNumber = calcFunctions.enterNumber(nodeValue);
                    calcFunctions.updateScreen(globalVariables.secondNumber);
                    console.log(`Second Number: ${globalVariables.secondNumber}`);
                }
            }
        }
    }
    catch(err) {
        console.log(err);
    }
})
},{"./calcFunctions":2}]},{},[3,2,1]);
