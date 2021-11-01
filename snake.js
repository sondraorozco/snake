
let gridSize = 900;

function createBoard() {
    const board = document.getElementById("target");

    for (let i = 1; i <= gridSize; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add('boardCell');
        newDiv.innerHTML = i;
        newDiv.id = 'n' + i;
        board.appendChild(newDiv);
    }

    board.style.border = "2px solid green";
}