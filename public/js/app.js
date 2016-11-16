
// ELEMENTOS DEL DOM
var startButton = document.getElementById("play");
var toGuessWord = document.getElementById("guess-word");
var canvasContainer = document.getElementById("canvas-container");
var wordPrompt = document.getElementById("game");
var contenedorLetras = document.getElementById("contenedor-letras");
var guessDiv = document.getElementById("guess");
var guessButton = document.getElementById("guess-button");
var letterInput = document.getElementById("letter");
var intentosContenedor = document.getElementById("intentos-contenedor");
var letrasUsadasContenedor = document.getElementById("letras-usadas-contenedor");
var intentos = document.getElementById("intentos");
var letrasUsadas = document.getElementById("letras-usadas");
var restartButton = document.getElementById("restart-game");
var titulo = document.getElementById("title");
var finishGameText = document.getElementById("win-game");
// VARIABLES
var guessedLetters = [];
var guessWord = "";
var splittedWord = [];
var splittedWordString = "";
var gameCount = 0;
// CANVAS
var canvas = document.getElementById("mi-canvas");
var positionInfo = canvasContainer.getBoundingClientRect();
var context = canvas.getContext('2d');
// VARIABLES PARA USAR DENTRO DEL CANVAS
var centerx = canvas.width / 2;
var centerCY = 50;
var moveR = -25;
var moveL = 25;
var moveRL = -15;
var moveLL = 15;
// FUNCION PARA ACTUALIZAR EL ESTADO DE LA PALABRA A ADIVINAR
function updateWordContainer(guessStatus) {
    html = "";
    for (var i = 0; i < guessStatus.length; i++) {
        html += '<h2>' + guessStatus[i] + '</h2>';
    }
    contenedorLetras.innerHTML = html;
}
// ACTUALIZA LA CUENTA DE INTENTOS FALLIDS
function updateGameStatus() {
    intentos.innerHTML = "<h4>" + gameCount + "</h4>";
    console.log(guessedLetters);
}
// ACTUALIZA LAS LETRAS USADAS
function updateLetterStatus() {
    var html = "";
    for (var i = 0; i < guessedLetters.length; i++) {
        html += '<h4>' + guessedLetters[i] + '</h4>';
    }
    letrasUsadas.innerHTML = html;
}
// DIBUJA LOS BRAZOS
function drawArms(side) {
    context.moveTo(centerx, 75);
    context.lineTo(centerx + side, 75);
    context.stroke();
}
// DIBUJA LAS PIERNAS
function drawLegs(side) {
    context.moveTo(centerx, 90);
    context.lineTo(centerx + side, 110);
    context.stroke();
}
// ACTUALIZA EL DIBUJO ENTERO DEL HOMBRE AHORCADO
function updateCanvas(gameCount) {
    switch (gameCount) {
        case 1:
            // CABEZA
            context.beginPath();
            context.arc(centerx, centerCY, 10, 0, 2 * Math.PI);
            context.lineWidth = 2;
            context.stroke();
            break;
        case 2:
            // TRONCO
            context.moveTo(centerx, centerCY + 10);
            context.lineTo(centerx, 90);
            context.stroke();
            break;
        case 3:
            // BRAZO DERECHO
            drawArms(moveR);
            break;
        case 4:
            // BRAZO IZQUIERDO
            drawArms(moveL);
            break;
        case 5:
            // PIE DERECHO
            drawLegs(moveRL);
            break;
        case 6:
            // PIE IZQUIERDO
            drawLegs(moveLL);
            break;
        case 7:
            // CUERDA
            context.moveTo(centerx, 20);
            context.lineTo(centerx, 40);
            context.stroke();
            break;
        default:
            break;
    }
}
// COMIENZA EL JUEGO UNA VEZ INTRODUCIDA LA PALABRA
function startGame() {

    if (toGuessWord.value === "") {
        console.log("Tiene que introducir una palabra");
    }
    else {
        
        var html = "";
        guessWord = toGuessWord.value.toLowerCase();

        canvasContainer.classList.remove("no-display");
        wordPrompt.classList.add("n-d");
        guessDiv.classList.add("guess")
        guessDiv.classList.remove("no-display");
        intentosContenedor.classList.remove("no-display");

        for (var i = 0; i < guessWord.length; i++) {
            html += '<h2>' + "_" + '</h2>';
            splittedWord.push("_");
        }
        updateGameStatus();
        contenedorLetras.innerHTML = html;
    }
}
// REVISA SI LA LETRA INTRODUCIDA YA HA SIDO UTILIZADA
function guessed(letter) {
    if (!(guessedLetters.indexOf(letter) > -1)) {
        return true;
    }
    return false;
}
// FUNCION QUE DESABILITA INTRODUCIR ALGUNA LETRA SI YA HA SIDO UTILIZADA
function checkLetter() {
    var letter = letterInput.value.toLowerCase();
    if (!guessed(letter) || letter.length > 1) {
        // letterInput.classList.add("letter-warning");
        letterInput.style.backgroundColor = "#FFCDD2";
        guessButton.disabled = true;
        console.log("Hola");
    }
    else {
        letterInput.style.backgroundColor = "#e8eeef";
        guessButton.disabled = false;
        console.log("noo");
    }
}
// CODIGO QUE SE EJECUTA CUANTO SE OPRIME EL BOTON DE ADIVINAR
function applyGuess() {
    var letter = letterInput.value.toLowerCase();
    if (guessed(letter)) {
        guessedLetters.push(letter);
        if (guessWord.indexOf(letter) > -1) {
            console.log("Se encuentra la letra");
            for (var i = 0; i < guessWord.length; i++) {
                if (guessWord[i] === letter) {
                    splittedWord[i] = letter;
                }
                splittedWordString = splittedWord.join('');
            }
        }
        else {
            console.log("Esa letra no se encuentra");
            gameCount += 1;
            updateCanvas(gameCount);
        }
    }
    else {
        console.log("Ya se uso la letra!");
    }

    letterInput.value = "";
  // console.log(splittedWord);
    updateGameStatus();
    updateLetterStatus();
    letrasUsadasContenedor.classList.remove("no-display");

    updateWordContainer(splittedWord);
    if (splittedWordString === guessWord || gameCount === 7) {
        endGameAnimation();
    }
}
// ANIMACION CUANDO SE TERMINA EL JUEGO
function endGameAnimation() {

    canvasContainer.style.opacity = "0.2";
    guessDiv.style.opacity = "0.2";
    intentosContenedor.style.opacity = "0.2";
    letrasUsadasContenedor.style.opacity = "0.2";
    titulo.style.opacity = "0.2";

    if(gameCount === 7){
        finishGameText.innerText = "YOU LOST";
    }
    else{
        finishGameText.innerText = "YOU WIN!";
    }

    var div = document.getElementById("end-game");
    div.classList.remove("no-display");
    guessButton.disabled = true;
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            div.style.top = pos + 'px';
        }
    }
}
// RECAGRA LA PAGINA
function restart() {
    location.reload();
}
// EVENT LISTENERS
startButton.addEventListener("click", startGame, true);
guessButton.addEventListener("click", applyGuess, true);
letterInput.addEventListener("input", checkLetter, false);
restartButton.addEventListener("click", restart, true);
toGuessWord.addEventListener("input", function () {
    if (toGuessWord.value === "") {
        toGuessWord.style.backgroundColor = "#FFCDD2";
        startButton.disabled = true;
    }
    else {
        toGuessWord.style.backgroundColor = "#e8eeef";
        startButton.disabled = false;
    }
}, true);


