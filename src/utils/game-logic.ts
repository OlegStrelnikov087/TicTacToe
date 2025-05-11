import { BoardValue, DrawResult, GameFigure, GameResult, Board, GameNotFinished } from '@types/types';
import { EMPTY_CELL_VALUE, INITIAL_GAME } from './game-const';

/**
 * Возвращает индексы всех пустых ячеек на игровом поле.
 * @param {Board} board - Текущее состояние игрового поля.
 * @returns {number[]} Массив индексов пустых ячеек.
 */
export const getIndexesOfEmptyCells = (board: Board): number[] =>
  board.map((val, i) => (val === EMPTY_CELL_VALUE ? i : EMPTY_CELL_VALUE
  )).filter((i): i is number => i !== EMPTY_CELL_VALUE);

/**
 * Выполняет ход бота, выбирая случайную пустую ячейку и помещая в неё фигуру бота.
 * @param {Board} board - Текущее состояние игрового поля.
 * @returns {Board} Новое состояние игрового поля после хода бота.
 */
export const botMove = (board: Board): Board => {
  const empty = getIndexesOfEmptyCells(board);
  if (empty.length === 0) return board;
  const index = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = [...board];
  newBoard[index] = INITIAL_GAME.botFigure;
  return newBoard;
};

/**
 * Возвращает сообщение о результате игры для отображения пользователю.
 * @param {GameResult} winner - Победитель игры.
 * @param {GameFigure} playerFigure - Фигура игрока.
 * @returns {string} Сообщение с результатом игры.
 */
export const getResultGameMessage = (winner: GameResult, playerFigure: GameFigure): string => {
  if (winner === DrawResult.DRAW_RESULT) {
    return 'Ничья!';
  } else if (winner === playerFigure) {
    return 'Ты победил! 🎉';
  } else {
    return 'Бот победил 🤖';
  }
};

/**
 * Проверяет, является ли переданное значение игровой фигурой (X или O).
 * @param {BoardValue} figure - Значение ячейки.
 * @returns {boolean} true, если значение — фигура X или O.
 */
const isGameFigure = (figure: BoardValue): figure is GameFigure => {
  return (figure === GameFigure.X || figure === GameFigure.O);
};

/**
 * Проверяет, завершена ли игра, и если да — определяет результат.
 * @param {Board} board - Текущее состояние игрового поля.
 * @returns {GameResult} Результат игры: победитель, ничья или продолжение.
 */
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
  return isDraw ? DrawResult.DRAW_RESULT : GameNotFinished.GAME_NOT_FINISHED;
};
