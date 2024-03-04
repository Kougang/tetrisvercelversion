// !!! variables déclaration  !!!
const LARGEUR_GRILLE = 14; // number of weidth cases
const HAUTEUR_GRILLE = 28; // number of height cases
const CARREAU = 20; // Size in pixels of a grid box
let canvas; // A canvas is an HTML element in which you can draw shapes

let ctx;

const X_INITIAL = 5;
const Y_INITIAL = 0;
let formX = X_INITIAL;
let formY = Y_INITIAL;

let numForme = 0;
let rotation = 0;
let delay = 250;
let intervalId;

// grille table declaration
var grille = new Array(LARGEUR_GRILLE);

let formeSuivante = numForme;

let score = 0;
let scoreFormY = 0;
let level = 0;

let dansConditionCollisionComptePoint = 0;
let isPaused = false;
let isGameOver = false;

let countdown = 3;
let line = 0;
let inter = 0;
// !!!color definition table

let couleursFormes = [
  ["#00FFFF", "#00FF00"], // Couleurs pour la forme 0 (L1-Forme)
  ["#FFFF00", "#00FF00"], // Couleurs pour la forme 1 (L2-Forme)
  ["#800080", "#00FF00"],
  ["008000", "#00FF00"],
  ["#FF0000", "#00FF00"],
  ["#0000FF", "#00FF00"],
  ["#FFA500", "#00FF00"],
];

// !!!forme definition table

// forme definition table
let forme = new Array();
let formeAntiHoraire = new Array();
// L1-Forme
forme[0] = [
  // L1-Forme
  [
    // rotation 0
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, 1],
  ],
  [
    // rotation 1
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, 1, -1],
  ],
  [
    // rotation 2
    [-1, -1, -1],
    [1, 1, 1],
    [-1, -1, 1],
  ],
  [
    // rotation 3
    [-1, 1, -1],
    [-1, 1, -1],
    [1, 1, -1],
  ],
];
// L1-formeAntiHoraire
formeAntiHoraire[0] = [
  // L1-Forme
  [
    // rotation 0
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    // rotation 1
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    // rotation 2
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    // rotation 3
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
];

// L2-Forme
forme[1] = [
  // L2-Forme
  [
    // rotation 0
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    // rotation 1
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    // rotation 2
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    // rotation 3
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
];
// L2-formeAntiHoraire
formeAntiHoraire[1] = [
  [
    // rotation 0
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    // rotation 1
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    // rotation 2
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    // rotation 3
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
];

// J1-Forme 2
forme[2] = [
  // J1-Forme 2
  [
    // rotation 0 (cette forme là n'a besoin que de 2 rotations)
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    // rotation 1
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
];
// J1-formeAntiHoraire
formeAntiHoraire[2] = [
  [
    // rotation 0 (cette forme là n'a besoin que de 2 rotations)
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],

  [
    // rotation 1
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

// J2-Forme 2
forme[3] = [
  // J2-Forme 2
  [
    // rotation 0 (cette forme là n'a besoin que de 2 rotations)
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    // rotation 1
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
];
// J2-formeAntiHoraire
formeAntiHoraire[3] = [
  // J2-Forme 2
  [
    // rotation 0 (cette forme là n'a besoin que de 2 rotations)
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    // rotation 1
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

// carre-forme
forme[4] = [
  // carre-forme
  [
    // rotation 0
    [1, 1],
    [1, 1],
  ],
];
// carre-formeAntiHoraire
formeAntiHoraire[4] = [
  // carre-forme
  [
    // rotation 0
    [1, 1],
    [1, 1],
  ],
];

// barre-forme
forme[5] = [
  // barre-forme
  [
    // rotation 0
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    // rotation 1
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
];
// barre-formeAntiHoraire
formeAntiHoraire[5] = [
  // barre-forme
  [
    // rotation 0
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    // rotation 1
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
];

// T-forme
forme[6] = [
  // T-forme
  [
    // rotation 0
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  [
    // rotation 1
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],

  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];
// T-formeAntiHoraire
formeAntiHoraire[6] = [
  // T-forme
  [
    // rotation 0
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  [
    // rotation 1
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],

  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
];
