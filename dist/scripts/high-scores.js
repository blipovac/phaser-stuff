import { BASE_API_URL } from "./config.js"

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

let req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", `${ BASE_API_URL }/high-scores`)
req.responseType = "json";
req.send();