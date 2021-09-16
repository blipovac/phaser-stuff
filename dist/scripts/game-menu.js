window.addEventListener("load", function () {
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", goToGameScreen);

    const highScoresButton = document.getElementById("highScoresButton");
    highScoresButton.addEventListener("click", goToHighScores);

    const settingsButton = document.getElementById("myScoresButton");
    settingsButton.addEventListener("click", goToHighScores);
})

// Listener handlers
function goToGameScreen() {
    window.location.href = "detect-input.html";
}

function goToHighScores() {
    window.location.href = "high-scores.html";
}

function goToSettings() {
    window.location.href = "my-scores.html";
}