req = new XMLHttpRequest();

window.addEventListener("load", function () {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", login)
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
    req.open("POST", "https://bomb-dash-api.ey.r.appspot.com/auth/login")
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
    document.cookie = `token=${ req.response.token.token }; SameSite=None; Secure`;

    window.location.href = "game-menu.html";
}