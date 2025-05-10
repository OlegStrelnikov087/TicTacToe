import { BoardValue, DrawResult, GameFigure, GameResult, Board, GameNotFinished } from '@types/types';
import { EMPTY_CELL_VALUE, INITIAL_GAME } from './game-const';

export const getIndexesOfEmptyCells = (board: Board): number[] =>
  board.map((val, i) => (val === EMPTY_CELL_VALUE ? i : EMPTY_CELL_VALUE
  )).filter((i): i is number => i !== EMPTY_CELL_VALUE);

// export const botMove = (board: Board): Board => {
//   const empty = getIndexesOfEmptyCells(board);
//   if (empty.length === 0) return board;
//   const index = empty[Math.floor(Math.random() * empty.length)];
//   const newBoard = [...board];
//   newBoard[index] = INITIAL_GAME.botFigure;
//   return newBoard;
// };
const getAdjacentIndexes = (index: number): number[] => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const adjacent: number[] = [];

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < 3 && c >= 0 && c < 3 && (r !== row || c !== col)) {
        adjacent.push(r * 3 + c);
      }
    }
  }

  return adjacent;
};

export const botMove = (board: Board, lastMoveIndex: number | null, ): Board => {
  const emptyCells = getIndexesOfEmptyCells(board)
  if (emptyCells.length === 0) return board
  // 1. Проверить — может ли бот победить на следующем ходу
  for (const i of emptyCells) {
    const newBoard = [...board];
    newBoard[i] = INITIAL_GAME.botFigure;
    if (isGameOver(newBoard) === INITIAL_GAME.botFigure) {
      return newBoard; // Победа
    }
  }

  // 2. Заблокировать игрока, если он может победить
  for (const i of emptyCells) {
    const newBoard = [...board];
    newBoard[i] = INITIAL_GAME.playerFigure;
    if (isGameOver(newBoard) === INITIAL_GAME.playerFigure) {
      const blockBoard = [...board];
      blockBoard[i] = INITIAL_GAME.botFigure;
      return blockBoard; // Блокировка
    }
  }

  // 3. Пойти в центр, если он пустой
  if (board[4] === null) {
    const newBoard = [...board];
    newBoard[4] = INITIAL_GAME.botFigure;
    return newBoard;
  }

  // 4. Пойти на соседнюю клетку после хода игрока
  if (lastMoveIndex !== null) {
    const adjacentIndexes = getAdjacentIndexes(lastMoveIndex);
    const freeAdjacent = adjacentIndexes.find(i => board[i] === null);
    if (freeAdjacent !== undefined) {
      const newBoard = [...board];
      newBoard[freeAdjacent] = INITIAL_GAME.botFigure;
      return newBoard;
    }
  }

  // 5. Просто случайный ход
  const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newBoard = [...board];
  newBoard[index] = INITIAL_GAME.botFigure;
  return newBoard;

}

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