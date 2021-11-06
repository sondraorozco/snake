// variables
const boardCells = [];
const snakeBody = [];
const wallLength = 30;
let direction = '';
let snakeLength = 10;
let timer = null;


// creates the game board, to run on page load
function createBoard() {
    const board = document.getElementById("target");
    board.style.border = "thick solid #995fa3";

    // fill boardCells array with positions
    for (let i = 1; i <= wallLength; i++) {
        boardCells[i] = [];
        for (let j = 1; j <= wallLength; j++) {
            let id = j + '-' + i;
            boardCells[i].push( {col: j, row: i, id: id } );

            // add div element to board with id attribute matching cell position
            let newDiv = document.createElement("div");
            newDiv.classList.add('boardCell');
            newDiv.classList.add('bg');
            newDiv.id = id;
            board.appendChild(newDiv);
        }
    }
}

// returns a random number
function random(scale) {
    return Math.floor(Math.random() * scale);
}

// starts snake movement to right from a randomly selected starting position
function start() {
    // get random starting position
    rand = random(wallLength);
    let startPosition = boardCells[rand][0];
    snakeBody.push(startPosition);
    toggle(snakeBody[0].id);

    // start moving right
    direction = 'right';
    move();

    // disable "Start" button
    document.getElementById('btn-start').disabled = true;
}

function pause() {
    clearTimeout(timer);
    document.getElementById('btn-unpause').disabled = false;
}

function unpause() {
    move();
    document.getElementById('btn-unpause').disabled = true;
}

// clears timer and clears the snakeBody array
function stop() {
    clearTimeout(timer);
    document.getElementById('btn-start').disabled = false;
    document.getElementById('btn-unpause').disabled = true;

    // clear snake from board and clear array
    snakeBody.forEach( (el) => toggle(el.id) );
    snakeBody.splice(0, snakeBody.length); 
}

function clickDirection(setDirection) {
    clearTimeout(timer);
    direction = setDirection;
    move();
}

function move() {
    timer = setTimeout( () => {
        let y = snakeBody[0].row;
        let x = snakeBody[0].col;

        // set coordinates of next position based on direction to move
        if (direction === 'right') {
            x = (x === 30) ? 1 : x + 1;
        } else if (direction === 'left') {
            x = (x === 1) ? 30 : x - 1;
        } else if (direction === 'up') {
            y = (y === 1) ? 30 : y - 1;
        } else if (direction === 'down') {
            y = (y === 30) ? 1 : y + 1;
        } else {
            return;
        }

        let nextPosition = {row: y, col: x, id: x + '-' + y };

        // add next position to snakeBody and toggle 'on' class in cell
        snakeBody.unshift(nextPosition);
        toggle(snakeBody[0].id);

        // remove tail of snake with pop()
        if (snakeBody.length > snakeLength) {
            let pop = snakeBody.pop().id;
            toggle(pop);
        }

        move();
    }, 200)
}

function toggle(position) {
    let element = document.getElementById(position);
    element.classList.toggle('bg');
    element.classList.toggle('on');
}