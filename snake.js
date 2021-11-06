const boardCells = [];
const snakeBody = [];
const wallLength = 30;
let token = {};
let direction = '';
let snakeLength = 10;
let timer = null;
let score = 0;
let speed = 200;    // set to 200ms to start, can decrease to increase difficulty
let paused = false;
var alertPlaceholder = document.getElementById('gameOverAlertPlaceholder');

// creates the game board, to run on page load
function createBoard() {
    const board = document.getElementById("target");
    board.style.border = "thick solid #231123";

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

// returns a random number inclusive of min and max
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }


// starts snake movement to right from a randomly selected starting position
function start() {
    // get random starting position for snake
    rand = getRandom(1, wallLength);
    let startPosition = boardCells[rand][0];
    snakeBody.push(startPosition);
    toggle(snakeBody[0].id);

    // add token to board
    newToken();

    // start moving snake to right
    direction = 'right';
    move();

    // disable "Start" button, enable "Pause" button
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-pause').disabled = false;
}

function pause() {
    if (!paused) {
        // pause game on button click if game is not already paused
        clearTimeout(timer);
        paused = true;
        document.getElementById('btn-pause').innerHTML = 'Resume';
    } else if (paused) {
        move(); 
        paused = false;
        document.getElementById('btn-pause').innerHTML = 'Pause';
    }
}

// clears timer and clears the snakeBody array
function stop() {
    // stop timer, clear snake and tokens from board, clear snakeBody array
    clearTimeout(timer);
    snakeBody.forEach( (el) => toggle(el.id) );
    snakeBody.splice(0, snakeBody.length); 
    document.getElementById(token.id).innerHTML = '';
    
    // reset score
    score = 0;
    showNewScore();

    // reset pause if paused is true
    if (paused) {
        pause();
    }

    // reset buttons
    document.getElementById('btn-start').disabled = false;
    document.getElementById('btn-pause').disabled = true;
}

// update direction of snake based on user input
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

        if (checkBodyCollision(nextPosition)) {
            gameOver();
        } else {
            // add next position to snakeBody and toggle 'on' class in cell
            snakeBody.unshift(nextPosition);
            toggle(snakeBody[0].id);
            checkTokenCollision();

            // remove tail of snake with pop()
            if (snakeBody.length > snakeLength) {
                let pop = snakeBody.pop().id;
                toggle(pop);
            }

            move();
        }
    }, speed)
}

// changes div background color to animate the snake's movement
function toggle(position) {
    let element = document.getElementById(position);
    element.classList.toggle('bg');
    element.classList.toggle('on');
}

function newToken() {
    // get random x and y coordinates
    let col = getRandom(1, wallLength);
    let row = getRandom(1, wallLength);
    let id = col + '-' + row;
    token = {col: col, row: row, id: id};

    if (checkBodyCollision(token)) {
        newToken();     // create a new token if overlap with snake body
    } else {
        document.getElementById(token.id).innerHTML = '<i class="bi bi-apple token"></i>';
    }
}

function checkTokenCollision() {
    if (token.id === snakeBody[0].id) {
        snakeLength += 1;   // grow snake
        score += 100;       // increase score
        showNewScore();     // update score displayed on page
        document.getElementById(token.id).innerHTML = ''; // remove token from board
        newToken();         // generate new token
    }
}

function showNewScore() {
    document.getElementById('current-score').innerHTML = score;
}

// check if new position collides with any part of the existing snake body
function checkBodyCollision(position) {
    for (let i = 1; i < snakeBody.length; i++) {
        if (position.id === snakeBody[i].id) {
            return true;
        }
    }
}

function gameOver() {
    pause();
    alert('Game Over! Try again!', 'danger');   // show game over alert
    document.getElementById('btn-start').disabled = true; // update button availability
    document.getElementById('btn-pause').disabled = true;
}

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}