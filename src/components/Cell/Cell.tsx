import React from "react";
import Lottie from "lottie-react";
import "./Cell.css";

import crossAnimation from "../../assets/cross.json";
import ovalAnimation from "../../assets/oval.json";
import { CROSS} from "../../utils/game-const";
import { CellProps } from "../../types/types";

/**
 * Компонент, представляющий одну ячейку на игровом поле.
 * Отображает анимацию в зависимости от значения ячейки ('X' или 'O').
 * @param value - Значение ячейки, которое может быть 'X', 'O' или null.
 * @param onClick - Функция, которая вызывается при клике на ячейку.
 * @returns JSX элемент ячейки с анимацией.
 */
const Cell: React.FC<CellProps> = ({ value, onClick, onAnimationComplete }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value && (
        <Lottie
          animationData={value === CROSS ? crossAnimation : ovalAnimation}
          autoplay
          loop={false}
          onComplete={onAnimationComplete}
        />
      )}
    </div>
  );
};

export default Cell;