// variables
const boardCells = [];
const snakeBody = [];
const startPoints = [];
const wallLength = 30;
var startPosition = '';
var position = '';
var lastPosition = '';
let snakeLength = 1;
let timer = null;


// creates the game board, to run on page load
function createBoard() {
    const board = document.getElementById("target");
    board.style.border = "thick solid #995fa3";

    // fill boardCells array with positions
    for (let i = 0; i < wallLength; i++) {
        boardCells[i] = [];
        for (let j = 0; j < wallLength; j++) {
            let cellPosition = i + '-' + j;
            boardCells[i].push(cellPosition);

            // add div element to board with id attribute matching cell position
            let newDiv = document.createElement("div");
            newDiv.classList.add('boardCell');
            newDiv.classList.add('off');
            newDiv.id = cellPosition;
            //newDiv.innerHTML = cellPosition; // for troubleshooting to see cell coordinates
            board.appendChild(newDiv);

        }
    }
    
    // fill array of possible starting positions
    createStartPoints();
}

// creates an array of all possible starting points
function createStartPoints() {
    for (let i = 0; i < wallLength; i++) {
        cellId = i + '-0';
        startPoints.push(cellId);
    }
}

// returns a random number
function randomStart(scale) {
    return Math.floor(Math.random() * scale);
}

// chooses a random number from startRight array, sets that grid cell as the starting point and starts snake movement to right from the starting position
function start() {
    
    // get random starting positions
    randomIndex = randomStart(startPoints.length);
    startPosition = startPoints[randomIndex];

    // start snake from position
    //moveRight();

    // disable "Start" button
    document.getElementById('btn-start').disabled = true;
}

function stop() {
    clearTimeout(timer);
    document.getElementById('btn-start').disabled = false;
}

function moveRight() {
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
    let idName = position;
    let element = document.getElementById(idName);
    element.classList.toggle('on');
}