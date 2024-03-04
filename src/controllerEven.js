// // import { drawForme, drawGrille, nouvelleForme, refreshCanvas } from "./App";

// // !!!zone lier aux evenements!!!
// function moveLeft() {
//   formX = Math.max(formX - 1, 0); // Déplacer vers la gauche, en restant dans les limites du canvas
// }

// function moveRight() {
//   formX = Math.min(formX + 1, LARGEUR_GRILLE - 3); // Déplacer vers la droite, en restant dans les limites du canvas
// }

// // !!!Gestion des évènements clavier!!!
// controlPressed = false;
// shiftPressed = false;
// cPressed = false;
// zPressed = false;
// window.addEventListener(
//   "keydown",
//   function (event) {
//     let key = event.key;
//     switch (key) {
//       case "1":
//       case "5":
//       case "9":
//       case "x": // flèche x et haut => rotation horaire de la forme
//       case "ArrowUp":
//         temp = rotation;
//         forme = forme;
//         rotation++;
//         if (rotation > forme[numForme].length - 1) rotation = 0;
//         if (collision()) rotation = temp;
//         break;

//       case "z": // Z => rotation anti-horaire de la forme
//         zPressed = true;
//         break;

//       case "3": //  rotation anti-horaire de la forme
//       case "7":
//         forme = formeAntiHoraire; // changement de tableau
//         temp = rotation;
//         rotation++;
//         if (rotation > forme[numForme].length - 1) rotation = 0;
//         if (collision()) rotation = temp;
//         break;

//       case "t": // toutche t
//         numForme++;
//         if (numForme > forme.length - 1) numForme = 0;
//         // refreshCanvas();
//         break;

//       case "4":
//       case "ArrowLeft":
//         moveLeft();
//         break;

//       case "6":
//       case "ArrowRight":
//         moveRight();
//         break;

//       case "2":
//       case " ":
//         delay -= 200;
//         if (delay < 50) delay = 50; // Limiter la vitesse minimale
//         intervalId = setInterval(refreshCanvas, delay); // Redémarrer l'intervalle avec la nouvelle vitesse
//         break;

//       case "8":
//       case "ArrowDown": // Flèche bas => descente rapide
//         while (!collision()) {
//           formY++;
//         }
//         formY--; // Revenir d'un pas en arrière car la descente rapide a détecté une collision
//         break;

//       case "Enter":
//       case "Escape":
//       case "F1":
//         if (isPaused) {
//           // console.log("doit faire play");
//           isPaused = false;
//           intervalId = setInterval(refreshCanvas, delay);
//         } else {
//           // console.log("met le jeu en pause");
//           isPaused = true;
//           clearInterval(intervalId);
//           // clearTimeout(intervalId);
//         }
//       case "Shift": // Shift => maintenir
//         shiftPressed = true;
//         break;

//       case "c": // C => maintenir
//         if (!cPressed) {
//           cPressed = true;
//         } else {
//           cPressed = false;
//         }
//         break;

//       case "Control": // Ctrl => maintenir
//         if (!controlPressed) {
//           controlPressed = true;
//         } else {
//           controlPressed = false;
//         }

//         break;
//       //  /////////////////////////////////////////////////////
//       // !!relancer le jeu en cas de fin ou collision vers le haut
//       case "Enter":
//         if (isGameOver) {
//           console.log("dans entrer relancer le jeu");
//           // Relancer le jeu
//           isGameOver = false;
//           initGrille();
//           numForme = nouvelleForme();
//           formeSuivante = nouvelleForme();
//           formY = Y_INITIAL;
//           formX = X_INITIAL;
//           rotation = 0;
//           score = 0; // Ajouter cette ligne si vous souhaitez réinitialiser le score
//           delay = 250;
//           intervalId = setInterval(refreshCanvas, delay);
//         }
//         break;
//     }
//     // control+z => rotation anti horaire
//     if (controlPressed && zPressed) {
//       forme = formeAntiHoraire; // changement de tableau
//       temp = rotation;
//       rotation++;`
//       if (rotation > forme[numForme].length - 1) rotation = 0;
//       if (collision()) rotation = temp;
//     }
//   },
//   true
// );

// // !!!fin des evenements!!!
