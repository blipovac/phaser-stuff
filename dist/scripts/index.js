window.addEventListener("load", function () {
    const startGameButton = document.getElementById("loginButton");
    startGameButton.addEventListener("click", goToLoginScreen);

    const highScoresButton = document.getElementById("registerButton");
    highScoresButton.addEventListener("click", goToRegisterScreen);
})

// Listener handlers
function goToLoginScreen() {
    window.location.href = "login.html";
}

function goToRegisterScreen() {
    window.location.href = "register.html";
}