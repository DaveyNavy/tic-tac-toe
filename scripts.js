const gameBoard = (function () {
    board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];

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
                openSquares--;
            }
        }
        if (openSquares == 0) return 'Tie';

        return null;
    }

    return { getBoard, placeMark, win };
})()

function makePlayer(mark) {
    const makeMove = () => {
        
    }
}