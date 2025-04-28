import { BOT_FIGURE, BOARD_ARRAY } from './gameConst'

export const getEmptyCells = (board) => {
    return board.map((value, index) => (value === null ? index : null)).filter((i) => i !== null);
};


export const botMove = (board) => {
    const empty = getEmptyCells(board);
    if (empty.length === 0) return board;
    const randomIndex = empty[Math.floor(Math.random() * empty.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = BOT_FIGURE;
    return newBoard;
}

export const makeBotMove = (setBoard, setIsPlayerTurn, board) => {
    const newBoard = botMove(board);
    setBoard(newBoard);
    setIsPlayerTurn(true);
};

export const checkWinner = (border) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, bIdx, c] of lines) {
        if (border[a] && border[a] === border[bIdx] && border[a] === border[c]) return border[a];
    }
    return null;
};

export const isGameOver = (board) => {
    if (checkWinner(board) || getEmptyCells(board).length === 0) {
        return true
    }
}

export const restartGame = (setBoard, setIsPlayerTurn, setWinner, setShowModal) => {
    setBoard(BOARD_ARRAY)
    setIsPlayerTurn(true);
    setWinner(null);
    setShowModal(false);
};