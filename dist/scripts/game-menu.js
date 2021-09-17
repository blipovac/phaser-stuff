import { getJwtFromCookie } from "./config.js";

const cookie = getJwtFromCookie();

window.addEventListener("load", function () {
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", goToGameScreen);

    const highScoresButton = document.getElementById("highScoresButton");
    highScoresButton.addEventListener("click", goToHighScores);

    const settingsButton = document.getElementById("myScoresButton");
    settingsButton.addEventListener("click", goToMyScores);

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
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

function logout() {
    const tokenCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))

    document.cookie = `${ tokenCookie }; expires=Thu, 01 Jan 1970 00:00:00 GMT;`

    window.location = "index.html"
}