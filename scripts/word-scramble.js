document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JS Loaded!");

    const scrambledWord = document.getElementById("scrambled-word");
    const hint = document.getElementById("hint");
    const userInput = document.getElementById("user-input");
    const checkButton = document.getElementById("check-answer");
    const nextButton = document.getElementById("next-word");
    const message = document.getElementById("message");

    // Ensure all elements exist before adding event listeners
    if (!scrambledWord || !hint || !userInput || !checkButton || !nextButton || !message) {
        console.error("❌ ERROR: One or more elements not found! Check your HTML IDs.");
        return;
    }

    // 🔥 Expanded General Knowledge Word List
    const words = [
        { word: "pyramid", hint: "Ancient Egyptian structure" },
        { word: "gravity", hint: "Force that keeps us on the ground" },
        { word: "volcano", hint: "Mountain that erupts lava" },
        { word: "oxygen", hint: "Gas we need to breathe" },
        { word: "rainbow", hint: "Appears after rain with seven colors" },
        { word: "telescope", hint: "Device used to look at stars" },
        { word: "mountain", hint: "Everest is the tallest one" },
        { word: "compass", hint: "Tool that shows direction" },
        { word: "electricity", hint: "Power source for lights and devices" },
        { word: "satellite", hint: "Orbits the Earth for communication" },
        { word: "currency", hint: "Used to buy things (money)" },
        { word: "eclipse", hint: "Happens when the Sun or Moon is blocked" },
        { word: "planet", hint: "Earth is one of them" },
        { word: "desert", hint: "A dry place with little rain" },
        { word: "diamond", hint: "A very precious stone" },
        { word: "keyboard", hint: "Used to type on a computer" },
        { word: "bridge", hint: "Structure that connects two places" },
        { word: "calendar", hint: "Shows days, months, and years" },
        { word: "library", hint: "A place full of books" }
    ];

    let currentWord = {};

    function scrambleWord(word) {
        return word.split("").sort(() => Math.random() - 0.5).join("");
    }

    function loadNewWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        scrambledWord.textContent = scrambleWord(currentWord.word);
        hint.textContent = `Hint: ${currentWord.hint}`;
        userInput.value = "";
        message.textContent = "";
    }

    checkButton.addEventListener("click", () => {
        if (userInput.value.toLowerCase() === currentWord.word) {
            message.textContent = "✅ Correct!";
            message.style.color = "green";
        } else {
            message.textContent = `❌ Wrong! Try again. Correct word: ${currentWord.word}`;
            message.style.color = "red";
        }
    });

    nextButton.addEventListener("click", loadNewWord);

    // Load the first word
    loadNewWord();
});
