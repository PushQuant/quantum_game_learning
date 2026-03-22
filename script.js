const qubit = document.getElementById("qubit");
const text = document.getElementById("text");
const observeButton = document.getElementById("observeButton");
const ignoreButton = document.getElementById("ignoreButton");
const resetButton = document.getElementById("resetButton");
const blipSound = document.getElementById("Blip")

let observed = false;



ignoreButton.addEventListener("click", () => {
    if (observed) return;

    text.innerText = "The state remains unobserved...\nWhat could possibly happen if it were observed?";
});


observeButton.addEventListener("click", () => {
    if (observed) return;

    observed = true;
    
    blipSound.currentTime = 0;
    blipSound.play();

    const res = Math.random() < 0.5 ? 0 : 1;        // bestimmt Position  

    qubit.style.animation = "none";

    if (res === 0) {
        qubit.style.background = "#4fc3f7";
        qubit.style.transform = "translateX(-80px)";
        text.innerText = "Through observing, the Qubit was found in position 0.";
    } else {
        qubit.style.background = "#f06292";
        qubit.style.transform = "translateX(80px)";
        text.innerText = "Through observing, the Qubit was found in position 1.";
    }

});


resetButton.addEventListener("click", () => {
    observed = false;

    qubit.style.animation = "float 2s ease-in-out infinite";
    qubit.style.background = "linear-gradient(45deg, #6cf, #c6f)";
    qubit.style.transform = "translateX(0px)";
    text.innerText = "The state is uncertain.";
});
