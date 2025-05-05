import { CellValue } from '../types/types';
import { WINNING_LINES } from './game-const';

/**
 * Возвращает индексы всех пустых ячеек на доске.
 * 
 * @param {CellValue[]} board Текущая игровая доска.
 * @returns {number[]} Массив индексов пустых ячеек.
 */
export const getEmptyCells = (board: CellValue[]): number[] =>
  board.map((val, i) => (val === null ? i : null)).filter((i): i is number => i !== null);

/**
 * Выполняет ход бота, выбирая случайную пустую ячейку.
 * 
 * @param {CellValue[]} board Текущая игровая доска.
 * @returns {CellValue[]} Новое состояние доски после хода бота.
 */
export const botMove = (board: CellValue[], botFigure: CellValue): CellValue[] => {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;
  const index = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = [...board];
  newBoard[index] = botFigure;
  return newBoard;
};


/**
 * Проверяет наличие победителя на доске.
 * 
 * @param {CellValue[]} board Текущая игровая доска.
 * @returns {CellValue} Победившая фигура (игрок), либо null, если победителя нет.
 */
export const checkWinner = (board: CellValue[]): CellValue => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

/**
 * Проверяет, завершена ли игра (есть победитель или доска заполнена).
 * 
 * @param {CellValue[]} board Текущая игровая доска.
 * @returns {boolean} true, если игра завершена, иначе false.
 */
export const isGameOver = (board: CellValue[]): boolean =>
  !!checkWinner(board) || getEmptyCells(board).length === 0;