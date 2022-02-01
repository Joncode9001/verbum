import {verbdumForDay, verbdumIdForDay} from "./word-for-day";
import {allowedGuesses} from "./constants/allowed-guesses";

interface CustomWindow extends Window {
    currentWordNumber: number;
    currentLetterNumber: number;
    currentlyGuessingWord: string;
    currentlyPlayingWord: string;
    pastGuesses: Array<string>;
    currentlyPlayingId: number;
}

declare let window: CustomWindow;

function clearLetter(element: Element, text: boolean = true) {
    if (text) { element.textContent = ""; }
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

function shakeWord(wordNumber: number) {
    for (let i = 0; i < 5; i++) {
        let letterElement = getLetterElement(wordNumber, i);
        letterElement.setAttribute("data-animation", "shake");
        setTimeout(() => letterElement.setAttribute("data-animation", ""), 600);
    }
}

function setClueForLetter(wordNumber: number, letterNumber: number, letterValue: string, clue: "correct" | "present" | "absent") {
    let letterElement = getLetterElement(wordNumber, letterNumber);
    letterElement.setAttribute("data-animation", "flip");
    setTimeout(() => {
        letterElement.textContent = letterValue.toUpperCase();
        letterElement.classList.add(clue);
        setKeyboardKeyState(letterValue, clue);
    }, 250);
}

function guessWordInRow(word: string, answer: string, row: number, isInitialLoad: boolean = false) {
    if (!allowedGuesses.includes(word)) {
        toastWithMessage("Not in word list.");
        shakeWord(window.currentWordNumber);
        return
    }

    window.pastGuesses.push(word);
    if (!isInitialLoad) appendGuess(window.currentlyPlayingId, word);
    window.currentWordNumber++;
    window.currentLetterNumber = 0;
    window.currentlyGuessingWord = "";

    let answerLetters = answer;
    const letterFlipDelay = isInitialLoad ? 100 : 300;
    for (let i = 0; i < 5; i++) {
        let letterElement = getLetterElement(row, i);
        clearLetter(letterElement, false);
        if (word[i] == answer[i]) {
            setTimeout(() => setClueForLetter(row, i, word[i], "correct"), i * letterFlipDelay);
            answerLetters = answerLetters.replace(word[i], "");
        } else if (!answer.includes(word[i])) {
            setTimeout(() => setClueForLetter(row, i, word[i], "absent"), i * letterFlipDelay);
        }
    }
    for (let i = 0; i < 5; i++) {
        if (word[i] != answer[i] && answerLetters.includes(word[i])) {
            setTimeout(() => setClueForLetter(row, i, word[i], "present"), i * letterFlipDelay);
            answerLetters = answerLetters.replace(word[i], "");
        } else if (word[i] != answer[i]) {
            setTimeout(() => setClueForLetter(row, i, word[i], "absent"), i * letterFlipDelay);
        }
    }
}

function appendGuess(id: number, guess: string) {
    let currentGuessesText = localStorage.getItem(`guesses-${id}`);
    if (currentGuessesText == null) {
        localStorage.setItem(`guesses-${id}`, JSON.stringify([guess]))
    } else {
        let currentGuesses: Array<string> = JSON.parse(currentGuessesText);
        currentGuesses.push(guess);
        localStorage.setItem(`guesses-${id}`, JSON.stringify(currentGuesses))
    }
}

function loadGuesses(id: number) {
    let currentGuessesText = localStorage.getItem(`guesses-${id}`);
    if (currentGuessesText != null) {
        let currentGuesses: Array<string> = JSON.parse(currentGuessesText);
        for (let i = 0; i < currentGuesses.length; i++) {
            guessWordInRow(currentGuesses[i], window.currentlyPlayingWord, window.currentWordNumber, true);
        }
    }
}

function isPlaying(): boolean {
    return window.currentWordNumber != 6 && !window.pastGuesses.includes(window.currentlyPlayingWord);
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
    if (isPlaying()) {
        if (window.currentLetterNumber == 5) {
            guessWordInRow(window.currentlyGuessingWord, window.currentlyPlayingWord, window.currentWordNumber);
        } else {
            toastWithMessage("Not enough letters");
            shakeWord(window.currentWordNumber);
        }
    }
}

export function loadGameForDate(date: Date) {
    window.currentWordNumber = 0;
    window.currentLetterNumber = 0;
    window.currentlyGuessingWord = "";
    window.pastGuesses = [];
    window.currentlyPlayingWord = verbdumForDay(date);
    window.currentlyPlayingId = verbdumIdForDay(date);
    clearGameBoard();
    clearKeyboard();
    loadGuesses(window.currentlyPlayingId);
    console.log(`now playing ${window.currentlyPlayingWord} (${window.currentlyPlayingId})`);
}
