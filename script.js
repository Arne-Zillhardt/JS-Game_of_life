let board = null;
let colors = [];
let end = false;
const height = 35;
const width = 50;

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

    aliveLocations.push(new Cell(11, 11));
    aliveLocations.push(new Cell(12, 11));
    aliveLocations.push(new Cell(13, 11));
    aliveLocations.push(new Cell(8, 11));
    aliveLocations.push(new Cell(7, 11));
    aliveLocations.push(new Cell(10, 10));
    aliveLocations.push(new Cell(8, 9));

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
            element.style.backgroundColor = "white";

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

function start() {
    initBoard();
    setAliveCells();
    printCells();
    setInterval(function() {
        printCells();
        nextGeneration();

        if (end) {
            initBoard();
            setAliveCells();
            end = false;
        }
    }, 150);
}

function initBoard() {
    board = Array.from(Array(width + 1), () => new Array(height + 1));

    for (var i = 0; i <= width; i++) {
        for (var j = 0; j <= height; j++) {
            board[i][j] = new Cell(i, j);
        }
    }
}