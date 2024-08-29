let isGameActive = false;

let sizeX = 10;
let sizeY = 10;
let mineCount = 10;

// const BitStates = {
//     MINE: 1, //hasMine
//     CHECKED: 2, //hasBeenChecked
//     FLAGGED: 4, //hasBeenFlagged
//     QUESTION_MARK: 8 //hasBeenFlaggedQuestion
// }

// SQUARE MINESTATE
// 0 > CLEAR
// 1 > MINE

// SQUARE CHECKSTATE
// 0 > UNCHECKED
// 1 > CHECKED

// SQUARE FLAGSTATE
// 0 - UNFLAGGED
// 1 - FLAGGED
// 2 - QUESTION MARK

let boardMatrix;
let checkedSquares = 0;

const getSorroundingMines = (x, y) => {
    let surroundingMines = 0;
    if (x > 0 && boardMatrix[x - 1][y].minestate === 1) {
        surroundingMines++;
    }

    if (x > 0 && y > 0 && boardMatrix[x - 1][y - 1].minestate === 1) {
        surroundingMines++;
    }

    if (y > 0 && boardMatrix[x][y - 1].minestate === 1) {
        surroundingMines++;
    }

    if (x < sizeX - 1 && y > 0 && boardMatrix[x + 1][y - 1].minestate === 1) {
        surroundingMines++;
    }

    if (x < sizeX - 1 && boardMatrix[x + 1][y].minestate === 1) {
        surroundingMines++;
    }

    if (x < sizeX - 1 && y < sizeY - 1 && boardMatrix[x + 1][y + 1].minestate === 1) {
        surroundingMines++;
    }

    if (y < sizeY - 1 && boardMatrix[x][y + 1].minestate === 1) {
        surroundingMines++;
    }

    if (x > 0 && y < sizeY - 1 && boardMatrix[x - 1][y + 1].minestate === 1) {
        surroundingMines++;
    }

    return surroundingMines;
}

const clickSquare = (x, y) => {

    // console.log(x, y, "click");
    if (!isGameActive || x < 0 || x >= sizeX || y < 0 || y >= sizeY) {
        return;
    }

    const el = boardMatrix[x][y].el;
    if (el.classList.contains("checked")) {
        return;
    }

    if (boardMatrix[x][y].flagstate === 1) {
        flagSquare(x, y);
        return;
    }

    if (boardMatrix[x][y].minestate === 1) {

        // FIRST IS NEVER A MINE
        if (checkedSquares == 0) {
            boardMatrix[x][y].minestate === 0

            let randX = Math.floor(Math.random() * sizeX);
            let randY = Math.floor(Math.random() * sizeY);
            while (randX == x && randY == y) {
                randX = Math.floor(Math.random() * sizeX);
                randY = Math.floor(Math.random() * sizeY);
            }

            boardMatrix[randX][randY].minestate = 1;
        } else {
            el.classList.add("mine");
            el.classList.add("mine-clicked");
    
            for(let i = 0; i < sizeX; i++) {
                for(let j = 0; j < sizeY; j++) {
                    if (boardMatrix[i][j].minestate === 1) {
                        if (boardMatrix[i][j].flagstate === 1) {
                            boardMatrix[i][j].el.classList.add("flaggedMine");
                        } else {
                            boardMatrix[i][j].el.classList.add("mine");
                        }
                    }
                }
            }
    
            alert("Game Over");
            isGameActive = false;
        }
    }

    el.classList.add("checked");
    checkedSquares++;

    // TODO: check surrounding
    const surroundingMines = getSorroundingMines(x, y);

    if (surroundingMines > 0) {
        el.textContent = surroundingMines;
    } else {
        clickSquare(x - 1, y - 1);
        clickSquare(x - 1, y);
        clickSquare(x - 1, y + 1);
        clickSquare(x, y - 1);
        clickSquare(x, y + 1);
        clickSquare(x + 1, y - 1);
        clickSquare(x + 1, y);
        clickSquare(x + 1, y + 1);
    }

    // TODO: check if won

    if (checkedSquares === (sizeX * sizeY) - mineCount) {
        alert("You won!");
        isGameActive = false;

        for(let i = 0; i < sizeX; i++) {
            for(let j = 0; j < sizeY; j++) {
                if (boardMatrix[i][j].minestate === 1) {
                    if (boardMatrix[i][j].flagstate === 1) {
                        boardMatrix[i][j].el.classList.add("flaggedMine");
                    } else {
                        boardMatrix[i][j].el.classList.add("mine");
                    }
                }
            }
        }
    }
};

const flagSquare = (x, y) => {
    // console.log(x, y, "flag");
    if (!isGameActive) {
        return;
    }

    const el = boardMatrix[x][y].el;

    if (boardMatrix[x][y].flagstate === 0) {
        el.classList.add("flag");
        boardMatrix[x][y].flagstate = 1;
    } else if (boardMatrix[x][y].flagstate === 1) {
        el.classList.remove("flag");
        boardMatrix[x][y].flagstate = 0;
    }
};

const startGame = (type) => {

    if(type) {
        switch (type) {
            case "Easy":
                sizeX = 9;
                sizeY = 9;
                mineCount = 10; // 12.3%
                break;
            case "Medium":
                sizeX = 13;
                sizeY = 16;
                mineCount = 37; // 17.8%
                break;
            case "Hard":
                sizeX = 13;
                sizeY = 37;
                mineCount = 99; // 20.6%
                break;
        }
    } else {
        sizeX = parseInt($("#sizeX").val());
        sizeY = parseInt($("#sizeY").val());
        mineCount = parseInt($("#mineCount").val());
    }

    // console.log("starting");
    // console.log(sizeX, sizeY, mineCount);

    $("#board").html("");

    checkedSquares = 0;
    isGameActive = true;
    
    // check that values are valid
    if (sizeX <= 0 || sizeY <= 0 || mineCount <= 0) {
        isGameActive = false;
        alert("Invalid values");
        return;
    }

    if (mineCount >= sizeX * sizeY) {
        isGameActive = false;
        alert("Too many mines");
        return;
    }

    if (sizeX > 150 || sizeY > 150) {
        isGameActive = false;
        alert("Too big");
        return;
    }

    // TODO: generate board
    boardMatrix = Array.from(Array(sizeX), () => {
        return Array.from(Array(sizeY), () => {
            return {
                minestate: 0,
                checkstate: 0,
                flagstate: 0,
                el: null
            }
        });
    });

    // TODO: generate mines
    let addedMines = 0;
    while (addedMines < mineCount) {
        let x = Math.floor(Math.random() * sizeX);
        let y = Math.floor(Math.random() * sizeY);
        if (boardMatrix[x][y].minestate !== 1) {
            boardMatrix[x][y].minestate = 1;
            addedMines++;
        }
    }

    // TODO: generate square elements
    for (let i = 0; i < sizeX; i++) {
        const col = document.createElement("div");
        col.classList.add("col");
        $("#board").append(col);
        
        for (let j = 0; j < sizeY; j++) {
            const el = document.createElement("div");
            el.classList.add("square");

            // el.innerText = boardMatrix[i][j].minestate ? "X" : "O";

            el.addEventListener("click", () => {
                clickSquare(i, j);
            });

            el.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                flagSquare(i, j);
            });

            col.append(el);

            boardMatrix[i][j].el = el;
        }
    }

    // console.log(boardMatrix);

}