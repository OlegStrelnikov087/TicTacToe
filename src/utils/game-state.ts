import { Dispatch, SetStateAction } from 'react';
import { CellValue, GameResult } from '../types/types';
import { botMove, checkWinner, isGameOver } from './game-logic';
import { DRAW_STATUS, BOARD_ARRAY } from './game-const';

/**
 * Обрабатывает ход игрока.
 */
export const handlePlayerMove = (
  index: number,
  board: CellValue[],
  setBoard: Dispatch<SetStateAction<CellValue[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  playerFigure: CellValue,
  isPlayerTurn: boolean
) => {
  if (!isPlayerTurn || board[index] || checkWinner(board)) return;
  const newBoard = [...board];
  newBoard[index] = playerFigure;
  setBoard(newBoard);
  setIsPlayerTurn(false);
};

/**
 * Обрабатывает ход бота.
 */
export const handleBotMove = (
  board: CellValue[],
  setBoard: Dispatch<SetStateAction<CellValue[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  botFigure: CellValue
) => {
  const newBoard = botMove(board, botFigure);
  setBoard(newBoard);
  setIsPlayerTurn(true);
};

/**
 * Проверяет завершение игры.
 */
export const handleGameOver = (
  board: CellValue[],
  setWinner: Dispatch<SetStateAction<GameResult | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  if (isGameOver(board)) {
    setWinner(checkWinner(board) || DRAW_STATUS);
    setShowModal(true);
  }
};

/**
 * Перезапускает игру.
 */
export const restartGame = (
  setBoard: Dispatch<SetStateAction<CellValue[]>>,
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>,
  setWinner: Dispatch<SetStateAction<GameResult | null>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setAnimationComplete: Dispatch<SetStateAction<number>>
): void => {
  setBoard([...BOARD_ARRAY]);
  setIsPlayerTurn(true);
  setWinner(null);
  setShowModal(false);
  setAnimationComplete(0);
};
