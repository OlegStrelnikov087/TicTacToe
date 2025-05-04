import React, { useEffect, useState } from "react";
import "./Board.css";

import Lottie from "lottie-react";
import gridAnimation from "../../assets/grid.json";

import Modal from "../Modal/Modal";
import Cell from "../Cell/Cell";

import {
  BOARD_ARRAY,
  DRAW_STATUS,
  BOT_MOVE_TIME
} from "../../utils/game-const";

import {
  CellValue,
  GameResult,
  RoleToFigureMap
} from "../../types/types";

import {
  checkWinner,
  isGameOver,
} from "../../utils/game-logic";

import {
  handleBotMove,
  handlePlayerMove,
  restartGame
} from "../../utils/game-state";

interface BoardProps {
  figureMap: RoleToFigureMap;
}

/**
 * Компонент игрового поля для игры "Крестики-нолики".
 * Отображает поле, позволяет игроку совершать ход, запускает ходы бота и отображает результат игры.
 */
const Board: React.FC<BoardProps> = ({ figureMap }) => {
  const [board, setBoard] = useState<CellValue[]>([...BOARD_ARRAY]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<GameResult | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [animationsComplete, setAnimationsComplete] = useState(0);

  const handleRestart = (): void => {
    restartGame(setBoard, setIsPlayerTurn, setWinner, setShowModal, setAnimationsComplete);
  };

  useEffect(() => {
    const filledCells = board.filter(cell => cell !== null).length;

    if (isGameOver(board)) {
      if (animationsComplete === filledCells) {
        setTimeout(() => {
          setWinner(checkWinner(board) || DRAW_STATUS);
          setShowModal(true);
        }, 100);
      }
      return;
    }

    if (!isPlayerTurn) {
      const timeout = setTimeout(() => {
        handleBotMove(board, setBoard, setIsPlayerTurn, figureMap.bot);
      }, BOT_MOVE_TIME);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, animationsComplete, figureMap.bot]);

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            onClick={() => handlePlayerMove(i, board, setBoard, setIsPlayerTurn, figureMap.human, isPlayerTurn)}
            onAnimationComplete={() => setAnimationsComplete(prev => prev + 1)}
          />
        ))}
      </div>

      {showModal && winner &&(
        <Modal
          winner={winner}
          onRestart={handleRestart}
          playerFigure={figureMap.human}
          botFigure={figureMap.bot}
          drawStatus={DRAW_STATUS}
        />
      )}
    </div>
  );
};

export default Board;
