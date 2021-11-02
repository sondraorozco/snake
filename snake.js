// all possible starting positions from left wall of board
const startRight = [1, 31, 61, 91, 121, 151, 181, 211, 241, 271, 301, 331, 361, 391, 421, 451, 481, 511, 541, 571, 601, 631, 661, 691, 721, 751, 781, 811, 841, 871];   

// array to hold position of snake's body as it moves on board
const snakeBody = [];

const gridSize = 900;
var position = 1;
var lastPosition = null;
let snakeLength = 1;
let timer = null;

// creates the game board, to run on page load
function createBoard() {
    const board = document.getElementById("target");

    for (let i = 1; i <= gridSize; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add('boardCell');
        newDiv.innerHTML = i;
        newDiv.id = 'n' + i;
        board.appendChild(newDiv);
    }

    board.style.border = "thick solid #995fa3";
}

// returns a random number
function randomStart(scale) {
    return Math.floor(Math.random() * scale);
}

// chooses a random number from startRight array, sets that grid cell as the starting point and starts snake movement to right from the starting position
function start() {
    // get random starting positions
    randomIndex = randomStart(startRight.length);
    position = startRight[randomIndex];
    console.log(position);

    // start snake from position
    moveRight();

    // disable "Start" button
    document.getElementById('btn-start').disabled = true;
}

function stop() {
    clearTimeout(timer);
    document.getElementById('btn-start').disabled = false;
}

function moveRight() {
    let startPosition = position; // <-- NEED TO MOVE THIS. DOESN'T WORK HERE.
    timer = setTimeout( () => {
        if (position > startPosition + 30) {
            return position = startPosition;
        };
        toggle(position);
        toggle(lastPosition);
        lastPosition = position;
        position += 1;
        moveRight();
    }, 200);
}

function toggle(position) {
    if (position < 1) return;
    let idName = 'n' + position;
    let element = document.getElementById(idName);
    element.classList.toggle('on');
}