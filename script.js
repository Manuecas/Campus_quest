
let currentIndex = 0;
let clues = [];
let score = 0;
let startTime = Date.now();

fetch("quests/nova_intro_week.json")
    .then(response => response.json())
    .then(data => {
        clues = data;
        document.getElementById("clue-text").textContent = clues[currentIndex].clue;
    });

function submitAnswer() {
    const input = document.getElementById("answer-input");
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = clues[currentIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong! Try again or move on.");
    }

    currentIndex++;
    input.value = "";

    if (currentIndex < clues.length) {
        document.getElementById("clue-text").textContent = clues[currentIndex].clue;
    } else {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        document.getElementById("game").style.display = "none";
        document.getElementById("result").style.display = "block";
        document.getElementById("result").innerHTML =
            `<h2>Game Over</h2><p>Score: ${score}/${clues.length}</p><p>Time: ${timeTaken} seconds</p>`;
    }
}
