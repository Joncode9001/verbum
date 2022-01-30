let currentWordNumber = 0;
let currentLetterNumber = 0;

function setGuessingLetterInGameBoard(wordNumber: number, letterNumber: number, letter: string) {
    let gameBoardElement = document.getElementById("game-board");
    let rowElement = gameBoardElement.children[wordNumber];
    let letterElement = rowElement.children[letterNumber];
    letterElement.textContent = letter.toUpperCase();
    if (letter == "") {
        letterElement.classList.remove("guessing");
        letterElement.setAttribute("data-animation", "")
    } else {
        letterElement.classList.add("guessing");
        letterElement.setAttribute("data-animation", "pop")
    }
}

export function addLetter(letter: string) {
    if (currentLetterNumber != 5) {
        setGuessingLetterInGameBoard(currentWordNumber, currentLetterNumber, letter);
        currentLetterNumber++;
    }
}

export function backspaceLetter() {
    if (currentLetterNumber != 0) {
        console.log("here");
        currentLetterNumber--;
        setGuessingLetterInGameBoard(currentWordNumber, currentLetterNumber, "");
    }
}