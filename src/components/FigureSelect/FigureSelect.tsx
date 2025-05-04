import React from 'react';
import {FigureSelectorProps} from '../../types/types'
import './FigureSelector.css';

const FigureSelector: React.FC<FigureSelectorProps> = ({ onSelect }) => {
  return (
    <div className="figure-selector">
      <h2>Выберите свою фигуру</h2>
      <div className="figure-buttons">
        <button onClick={() => onSelect('X')}>Крестики</button>
        <button onClick={() => onSelect('O')}>Нолики</button>
      </div>
    </div>
  );
};

export default FigureSelector;
