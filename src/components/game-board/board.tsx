import { isGameOver } from '@utils/game-logic';
import { Cell } from '@components/cell/Cell';
import { Modal } from '@components/modal/modal';
import { BoardValue, GameResult } from '@types/types';
import React, { FC, useEffect, useState, useCallback } from 'react';
import '@components/game-board/board.css';
import Lottie from 'lottie-react';
import gridAnimation from '@assets/grid.json';
import {
  PLAYER_FIGURE,
  BOARD_INITIAL_STATE,
  BOT_MOVE_TIME,
  EMPTY_CELL_VALUE
} from '@utils/game-const';
import { botMove, getResultGameMessage } from '@utils/game-logic';

export const Board: FC = () => {
  const [board, setBoard] = useState<BoardValue[]>(BOARD_INITIAL_STATE);
  const [winner, setWinner] = useState<GameResult | null>(null);
  const [isPlayerMove, setIsPlayerMove] = useState<boolean>(true);

  useEffect(() => {
    clearBoard();
  }, []);

  const clearBoard = (): void => {
    setBoard([...BOARD_INITIAL_STATE]);
    setWinner(null);
  };

  const handleRestart = (): void => {
    clearBoard();
    setIsPlayerMove(true);
  };

  const handlePlayerMove = useCallback((index: number) => {
    if (isPlayerMove && board[index] === EMPTY_CELL_VALUE) {
      const newBoard = [...board];
      newBoard[index] = PLAYER_FIGURE;
      setBoard(newBoard);
      const gameResult = isGameOver(newBoard)
      if (gameResult) setWinner(gameResult);
      setIsPlayerMove(false);
    }
  }, [board, isPlayerMove]);

  const handleBotMove = useCallback((): void => {
    const newBoard = botMove(board);
    setBoard(newBoard);
    const gameResult = isGameOver(newBoard)
    if (gameResult) setWinner(gameResult);
    setIsPlayerMove(true);
  }, [board]);

  const cellEvent = (index: number): void => {
    if (!isPlayerMove || board[index] !== EMPTY_CELL_VALUE) return;
    handlePlayerMove(index);
  }

  useEffect(() => {
    if (!isPlayerMove && !winner) {
      const timeout = setTimeout(() => {
        handleBotMove();
      }, BOT_MOVE_TIME);
      return () => clearTimeout(timeout);
    }
  }, [isPlayerMove, winner]);

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board && board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            handleSelect={() => cellEvent(i)}
          />
        ))}
      </div>

      {winner && (
        <Modal
          message= {getResultGameMessage(winner, PLAYER_FIGURE)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};
