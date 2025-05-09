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
  index: number
  onSelect: (index: number, event: 'click' | 'complete') => void;
  isLastMove: boolean
}

export const Cell: FC<CellProps> = ({ value, index, onSelect: onSelect, isLastMove }) => {
  return (
    <div className="cell" onClick={()=>onSelect(index, 'click')}>
      {value && (
        <Lottie
          animationData={animationData[value]}
          autoplay
          loop={false}
          onComplete={()=>{
            if (isLastMove) {
              onSelect(index, 'complete')
            }
          }}

        />
      )}
    </div>
  );
};

