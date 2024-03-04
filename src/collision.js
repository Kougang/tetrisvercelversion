function collision() {
  for (let x = 0; x < forme[numForme][rotation].length; x++) {
    for (let y = 0; y < forme[numForme][rotation].length; y++) {
      if (forme[numForme][rotation][y][x] == 0) {
        if (formX + x + 2 < 0) {
          return true;
        }
      }

      if (forme[numForme][rotation][y][x] == 1) {
        // Vérification des collisions avec les bords
        if (
          formX + x < 0 ||
          formX + x >= LARGEUR_GRILLE ||
          formY + y >= HAUTEUR_GRILLE
        ) {
          return true;
        }
        if (grille[formX + x][formY + y] > -1) {
          // cette ligne permet la superposition des pieces
          return true;
        }
      }
    }
  }
  return false;
}

// / Initialisation du tableau grille
function initGrille() {
  for (let x = 0; x < LARGEUR_GRILLE; x++) {
    grille[x] = new Array(HAUTEUR_GRILLE);
    for (let y = 0; y < HAUTEUR_GRILLE; y++) {
      grille[x][y] = -1; // Initialisation avec la valeur -1
    }
  }
}
// console.log("avant l entree dans forme");

// // Fonction pour copier la forme dans la grille
function copierFormeDansLaGrille() {
  // console.log("dans copie forme");
  for (let x = 0; x < forme[numForme][rotation].length; x++) {
    for (let y = 0; y < forme[numForme][rotation].length; y++) {
      if (forme[numForme][rotation][y][x] == 1) {
        grille[formX + x][formY + y] = numForme;
      }
    }
  }
  //   console.table(grille);
}

// forme[0][0][0][y]

// forme = [[[[0, 0, 0],[1, 0, 0],[1, 1, 1],
//           ],
//           [[0, 1, 1],[0, 1, 0],[0, 1, 0],],
//           [[0, 0, 0],[1, 1, 1],[0, 0, 1],],
//           [[0, 1, 0],[0, 1, 0],[1, 1, 0],],
//         ],];

//         forme[numforme][rotation][rotation_proprement_dite][y]

//         for (let x = 0; x < forme[numForme][rotation].length; x++) {
//           for (let y = 0; y < forme[numForme][rotation][x].length; y++) {

//             if (forme[numForme][rotation][y][x] == 1) {
