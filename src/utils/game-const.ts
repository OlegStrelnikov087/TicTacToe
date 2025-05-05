import { GameEmpty, GameFigure, Board } from '@types/types';

/**
 * Фигура, которой играет пользователь (по умолчанию — крестик).
 * @constant {BoardValue}
 */
export const PLAYER_FIGURE: GameFigure = GameFigure.X;

/**
 * Фигура, которой играет бот (по умолчанию — нолик).
 * @constant {BoardValue}
 */
export const BOT_FIGURE: GameFigure = GameFigure.O;

/**
 * Размер игрового поля (число ячеек).
 * @constant {number}
 */
export const BOARD_SIZE = 9;

export const EMPTY_CELL_VALUE: GameEmpty = null;

/**
 * Начальное состояние игрового поля (массив из 9 пустых ячеек).
 * @constant {BoardValue[]}
 */
export const BOARD_INITIAL_STATE: Board = Array(BOARD_SIZE).fill(EMPTY_CELL_VALUE);

/**
 * Время на раздумывание бота (в миллисекундах).
 * @constant {number}
 */
export const BOT_MOVE_TIME = 600;