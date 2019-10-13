// constantes qui simplifient l'appel aux balises dans l'HTML
const pre = document.querySelector("pre");
const container = document.querySelector(".container");
const depart = document.querySelector(".depart");

// variables de gameplay
let theMap = {};
let thePlayer = [];
let theEnd = [];
let posX = 0;
let posY = 0;

// ----------------------
// AVANT INIT
// ----------------------

function chargerMap() {

    // on récupère une map générée par l'API
    // on reset le <pre> et le .container
    // on met le contenu du json dans le <pre>, en "brut"
    // puis on lance la fonction pour afficher la map
    fetch("https://api.noopschallenge.com/mazebot/random?minSize=20&maxSize=20")
        .then(response => { return response.json() })
        .then(data => {
            posX = 0;
            posY = 0;
            theMap = data.map;
            thePlayer = data.startingPosition;
            theEnd = data.endingPosition;
            manipulerMap();
            remplirPre(data);
            afficherMap(data);
        });

};

function remplirPre(data) {
    pre.innerHTML = "";
    container.innerHTML = "";
    pre.innerHTML = JSON.stringify(data, null, '\t');
};

function afficherMap(data) {

    // on parcourt les lignes de la map, puis le contenu des lignes, avec .map()
    // chaque lettre rencontrée renvoie un return à sa ligne, d'une certaine couleur selon la condition
    // chaque ligne renvoie un return à la map
    // on insère finalement la map dans .container
    let map = data.map.map(data => {
        let ligne = data.map(lettre => {
            if (lettre == "X") {
                return "<span class=\"bloc\"></span>"
            }
            else if (lettre == "A") {
                return "<span class=\"depart\"></span>"
            }
            else if (lettre == "B") {
                return "<span class=\"arrivee\"></span>"
            }
            else {
                return "<span class=\"chemin\"></span>"
            };
        });
        return "<div class=\"ligne\">" + ligne.join("") + '</div>';
    });

    container.innerHTML = map.join("");

};

function manipulerMap(direction = "none") {

    // la map en JSON dans laquel le joueur évolue, qui sera ensuite affichée avec afficherMap()
    // chaque mouvement du joueur entraîne un recalcul de la variable thePlayer
    // thePlayer est ensuite "inscrustré" à sa nouvelle coordonnée dans theMap
    // TODO : effacer les traces derrière, c'est-à-dire garder en mémoire la tile sur laquelle se trouver thePlayer, pour pouvoir ensuite la "réincruster"
    switch (direction) {
        case "none":
            console.log("none");
            break;

        case "left":
            thePlayer[0] = thePlayer[0] - 1;
            theMap[thePlayer[1]][thePlayer[0]] = "A";
            break;

        case "up":
            thePlayer[1] = thePlayer[1] - 1;
            theMap[thePlayer[1]][thePlayer[0]] = "A";
            break;

        case "right":
            thePlayer[0] = thePlayer[1] + 1;
            theMap[thePlayer[1]][thePlayer[0]] = "A";
            break;

        case "down":
            thePlayer[1] = thePlayer[1] + 1;
            theMap[thePlayer[1]][thePlayer[0]] = "A";
            break;

        default: return;
    }

    console.log(theMap);

    // for (i = 0; i < theMap.length; i++) {
    //     console.log("ligne " + i + ": " + theMap[i]);
    // };

};

// ----------------------
// APRÈS INIT
// ----------------------

// chargement d'une première map à l'initialisation de la page
chargerMap();

document.addEventListener("keydown", e => {

    // on écoute les touches directionnelles
    // celles-ci affectent la map au format JSON (theMap) avec la fonction manipulerMap()
    let depart = document.querySelector(".depart");

    switch (e.key) {
        case "ArrowLeft":
            e.preventDefault();
            posX -= 10;
            depart.style.left = posX + "px";
            manipulerMap("left");
            break;

        case "ArrowUp":
            e.preventDefault();
            posY -= 10;
            depart.style.top = posY + "px";
            manipulerMap("up");
            break;

        case "ArrowRight":
            e.preventDefault();
            posX += 10;
            depart.style.left = posX + "px";
            manipulerMap("right");
            break;

        case "ArrowDown":
            e.preventDefault();
            posY += 10;
            depart.style.top = posY + "px";
            manipulerMap("down");
            break;

        default: return;
    };
});