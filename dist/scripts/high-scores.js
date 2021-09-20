import { BASE_API_URL, getJwtFromCookie } from "./config.js"

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
  window.location.href = "game-menu.html"
})

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('mine');

let req = new XMLHttpRequest();
req.addEventListener("load", reqListener);


if (query === "true") {
    req.open("GET", `${ BASE_API_URL }/my-scores`);

    const token = getJwtFromCookie();

    req.setRequestHeader("authorization", `Bearer ${token}`)
} else {
    req.open("GET", `${ BASE_API_URL }/high-scores`);
}

req.responseType = "json";
req.send();

function reqListener () {
    req.response.forEach((element, index) => {
        let tableRow = document.createElement("tr");

        let rankCell = document.createElement("td");
        let rankCellText = document.createTextNode((index + 1).toString());
        rankCell.appendChild(rankCellText);

        let playerCell = document.createElement("td");
        let playerCellText = document.createTextNode(element.user.username);
        playerCell.appendChild(playerCellText);

        let scoreCell = document.createElement("td");
        let scoreCellText = document.createTextNode(element.score);
        scoreCell.appendChild(scoreCellText);

        let dateCell = document.createElement("td");
        let dateText = document.createTextNode(element.created_at);
        dateCell.appendChild(dateText);

        tableRow.appendChild(rankCell);
        tableRow.appendChild(playerCell);
        tableRow.appendChild(scoreCell);
        tableRow.appendChild(dateCell);
                         
        document.getElementById("score-list").appendChild(tableRow);
    });
}