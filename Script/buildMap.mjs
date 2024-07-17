// Importation de tileMap depuis le module templates.mjs
import { tileMap } from "./templates.mjs";

// Calcul de l'intervalle entre les briques en fonction de la largeur de gameBody
const intervalle =
  (gameBody.offsetWidth - gameBody.offsetWidth * 0.05 * 16) / 17;

// Fonction pour créer deux divs, l'une pour le jeu et l'autre pour le contrôle
export function createTwoDiv() {
  let firstDiv = document.createElement('div'),
    secondDiv = document.createElement('div');
  firstDiv.setAttribute('id', 'firstdiv'); // Attribuer l'ID 'firstdiv' au premier div
  secondDiv.setAttribute('id', 'secondDiv'); // Attribuer l'ID 'secondDiv' au second div
  firstDiv.style.width = '100%';
  secondDiv.style.width = '100%';
  firstDiv.style.height = '95%';
  secondDiv.style.height = '5%';
  gameBody.append(firstDiv, secondDiv); // Ajouter les deux divs au gameBody
}

// Fonction pour initialiser la carte avec les briques
export function initMap(allBrick) {
  allBrick.forEach((line, rowIndex) => {
    let divLine = document.createElement('div');
    divLine.classList.add('divline');
    divLine.setAttribute('id', 'divline' + rowIndex.toString());
    let toThediv = document.getElementById('firstdiv');
    toThediv.appendChild(divLine); // Ajouter la ligne de briques au premier div
    line.forEach((type, columnIndex) => {
      let color;
      if (type === 1) {
        color = tileMap.tileSet.orange; // Brique de type 1 avec couleur orange
        setBrick(color, columnIndex, rowIndex); // Ajouter la brique avec la couleur définie
      } else if (type === 2) {
        color = tileMap.tileSet.rouge; // Brique de type 2 avec couleur rouge
        setBrick(color, columnIndex, rowIndex); // Ajouter la brique avec la couleur définie
      }
    });
  });
}

// Fonction pour définir et ajouter une brique
function setBrick(color, columnIndex, rowIndex) {
  const id = 'brickId' + rowIndex.toString() + columnIndex.toString();
  const div = document.createElement('div');
  div.classList.add('setBrick');
  div.setAttribute('id', id);
  div.style.backgroundImage = "url('" + color + "')";
  div.style.marginLeft = `${intervalle + columnIndex * (intervalle + 0.05 * gameBody.offsetWidth)}px`;
  const name = 'divline' + rowIndex.toString();
  document.getElementById(name).appendChild(div); // Ajouter la brique à la ligne correspondante
}

// Fonction pour supprimer les anciennes briques
export function removeOldBricks() {
  const oldBrickContainers = document.querySelectorAll('.divline');
  oldBrickContainers.forEach(container => container.remove()); // Supprimer chaque conteneur de briques
}
