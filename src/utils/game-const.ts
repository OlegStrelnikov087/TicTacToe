import { GameEmpty, GameFigure, Board, InitialGameConfig, GameRole } from '@types/types';

export const INITIAL_GAME: InitialGameConfig = {
    starter: GameRole.PLAYER,
    playerFigure: GameFigure.X,
    botFigure: GameFigure.O,
  };

// export const PLAYER_FIGURE: GameFigure = GameFigure.X;

// export const BOT_FIGURE: GameFigure = GameFigure.O;

export const BOARD_SIZE = 9;

export const EMPTY_CELL_VALUE: GameEmpty = null;

export const BOARD_INITIAL_STATE: Board = Array(BOARD_SIZE).fill(EMPTY_CELL_VALUE);

/**
 * Время на раздумывание бота (в миллисекундах).
 * @constant {number}
 */
export const BOT_MOVE_TIME = 600;