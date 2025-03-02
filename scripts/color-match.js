const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
let correctColor = "";
let score = 0;
let timeLeft = 10;
let timer;
const colorName = document.getElementById("color-name");
const colorOptions = document.getElementById("color-options");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

function generateColorMatch() {
    console.log("Generating new colors..."); // Debugging log
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    correctColor = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
    
    console.log("Correct Color:", correctColor); // Debugging log
    
    // Ensure displayed text color is different from correctColor
    let displayedColor = shuffledColors.find(c => c !== correctColor) || shuffledColors[1];
    colorName.textContent = correctColor;
    colorName.style.color = displayedColor;
    
    colorOptions.innerHTML = "";
    shuffledColors.slice(0, 4).forEach(color => {
        let btn = document.createElement("button");
        btn.classList.add("color-btn");
        btn.style.backgroundColor = color;
        btn.dataset.color = color;
        btn.addEventListener("click", () => checkAnswer(color));
        colorOptions.appendChild(btn);
    });
}

function checkAnswer(selectedColor) {
    if (selectedColor === correctColor) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
    generateColorMatch();
}

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `⏳ Time: ${timeLeft}s`;
    generateColorMatch();
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `⏳ Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Game over! Your final score is ${score}`);
        }
    }, 1000);
}

startBtn.addEventListener("click", startGame);