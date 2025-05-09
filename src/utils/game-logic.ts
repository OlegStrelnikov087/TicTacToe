import { BoardValue, DrawResult, GameFigure, GameResult, Board, GameNotFinished } from '@types/types';
import { EMPTY_CELL_VALUE, INITIAL_GAME } from './game-const';

export const getIndexesOfEmptyCells = (board: Board): number[] =>
  board.map((val, i) => (val === EMPTY_CELL_VALUE ? i : EMPTY_CELL_VALUE
  )).filter((i): i is number => i !== EMPTY_CELL_VALUE);

export const botMove = (board: Board): Board => {
  const empty = getIndexesOfEmptyCells(board);
  if (empty.length === 0) return board;
  const index = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = [...board];
  newBoard[index] = INITIAL_GAME.botFigure;
  return newBoard;
};

export const getResultGameMessage = (winner: GameResult, playerFigure: GameFigure): string => {
  if (winner === DrawResult.DRAW_RESULT) {
    return 'Ничья!';
  } else if (winner === playerFigure) {
    return 'Ты победил! 🎉';
  } else {
    return 'Бот победил 🤖';
  }
};

const isGameFigure = (figure: BoardValue): figure is GameFigure => {
  return (figure === GameFigure.X || figure === GameFigure.O)
};

export const isGameOver = (board: Board): GameResult => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const firstElem = board[a];
    if (firstElem === board[b] && firstElem === board[c] && isGameFigure(firstElem)) {
      return firstElem; // Победитель найден
    }
  }
  // Проверка на ничью
  const isDraw = board.every(cell => cell !== EMPTY_CELL_VALUE);
  return isDraw ? DrawResult.DRAW_RESULT : GameNotFinished.GAME_NOT_FINISHED; // null — игра продолжается

}