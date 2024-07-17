// Importation des contenus HTML pour l'en-tête du jeu et les cœurs des vies depuis le fichier templates.mjs
import { startHtml, heartHtml } from "./templates.mjs";

// Fonction pour initialiser l'en-tête du jeu
export function initHead() {
  let logo01 = document.getElementById("gameHead"); // Sélection de l'élément avec l'ID "gameHead"
  logo01.innerHTML = startHtml; // Ajout du contenu HTML pour l'en-tête du jeu
}

// Fonction pour ajouter un cœur représentant une vie
export function addHeart() {
  let life = document.getElementById("lifesHearts"); // Sélection de l'élément avec l'ID "lifesHearts"
  life.innerHTML += heartHtml; // Ajout du contenu HTML pour un cœur
}

// Fonction pour supprimer un cœur représentant une vie
export function removeHeart(life) {
  let heartToremove = `heart${life + 1}`; // ID du cœur à supprimer (les IDs sont sous forme "heart1", "heart2", etc.)
  document.getElementById(heartToremove).remove(); // Suppression de l'élément avec l'ID correspondant
}

// Fonction pour jouer un son
export function playSound(v) {
  var myAudio = document.createElement("audio"); // Création d'un élément audio
  myAudio.src = v; // Définition de la source du son
  myAudio.play(); // Lecture du son
}

// Variables pour le timer
let timer = 0, timerInterval = null;

// Fonction pour démarrer le timer
export function startTimer() {
  const timeText = document.getElementById("timer"); // Sélection de l'élément avec l'ID "timer"

  // Fonction pour mettre à jour l'affichage du temps
  function updateTime() {
    let minutes = Math.floor(timer / 60); // Calcul des minutes
    let seconds = timer % 60; // Calcul des secondes
    let myTime = "Time: " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds; // Formatage du temps
    timeText.textContent = myTime; // Mise à jour du contenu texte de l'élément "timer"
  }

  // Fonction pour démarrer le timer
  function start() {
    if (timerInterval === null) {
      timerInterval = setInterval(function () {
        timer++;
        updateTime();
      }, 1000); // Mise à jour du timer toutes les secondes
    }
  }

  // Fonction pour mettre le timer en pause
  function pause() {
    clearInterval(timerInterval); // Arrêt du timer
    timerInterval = null;
  }

  // Fonction pour réinitialiser le timer
  function reset() {
    timer = 0; // Réinitialisation du compteur de temps
    updateTime(); // Mise à jour de l'affichage
  }

  start(); // Démarrage du timer immédiatement

  return {
    pause: pause, // Méthode pour mettre en pause le timer
    resume: start, // Méthode pour reprendre le timer
    reset: reset, // Méthode pour réinitialiser le timer
  };
}

// Fonction pour obtenir le score final du joueur
export function getmyfinalscore() {
  let score = document.querySelector(".score"); // Sélection de l'élément contenant le score
  score.textContent = Number(score.textContent); // Conversion du contenu texte en nombre
  return score.textContent; // Retour du score final
}

// Fonction pour obtenir le temps final
export function getfinalTime() {
  let timer = document.getElementById("timer"); // Sélection de l'élément contenant le temps
  timer.textContent = timer.textContent; // Mise à jour du contenu texte
  return timer.textContent; // Retour du temps final
}
