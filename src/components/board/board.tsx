import { isGameOver } from '@utils/game-logic';
import { Cell } from '@components/cell/cell';
import { Modal } from '@components/modal/modal';
import { BoardValue, GameNotFinished, GameResult, GameRole } from '@types/types';
import React, { FC, useState } from 'react';
import '@components/board/board.css';
import Lottie from 'lottie-react';
import gridAnimation from '@assets/grid.json';
import {
  BOARD_INITIAL_STATE,
  BOT_MOVE_TIME,
  EMPTY_CELL_VALUE,
  INITIAL_GAME
} from '@utils/game-const';
import { botMove, getResultGameMessage } from '@utils/game-logic';

export const Board: FC = () => {
  const [board, setBoard] = useState<BoardValue[]>(BOARD_INITIAL_STATE);
  const [winner, setWinner] = useState<GameResult>(GameNotFinished.GAME_NOT_FINISHED);
  const [isPlayerMove, setIsPlayerMove] = useState<boolean>(INITIAL_GAME.starter === GameRole.PLAYER);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);

  const handleRestart = (): void => {
    setBoard([...BOARD_INITIAL_STATE])
    setWinner(GameNotFinished.GAME_NOT_FINISHED)
    setIsPlayerMove(INITIAL_GAME.starter === GameRole.PLAYER);
    setLastMoveIndex(null)
  };

  const onSelect = (index: number, event: 'click' | 'complete') => {
    if (event === 'click') {
      if (board[index] !== EMPTY_CELL_VALUE || !isPlayerMove || winner !== GameNotFinished.GAME_NOT_FINISHED) return;

      const newBoard = [...board];
      newBoard[index] = INITIAL_GAME.playerFigure;
      setBoard(newBoard);
      setIsPlayerMove(false);
      setLastMoveIndex(index);
    }

    if (event === 'complete') {
      const result = isGameOver(board);
      if (result !== GameNotFinished.GAME_NOT_FINISHED) {
        setWinner(result);
        setLastMoveIndex(null);
        return;
      }

      if (!isPlayerMove) {
        setTimeout(() => {
          const newBoard = botMove(board, lastMoveIndex);
          const newMoveIndex = newBoard.findIndex((v, i) => v !== board[i]);
          setBoard(newBoard);
          setIsPlayerMove(true);
          setLastMoveIndex(newMoveIndex);
        }, BOT_MOVE_TIME)
      }
    }
  };


  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board && board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            index={i}
            onSelect={onSelect}
            isLastMove={lastMoveIndex === i}
          />
        ))}
      </div>

      {winner !== GameNotFinished.GAME_NOT_FINISHED && (
        <Modal
          content={<h2>{getResultGameMessage(winner, INITIAL_GAME.playerFigure)}</h2>}
          playAgainButtonText='Играть снова'
          onClose={handleRestart}
        />
      )}
    </div>
  );
};

