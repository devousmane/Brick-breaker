import { pagi, nameForScore } from "./templates.mjs"; // Importation des modèles nécessaires
import { reStart, reloadFromStart } from "./core.mjs"; // Importation des fonctions de redémarrage

// Fonction pour demander le nom du joueur et envoyer le score final au serveur
export function askfortabscore(myfinalscore, myfinaltime) {
    setTimeout(() => {
        document.body.innerHTML += nameForScore; // Ajout du formulaire de saisie de nom

        const inputElement = document.getElementById('nameofplayer'); // Élément d'entrée pour le nom du joueur
        const buttonElement = document.getElementById('sendButton'); // Bouton pour envoyer les données
        let datatosend = {
            name: "",
            score: 0,
            time: ""
        }

        // Événement au clic du bouton d'envoi
        buttonElement.addEventListener('click', function () {
            const playerName = inputElement.value;
            console.log('Player Name:', playerName);

            if (playerName != '') {
                // Supprimer les éléments du formulaire
                document.getElementById("overlay").remove();
                document.getElementById("askname").remove();
                datatosend = {
                    name: playerName,
                    score: Number(myfinalscore),
                    time: myfinaltime.replace("Time:", "")
                }

                // Envoyer les données au serveur
                fetch("http://localhost:8080/postdata", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datatosend)
                });

                // Récupérer les données du serveur
                fetch("http://localhost:8080/getdata", {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("c'est bien", data);
                        tabScore(data); // Afficher le tableau des scores
                        stat(data, datatosend); // Afficher les statistiques du joueur
                    })
                    .catch(err => {
                        console.log("error man");
                        console.log(err);
                    });
            }
        });
    }, 1000);
}

// Fonction pour afficher les statistiques du joueur
export function stat(data, senddata) {
    data = sortData(data); // Trier les données
    const playerstat = document.getElementById("playerstat");

    for (let i = 0; i < data.length; i++) {
        if (senddata.name === data[i].name && senddata.score === data[i].score && senddata.time === data[i].time) {
            const percentage = Math.floor((data[i].rank / data.length) * 100);
            playerstat.textContent = `You are in the top ${percentage}%, on the ${data[i].rank} position`;
            break;
        }
    }
}

// Fonction pour gérer la pagination des données
export function pagination(datadata) {
    const rowsPerPage = 5;
    let currentPage = 1;

    const tableBody = document.querySelector('#data-table tbody'); // Corps du tableau
    const pageInfo = document.getElementById('page-info'); // Informations sur la pagination
    const prevBtn = document.getElementById('prev-btn'); // Bouton de pagination précédent
    const nextBtn = document.getElementById('next-btn'); // Bouton de pagination suivant

    function displayTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = datadata.slice(start, end);

        tableBody.innerHTML = ''; // Vider le corps du tableau

        paginatedData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${row.rank}</td>
              <td>${row.name}</td>
              <td>${row.score}</td>
              <td>${row.time}</td>
            `;
            tableBody.appendChild(tr);
        });

        pageInfo.textContent = `Page ${page} sur ${Math.ceil(datadata.length / rowsPerPage)}`; // Mettre à jour les informations de pagination

        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === Math.ceil(datadata.length / rowsPerPage);
    }

    // Événements pour la navigation des pages
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable(currentPage);
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(datadata.length / rowsPerPage)) {
            currentPage++;
            displayTable(currentPage);
        }
    });

    displayTable(currentPage); // Afficher la première page au chargement
}

// Fonction pour trier les données
export function sortData(data) {
    console.log("ici");
    data.sort((a, b) => {
        // Comparer les scores (tri décroissant)
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;

        // Si les scores sont égaux, comparer les temps (tri croissant)
        let timeA = a.time.split(":").map(Number);
        let timeB = b.time.split(":").map(Number);

        let minutesA = timeA[0] * 60 + timeA[1];
        let minutesB = timeB[0] * 60 + timeB[1];

        return minutesA - minutesB;
    });

    // Mettre à jour les rangs après le tri
    data.forEach((item, index) => {
        item.rank = index + 1;
    });

    // Ajouter des écouteurs d'événements pour redémarrer ou quitter
    let rstart = document.getElementById("restartR");
    let quitq = document.getElementById("quitQ");
    if (rstart && quitq) {
        rstart.addEventListener("click", reStart);
        quitq.addEventListener("click", reloadFromStart);
    }

    let rplayy = document.getElementById("rplay");
    let qquitt = document.getElementById("qquit");
    if (rplayy && qquitt) {
        rplayy.addEventListener("click", reStartAfterwin);
        qquitt.addEventListener("click", reloadFromStart);
    }

    return data;
}

// Fonction pour afficher le tableau des scores
export function tabScore(data) {
    const body = document.querySelector("body");
    let scoreContainer = document.createElement("div");
    scoreContainer.classList.add("scoreContainer");
    body.appendChild(scoreContainer);
    scoreContainer.innerHTML = pagi; // Utiliser le modèle pour le tableau des scores
    pagination(sortData(data)); // Afficher les données paginées triées
}
