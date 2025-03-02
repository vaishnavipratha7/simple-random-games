document.addEventListener("DOMContentLoaded",() => {
    console.log("Math challenge Game loaded!");

    const questionBox= document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const messageBox = document.getElementById("message");
    const scoreBox = document.getElementById("score");
    const timerBox = document.getElementById("timer");
    const powerUpBox = document.getElementById("power-ups");

    let level = 1;
    let score = 0;
    let timer = 10;
    let comboStreak = 0;
    let powerUps = 3;
    let countdown;


    function generateQuestion() {
        clearInterval(countdown);
        timer = Math.max(5, 12 - level); // Decreases as levels go up
        timerBox.textContent = `⏳ ${timer}s`;

        let num1 = Math.floor(Math.random() * (level * 5)) + 1;
        let num2 = Math.floor(Math.random() * (level * 5)) + 1;
        let operators = ["+", "-", "*", "/"];
        let operator = operators[Math.floor(Math.random() * operators.length)];
        let question, correctAnswer;

        switch (level) {
            case 1:
            case 2:
                operator = ["+", "-"][Math.floor(Math.random() * 2)];
                break;
            case 3:
            case 4:
                operator = ["*", "/"][Math.floor(Math.random() * 2)];
                break;
            case 5:
                num1 = Math.floor(Math.random() * 10) + 1;
                correctAnswer = Math.pow(num1, 2);
                question = `What is ${num1}²?`;
                break;
            case 6:
                num1 = Math.floor(Math.random() * 20) + 1;
                correctAnswer = Math.sqrt(num1).toFixed(2);
                question = `What is √${num1} (rounded to 2 decimal places)?`;
                break;
            case 7:
                correctAnswer = num1 + num2;
                question = `Solve for x: x - ${num2} = ${num1 - num2}`;
                break;
            default:
                correctAnswer = Math.pow(num1, num2);
                question = `What is ${num1}^${num2}?`;
                break;
        }

        if (!question) {
            if (operator === "/" && num1 % num2 !== 0) {
                num1 = num2 * (Math.floor(Math.random() * 10) + 1);
            }
            correctAnswer = eval(`${num1} ${operator} ${num2}`);
            question = `What is ${num1} ${operator} ${num2}?`;
        }

        questionBox.textContent = question;
        answerInput.value = "";
        answerInput.focus();

        answerInput.dataset.correctAnswer = correctAnswer;

        countdown = setInterval(() => {
            timer--;
            timerBox.textContent = `⏳ ${timer}s`;
            if (timer <= 0) {
                clearInterval(countdown);
                handleIncorrect();
            }
        }, 1000);
    }

    function handleCorrect() {
        clearInterval(countdown);
        score += 10 + (comboStreak * 5);
        comboStreak++;
        if (comboStreak % 3 === 0) {
            score += 10; // Bonus for 3 in a row!
        }
        scoreBox.textContent = `🏆 Score: ${score}`;
        messageBox.textContent = "✅ Correct! Next question...";
        setTimeout(() => {
            level++;
            generateQuestion();
        }, 1000);
    }

    function handleIncorrect() {
        comboStreak = 0;
        messageBox.textContent = `❌ Wrong! The correct answer was ${answerInput.dataset.correctAnswer}`;
        setTimeout(() => {
            generateQuestion();
        }, 1000);
    }

    submitButton.addEventListener("click", () => {
        const userAnswer = parseFloat(answerInput.value);
        const correctAnswer = parseFloat(answerInput.dataset.correctAnswer);
        if (userAnswer === correctAnswer) {
            handleCorrect();
        } else {
            handleIncorrect();
        }
    });

    powerUpBox.addEventListener("click", () => {
        if (powerUps > 0) {
            powerUps--;
            timer += 5;
            timerBox.textContent = `⏳ ${timer}s (Power-Up Used)`;
        }
    });

    generateQuestion();
})