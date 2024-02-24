let board = null;
let colors = [];
let end = false;
let started = false;
let execute = null;
const height = 50;
const width = 160;

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = false;
        this.cycle = -1;
    }

    get numberOfNeigbourCells() {
        let neighbors = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }

                let x = this.x + i;
                let y = this.y + j;
                if (x < 0 || x > width || y < 0 || y > height) {
                    continue;
                }

                if (!board[x][y].alive) {
                    continue;
                }

                neighbors++;
            }
        }

        return neighbors;
    }
}

function setAliveCells() {
    let aliveLocations = new Array();
    let middleX = Math.ceil(width / 2);
    let middleY = Math.ceil(height / 2);

    aliveLocations.push(new Cell(middleX, middleY - 1));
    aliveLocations.push(new Cell(middleX - 2, middleY));
    aliveLocations.push(new Cell(middleX - 3, middleY));
    aliveLocations.push(new Cell(middleX + 1, middleY));
    aliveLocations.push(new Cell(middleX + 2, middleY));
    aliveLocations.push(new Cell(middleX + 3, middleY));
    aliveLocations.push(new Cell(middleX - 2, middleY - 2));

    /*aliveLocations.push(new Location(10, 0));
    aliveLocations.push(new Location(10, 1));
    aliveLocations.push(new Location(9, 1));
    aliveLocations.push(new Location(11, 1));
    aliveLocations.push(new Location(9, 2));
    aliveLocations.push(new Location(11, 2));*/

    colors.push("9DDC15");
    colors.push("FFD539");
    colors.push("F58F20");
    colors.push("CA204D");

    for (let i = 0; i < aliveLocations.length; i++) {
        let cell = aliveLocations[i];

        board[cell.x][cell.y].alive = true;
        board[cell.x][cell.y].cycle = 0;
    }
}

function printCells() {
    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            let element = document.getElementById(i + "_" + j);
            element.style.backgroundColor = "#181818";

            if (board[i][j].alive) {
                let color = colors[board[i][j].cycle];
                if (board[i][j].cycle > colors.length) {
                    color = colors[colors.length - 1];
                }

                element.style.backgroundColor = "#" + color;
            }
        }
    }
}

function nextGeneration() {
    let newBoard = Array.from(Array(width + 1), () => new Array(height + 1));
    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            let cell = new Cell(i, j);
            cell.alive = board[i][j].alive;
            cell.cycle = board[i][j].cycle;
            newBoard[i][j] = cell;
        }
    }

    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            let cell = board[i][j];
            let numberOfNeigbourCells = cell.numberOfNeigbourCells;

            if (cell.alive) {
                if (numberOfNeigbourCells == 2 || numberOfNeigbourCells == 3) {
                    newBoard[i][j].alive = true;
                    newBoard[i][j].cycle++;
                    continue;
                }
            }

            if (numberOfNeigbourCells < 2 || numberOfNeigbourCells > 3) {
                newBoard[i][j].alive = false;
                newBoard[i][j].cycle = -1;
                continue;
            }

            if (numberOfNeigbourCells == 3) {
                newBoard[i][j].alive = true;
                newBoard[i][j].cycle++;
                continue;
            }
        }
    }


    if (boardsAreEqual(newBoard, board)) {
        end = true;
    }

    board = newBoard;
}

function boardsAreEqual(board1, board2) {
    if (board1.length != board2.length) {
        return false;
    }

    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            if (board1[i][j].alive != board2[i][j].alive) {
                return false;
            }
        }
    }

    return true;
}

function init() {
    initBoard();
    setAliveCells();
    printCells();
}

function start() {
    if (started) {
        clearInterval(execute);
        started = false;
        document.getElementById("start-button").innerHTML = "Start";
        return;
    }

    execute = setInterval(executeGameOfLife, 150);
    started = true;
    document.getElementById("start-button").innerHTML = "Stop";
}

function executeGameOfLife() {
    printCells();
    nextGeneration();

    if (end) {
        initBoard();
        setAliveCells();
        end = false;
    }
}

function initBoard() {
    board = Array.from(Array(width + 1), () => new Array(height + 1));

    for (var i = 0; i <= width; i++) {
        for (var j = 0; j <= height; j++) {
            board[i][j] = new Cell(i, j);
        }
    }
}

function hoverInCell(x, y) {
    if (board == null || board[x][y] == null) {
        return;
    }

    let element = document.getElementById(x + "_" + y);
    element.style.backgroundColor = "#6b6b6b";
}

function hoverOutCell(x, y) {
    if (board == null || board[x][y] == null) {
        return;
    }

    let element = document.getElementById(x + "_" + y);
    element.style.backgroundColor = "#181818";
    printCells();
}

function cellSpawn(x, y) {
    if (board[x][y].alive) {
        board[x][y].alive = false;
        board[x][y].cycle = -1;
    }

    if (!board[x][y].alive) {
        board[x][y].alive = true;
        board[x][y].cycle = 0;
    }

    printCells();
}

function reset() {
    initBoard();
    setAliveCells();
    printCells();
}