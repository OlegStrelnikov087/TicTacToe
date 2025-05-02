import { Player } from '../types/types';
import { BOT_FIGURE } from './game-const';

/**
 * Возвращает индексы всех пустых ячеек на доске.
 * 
 * @param {Player[]} board Текущая игровая доска.
 * @returns {number[]} Массив индексов пустых ячеек.
 */
export const getEmptyCells = (board: Player[]): number[] =>
  board.map((val, i) => (val === null ? i : null)).filter((i): i is number => i !== null);

/**
 * Выполняет ход бота, выбирая случайную пустую ячейку.
 * 
 * @param {Player[]} board Текущая игровая доска.
 * @returns {Player[]} Новое состояние доски после хода бота.
 */
export const botMove = (board: Player[]): Player[] => {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;
  const index = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = [...board];
  newBoard[index] = BOT_FIGURE;
  return newBoard;
};

/**
 * Проверяет наличие победителя на доске.
 * 
 * @param {Player[]} board Текущая игровая доска.
 * @returns {Player} Победившая фигура (игрок), либо null, если победителя нет.
 */
export const checkWinner = (board: Player[]): Player => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

/**
 * Проверяет, завершена ли игра (есть победитель или доска заполнена).
 * 
 * @param {Player[]} board Текущая игровая доска.
 * @returns {boolean} true, если игра завершена, иначе false.
 */
export const isGameOver = (board: Player[]): boolean =>
  !!checkWinner(board) || getEmptyCells(board).length === 0;
