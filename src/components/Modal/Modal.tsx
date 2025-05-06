import React from 'react';
import './modal.css';

/**
 * Интерфейс для пропсов компонента модального окна.
 * @type ModalProps
 * @property {GameResult} winner Результат игры (победитель или ничья).
 * @property {() => void} onRestart Функция для перезапуска игры.
 * @property {GameFigure} playerFigure Фигура игрока (X или O).
 */
export type ModalProps = {
  message: string
  onRestart: VoidFunction;
}

export const Modal: React.FC<ModalProps> = ({
  message,
  onRestart,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{message}</h2>
        <button onClick={onRestart}>Играть снова</button>
      </div>
    </div>
  );
};
