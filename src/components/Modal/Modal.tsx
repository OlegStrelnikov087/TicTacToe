import React from "react";
import "./Modal.css";

import type { ModalProps } from "../../types/types";

/**
 * Модальное окно, отображающее результат игры.
 *
 * @param winner - Победитель (игрок, бот или ничья)
 * @param onRestart - Функция для перезапуска игры
 * @param playerFigure - Символ игрока
 * @param botFigure - Символ бота
 * @param drawStatus - Значение для ничьей
 */
const Modal: React.FC<ModalProps> = ({
  winner,
  onRestart,
  playerFigure,
  botFigure,
  drawStatus,
}) => {
  const getTitle = (): string => {
    if (winner === playerFigure) return "Ты победил! 🎉";
    if (winner === botFigure) return "Бот победил 🤖";
    if (winner === drawStatus) return "Ничья!";
    return "";
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{getTitle()}</h2>
        <button onClick={onRestart}>Играть снова</button>
      </div>
    </div>
  );
};

export default Modal;
