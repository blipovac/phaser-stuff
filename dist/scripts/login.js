import { BASE_API_URL } from "./config.js";

const req = new XMLHttpRequest();

window.addEventListener("load", function () {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", login)

    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        window.location.href = "index.html"
    })
})

function login() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (!login.length || !password.length) {
        window.alert("Invalid login information!")

        return
    }

    sendLoginRequest({
        login: login,
        password: password
    })
}

function sendLoginRequest({ login, password }) {
    req.addEventListener("load", reqListener);
    req.open("POST", `${ BASE_API_URL }/auth/login`)
    req.setRequestHeader("Content-Type", "application/json")
    req.responseType = "json";
    req.send(JSON.stringify(
        {
            login,
            password
        }
    ))
}

function reqListener() {
    if (req.status === 200) {
        document.cookie = `token=${ req.response.token.token }; Secure`;

        window.location.href = "game-menu.html";
    } else {
        alert("Login was unsuccessful")
    }
    
}