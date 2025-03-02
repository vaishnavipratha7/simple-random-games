document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const timerDisplay = document.getElementById("timer");
    const scoreDisplay = document.getElementById("score");
    const restartBtn = document.getElementById("restart");
    let timer = 30;
    let score = 0;
    let firstTile = null;
    let secondTile = null;
    let lockBoard = false;
    
    function generateTiles() {
        const values = [1, 2, 3, 4, 5, 6, 7, 8];
        const tiles = [...values, ...values]
            .sort(() => Math.random() - 0.5)
            .map(value => {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.dataset.value = value;
                tile.addEventListener("click", flipTile);
                return tile;
            });
        board.innerHTML = "";
        tiles.forEach(tile => board.appendChild(tile));
    }
    
    function flipTile() {
        if (lockBoard || this === firstTile) return;
        this.textContent = this.dataset.value;
        
        if (!firstTile) {
            firstTile = this;
            return;
        }
        secondTile = this;
        lockBoard = true;
        checkMatch();
    }
    
    function checkMatch() {
        if (firstTile.dataset.value === secondTile.dataset.value) {
            firstTile.classList.add("matched");
            secondTile.classList.add("matched");
            score += 10;
            scoreDisplay.textContent = score;
            resetBoard();
        } else {
            setTimeout(() => {
                firstTile.textContent = "";
                secondTile.textContent = "";
                resetBoard();
            }, 1000);
        }
    }
    
    function resetBoard() {
        firstTile = null;
        secondTile = null;
        lockBoard = false;
    }
    
    function startTimer() {
        const interval = setInterval(() => {
            if (timer <= 0) {
                clearInterval(interval);
                alert("Time's up! Your score: " + score);
            }
            timerDisplay.textContent = --timer;
        }, 1000);
    }
    
    restartBtn.addEventListener("click", () => {
        timer = 30;
        score = 0;
        timerDisplay.textContent = timer;
        scoreDisplay.textContent = score;
        generateTiles();
        startTimer();
    });
    
    generateTiles();
    startTimer();
});