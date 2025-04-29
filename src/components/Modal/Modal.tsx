import React from "react";
import "./Modal.css";
import { GameResult, Player } from "../../utils/gameConst";

/**
 * Интерфейс для пропсов компонента Modal.
 * @param winner - Результат игры, который может быть 'X', 'O' или 'draw'.
 * @param onRestart - Функция, которая вызывается для перезапуска игры.
 * @param playerFigure - Фигура игрока ('X' или 'O').
 * @param botFigure - Фигура бота ('X' или 'O').
 * @param drawStatus - Статус ничьей.
 */
interface ModalProps {
  winner: GameResult;
  onRestart: () => void;
  playerFigure: Player;
  botFigure: Player;
  drawStatus: GameResult;
}

/**
 * Компонент модального окна, который отображает результат игры
 * (победа игрока, победа бота или ничья) и кнопку для перезапуска игры.
 * @param winner - Результат игры, который может быть 'X', 'O' или 'draw'.
 * @param onRestart - Функция, которая вызывается для перезапуска игры.
 * @param playerFigure - Фигура игрока ('X' или 'O').
 * @param botFigure - Фигура бота ('X' или 'O').
 * @param drawStatus - Статус ничьей.
 * @returns JSX элемент модального окна с результатом игры и кнопкой перезапуска.
 */
const Modal: React.FC<ModalProps> = ({
  winner,
  onRestart,
  playerFigure,
  botFigure,
  drawStatus,
}) => {
  /**
   * Функция для получения заголовка в зависимости от результата игры.
   * @returns Заголовок результата игры: "Ты победил!", "Бот победил" или "Ничья!".
   */
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
