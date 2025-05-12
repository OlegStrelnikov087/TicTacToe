import React, { useState } from 'react';
import { GameFigure } from '@types/types';
import { UserController } from '@controllers/user-controller';
import { BotController } from '@controllers/bot-controller';
import type { Controller } from '@controllers/controller-type';
import './setup.css';

interface SetupProps {
  onStart: (controllers: Controller[]) => void;
}

export const Setup: React.FC<SetupProps> = ({ onStart }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Role, setPlayer1Role] = useState<'user' | 'bot'>('user');
  const [player2Role, setPlayer2Role] = useState<'user' | 'bot'>('user');
  const [player1Figure, setPlayer1Figure] = useState<GameFigure>(GameFigure.X);
  const [player2Figure, setPlayer2Figure] = useState<GameFigure>(GameFigure.O);

  const handleStartGame = () => {
    const controllers: Controller[] = [
      player1Role === 'user' ? new UserController(player1Name, player1Figure) : new BotController(player1Name, player1Figure),
      player2Role === 'user' ? new UserController(player2Name, player2Figure) : new BotController(player2Name, player2Figure),
    ];

    onStart(controllers);
  };

  return (
    <div className="setup-container">
      <h2 className="setup-title">Настройка игры</h2>

      <div className="setup-player-section">
        <h3>Игрок 1</h3>
        <input
          type="text"
          placeholder="Имя Игрока 1"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="setup-input"
        />
        <div className="setup-role-option">
          <label>
            <input
              type="radio"
              name="player1Role"
              checked={player1Role === 'user'}
              onChange={() => setPlayer1Role('user')}
            />
            Игрок (человек)
          </label>
          <label>
            <input
              type="radio"
              name="player1Role"
              checked={player1Role === 'bot'}
              onChange={() => setPlayer1Role('bot')}
            />
            Бот
          </label>
        </div>
        <div className="setup-figure-option">
          <label>
            <input
              type="radio"
              name="player1Figure"
              checked={player1Figure === GameFigure.X}
              onChange={() => setPlayer1Figure(GameFigure.X)}
            />
            X
          </label>
          <label>
            <input
              type="radio"
              name="player1Figure"
              checked={player1Figure === GameFigure.O}
              onChange={() => setPlayer1Figure(GameFigure.O)}
            />
            O
          </label>
        </div>
      </div>

      <div className="setup-player-section">
        <h3>Игрок 2</h3>
        <input
          type="text"
          placeholder="Имя Игрока 2"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className="setup-input"
        />
        <div className="setup-role-option">
          <label>
            <input
              type="radio"
              name="player2Role"
              checked={player2Role === 'user'}
              onChange={() => setPlayer2Role('user')}
            />
            Игрок (человек)
          </label>
          <label>
            <input
              type="radio"
              name="player2Role"
              checked={player2Role === 'bot'}
              onChange={() => setPlayer2Role('bot')}
            />
            Бот
          </label>
        </div>
        <div className="setup-figure-option">
          <label>
            <input
              type="radio"
              name="player2Figure"
              checked={player2Figure === GameFigure.X}
              onChange={() => setPlayer2Figure(GameFigure.X)}
            />
            X
          </label>
          <label>
            <input
              type="radio"
              name="player2Figure"
              checked={player2Figure === GameFigure.O}
              onChange={() => setPlayer2Figure(GameFigure.O)}
            />
            O
          </label>
        </div>
      </div>

      <button
        onClick={handleStartGame}
        className="setup-button"
      >
        Начать игру
      </button>
    </div>
  );
};
