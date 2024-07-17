// Importation des fonctions et des objets nécessaires depuis d'autres modules
import { initMap, removeOldBricks } from "./buildMap.mjs";
import { tileMap } from "./templates.mjs";
import { addHeart, initHead, removeHeart } from "./utils.mjs";
import { gameLoop } from "./core.mjs";

// Fonction pour initialiser le jeu avec la carte choisie
export function init(choosedMap) {
  removeOldBricks(); // Supprimer les anciennes briques du jeu

  // Initialiser la carte en fonction de la carte choisie
  if (choosedMap == "first") {
    initMap(tileMap.first.map);
  } else if (choosedMap == "second") {
    initMap(tileMap.second.map);
  } else {
    initMap(tileMap.fourth.map);
  }
}

// Fonction pour démarrer le jeu
export function play(life, choosedMap) {
  initHead(); // Initialiser l'entête du jeu
  startGame(life, choosedMap); // Commencer le jeu avec les vies et la carte choisie
}

// Fonction pour réinitialiser l'état du jeu
export function resetGameState(life, choosedMap) {
  let gameBody = document.getElementById("gameBody");
  let second = document.getElementById("secondDiv");
  document.getElementById("ball").remove(); // Supprimer l'élément de la balle
  setTimeout(() => {
    removeHeart(life); // Retirer un cœur (une vie)

    // Lancer la boucle de jeu avec les paramètres de vitesse et de carte choisis
    if (choosedMap == "first") {
      gameLoop(gameBody, second, life, tileMap.first.vitesse);
    } else if (choosedMap == "second") {
      gameLoop(gameBody, second, life, tileMap.second.vitesse);
    } else {
      gameLoop(gameBody, second, life, tileMap.third.vitesse);
    }
  }, 500); // Délai de 500 ms avant de lancer la boucle de jeu
}

// Fonction pour commencer le jeu
export function startGame(life, choosedMap) {
  let gameBody = document.getElementById("gameBody");
  var second = document.getElementById("secondDiv");
  setTimeout(() => {
    let coeur = document.getElementById("hearts");

    // Ajouter des cœurs si aucun n'est présent
    if (!coeur) {
      addHeart();
    }

    gameBody.classList.add("gamebody"); // Ajouter une classe au corps du jeu
    init(choosedMap); // Initialiser le jeu avec la carte choisie

    // Lancer la boucle de jeu avec les paramètres de vitesse et de carte choisis
    if (choosedMap == "first") {
      gameLoop(gameBody, second, life, tileMap.first.vitesse);
    } else if (choosedMap == "second") {
      gameLoop(gameBody, second, life, tileMap.second.vitesse);
    } else {
      gameLoop(gameBody, second, life, tileMap.third.vitesse);
    }
  }, 490); // Délai de 490 ms avant de lancer la boucle de jeu
}


