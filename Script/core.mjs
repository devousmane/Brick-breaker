// Importation des modules nécessaires
import { init, resetGameState, startGame } from "./initGame.mjs";
import { pauseHTML, gameoverHTML, skeletonHTML, winHTML, tileMap } from "./templates.mjs";
import { collisionBallBrick } from "./collision.mjs";
import { playSound, addHeart, initHead, startTimer, getfinalTime, getmyfinalscore } from "./utils.mjs";
import { createTwoDiv } from "./buildMap.mjs";
import { askfortabscore } from "./scoreList.mjs";

// Initialisation des variables
var posX = 0; // Position horizontale du paddle
var player = document.createElement("div"); // Création de l'élément représentant le paddle

// Définition des chemins des fichiers audio
const fail = "/sounds/failure.wav",
  pop = "/sounds/pop.wav",
  success = "/sounds/success.wav",
  laugh = "/sounds/laugh.wav";

var isPaused = false; // État de pause du jeu
var isGameOver = false; // État de fin de jeu
let timerControl; // Contrôle du timer

// Choix de la carte à utiliser
export let theChoosenMap = {
  laMapChoisie: "",
}

// Fonction pour construire le paddle et gérer son déplacement
function buildPaddle(gameBody, secondDiv) {
  posX = gameBody.offsetHeight / 2 + 150;
  player.classList.add("divAMover");
  secondDiv.appendChild(player);

  var vitesseDeplacement = 10;
  var toucheGauchePressee = false;
  var toucheDroitePressee = false;

  // Gestion des événements de pression des touches de direction
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      toucheGauchePressee = true;
    } else if (event.key === "ArrowRight") {
      toucheDroitePressee = true;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowLeft") {
      toucheGauchePressee = false;
    } else if (event.key === "ArrowRight") {
      toucheDroitePressee = false;
    }
  });

  // Mise à jour de la position du paddle
  function mettreAJourPosition() {
    if (toucheGauchePressee) {
      posX = Math.max(posX - vitesseDeplacement, 0);
    }
    if (toucheDroitePressee) {
      posX = Math.min(
        posX + vitesseDeplacement,
        gameBody.clientWidth - player.offsetWidth
      );
    }
  }

  return {
    deplacerDiv: function () {
      posX = Math.min(
        Math.max(posX, 0),
        gameBody.clientWidth - player.offsetWidth
      );
      player.style.transform = `translateX(${posX}px)`;
    },
    mettreAJourPosition: mettreAJourPosition,
  };
}

// Fonction pour gérer la balle
function ball(gameBody, life, vitesse) {
  const b = {
    x: gameBody.offsetWidth / 2,
    y: 250,
    w: 20,
    h: 20,
    dx: 0,
    dy: 1,
    speed: vitesse,
  };
  const ball = document.createElement("div");
  gameBody.append(ball);
  ball.id = "ball";
  ball.style.backgroundColor = "red";
  ball.style.borderRadius = "50%";
  ball.style.width = `${b.w}px`;
  ball.style.height = `${b.h}px`;
  ball.style.left = `${b.x}px`;
  ball.style.marginTop = `-${gameBody.offsetHeight + 0.04 * gameBody.offsetHeight}px`;

  // Fonction pour déplacer la balle
  function mover() {
    if (b.x > gameBody.offsetWidth - b.w || b.x < 0) {
      b.dx *= -1;
    }
    if (b.y < b.h) {
      b.dy *= -1;
    }
    if (b.y > gameBody.offsetHeight) {
      b.dy *= -1;
      retry(life);
      posX = gameBody.offsetHeight / 2 + 150;
      return;
    }

    const [brickCollision, brickId, collisionDirection] = collisionBallBrick(b.x, b.y);
    if (collisionDirection == "top" || collisionDirection == "bottom") {
      b.dy *= -1;
      checkWin();
    } else if (collisionDirection == "left" || collisionDirection == "right") {
      b.dx *= -1;
      checkWin();
    }

    var divRect = player.getBoundingClientRect();
    var ballRect = ball.getBoundingClientRect();

    // Détection des collisions avec le paddle
    if (
      ballRect.top < divRect.bottom &&
      ballRect.bottom > divRect.top &&
      ballRect.left < divRect.right &&
      ballRect.right > divRect.left
    ) {
      var intersectX = Math.min(Math.max(b.x + b.w / 2, posX), posX + 150);
      var relativeIntersectX = intersectX - (posX + 150 / 2);
      var normalizedRelativeIntersectionX = relativeIntersectX / (150 / 2);
      var bounceAngle = (normalizedRelativeIntersectionX * Math.PI) / 3;
      b.dx = Math.sin(bounceAngle);
      b.dy = -Math.cos(bounceAngle);
    }

    b.x += b.dx * b.speed;
    b.y += b.dy * b.speed;
    ball.style.transform = `translate(${b.x}px,${b.y}px)`;
  }

  return mover;
}

// Fonction pour vérifier la condition de victoire
function checkWin() {
  let NbrOfBricks = Array.from(document.getElementsByClassName("setBrick")).length;
  if (NbrOfBricks == 0) {
    let time = getfinalTime();
    let time2 = time.replace("Time:", "")
    let score = getmyfinalscore()

    isGameOver = true

    playSound(success);
    document.body.innerHTML = winHTML;
    document.getElementById("yourtime").innerHTML = "Your " + time;
    document.getElementById("yourscore").innerHTML = "Your Score: " + score;
    askfortabscore(score, time2)
    gameEnd();
  }
}

// Fonction principale de la boucle de jeu
export function gameLoop(gameBody, secondDiv, life, vitesse) {
  timerControl = startTimer();
  timerControl.resume();
  timerControl = startTimer();

  var player = buildPaddle(gameBody, secondDiv);
  var moverBall = ball(gameBody, life, vitesse);

  function animationLoop() {
    if (!isPaused && !isGameOver) {
      player.mettreAJourPosition();
      player.deplacerDiv();
      moverBall();
    }
    if (isGameOver) {
      gameOver();
      return;
    }
    requestAnimationFrame(animationLoop);
  }

  animationLoop();

  // Gestion des événements pour la pause du jeu
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "p":
        if (!isPaused && !isGameOver) {
          timerControl.pause();
          showPauseMenu();
        }
        break;
      default:
        break;
    }
  });

  document.getElementById("pause").addEventListener("click", showPauseMenu);
}

// Fonction pour afficher le menu de pause
function showPauseMenu() {
  isPaused = true;
  document.body.insertAdjacentHTML("beforeend", pauseHTML);
  document.getElementById("replay").addEventListener("click", function () {
    timerControl.resume()
    hidePauseMenu();
  });
  document.getElementById("restart").addEventListener("click", function () {
    hidePauseMenu();
    timerControl.reset()
    restartGame(theChoosenMap.laMapChoisie);
  });
  document.getElementById("quit").addEventListener("click", function () {
    location.reload()
  });
}

// Fonction pour cacher le menu de pause
export function hidePauseMenu() {
  var pauseMenu = document.getElementById("pauseMenu");
  var overlay = document.getElementById("overlay");
  if (pauseMenu) {
    pauseMenu.parentNode.removeChild(pauseMenu);
  }
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
  }
  isPaused = false;
}

// Fonction pour gérer les tentatives restantes après un échec
function retry(life) {
  life--;
  console.log("LIFE RETRY", life);
  if (life == 0) {
    const myfinalscore = getmyfinalscore();
    const myfinaltime = getfinalTime()
    timerControl.reset();
    timerControl.pause();
    playSound(laugh);
    document.body.innerHTML = gameoverHTML;

    askfortabscore(myfinalscore, myfinaltime)

    document.getElementById("myscore").innerHTML = myfinalscore;
    isGameOver = true;
    return;
  } else {
    playSound(fail);
    resetGameState(life, theChoosenMap.laMapChoisie);
  }
}

// Fonction pour redémarrer le jeu avec la carte choisie
function restartGame(choosedMap) {
  let second = document.getElementById("secondDiv");
  let life = 3;
  document.getElementById("ball").remove();
  isGameOver = false;

  setTimeout(() => {
    document.getElementById("hearts").remove();
    initHead();
    addHeart();
    gameBody.classList.add("gamebody");
    init(theChoosenMap.laMapChoisie);

    if (choosedMap == "first") {
      gameLoop(gameBody, second, life, tileMap.first.vitesse)
      console.log("vitesse: ", tileMap.first.vitesse);
    } else if (choosedMap == "second") {
      gameLoop(gameBody, second, life, tileMap.second.vitesse)
    } else {
      gameLoop(gameBody, second, life, tileMap.third.vitesse)
    }

    isPaused = false;
  }, 490);
}

// Fonction pour redémarrer le jeu après une victoire
function reStartAfterwin() {
  let life = 3;
  isGameOver = false;
  document.body.innerHTML = skeletonHTML;
  createTwoDiv();
  initHead();
  startGame(life, theChoosenMap.laMapChoisie);
}

// Export des fonctions de redémarrage
export function reStart() {
  reStartAfterwin();
}

export function reloadFromStart() {
  location.reload();
}

// Fonction pour gérer la fin de jeu
function gameOver() {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      default:
        break;
    }
  });
  document.getElementById("restartR").addEventListener("click", reStart);
  document.getElementById("quitQ").addEventListener("click", reloadFromStart);
}

// Fonction pour terminer le jeu
function gameEnd() {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      default:
        break;
    }
  });
  document.getElementById("rplay").addEventListener("click", reStartAfterwin);
  document.getElementById("qquit").addEventListener("click", reloadFromStart);
}