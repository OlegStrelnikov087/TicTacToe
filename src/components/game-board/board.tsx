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
  BOT_MOVE_TIME
} from '@utils/game-const';
import { botMove } from '@utils/game-logic';

export const Board: FC = () => {
  const [board, setBoard] = useState<BoardValue[]>(BOARD_INITIAL_STATE);
  const [winner, setWinner] = useState<GameResult | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [animationsComplete, setAnimationsComplete] = useState(0);

  useEffect(() => {
    clearBoard();
  }, []);

  const clearBoard = (): void => {
    setBoard([...BOARD_INITIAL_STATE]);
    setWinner(null);
  };

  const handleRestart = (): void => {
    clearBoard();
    setIsPlayerTurn(true);
    setAnimationsComplete(0);
  };

  const handlePlayerMove = useCallback((index: number) => {
    if (isPlayerTurn && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = PLAYER_FIGURE;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  }, [board, isPlayerTurn]);

  const handleBotMove = useCallback((): void => {
    const newBoard = botMove(board);
    setBoard(newBoard);
    setIsPlayerTurn(true);
  }, [board]);

  const cellEvent = (index: number): void => {
    if (!isPlayerTurn || board[index]) return;
    handlePlayerMove(index);
    setAnimationsComplete(prev => prev + 1);
  }

  useEffect(() => {
    const gameResult = isGameOver(board);

    if (gameResult) {
      setWinner(gameResult);
      return;
    }

    if (!isPlayerTurn) {
      const timeout = setTimeout(() => {
        handleBotMove();
      }, BOT_MOVE_TIME);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, animationsComplete]);

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board && board.map((cell, i) => (
          <Cell
          key={i}
          value={cell}
          handleEvent={()=>cellEvent(i)}
        />
        ))}
      </div>

      {winner && (
        <Modal
          winner={winner}
          onRestart={handleRestart}
          playerFigure={PLAYER_FIGURE}
        />
      )}
    </div>
  );
};
