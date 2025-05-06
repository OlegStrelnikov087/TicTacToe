import { isGameOver } from '@utils/game-logic';
import { Cell } from '@components/cell/Cell';
import { Modal } from '@components/modal/modal';
import { BoardValue, GameResult } from '@types/types';
import React, { FC, useEffect, useState } from 'react';
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
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null)

  useEffect(() => {
    clearBoard();
  }, []);

  const clearBoard = () => {
    setBoard([...BOARD_INITIAL_STATE]);
    setWinner(null);
    setIsPlayerMove(true);
    setLastMoveIndex(null);
  };

  const handleRestart = (): void => {
    clearBoard();
    setIsPlayerMove(true);
  };

  const onSelect = (index: number): VoidFunction => {
    return () => {
      const isEmpty = board[index] === EMPTY_CELL_VALUE;

      // Игрок делает ход по клику
      if (isEmpty && isPlayerMove) {
        console.log(lastMoveIndex);
        
        const newBoard = [...board];
        newBoard[index] = PLAYER_FIGURE;
        setBoard(newBoard);
        setIsPlayerMove(false);
        setLastMoveIndex(index); // Сохраняем индекс хода игрока
      }

      // Завершаем анимацию — проверяем результат игры или ход бота
      else if (index === lastMoveIndex) {
        console.log(lastMoveIndex);
        
        const result = isGameOver(board);
        if (result) {
          setWinner(result); // Если игра завершена, показываем победителя
          setLastMoveIndex(null); // Сброс индекса после завершения игры
          return;
        }

        // Бот делает ход
        if (!isPlayerMove) {
          setTimeout(() => {
            const newBoard = botMove(board);
            setBoard(newBoard);
            setIsPlayerMove(true); // Игрок снова ходит

            const botIndex = newBoard.findIndex((cell, i) => cell !== board[i]);
            if (botIndex !== -1) {
              setLastMoveIndex(botIndex); // Сохраняем индекс хода бота
            }
          }, BOT_MOVE_TIME);
        }
      }
    };
  };

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board && board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            onSelect={onSelect(i)}
          />
        ))}
      </div>

      {winner && (
        <Modal
          message={getResultGameMessage(winner, PLAYER_FIGURE)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};
