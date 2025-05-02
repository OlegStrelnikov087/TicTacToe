import React, { useEffect, useState } from "react";
import "./Board.css";

import Lottie from "lottie-react";
import gridAnimation from "../../assets/grid.json";

import Modal from "../Modal/Modal";
import Cell from "../Cell/Cell";

import {
  PLAYER_FIGURE,
  BOT_FIGURE,
  BOARD_ARRAY,
  DRAW_STATUS,
  BOT_MOVE_TIME
} from "../../utils/game-const";

import {
  Player,
  GameResult
} from "../../types/types"

import {
  checkWinner,
  isGameOver,
} from "../../utils/game-logic";

import {
  handleBotMove,
  handlePlayerMove,
  restartGame
} from "../../utils/game-state"

/**
 * Компонент игрового поля для игры "Крестики-нолики".
 * Отображает поле, позволяет игроку совершать ход, запускает ходы бота и отображает результат игры.
 * @returns JSX элемент, который представляет игровое поле с анимацией и модальным окном.
 */
const Board: React.FC = () => {
  // Состояния компонента
  const [board, setBoard] = useState<Player[]>([...BOARD_ARRAY]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<GameResult | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [animationsComplete, setAnimationsComplete] = useState(0);

  /**
   * Обработчик перезапуска игры.
   * Вызывается при нажатии на кнопку в модальном окне.
   */
  const handleRestart = (): void => {
    restartGame(setBoard, setIsPlayerTurn, setWinner, setShowModal, setAnimationsComplete);
  };

  useEffect(() => {
    const filledCells = board.filter(cell => cell !== null).length;

    // Если игра завершена и все анимации завершились — показать модалку
    if (isGameOver(board)) {
      if (animationsComplete === filledCells) {
        setTimeout(() => {
          setWinner(checkWinner(board) || DRAW_STATUS);
          setShowModal(true);
        }, 100); // небольшой буфер
      }
      return; // игра завершена — ничего больше не делаем
    }
    // Если сейчас ход бота — запускаем его с задержкой
    if (!isPlayerTurn) {
      const timeout = setTimeout(() => {
        handleBotMove(board, setBoard, setIsPlayerTurn);
      }, BOT_MOVE_TIME);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, animationsComplete]);

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            onClick={() => handlePlayerMove(i, board, setBoard, setIsPlayerTurn, PLAYER_FIGURE, isPlayerTurn)}
            onAnimationComplete={() => setAnimationsComplete(prev => prev + 1)}
          />
        ))}
      </div>

      {showModal && (
        <Modal
          winner={winner}
          onRestart={handleRestart}
          playerFigure={PLAYER_FIGURE}
          botFigure={BOT_FIGURE}
          drawStatus={DRAW_STATUS}
        />
      )}
    </div>
  );
};

export default Board;