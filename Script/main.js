// Importation des fonctions et des objets nécessaires depuis d'autres modules
import { initMap, createTwoDiv, removeOldBricks } from './buildMap.mjs';
import { homeHtml, allBrickHome } from './templates.mjs';
import { play } from './initGame.mjs';
import { playSound } from "./utils.mjs";
import { theChoosenMap } from './core.mjs';

// Variable pour suivre si une carte a été sélectionnée
let ifSelectMap = false;

// Événement déclenché lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function () {
  start(); // Démarrer le jeu en affichant l'écran d'accueil
  let life = 3; // Initialiser le nombre de vies à 3

  // Ajouter un écouteur d'événements pour les touches pressées
  document.addEventListener('keypress', function (e) {
    let selectMap = document.getElementById("selectMap");

    // Vérifier si la touche 'Enter' est pressée et qu'aucune carte n'a été sélectionnée
    if (e.key === 'Enter' && !ifSelectMap) {
      cleanUp(); // Nettoyer l'écran d'accueil
      let gameBody = document.getElementById("gameBody");

      // HTML pour sélectionner une carte
      let choosedMap = `
        <div id="selectMap">
          <div id="title"></div>
          <div id="threeMap"></div>
        </div>
      `;

      // Ajouter l'élément de sélection de carte après un délai
      setTimeout(() => {
        gameBody.innerHTML += choosedMap;
        ifSelectMap = true;
      }, 200);

      // Ajouter les images des cartes disponibles après des délais successifs
      setTimeout(() => {
        document.getElementById("threeMap").innerHTML += '<div id="first"><img src="assets/first.png" alt=""></div>';
      }, 250);
      setTimeout(() => {
        document.getElementById("threeMap").innerHTML += '<div id="second"><img src="assets/second.png" alt=""></div>';
      }, 300);
      setTimeout(() => {
        document.getElementById("threeMap").innerHTML += '<div id="third"><img src="assets/third.png" alt=""></div>';
      }, 400);

      // Ajouter le titre de la sélection de carte après un délai
      setTimeout(() => {
        let title = document.getElementById("title");
        title.innerHTML = "Veuillez choisir une map";
        title.classList.add("myanime");
      }, 700);

      // Positionner l'élément de sélection de carte et ajouter des écouteurs d'événements après un délai
      setTimeout(() => {
        selectMap = document.getElementById("selectMap");
        selectMap.style.position = "absolute";
        allEventlistenerForMap(life); // Ajouter des écouteurs d'événements pour chaque carte
      }, 800);
    }
  });
});

// Fonction pour nettoyer l'écran d'accueil
function cleanUp() {
  let brick = document.getElementById("brickImgContainer");
  let logo00 = document.getElementById("bricksansball");
  let betterexp = document.getElementById("betterexp");
  let leftto = document.getElementById("leftright");
  let logo01 = document.getElementById("gameHead");
  let press = document.getElementById("test");

  // Vérifier si tous les éléments existent, les masquer et les supprimer
  if (logo00 && press && leftto && betterexp && logo01 && brick) {
    const elementsToRemove = [logo00, press, leftto, betterexp, brick];
    elementsToRemove.forEach((element) => {
      element.classList.add("disparition");
      element.remove();
    });
  }
  removeOldBricks(); // Supprimer les anciennes briques
}

// Fonction pour démarrer le jeu en affichant l'écran d'accueil
function start() {
  gameBody.innerHTML = homeHtml;
  createTwoDiv(); // Créer deux divs pour le jeu
  initMap(allBrickHome); // Initialiser la carte d'accueil
}

// Fonction pour ajouter des écouteurs d'événements pour chaque carte
function allEventlistenerForMap(life) {
  // Écouteur pour la première carte
  document.getElementById("first").addEventListener("click", function () {
    document.getElementById("selectMap").remove();
    theChoosenMap.laMapChoisie = "first"; // Choisir la première carte
    play(life, theChoosenMap.laMapChoisie); // Démarrer le jeu avec la première carte
  });

  // Écouteur pour la deuxième carte
  document.getElementById("second").addEventListener("click", function () {
    document.getElementById("selectMap").remove();
    theChoosenMap.laMapChoisie = "second"; // Choisir la deuxième carte
    play(life, theChoosenMap.laMapChoisie); // Démarrer le jeu avec la deuxième carte
  });

  // Écouteur pour la troisième carte
  document.getElementById("third").addEventListener("click", function () {
    document.getElementById("selectMap").remove();
    theChoosenMap.laMapChoisie = "third"; // Choisir la troisième carte
    play(life, theChoosenMap.laMapChoisie); // Démarrer le jeu avec la troisième carte
  });
}
