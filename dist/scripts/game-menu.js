window.addEventListener("load", function () {
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", goToGameScreen);

    const highScoresButton = document.getElementById("highScoresButton");
    highScoresButton.addEventListener("click", goToHighScores);

    const settingsButton = document.getElementById("myScoresButton");
    settingsButton.addEventListener("click", goToMyScores);
})

// Listener handlers
function goToGameScreen() {
    window.location.href = "detect-input.html";
}

function goToHighScores() {
    window.location.href = "high-scores.html";
}

function goToMyScores() {
    window.location.href = "high-scores.html?mine=true";
}