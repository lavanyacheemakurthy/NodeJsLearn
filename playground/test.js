// let userName = 'John';

function showMessage() {
    userName = userName + userName; // (1) changed the outer variable

    let message = 'Hello, ' + userName;
    console.log(message)
}
let userName = 'John';
console.log(userName); // John before the function call

showMessage();

console.log(userName);

function showMessage1(from, text) {

    from = '*' + from + '*'; // make "from" look nicer

    console.log(from + ': ' + text);
}

let from = "Ann";

showMessage1(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
console.log(from); // Ann