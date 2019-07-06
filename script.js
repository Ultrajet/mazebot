// constantes qui simplifient l'appel aux balises dans l'HTML

const pre = document.querySelector("pre");
const container = document.querySelector(".container");

function chargerMap() {

    // on récupère une map générée par l'API
    // on reset le <pre> et le .container
    // on met le contenu du json dans le <pre>, en "brut"
    // puis on lance la fonction pour afficher la map

    fetch("https://api.noopschallenge.com/mazebot/random")
        .then(response => { return response.json() })
        .then(data => {
            pre.innerHTML = "";
            container.innerHTML = "";
            pre.innerHTML = JSON.stringify(data, null, '\t');
            afficherMap(data);
        })
}

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
            }
        });
        return "<div class=\"ligne\">" + ligne.join("") + '</div>';
    });
    container.innerHTML = map.join("");
}

// chargement d'une première map à l'initialisation de la page
chargerMap()