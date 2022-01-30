import {verbdumForDay} from "./word-for-day";

interface CustomWindow extends Window {
    currentWordNumber: number;
    currentLetterNumber: number;
    currentlyGuessingWord: string;
    currentlyPlayingWord: string;
}

declare let window: CustomWindow;

window.currentWordNumber = 0;
window.currentLetterNumber = 0;
window.currentlyGuessingWord = "";
window.currentlyPlayingWord = "     ";

function clearLetter(element: Element) {
    element.textContent = "";
    element.classList.remove("guessing");
    element.classList.remove("absent");
    element.classList.remove("present");
    element.classList.remove("correct");
}

function clearBoard() {
    let gameBoardElement = document.getElementById("game-board");
    for (let i = 0; i < gameBoardElement.children.length; i++) {
        for (let j = 0; j < gameBoardElement.children[i].children.length; j++) {
            clearLetter(gameBoardElement.children[i].children[j]);
        }
    }
}

function getLetterElement(wordNumber: number, letterNumber: number): Element {
    let gameBoardElement = document.getElementById("game-board");
    let rowElement = gameBoardElement.children[wordNumber];
    return  rowElement.children[letterNumber];
}

function setGuessingLetterInGameBoard(wordNumber: number, letterNumber: number, letter: string) {
    let letterElement = getLetterElement(wordNumber, letterNumber);
    letterElement.textContent = letter.toUpperCase();
    if (letter == "") {
        letterElement.classList.remove("guessing");
        letterElement.setAttribute("data-animation", "")
    } else {
        letterElement.classList.add("guessing");
        letterElement.setAttribute("data-animation", "pop")
    }
}

function guessWordInRow(word: string, answer: string, row: number) {
    let answerLetters = answer;
    for (let i = 0; i < 5; i++) {
        let letterElement = getLetterElement(row, i);
        clearLetter(letterElement);
        letterElement.innerHTML = word[i].toUpperCase();
        if (word[i] == answer[i]) {
            letterElement.classList.add("correct");
            answerLetters = answerLetters.replace(word[i], "");
        } else if (!answer.includes(word[i])){
            letterElement.classList.add("absent");
        }
    }
    for (let i = 0; i < 5; i++) {
        let letterElement = getLetterElement(row, i);
        if (word[i] != answer[i] && answerLetters.includes(word[i])) {
            letterElement.classList.add("present");
            answerLetters = answerLetters.replace(word[i], "");
        } else {
            letterElement.classList.add("absent");
        }
    }
}

export function addLetter(letter: string) {
    if (window.currentLetterNumber != 5) {
        setGuessingLetterInGameBoard(window.currentWordNumber, window.currentLetterNumber, letter);
        window.currentlyGuessingWord += letter;
        window.currentLetterNumber++;
    }
}

export function backspaceLetter() {
    if (window.currentLetterNumber != 0) {
        window.currentlyGuessingWord = window.currentlyGuessingWord.slice(0, -1);
        window.currentLetterNumber--;
        setGuessingLetterInGameBoard(window.currentWordNumber, window.currentLetterNumber, "");
    }
}

export function submit() {
    if (window.currentLetterNumber == 5) {
        console.log(`word = "${window.currentlyPlayingWord}"`);
        guessWordInRow(window.currentlyGuessingWord, window.currentlyPlayingWord, window.currentWordNumber);
        window.currentWordNumber++;
        window.currentLetterNumber = 0;
        window.currentlyGuessingWord = "";
    }
}

export function loadGameForDate(date: Date) {
    window.currentWordNumber = 0;
    window.currentLetterNumber = 0;
    window.currentlyGuessingWord = "";
    window.currentlyPlayingWord = verbdumForDay(date);
    console.log(`now playing ${window.currentlyPlayingWord}`);
    clearBoard();
}
