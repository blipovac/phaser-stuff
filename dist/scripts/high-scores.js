function reqListener () {
    req.response.results.forEach(element => {
        let node = document.createElement("LI");
        
        node.setAttribute("class", "menuItem")
        
        let textnode = document.createTextNode(element.name);        
        node.appendChild(textnode);                              
        document.getElementById("score-list").appendChild(node);
    });
}

let req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=10")
req.responseType = "json";
req.send();