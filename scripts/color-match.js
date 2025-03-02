document.addEventListener("DOMContentLoaded", () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let correctColor = "";
    let score = 0;
    let timeLeft = 30; // 30 seconds timer
    let timer;

    const colorName = document.getElementById("color-name");
    const colorOptions = document.getElementById("color-options");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const startButton = document.getElementById("start");

    function generateColorMatch() {
        // Shuffle colors
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        correctColor = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
        
        // Display the color name in a random color
        colorName.textContent = correctColor.toUpperCase();
        colorName.style.color = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];

        // Generate color buttons
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
            message.textContent = "✅ Correct!";
            score++;
        } else {
            message.textContent = "❌ Wrong!";
        }
        scoreDisplay.textContent = `Score: ${score}`;
        setTimeout(generateColorMatch, 800);
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        message.textContent = "";
        generateColorMatch();

        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                message.textContent = `Game Over! 🎯 Your Score: ${score}`;
                colorOptions.innerHTML = "";
            }
        }, 1000);
    }

    startButton.addEventListener("click", startGame);
});
