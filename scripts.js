const dialog = document.querySelector("dialog");
dialog.showModal();

const form = document.querySelector("form");
let player1 = "Player 1";
let player2 = "Player 2";
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");

class Player {
    playerMark;
    score = 0;
    playerName;
    scoreText; 

    constructor(mark, name, scoreText) {
        this.playerMark = mark;
        this.playerName = name;
        this.scoreText = scoreText;
    }

    makeMove = (i, j) => {
        if (GameBoard.placeMark(this.playerMark, i, j)) {
            Display.renderGameBoard();
            currGame.togglePlayer();
        } else {
            alert("Illegal");
            return;
        }
        if (GameBoard.win() != null) {
            if (GameBoard.win() == 'X') {
                results.textContent = player1 + " Wins!";
            } else if (GameBoard.win() == 'O') {
                results.textContent = player2 + " Wins!";
            } else {
                results.textContent = "Tie!";
            }
            if (GameBoard.win() != "Tie") {
                this.score++;
                this.scoreText.textContent = this.playerName + ": " + this.score;
            }
        }
    }

    setScore = (newScore) => {
        this.score = newScore;
        this.scoreText.textContent = this.playerName + ": " + this.score;
    }

    setName = (newName) => {
        this.playerName = newName;
    }
}

let X = new Player('X', player1, player1Name);
let O = new Player('O', player2, player2Name);

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
let currGame;
startButton.addEventListener("click", () => {
    GameBoard.restart();
    currGame = new PlayGame(X, O);
    console.log(X);
    console.log(currGame);
    Display.renderGameBoard();
})

const resetScoresButton = document.querySelector(".resetScores");
resetScoresButton.addEventListener("click", () => {
    X.setScore(0);
    O.setScore(0);
})

const results = document.querySelector(".result");

class GameBoard {
    board;
    lockBoard;
    constructor () {
        this.board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
        this.lockBoard = false;
    }

    static getBoard = () => {
        return this.board;
    }

    static placeMark = (mark, i, j) => {
        if (this.board[i][j] != '.' || this.lockBoard) return false;
        this.board[i][j] = mark;
        return true;
    }

    static win = () => {
        this.lockBoard = true;
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] != '.' && this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2]) {
                return this.board[i][0];
            }
            if (this.board[0][i] != '.' && this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i]) {
                return this.board[0][i];
            }
        }
        if (this.board[0][0] != '.' && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) {
            return this.board[0][0];
        }
        if (this.board[0][2] != '.' && this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]) {
            return this.board[0][2];
        }

        let openSquares = 9;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] != '.') openSquares--;
            }
        }
        if (openSquares == 0) return 'Tie';

        this.lockBoard = false;
        return null;
    }

    static restart = () => {
        this.board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
        results.textContent = "";
        this.lockBoard = false;
    }
}

class Display {
    static renderGameBoard() {
        this.clear();
        const currBoard = GameBoard.getBoard();
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
    
    static clear() {
        const container = document.querySelector(".container");
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    }
}

class PlayGame {
    currPlayer;
    player1;
    player2;

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currPlayer = player1;
    }

    togglePlayer = () => {
        if (this.currPlayer == this.player1) {
            this.currPlayer = this.player2;
        } else {
            this.currPlayer = this.player1;
        }
    }

    getCurrPlayer = () => {
        console.log(this.currPlayer);
        return this.currPlayer;
    }
}