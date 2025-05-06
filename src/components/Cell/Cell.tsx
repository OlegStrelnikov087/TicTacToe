import { BoardValue, GameFigure } from '@types/types';
import Lottie from 'lottie-react';
import '@components/cell/cell.css';
import React, { FC, useState } from 'react';
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
interface CellProps {
  value: BoardValue;
  onSelect: VoidFunction,
}

export const Cell: FC<CellProps> = ({ value, onSelect: onSelect }) => {
  return (
    <div className="cell" onClick={onSelect}>
      {value && (
        <Lottie
          animationData={animationData[value]}
          autoplay
          loop={false}
          onComplete={onSelect}
        />
      )}
    </div>
  );
};

