
import React, { FC, useEffect, useRef, useState } from 'react';
import { Cell } from '@/components/cell/cell';
import { Modal } from '@/components/modal/modal';
import Lottie from 'lottie-react';
import gridAnimation from '@assets/grid.json';
import { BoardValue, GameNotFinished, GameResult, GameFigure } from '@types/types';
import { BOARD_INITIAL_STATE, EMPTY_CELL_VALUE } from '@utils/game-const';
import { isGameOver, getResultGameMessage } from '@utils/game-logic';
import { BotController } from '@controllers/bot-controller';
import { UserController } from '@controllers/user-controller';
import { GameController } from '@controllers/game-controller';
import '@components/board/board.css';

export const Board: FC = () => {
  const [board, setBoard] = useState<BoardValue[]>(BOARD_INITIAL_STATE);
  const [winner, setWinner] = useState<GameResult>(GameNotFinished.GAME_NOT_FINISHED);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);

  const boardRef = useRef(board);
  boardRef.current = board;

  const userControllersRef = useRef<UserController[]>([]); 

  const handleClick = (index: number) => {
    for (const user of userControllersRef.current) {
      user.onUserClick(index);
    }
  };

  useEffect(() => {
    const player1 = new UserController('Игрок 1', GameFigure.X);
    const player2 = new UserController('Игрок 2', GameFigure.O); 

    const controllers = [player1, player2];

    userControllersRef.current = controllers.filter(
      (c): c is UserController => c instanceof UserController
    );

    const gameController = new GameController(
      controllers,
      (newBoard: BoardValue[]) => {
        const prevBoard = boardRef.current;
        const index = newBoard.findIndex((v, i) => v !== prevBoard[i]);
        setBoard(newBoard);
        setLastMoveIndex(index !== -1 ? index : null);
      },
      (result: GameResult) => {
        setWinner(result);
      }
    );

    gameController.start();
  }, []);

  const handleRestart = () => {
    setBoard([...BOARD_INITIAL_STATE]);
    setWinner(GameNotFinished.GAME_NOT_FINISHED);
    setLastMoveIndex(null);
  };

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {winner !== GameNotFinished.GAME_NOT_FINISHED && (
        <Modal
          content={<h2>{getResultGameMessage(winner, GameFigure.X)}</h2>}
          playAgainButtonText="Играть снова"
          onClose={handleRestart}
        />
      )}
    </div>
  );
};
