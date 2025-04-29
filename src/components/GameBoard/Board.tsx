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
  Player,
  GameResult,
} from "../../utils/gameConst";

import {
  checkWinner,
  isGameOver,
  restartGame,
  makeBotMove,
} from "../../utils/gameController";

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

  /**
   * Обработчик клика по ячейке. Игрок делает свой ход.
   * @param index Индекс ячейки, по которой был клик.
   */
  const handleClick = (index: number): void => {
    if (!isPlayerTurn || board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = PLAYER_FIGURE;
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };
  
  /**
   * Обработчик перезапуска игры.
   * Вызывается при нажатии на кнопку в модальном окне.
   */
  const handleRestart = (): void => {
    restartGame(setBoard, setIsPlayerTurn, setWinner, setShowModal);
  };

  useEffect(() => {
    // Проверка завершения игры после каждого хода
    if (isGameOver(board)) {
      setWinner(checkWinner(board) || DRAW_STATUS);
      setShowModal(true);
      return;
    }

    // Если ход бота, запускаем его ход с задержкой
    if (!isPlayerTurn) {
      const timeout = setTimeout(() => {
        makeBotMove(setBoard, setIsPlayerTurn, board);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn]);

  return (
    <div className="boardContainer">
      <Lottie animationData={gridAnimation} autoPlay loop={false} />
      <div className="gameBoard">
        {board.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => handleClick(i)} />
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
