import { CellProps, GameFigure } from '@types/types';
import Lottie from 'lottie-react';
import '@components/cell/cell.css';
import React, { FC } from 'react';
import crossAnimation from '@assets/cross.json';
import ovalAnimation from '@assets/oval.json';

const animationData: Record<GameFigure, object> = {
  [GameFigure.X]: crossAnimation,
  [GameFigure.O]: ovalAnimation
};

export const Cell: FC<CellProps> = ({ value, handleEvent}) => {
  return (
    <div className="cell" onClick={handleEvent}>
      {value && (
        <Lottie
          animationData={animationData[value]}
          autoplay
          loop={false}
          onComplete={handleEvent}
        />
      )}
    </div>
  );
};