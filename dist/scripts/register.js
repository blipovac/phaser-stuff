import { BASE_API_URL, EMAIL_VALIDATION } from "./config.js"

const req = new XMLHttpRequest();

window.addEventListener("load", function () {
    const registerButton = document.getElementById("registerButton");
    registerButton.addEventListener("click", register);

    req.addEventListener("load", reqListener);
})

function register() {
    const email = document.getElementById("email").value;
    const emailConfirmation = document.getElementById("emailConfirmation").value;
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("passwordConfirmation").value;
    const username = document.getElementById("username").value;

    if (!email.match(EMAIL_VALIDATION)) {
        alert("Email is not in valid email format!")

        return
    }

    if (!emailConfirmation.match(EMAIL_VALIDATION)) {
        alert("Email confirmation is not in valid email format!")

        return
    }

    if (email !== emailConfirmation) {
        window.alert("Email and email confirmation do not match");

        return
    }

    req.open("POST", `${BASE_API_URL}/users`);
    req.setRequestHeader("Content-Type", "application/json");
    req.responseType = "json";
    req.send(JSON.stringify(
        {
            email,
            email_confirmation: emailConfirmation,
            password,
            password_confirmation: passwordConfirmation,
            username
        }
    ))
}

function reqListener() {
    if (req.status === 200) {
        alert("Registration was successful please login with your account information");
        window.location.href = "login.html"
    } else {
        alert("Registration was unsuccessful")
    }

}