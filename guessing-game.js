const { stdin, stdout } = require("process");
const readline = require("readline");
const rl = readline.createInterface({
    input: stdin,
    output: stdout
});
let secretNumber;
let numAttempts;

let checkGuess = function (number) {
    if (number > secretNumber) {
        console.log("Too High!");
        return false;
    }
    else if (number < secretNumber) {
        console.log("Too low!");
        return false;
    }
    else if (number === secretNumber) {
        console.log("Correct!");
        return true;
    }
    
};

let askGuess = function () {
    numAttempts--;
    if (numAttempts >= 0){
        rl.question("What number is your guess? ", answer => {
            let guessNumber = Number(answer);
            if (checkGuess(guessNumber)) {
                console.log("You win!");
                rl.close();
            }
            else {
                askGuess();
        }
            
        });
    }
    else {
        console.log("You lose!");
        console.log(`The number was ${secretNumber}!`)
        rl.close();
    }
};

let randomInRange = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

let askRange = function() {
    rl.question("What is the minimum number? ", min => {
        rl.question ("What is the maximum number? ", max => {
            console.log(`I'm thinking of a number between ${min} and ${max}...`);
            secretNumber = randomInRange(min,max);
            askGuess();
        });
    });
};

let askLimit = function() {
    rl.question("How many attempts do you want? ", answer => {
        numAttempts = Number(answer);
        askRange();
    });
};

askLimit();
