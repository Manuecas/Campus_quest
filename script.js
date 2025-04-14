
let currentIndex = 0;
let clues = [];
let score = 0;
let startTime = Date.now();
let playerName = "";

fetch("quests/nova_expanded_clues.json")
    .then(response => response.json())
    .then(data => {
        clues = data;
        askPlayerName();
    });

function askPlayerName() {
    playerName = prompt("Enter your name to start the quest:");
    if (!playerName || playerName.trim() === "") {
        playerName = "Anonymous";
    }
    document.getElementById("clue-text").textContent = clues[currentIndex].clue;
}

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
        endGame();
    }
}

function endGame() {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    // Save to leaderboard
    const newScore = { name: playerName, score: score, time: duration };
    let leaderboard = JSON.parse(localStorage.getItem("campusLeaderboard")) || [];
    leaderboard.push(newScore);
    leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
    leaderboard = leaderboard.slice(0, 5); // Top 5 only
    localStorage.setItem("campusLeaderboard", JSON.stringify(leaderboard));

    showResults(duration, leaderboard);
}

function showResults(duration, leaderboard) {
    document.getElementById("game").style.display = "none";
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";

    let leaderboardHTML = "<h3>🏆 Leaderboard (Top 5)</h3><ol>";
    leaderboard.forEach(entry => {
        leaderboardHTML += `<li>${entry.name}: ${entry.score}/${clues.length} in ${entry.time}s</li>`;
    });
    leaderboardHTML += "</ol>";

    resultDiv.innerHTML = `
        <h2>Game Over</h2>
        <p>Score: ${score}/${clues.length}</p>
        <p>Time: ${duration} seconds</p>
        ${leaderboardHTML}
    `;
}
