export const BASE_API_URL = "http://127.0.0.1:3333"

export function getJwtFromCookie () {
    let token = ''
    try {
        token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];

        return token
    } catch (e) {
        window.alert("You are not logged in!")
        window.location.href = "login.html"
    }
}
