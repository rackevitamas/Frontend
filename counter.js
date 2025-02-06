let number = 100;

function updateDisplay() {
    document.getElementById("number").innerHTML = number;
}

function decrement() {
    number--;
    updateDisplay();
}

function increment() {
    number++;
    updateDisplay();
}

function decrement5() {
    number -= 5;
    updateDisplay();
}

function increment5() {
    number += 5;
    updateDisplay();
}
