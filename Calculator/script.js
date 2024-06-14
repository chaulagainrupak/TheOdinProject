let output = 0;
let arr = [];
let op = '+';

let nums = [
    7, 8, 9,
    4, 5, 6,
    1, 2, 3
];

let bottomKeys = [
    [0, 200],
    ['.', 100]
];

let specialKeys = [
    ['AC', 100, 'deleteAll()'],
    ['DEL', 200, 'deleteLast()']
];

let operandsList = [
    '/', '*', '+', '-', '='
];

window.onload = function () {
    let numpad = document.querySelector('.numpad');
    let specialKey = document.querySelector('.specialKeys');
    let operandKeys = document.querySelector('.operands');
    let display = document.getElementById('display');

    for (let i = 0; i < nums.length; i++) {
        let key = document.createElement('button');
        key.setAttribute('onclick', 'printDigit(' + nums[i] + ')');
        key.setAttribute('id', 'key_' + nums[i]);
        key.style.width = '100px';
        key.style.height = '100px';
        key.textContent = nums[i];
        numpad.appendChild(key);
    }

    for (let i = 0; i < 2; i++) {
        let key = document.createElement('button');
        key.setAttribute('onclick', 'printDigit(' + "\'" + bottomKeys[i][0] + "\'" + ')');
        key.setAttribute('id', 'key_' + bottomKeys[i][0]);
        key.style.width = bottomKeys[i][1].toString() + 'px';
        key.style.height = '100px';
        key.textContent = bottomKeys[i][0];
        numpad.appendChild(key);
    }

    for (let i = 0; i < specialKeys.length; i++) {
        let key = document.createElement('button');
        key.setAttribute('onclick', specialKeys[i][2]);
        key.setAttribute('id', 'key_' + specialKeys[i][0]);
        key.style.width = specialKeys[i][1] + 'px';
        key.style.height = '100px';
        key.textContent = specialKeys[i][0];
        specialKey.appendChild(key);
    }

    for (let i = 0; i < operandsList.length; i++) {
        let key = document.createElement('button');
        if (operandsList[i] === '=') {
            key.setAttribute('onclick', 'calculate()'); 
            key.setAttribute('id', 'key_equal');
        } else {
            key.setAttribute('onclick', 'setOperand("' + operandsList[i] + '")');
            key.setAttribute('id', 'key_operands');
        }
        key.style.width = '100px';
        key.style.height = '100px';
        key.textContent = operandsList[i];
        operandKeys.appendChild(key);
    }

    let decimal = document.getElementById("key_.");
    decimal.addEventListener('click', function() {
        decimal.setAttribute('disabled', 'true');
    });

    // document.addEventListener('click', adjustFontSize);
}

let evaluation = (arr) => { 
    switch(op){
        case '+':
            console.log(output = arr[0] + arr[1]);
            return output;
        case '-':
            console.log(output = arr[0] - arr[1]);
            return output;
        case '*':
            console.log(output = arr[0] * arr[1]);
            return output;
        case '/':
            console.log(output = arr[0] / arr[1]);
            return output;
    }
}

let printDigit = (num) => document.getElementById('display').innerHTML += num.toString();

let setOperand = (operand) => {
    op = operand; 
    if (document.getElementById('display').innerHTML !== '' && document.getElementById('display').innerHTML !== NaN){
        addToArray();
    }
}

let calculate = () => {
    if (arr.length !== 2 && document.getElementById('display').innerHTML !== ''){
        if (arr.length === 1 && arr[0] !== NaN){
            addToArray();
            document.getElementById('display').innerHTML = parseFloat(evaluation(arr)).toFixed(2);
            arr = [];
        } else {
            arr = [];
            document.getElementById('display').innerHTML = '';
        }
    }
}

let addToArray = () => {
    arr.push(parseFloat(document.getElementById('display').innerHTML));
    console.log(arr);
    document.getElementById('display').innerHTML = '';
}

let deleteLast = () => {
    let string = document.getElementById('display').innerHTML;
    let len = string.length;
    document.getElementById('display').innerHTML = string.slice(0,-1);
}

let deleteAll = () => document.getElementById('display').innerHTML = '';

let adjustFontSize = () => {
    let display = document.getElementById('display');
    let displayLength = display.innerHTML.length;
    let displayFontSize = parseFloat(window.getComputedStyle(display).getPropertyValue('font-size'));
    console.log(displayFontSize);
    if (displayLength > 9 && displayFontSize > 10) {
        console.log((displayFontSize - (displayFontSize / displayLength)));
        display.style.fontSize = (displayFontSize - (displayFontSize / displayLength)) + 'px';
    }
}
