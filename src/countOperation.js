function effaceLigne(numeroLigne) {
  // Clear the specified line
  for (let y = numeroLigne; y > 0; y--) {
    for (let x = 0; x < LARGEUR_GRILLE; x++) {
      grille[x][y] = grille[x][y - 1];
    }
  }
  // Add a new empty line at the top
  for (let x = 0; x < LARGEUR_GRILLE; x++) {
    grille[x][0] = -1;
  }
}

function verifierLignes() {
  for (let y = 0; y < HAUTEUR_GRILLE; y++) {
    let ligneComplete = true;

    // Check if the line is complete
    for (let x = 0; x < LARGEUR_GRILLE; x++) {
      if (grille[x][y] === -1) {
        ligneComplete = false;
        break;
      }
    }
    // If the line is complete, delete it and increment the counter    if (ligneComplete) {
    if (ligneComplete) {
      effaceLigne(y);
      line++;
      if (line % 2 == 0) {
        level += 1;
      }
      dansConditionCollisionComptePoint = 1;
      y--; // Reexamine the current row after shifting down
    }
  }
}
