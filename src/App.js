window.onload = function () {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // !!! the fonctions !!!

  function drawForme(numForme, formX, formY, rotation, forme, contexte) {
    for (x = 0; x < forme[numForme][rotation].length; x++) {
      for (y = 0; y < forme[numForme][rotation].length; y++) {
        if (forme[numForme][rotation][y][x] == 1) {
          contexte.fillStyle = couleursFormes[numForme][1]; // Shape outline color
          contexte.fillRect(
            (formX + x) * CARREAU,
            (formY + y) * CARREAU,
            CARREAU,
            CARREAU
          ); // Outline of shape
          contexte.fillStyle = couleursFormes[numForme][0]; // Shape fill color
          contexte.fillRect(
            (formX + x) * CARREAU + 1,
            (formY + y) * CARREAU + 1,
            CARREAU - 2,
            CARREAU - 2
          ); // Filling the shape
        }
      }
    }
  }
  ///////////////////////////////////////////////////////

  function drawGrille(contexte) {
    for (let x = 0; x < LARGEUR_GRILLE; x++) {
      for (let y = 0; y < HAUTEUR_GRILLE; y++) {
        if (grille[x][y] > -1) {
          contexte.fillStyle = couleursFormes[grille[x][y]][1]; // Shape outline color
          contexte.fillRect(x * CARREAU, y * CARREAU, CARREAU, CARREAU); // Outline of shape
          contexte.fillStyle = couleursFormes[grille[x][y]][0]; // Shape fill color
          contexte.fillRect(
            x * CARREAU + 1,
            y * CARREAU + 1,
            CARREAU - 2,
            CARREAU - 2
          ); // Filling the shape
        }
      }
    }
  }

  function nouvelleForme() {
    return Math.floor(Math.random() * forme.length);
  }

  function refreshCanvas() {
    // canvas cleaning 1
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // canvas cleaning 2
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    formY++;
    scoreFormY += 1;
    //   // Vérifier si la collision se produit à une hauteur critique (0 ou 1)
    if (collision()) {
      // stop condition
      if (formY <= 1 && !isGameOver) {
        formY--;
        // gamer loss
        isGameOver = true;
        clearInterval(intervalId);
        document.getElementById("endMessageText").innerText = "Perdu !";
        document.getElementById("endMessage").style.display = "block";

        // !!! audio zone
        const gameStartAudio = loadAudio(
          "gameStartAudio",
          "./son/gameover.wav"
        );
        var startButton = document.getElementById("play");
        startButton.addEventListener("click", function () {
          gameStartAudio.play();
        });
      } else {
        //reinitiate speed after pressed space button
        delay = 250;
        formY--;
        copierFormeDansLaGrille();
        formY = Y_INITIAL;
        formX = X_INITIAL;
        rotation = 0;

        numForme = formeSuivante;
        formeSuivante = nouvelleForme();
        verifierLignes();
      }
    }

    drawGrille(ctx); //display grille
    drawForme(formeSuivante, LARGEUR_GRILLE - 10, 2, 0, forme, ctx1);
    drawForme(numForme, formX, formY, rotation, forme, ctx);

    document.getElementById("score").innerText = scoreFormY;
    document.getElementById("lines").innerText = line;
    document.getElementById("level").innerText = level;

    if (!isGameOver) {
      clearInterval(intervalId);
      intervalId = setInterval(refreshCanvas, delay);
    }
  }

  ///////////////////////////////////////////////////////

  //   Init canvas
  function init() {
    canvas = document.getElementById("idcanvas");
    canvas.width = LARGEUR_GRILLE * CARREAU;
    canvas.height = HAUTEUR_GRILLE * CARREAU;
    ctx = canvas.getContext("2d");

    numForme = nouvelleForme();
    formeSuivante = nouvelleForme();

    canvas1 = document.getElementById("idcanvas1");
    canvas1.width = 200;
    canvas1.height = 200;
    ctx1 = canvas1.getContext("2d");
    // Init grille table
    initGrille();

    refreshCanvas();

    ctx1.fillText("Prochaine forme", LARGEUR_GRILLE * CARREAU + 10, 30);

    // Black vertical line in the second canvas
    ctx1.fillRect(0, 0, 1, HAUTEUR_GRILLE * CARREAU);
    // Black vertical line
    ctx.fillRect(LARGEUR_GRILLE * CARREAU, 0, 1, HAUTEUR_GRILLE * CARREAU);

    // load audio files when starting the game
    const gameStartAudio = loadAudio("gameStartAudio", "./son/success.wav");
    var startButton = document.getElementById("play");
    startButton.addEventListener("click", function () {
      gameStartAudio.play();
    });
  }

  // !!!area linked to events!!!
  function moveLeft() {
    formX--;
    if (collision()) {
      formX++; // cancel evenent if collision
    }
  }

  function moveRight() {
    formX++;
    // Vérifier collision before deplace the forme
    if (collision()) {
      formX--; //cancel evenent if collision
    }
  }

  // !!!Management of keyboard events!!!
  controlPressed = false;
  shiftPressed = false;
  cPressed = false;
  zPressed = false;
  window.addEventListener(
    "keydown",
    function (event) {
      event.preventDefault();
      let key = event.key;
      switch (key) {
        case "1":
        case "5":
        case "9":
        case "x": // x and up arrow => clockwise rotation of the shape
        case "ArrowUp":
          temp = rotation;
          forme = forme;
          rotation++;

          if (rotation > forme[numForme].length - 1) rotation = 0;
          if (collision()) rotation = temp;

          // Chargez les fichiers audio au démarrage du jeu
          const gameStartAudio2 = loadAudio(
            "gameStartAudio",
            "./son/rotate.wav"
          );
          // jouer si click
          gameStartAudio2.play();

          // refreshCanvas();
          break;

        case "z": // Z => counterclockwise rotation
          zPressed = true;
          break;

        case "3": //  counterclockwise rotation
        case "7":
          forme = formeAntiHoraire; // change de table
          temp = rotation;
          rotation++;
          if (rotation > forme[numForme].length - 1) rotation = 0;
          if (collision()) rotation = temp;
          break;

        case "t": // toutch t
          numForme++;
          if (numForme > forme.length - 1) numForme = 0;

          // load the audio file in load game
          const gameStartAudio1 = loadAudio("gameStartAudio", "./son/move.wav");
          gameStartAudio1.play();
          break;

        case "4":
        case "ArrowLeft":
          moveLeft();
          break;

        case "6":
        case "ArrowRight":
          moveRight();
          break;

        case " ":
        case "2":
          delay -= 200;
          if (delay < 50) delay = 250; // reset speed
          break;

        case "8":
        case "ArrowDown": // Down arrow => rapid descent
          while (!collision()) {
            formY++;
          }
          formY--;
          const gameStartAudio4 = loadAudio("gameStartAudio", "./son/fall.wav");
          gameStartAudio4.play();
          break;

        // case "Enter":
        case "Escape":
        case "F1":
          if (isPaused) {
            // console.log("should done play");
            isPaused = false;
            countdown = 3;
            function startCountdown() {
              if (countdown > 0) {
                document.getElementById("startnowText").innerText = countdown;
                document.getElementById("startnowText").style.display = "block";

                countdown--;
                setTimeout(startCountdown, 1000); // call function after 1 seconde
              } else {
                document.getElementById("startnowText").innerText = ""; // deted text after counter
                document.getElementById("startnowText").style.display = "none";
                // start game here
                intervalId = setInterval(refreshCanvas, delay);
              }
            }
            startCountdown();
          } else {
            // console.log("put game on paused");
            isPaused = true;
            clearInterval(intervalId);
          }
        case "Shift": // Shift => maintain
          shiftPressed = true;
          break;

        case "c": // C => maintain
          if (!cPressed) {
            cPressed = true;
          } else {
            cPressed = false;
          }
          break;

        case "Control": // Ctrl => maintain
          if (!controlPressed) {
            controlPressed = true;
          } else {
            controlPressed = false;
          }

          break;
        //  /////////////////////////////////////////////////////
        // !!relancer le jeu en cas de fin ou collision vers le haut
        case "Enter":
          if (isGameOver) {
            // console.log("in Enter, reload the game");
            // reload the game
            isGameOver = false;
            initGrille();
            numForme = nouvelleForme();
            formeSuivante = nouvelleForme();
            formY = Y_INITIAL;
            formX = X_INITIAL;
            rotation = 0;
            score = 0; // reset score
            scoreFormY = 0;
            level = 0;
            delay = 250;
            intervalId = setInterval(refreshCanvas, delay);

            // cleaning screen
            document.getElementById("endMessage").style.display = "none";
          }
          break;
      }
      // control+z => counterclockwise rotation
      if (controlPressed && zPressed) {
        forme = formeAntiHoraire; // change table
        temp = rotation;
        rotation++;
        if (rotation > forme[numForme].length - 1) rotation = 0;
        if (collision()) rotation = temp;
      }
    },
    true
  );

  // !!!fin des evenements!!!

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // !!! start  code zone !!!

  function startCountdown() {
    if (countdown > 0) {
      console.log("dans startnow");
      document.getElementById("startnowText").innerText = countdown;
      document.getElementById("startnowText").style.display = "block";

      countdown--;
      setTimeout(startCountdown, 1000); // function calling after 1 second
    } else {
      document.getElementById("startnowText").innerText = ""; // delete text after counter
      document.getElementById("startnowText").style.display = "none";
      //  start game here
      init();
    }
  }
  window.addEventListener("keydown", function (event) {
    let key = event.key;
    if (key === "Enter") {
      startCountdown();
    }
  });

  startCountdown();
};
