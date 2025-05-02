import { Dispatch, SetStateAction } from 'react';
import { Player, GameResult } from '../types/types';
import { botMove, checkWinner, isGameOver } from './game-logic';
import { DRAW_STATUS, BOARD_ARRAY } from './game-const';

/**
 * Обрабатывает ход игрока.
 * 
 * @param {number} index Индекс клетки на доске, куда игрок хочет сделать ход.
 * @param {Player[]} board Текущая игровая доска.
 * @param {Dispatch<SetStateAction<Player[]>>} setBoard Функция для обновления состояния доски.
 * @param {Dispatch<SetStateAction<boolean>>} setIsPlayerTurn Функция для обновления состояния, чей сейчас ход.
 * @param {Player} PLAYER_FIGURE Фигура игрока
 */
export const handlePlayerMove = (
  index: number,
  board: Player[],
  setBoard: Dispatch<SetStateAction<Player[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  PLAYER_FIGURE: Player,
  isPlayerTurn: Boolean
) => {
  if (!isPlayerTurn || board[index] || checkWinner(board)) return;
  const newBoard = [...board];
    newBoard[index] = PLAYER_FIGURE;
    setBoard(newBoard);
    setIsPlayerTurn(false);
};

/**
 * Обрабатывает ход бота.
 * 
 * @param {Player[]} board Текущая игровая доска.
 * @param {Dispatch<SetStateAction<Player[]>>} setBoard Функция для обновления состояния доски.
 * @param {Dispatch<SetStateAction<boolean>>} setIsPlayerTurn Функция для обновления состояния, чей сейчас ход.
 */
export const handleBotMove = (
  board: Player[],
  setBoard: Dispatch<SetStateAction<Player[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>
) => {
  const newBoard = botMove(board);
  setBoard(newBoard);
  setIsPlayerTurn(true);
};

/**
 * Проверяет, завершена ли игра, и обновляет соответствующие состояния.
 * 
 * @param {Player[]} board Текущая игровая доска.
 * @param {Dispatch<SetStateAction<GameResult | null>>} setWinner Функция для обновления состояния победителя игры.
 * @param {Dispatch<SetStateAction<boolean>>} setShowModal Функция для отображения модального окна при завершении игры.
 */
export const handleGameOver = (
  board: Player[],
  setWinner: Dispatch<SetStateAction<GameResult | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  if (isGameOver(board)) {
    setWinner(checkWinner(board) || DRAW_STATUS);
    setShowModal(true);
  }
};

/**
 * Перезапускает игру, сбрасывая все состояния.
 * 
 * @param {Dispatch<SetStateAction<Player[]>>} setBoard Функция для обновления состояния доски.
 * @param {Dispatch<SetStateAction<boolean>>} setIsPlayerTurn Функция для обновления состояния, чей сейчас ход.
 * @param {Dispatch<SetStateAction<GameResult | null>>} setWinner Функция для сброса состояния победителя.
 * @param {Dispatch<SetStateAction<boolean>>} setShowModal Функция для скрытия модального окна.
 */
export const restartGame = (
  setBoard: Dispatch<SetStateAction<Player[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  setWinner: Dispatch<SetStateAction<GameResult | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setAnimationComplete: Dispatch<SetStateAction<number>>
): void => {
  setBoard([...BOARD_ARRAY]);
  setIsPlayerTurn(true);
  setWinner(null);
  setShowModal(false);
  setAnimationComplete(0)
};
