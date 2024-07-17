// Fonction pour détecter la collision entre la balle et les briques
export function collisionBallBrick(ballX, ballY) {
  // Récupération de l'élément balle
  const ball = document.getElementById("ball");
  // Obtenir la position de la balle
  const ballPosition = ball.getBoundingClientRect();

  // Informations sur la position de la balle
  const ballInfo = {
    x: ballPosition.left,
    xx: ballPosition.left + ball.offsetWidth,
    y: ballPosition.top,
    yy: ballPosition.top + ball.offsetHeight,
  };

  // Liste de toutes les briques
  const brickList = Array.from(document.getElementsByClassName("setBrick"));

  // Boucle pour vérifier la collision avec chaque brique
  for (let i = 0; i < brickList.length; i++) {
    const brick = brickList[i];
    const rect = brick.getBoundingClientRect();

    // Vérification de la collision entre la balle et la brique actuelle
    if (
      ballInfo.xx > rect.left &&
      ballInfo.x < rect.left + rect.width &&
      ballInfo.yy > rect.top &&
      ballInfo.y < rect.top + rect.height
    ) {
      // Vérification de la direction de la collision
      if (
        verticaleCollision(ballInfo, rect) >
        horizontaleCollision(ballInfo, rect) / 1.8
      ) {
        handleBrickCollision(brick); // Gestion de la collision avec la brique
        const collisionDirection = "top";
        return [true, brick.id, collisionDirection]; // Retourner les détails de la collision
      } else {
        handleBrickCollision(brick); // Gestion de la collision avec la brique
        const collisionDirection = "left";
        return [true, brick.id, collisionDirection]; // Retourner les détails de la collision
      }
    }
  }

  return [false]; // Pas de collision détectée
}

var time = 0;
// Fonction pour gérer la collision avec une brique
function handleBrickCollision(brick) {
  let score = document.querySelector(".score");
  brick.classList.add("hit"); // Ajouter une classe pour marquer la brique comme touchée
  score.textContent = Number(score.textContent) + 10; // Augmenter le score
  time++;
  brick.remove(); // Supprimer la brique touchée
}

// Fonction pour calculer la collision verticale
function verticaleCollision(ballInfo, rect) {
  return Math.max(
    0,
    hautCollision(ballInfo, rect),
    basCollision(ballInfo, rect)
  );
}

// Fonction pour calculer la collision horizontale
function horizontaleCollision(ballInfo, rect) {
  return Math.max(
    0,
    gaucheCollision(ballInfo, rect),
    droitCollision(ballInfo, rect)
  );
}

// Fonction pour vérifier la collision par le haut
function hautCollision(ballInfo, rect) {
  if (ballInfo.yy >= rect.top) {
    const diff = ballInfo.yy - rect.top;
    return diff;
  }
  return -1;
}

// Fonction pour vérifier la collision par le bas
function basCollision(ballInfo, rect) {
  if (rect.top + rect.height >= ballInfo.y) {
    const diff = rect.top + rect.height - ballInfo.y;
    return diff;
  }
  return -1;
}

// Fonction pour vérifier la collision par la gauche
function gaucheCollision(ballInfo, rect) {
  if (ballInfo.xx >= rect.left) {
    const diff = ballInfo.xx - rect.left;
    return diff;
  }
  return -1;
}

// Fonction pour vérifier la collision par la droite
function droitCollision(ballInfo, rect) {
  if (rect.left + rect.width >= ballInfo.x) {
    const diff = rect.left + rect.width - ballInfo.x;
    return diff;
  }
  return -1;
}
