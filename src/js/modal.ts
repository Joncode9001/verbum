import {toggleTranslation} from "./translate";

let modalBagElement = document.getElementById("modal-bag");
modalBagElement.addEventListener("click", () => {
    modalBagElement.classList.add("hidden");
    setTimeout(() => modalBagElement.classList.remove("shown"), 200)
});

let helpElement = document.getElementById("header-help");
helpElement.addEventListener("click", showHelpModal);
let statsElement = document.getElementById("header-stats");
statsElement.addEventListener("click", showStatsModal);
let langSwitches = document.getElementsByClassName("lang-switch");
for (let i = 0; i < langSwitches.length; i++) {
    langSwitches[i].addEventListener("click", toggleTranslation);
}

let helpModal = document.getElementById("help-modal");
let statsModal = document.getElementById("stats-modal");

function hideAllModals() {
    helpModal.classList.remove("shown");
    statsModal.classList.remove("shown");
}

function showModal(modal: Element) {
    modalBagElement.classList.remove("hidden");
    modalBagElement.classList.add("shown");
    hideAllModals();
    modal.classList.add("shown");
}



export function showHelpModal() {
    showModal(helpModal);
}

export function showStatsModal() {
    showModal(statsModal);
}