import { Player, BOT_FIGURE, BOARD_ARRAY, GameResult } from './gameConst';
import { Dispatch, SetStateAction } from 'react';

/**
 * Получает индексы пустых ячеек на игровом поле.
 * @param board - Игровое поле, представленное массивом Player.
 * @returns Массив индексов пустых ячеек.
 */
export const getEmptyCells = (board: Player[]): number[] =>
  board.map((value, index) => (value === null ? index : null)).filter((i): i is number => i !== null);

/**
 * Выполняет ход бота, выбирая случайную пустую ячейку.
 * @param board - Игровое поле, представленное массивом Player.
 * @returns Обновлённое игровое поле с ходом бота.
 */
export const botMove = (board: Player[]): Player[] => {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;

  const randomIndex = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = [...board];
  newBoard[randomIndex] = BOT_FIGURE;
  return newBoard;
};

/**
 * Обрабатывает ход бота: делает ход и меняет ход на игрока.
 * @param setBoard - Функция для обновления состояния игрового поля.
 * @param setIsPlayerTurn - Функция для обновления состояния хода.
 * @param board - Текущее состояние игрового поля.
 */
export const makeBotMove = (
  setBoard: Dispatch<SetStateAction<Player[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  board: Player[]
): void => {
  const newBoard = botMove(board);
  setBoard(newBoard);
  setIsPlayerTurn(true);
};

/**
 * Проверяет, есть ли победитель на игровом поле.
 * @param board - Игровое поле, представленное массивом Player.
 * @returns Игрок, который победил, или null, если победителя нет.
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
 * Проверяет, завершена ли игра.
 * @param board - Игровое поле, представленное массивом Player.
 * @returns true, если игра завершена, иначе false.
 */
export const isGameOver = (board: Player[]): boolean =>
  !!checkWinner(board) || getEmptyCells(board).length === 0;

/**
 * Перезапускает игру, сбрасывая все значения на начальные.
 * @param setBoard - Функция для обновления состояния игрового поля.
 * @param setIsPlayerTurn - Функция для обновления состояния хода.
 * @param setWinner - Функция для обновления состояния победителя.
 * @param setShowModal - Функция для отображения или скрытия модального окна.
 */
export const restartGame = (
  setBoard: Dispatch<SetStateAction<Player[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  setWinner: Dispatch<SetStateAction<GameResult | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
): void => {
  setBoard([...BOARD_ARRAY]);
  setIsPlayerTurn(true);
  setWinner(null);
  setShowModal(false);
};
