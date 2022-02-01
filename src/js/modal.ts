let modalBagElement = document.getElementById("modal-bag");
modalBagElement.addEventListener("click", () => {
    modalBagElement.classList.add("hidden");
    setTimeout(() => modalBagElement.classList.remove("shown"), 200)
});

let helpElement = document.getElementById("header-help");
helpElement.addEventListener("click", showHelpModal);

export function showHelpModal() {
    modalBagElement.classList.remove("hidden");
    modalBagElement.classList.add("shown");
}