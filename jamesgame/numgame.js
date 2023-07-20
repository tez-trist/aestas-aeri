const DIGITS = 3;
let secret;
let numGuess;
const inputBox = document.getElementById("num_input");
const guessInfo = document.getElementById("guess_info");

function startGame() {
    secret = getRandom();
    numGuess = 0;
    //alert(`New number picked! This is bad ${secret}`);
}

function getRandom() {
    let newNum = Math.random();
    // 0.0000 thru 0.9999999...

    //newNum = newNum * Math.pow(10, DIGITS);
    newNum *= Math.pow(10, DIGITS);

    return Math.floor(newNum);
    // 3.141 -> 3.000
    // 1.999 -> 1.000
    // 50.00 -> 50.00
}

function makeGuess() {
    let myGuess = parseInt(inputBox.value);
    //alert(`You guessed ${myGuess} and the correct number is ${secret}`);

    let text = myGuess + `: `;
    text += `${getCorrectDigits(myGuess)} correct digits, `;
    text += `${getCorrectPlacements(myGuess)} correct placements`;
    guessInfo.innerHTML = text + `<br>` + guessInfo.innerHTML;

    numGuess++;

    if (myGuess === secret) {
        alert(`You win!! It took you ${numGuess} guesses`);
    }
}

function getCorrectDigits(guess) {
    let count = 0;
    for (let i = 0; i <= 9; i++) {
        let guessCount = 0;
        for (let j = 0; j < DIGITS; j++) {
            if (getDigit(guess, j) === i) {
                guessCount++;
            }
        }
        let secretCount = 0;
        for (let j = 0; j < DIGITS; j++) {
            if (getDigit(secret, j) === i) {
                secretCount++;
            }
        }
        // guessCount = the number of times a digit (i) appears in guess
        count += Math.min(guessCount, secretCount);
    }
    return count;
}

function getCorrectPlacements(guess) {
    let count = 0;
    for (let i = 0; i < DIGITS; i++) {
        if (getDigit(guess, i) === getDigit(secret, i)) {
            count++;
            // count = count + 1;
        }
    }
    return count;
}

function getDigit(num, dig) {
    return Math.floor(num / Math.pow(10, dig)) % 10;
}