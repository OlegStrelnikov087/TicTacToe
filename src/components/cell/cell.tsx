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

interface CellProps {
  value: BoardValue;
  onClick: ()=> void;
}

export const Cell: FC<CellProps> = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value && (
        <Lottie
          animationData={animationData[value]}
          autoplay
          loop={false}
        />
      )}
    </div>
  );
};
