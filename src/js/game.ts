import {verbdumForDay} from "./word-for-day";
import {allowedGuesses} from "./constants/allowed-guesses";

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

function clearGameBoard() {
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
    return rowElement.children[letterNumber];
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

function getKeyboardKey(key: string): Element {
    return document.querySelectorAll(`[data-key='${key}']`)[0];
}

function clearKeyboardKey(key: string) {
    let element = getKeyboardKey(key);
    element.classList.remove("correct");
    element.classList.remove("present");
    element.classList.remove("absent");
}

function clearKeyboard() {
    for (let i = 0; i < 26; i++) {
        clearKeyboardKey(String.fromCharCode(97 + i));
    }
}

function setKeyboardKeyState(key: string, state: "correct" | "present" | "absent") {
    let keyElement = getKeyboardKey(key);
    if (
        state == "correct" ||
        (state == "present" && !keyElement.classList.contains("correct")) ||
        (state == "absent" && !keyElement.classList.contains("correct") && !keyElement.classList.contains("present"))
    ) {
        clearKeyboardKey(key);
        getKeyboardKey(key).classList.add(state);
    }
}

function toastWithMessage(message: string) {
    let toastBag = document.getElementById("toast-bag");
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.classList.add("toast");
    toastBag.prepend(toast);
    setTimeout(() => toastBag.removeChild(toastBag.lastElementChild), 2000)
}

function guessWordInRow(word: string, answer: string, row: number) {
    if (!allowedGuesses.includes(word)) {
        toastWithMessage("Not in word list.");
        return
    }

    window.currentWordNumber++;
    window.currentLetterNumber = 0;
    window.currentlyGuessingWord = "";

    let answerLetters = answer;
    for (let i = 0; i < 5; i++) {
        let letterElement = getLetterElement(row, i);
        clearLetter(letterElement);
        letterElement.innerHTML = word[i].toUpperCase();
        if (word[i] == answer[i]) {
            letterElement.classList.add("correct");
            setKeyboardKeyState(word[i], "correct");
            answerLetters = answerLetters.replace(word[i], "");
        } else if (!answer.includes(word[i])) {
            letterElement.classList.add("absent");
            setKeyboardKeyState(word[i], "absent");
        }
    }
    for (let i = 0; i < 5; i++) {
        let letterElement = getLetterElement(row, i);
        if (word[i] != answer[i] && answerLetters.includes(word[i])) {
            letterElement.classList.add("present");
            setKeyboardKeyState(word[i], "present");
            answerLetters = answerLetters.replace(word[i], "");
        } else if (word[i] != answer[i]) {
            letterElement.classList.add("absent");
            setKeyboardKeyState(word[i], "absent");
        }
    }
}

function isPlaying(): boolean {
    return window.currentWordNumber != 6
}

export function addLetter(letter: string) {
    if (window.currentLetterNumber != 5 && isPlaying()) {
        setGuessingLetterInGameBoard(window.currentWordNumber, window.currentLetterNumber, letter);
        window.currentlyGuessingWord += letter;
        window.currentLetterNumber++;
    }
}

export function backspaceLetter() {
    if (window.currentLetterNumber != 0 && isPlaying()) {
        window.currentlyGuessingWord = window.currentlyGuessingWord.slice(0, -1);
        window.currentLetterNumber--;
        setGuessingLetterInGameBoard(window.currentWordNumber, window.currentLetterNumber, "");
    }
}

export function submit() {
    if (window.currentLetterNumber == 5 && isPlaying()) {
        guessWordInRow(window.currentlyGuessingWord, window.currentlyPlayingWord, window.currentWordNumber);
    }
}

export function loadGameForDate(date: Date) {
    window.currentWordNumber = 0;
    window.currentLetterNumber = 0;
    window.currentlyGuessingWord = "";
    window.currentlyPlayingWord = verbdumForDay(date);
    clearGameBoard();
    clearKeyboard();
    console.log(`now playing ${window.currentlyPlayingWord}`);
}
