const gameBoard = (function () {
    let board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];

    const getBoard = () => {
        return board;
    }

    const placeMark = (mark, i, j) => {
        if (board[i][j] != '.') return false;
        board[i][j] = mark;
        return true;
    }

    const win = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] != '.' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                return board[i][0];
            }
            if (board[i][0] != '.' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return board[i][0];
            }
        }
        if (board[0][0] != '.' && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] != '.' && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            return board[0][2];
        }

        let openSquares = 9;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != '.') openSquares--;
            }
        }
        if (openSquares == 0) return 'Tie';

        return null;
    }

    return { getBoard, placeMark, win };
})();

const display = (function () {
    function renderGameboard() {
        clear();
        const currBoard = gameBoard.getBoard();
        const container = document.querySelector(".container");
        let currIndex = 0;
        currBoard.forEach(element => {
            element.forEach(square => {
                const button = document.createElement("button");
                button.setAttribute("data-index-number", currIndex);
                currIndex++;
                if (square != '.') {
                    button.innerText = square;
                }
                button.addEventListener("click", () => {
                    currGame.getCurrPlayer().makeMove(Math.floor(button.dataset.indexNumber / 3), button.dataset.indexNumber % 3);
                })
                container.appendChild(button);
            })
        });
    }
    
    function clear() {
        const container = document.querySelector(".container");
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    }

    return { renderGameboard, clear };
})();

function makePlayer(mark) {
    const playerMark = mark;
    const makeMove = (i, j) => {
        if (gameBoard.placeMark(playerMark, i, j)) {
            display.renderGameboard();
            if (gameBoard.win() != null) {
                alert(gameBoard.win());
            }
            currGame.togglePlayer();
        } else {
            alert("Illegal");
        }
    }
    return { playerMark, makeMove };
}

function playGame(player1, player2) {
    let currPlayer = player1;

    const togglePlayer = () => {
        if (currPlayer == player1) {
            currPlayer = player2;
        } else {
            currPlayer = player1;
        }
        console.log(currPlayer);
    }

    const getCurrPlayer = () => {
        return currPlayer;
    }

    return { getCurrPlayer, togglePlayer }
}

let X = makePlayer('X');
let O = makePlayer('O');
let currGame = playGame(X, O);
display.renderGameboard();
