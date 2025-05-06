import { BoardValue, GameFigure } from '@types/types';
import Lottie from 'lottie-react';
import '@components/cell/cell.css';
import React, { FC } from 'react';
import crossAnimation from '@assets/cross.json';
import ovalAnimation from '@assets/oval.json';

const animationData: Record<GameFigure, object> = {
  [GameFigure.X]: crossAnimation,
  [GameFigure.O]: ovalAnimation
};

/**
 * Интерфейс для пропсов компонента клетки на игровом поле.
 * @interface CellProps
 * @property {BoardValue} value Текущее значение клетки (X, O или null).
 * @property {() => void} onClick Функция для обработки клика на клетке.
 */
export interface CellProps {
  value: BoardValue;
  handleSelect: VoidFunction
}

export const Cell: FC<CellProps> = ({ value, handleSelect: handleSelect}) => {
  return (
    <div className="cell" onClick={handleSelect}>
      {value && (
        <Lottie
          animationData={animationData[value]}
          autoplay
          loop={false}
          onComplete={handleSelect}
        />
      )}
    </div>
  );
};