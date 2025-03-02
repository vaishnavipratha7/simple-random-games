document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded!"); 

    const patternContainer = document.getElementById("pattern-container");
    const startButton = document.getElementById("start");
    const message = document.getElementById("message");
    const scoreDisplay = document.createElement("p");

    let sequence = [];
    let userSequence = [];
    let level = 1;
    let speed = 1000; // Speed decreases as level increases
    let lives = 3;
    let score = 0;
    let highScore = 0;

    scoreDisplay.id = "score";
    scoreDisplay.textContent = `Score: 0 | High Score: 0`;
    document.querySelector(".game-container").appendChild(scoreDisplay);

    function generatePattern() {
        console.log(`Generating pattern (Level ${level})`);
        sequence = Array.from({ length: level }, () => Math.floor(Math.random() * 4) + 1);
        console.log("Generated Sequence:", sequence);
        displayPattern();
    }

    function displayPattern() {
        patternContainer.innerHTML = "";
        let delay = 0;

        sequence.forEach((num, index) => {
            setTimeout(() => {
                let tile = document.createElement("div");
                tile.classList.add("pattern-tile", `tile-${num}`, "highlight");
                patternContainer.appendChild(tile);
                
                // Play sound effect
                playSound(num);

                setTimeout(() => {
                    tile.classList.remove("highlight");
                    tile.remove();
                }, 500);
            }, index * speed);

            delay = (index + 1) * speed;
        });

        setTimeout(enableUserInput, delay + 500);
    }

    function enableUserInput() {
        userSequence = [];
        patternContainer.innerHTML = "";
        
        for (let i = 1; i <= 4; i++) {
            let tile = document.createElement("div");
            tile.classList.add("pattern-tile", `tile-${i}`);
            tile.dataset.value = i;
            tile.addEventListener("click", handleUserInput);
            patternContainer.appendChild(tile);
        }
    }

    function handleUserInput(event) {
        const value = parseInt(event.target.dataset.value);
        userSequence.push(value);
        
        // Play sound on click
        playSound(value);

        if (userSequence.length === sequence.length) {
            checkPattern();
        }
    }

    function checkPattern() {
        if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
            score += level * 10;
            if (score > highScore) highScore = score;
            message.textContent = "✅ Correct! Next Level!";
            
            setTimeout(() => {
                message.textContent = "";
                level++;
                speed = Math.max(500, speed - 50); // Speed up every level
                generatePattern();
                updateScore();
            }, 1000);
        } else {
            lives--;
            message.textContent = `❌ Wrong! Lives left: ${lives}`;
            playSound("wrong");

            if (lives === 0) {
                setTimeout(gameOver, 1000);
            } else {
                setTimeout(() => {
                    message.textContent = "";
                    generatePattern();
                }, 1000);
            }
        }
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
    }

    function gameOver() {
        message.textContent = "💀 Game Over! Restarting...";
        setTimeout(() => {
            level = 1;
            lives = 3;
            score = 0;
            speed = 1000;
            updateScore();
            generatePattern();
        }, 2000);
    }

    function playSound(tile) {
        const sounds = {
            1: "https://www.fesliyanstudios.com/play-mp3/438",
            2: "https://www.fesliyanstudios.com/play-mp3/439",
            3: "https://www.fesliyanstudios.com/play-mp3/440",
            4: "https://www.fesliyanstudios.com/play-mp3/441",
            wrong: "https://www.fesliyanstudios.com/play-mp3/398"
        };
        
        if (sounds[tile]) {
            let audio = new Audio(sounds[tile]);
            audio.play();
        }
    }

    startButton.addEventListener("click", () => {
        console.log("▶️ Start button clicked!");
        level = 1;
        lives = 3;
        score = 0;
        speed = 1000;
        message.textContent = "";
        updateScore();
        generatePattern();
    });

    console.log("Event Listener Added!");
});
