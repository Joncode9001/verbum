import {addLetter, backspaceLetter, submit} from "./game";

let keys = document.getElementsByClassName("keyboard-key");
for (let i = 0; i < keys.length; i++) {
    let keyCode: string = keys[i].getAttribute("data-key");
    keys[i].addEventListener("click", () => typeKey(keyCode))
}

document.addEventListener("keydown", e => {
    let typedLetter = e.key.toLowerCase();
    switch (typedLetter) {
        case "enter":
            typeKey("enter");
            return;
        case "backspace":
        case "delete":
            typeKey("backspace");
            return;
        default:
            if (/^[0-9]$/.test(typedLetter)) {
                typeKey(typedLetter)
            }
            return;
    }
});

function typeKey(key: string) {
    switch (key) {
        case "enter":
            submit();
            return;
        case "backspace":
            backspaceLetter();
            return;
        default:
            addLetter(key);
            return;
    }
}