export const BASE_API_URL = "https://bomb-dash-api.ey.r.appspot.com"

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

export const EMAIL_VALIDATION = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
