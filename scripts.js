const dialog = document.querySelector("dialog");
dialog.showModal();

const form = document.querySelector("form");
let player1 = "Player 1";
let player2 = "Player 2";
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    player1 = formProps["player1"] == ""? player1 : formProps["player1"];
    player2 = formProps["player2"] == ""? player2 : formProps["player2"];

    player1Name.textContent = player1 + ": " + 0;
    X.setName(player1);
    player2Name.textContent = player2 + ": " + 0;
    O.setName(player2);

    dialog.close();
})

const startButton = document.querySelector(".start");
let X = makePlayer('X', player1, player1Name);
let O = makePlayer('O', player2, player2Name);
startButton.addEventListener("click", () => {
    gameBoard.restart();
    currGame = playGame(X, O);
    display.renderGameboard();
})

const resetScoresButton = document.querySelector(".resetScores");
resetScoresButton.addEventListener("click", () => {
    X.setScore(0);
    O.setScore(0);
})

const results = document.querySelector(".result");

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
            if (board[0][i] != '.' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return board[0][i];
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

    const restart = () => {
        board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
        results.textContent = "";
    }

    return { getBoard, placeMark, win, restart };
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
                    button.textContent = square;
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

function makePlayer(mark, name, scoreText) {
    const playerMark = mark;
    let score = 0;
    let playerName = name;

    const makeMove = (i, j) => {
        if (gameBoard.placeMark(playerMark, i, j)) {
            display.renderGameboard();
            currGame.togglePlayer();
        } else {
            alert("Illegal");
        }
        if (gameBoard.win() != null) {
            if (gameBoard.win() == 'X') {
                results.textContent = player1 + " Wins!";
            } else if (gameBoard.win() == 'O') {
                results.textContent = player2 + " Wins!";
            } else {
                results.textContent = "Tie!";
            }
            if (gameBoard.win() != "Tie") {
                score++;
                scoreText.textContent = playerName + ": " + score;
            }
        }
    }

    const setScore = (newScore) => {
        score = newScore;
        scoreText.textContent = playerName + ": " + score;
    }

    const setName = (newName) => {
        playerName = newName;
    }

    return { playerMark, makeMove, setScore, setName };
}

function playGame(player1, player2) {
    let currPlayer = player1;

    const togglePlayer = () => {
        if (currPlayer == player1) {
            currPlayer = player2;
        } else {
            currPlayer = player1;
        }
    }

    const getCurrPlayer = () => {
        return currPlayer;
    }

    return { getCurrPlayer, togglePlayer }
}