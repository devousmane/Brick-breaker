// Contenu HTML pour la page d'accueil
export let homeHtml = `
<div id="brickImgContainer"></div> <!-- Conteneur pour l'image du logo -->
<div id="bricksansball"><img src="/assets/bricklogosansball.svg" alt="" style="width: 100%;"></div> <!-- Image du logo sans la balle -->
<div id="test">
    <div id="presstostart"><img src="/assets/pressToStart.svg" alt="" style="width: 90%;"></div> <!-- Image "Press to Start" -->
</div>
<div id="leftright"><img src="/assets/leftright.svg" alt="" style="width: 80%;"></div> <!-- Image des instructions gauche/droite -->
<div id="betterexp">press f11 for better experience <i class="fas fa-expand"></i></div> <!-- Instructions pour une meilleure expérience -->
`

// Contenu HTML pour le début du jeu
export let startHtml = ` 
<div id="logo"><img src="/assets/bricklogo.svg" alt="" /></div> <!-- Logo du jeu -->
<div id="lefthead">
  <div id="score">score: <span class="score">0</span></div> <!-- Affichage du score -->
  <div id="lifesHearts">
    <div id="life">life:</div> <!-- Affichage des vies -->
  </div>
  <div id="timer">Time: 0:00</div> <!-- Affichage du temps écoulé -->
  <div id="pause"><img src="../assets/pause.svg" alt="" /></div> <!-- Bouton de pause -->
</div>
`

// Contenu HTML pour les cœurs représentant les vies du joueur
export let heartHtml = `
<div id="hearts">
  <div id="heart1"><img src="/assets/heart.svg" alt=""></div> <!-- Image du premier cœur -->
  <div id="heart2"><img src="/assets/heart.svg" alt=""></div> <!-- Image du deuxième cœur -->
  <div id="heart3"><img src="/assets/heart.svg" alt=""></div> <!-- Image du troisième cœur -->
</div>
`

// Contenu HTML pour le menu de pause
export let pauseHTML = `
<div id="overlay"></div> <!-- Superposition pour le menu de pause -->
<div id="pauseMenu">
    <div id="gamepaused">
        <img src="assets/GAME PAUSED.svg" alt="" style="width: 500px;"> <!-- Image "Game Paused" -->
    </div>
    <div id="scoretimerlife"></div> <!-- Conteneur pour afficher le score, le temps et les vies -->
    <div id="restartreplayquit">
        <div id="restart"><img src="assets/RESTART.svg" alt=""  ></div> <!-- Bouton de redémarrage -->
        <div id="replay"><img src="assets/REPLAY.svg" alt=""></div> <!-- Bouton de rejouer -->
        <div id="quit"><img src="assets/QUIT.svg" alt="" style="width: 50px;"></div> <!-- Bouton de quitter -->
    </div>
    <div id="pressh">Press R to restart and C to replay</div> <!-- Instructions pour redémarrer et rejouer -->
</div>
`

// Contenu HTML pour l'écran de fin de jeu
export let gameoverHTML = `
<div id="finish">
    <div id="gameover"><img src="assets/gameover.svg" alt=""></div> <!-- Image "Game Over" -->
    <div id="yourscore"><img src="assets/Your Final score.svg" alt=""></div> <!-- Texte "Your Final Score" -->
    <div id="myscore">123</div> <!-- Affichage du score final -->
    <div id="restartquit">
        <div id="restartR"><img src="assets/RESTART- R.svg" alt=""></div> <!-- Bouton de redémarrage -->
        <div id="quitQ"><img src="assets/QUIT- Q.svg" alt=""></div> <!-- Bouton de quitter -->
    </div>
</div>
`

// Contenu HTML pour l'écran de victoire
export let winHTML = `
<div id="youwin">
<div id="lgbreaker"><img src="assets/logoorange.svg" alt="" width="60%"></div> <!-- Logo de victoire -->
<div id="yourtimeandscore">
    <div id="yourtime">YOUR TIME:</div> <!-- Texte "Your Time" -->
    <div id="yourscore">YOUR SCORE:</div> <!-- Texte "Your Score" -->
</div>
<div id="ywin"><img src="assets/youwin.svg" alt="" width="50%"></div> <!-- Image "You Win" -->
<div id="rq">
    <div id="rplay"><img src="assets/Replay- R.svg" alt="" width="70%"></div> <!-- Bouton de rejouer -->
    <div id="qquit"><img src="assets/Quit- Q.svg" alt="" width="70%"></div> <!-- Bouton de quitter -->
</div>
<div id="shorcut">
    <img src="assets/Shortcut to quit -Press Q.svg" width="70%" alt=""> <!-- Instructions pour quitter rapidement -->
</div>
</div>
`

// Contenu HTML pour le squelette du jeu
export let skeletonHTML = `
<div id="main_container">
  <div id="gameHead"></div> <!-- En-tête du jeu -->
  <div id="gameBody"></div> <!-- Corps du jeu -->
</div>
`

// Contenu HTML pour demander le nom du joueur pour le score
export let nameForScore = `
<div id="overlay"></div>
<div id="askname">
    <div>veuillez saisir votre nom</div> <!-- Instructions pour entrer le nom -->
    <div id="getnameofplayer">
        <input type="text" placeholder="ex: Baba Ndiaye" id="nameofplayer"> <!-- Champ de saisie pour le nom -->
        <button id="sendButton">send</button> <!-- Bouton pour envoyer le nom -->
    </div>
</div>
`

// Contenu HTML pour la pagination des scores
export let pagi = `
<div id="playerstat"></div> <!-- Statistiques du joueur -->
<table id="data-table">
<thead>
  <tr>
    <th>rank</th> <!-- Colonne pour le rang -->
    <th>Name</th> <!-- Colonne pour le nom -->
    <th>Score</th> <!-- Colonne pour le score -->
    <th>Time</th> <!-- Colonne pour le temps -->
  </tr>
</thead>
<tbody>
  <!-- Les lignes du tableau seront ajoutées ici dynamiquement -->
</tbody>
</table>
<div class="pagination">
<button id="prev-btn" disabled>Précédent</button> <!-- Bouton précédent -->
<span id="page-info"></span> <!-- Informations sur la page -->
<button id="next-btn">Suivant</button> <!-- Bouton suivant -->
</div>
`

// Tableaux représentant les différentes configurations de briques pour la page d'accueil
export let allBrickHome = [
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 0, 1, 2, 1, 2, 1, 2, 1, 0, 1, 2, 1, 2, 1, 2],
  [1, 0, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 1, 2, 1, 2]
]


// Objet représentant les propriétés de la carte du jeu
export let tileMap = {
  columns: 16, // Nombre de colonnes
  rows: 7, // Nombre de rangées
  size: 112, // Taille des tuiles
  tileSet: {
    rouge: "assets/rouge.svg", // Chemin de l'image pour les tuiles rouges
    orange: "assets/orange.svg", // Chemin de l'image pour les tuiles oranges
  },
  first: {
    vitesse: 7, // Vitesse pour la première configuration
    map: [
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  second: {
    vitesse: 9, // Vitesse pour la deuxième configuration
    map: [
      [2, 2, 2, 0, 0, 2, 2, 2, 1, 1, 1, 0, 0, 1, 1, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 2, 0, 2, 0, 2, 0, 2, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 2, 2, 2, 0, 2, 2, 2, 1, 1, 1, 0, 1, 1, 1, 0],
      [0, 2, 0, 2, 0, 2, 0, 2, 1, 0, 1, 0, 1, 0, 1, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 2, 2, 0, 0, 2, 2, 2, 1, 1, 1, 0, 0, 1, 1, 1],
    ]
  },
  third: {
    vitesse: 11, // Vitesse pour la troisième configuration
    map: [
      [0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 1, 0, 1],
      [0, 1, 0, 0, 0, 2, 0, 2, 1, 0, 2, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 2, 1, 2, 1, 1, 2, 0, 0, 0, 1, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  // Fonction pour obtenir une tuile spécifique en fonction de la colonne et de la rangée
  getTile: (col, row) => this.tiles[row * map.columns + col]
}
