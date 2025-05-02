import type { Player } from '../types/types';

/**
 * Фигура игрока — крестик.
 * @constant {Player}
 */
export const CROSS: Player = 'X';

/**
 * Фигура бота — нолик.
 * @constant {Player}
 */
export const OVAL: Player = 'O';

/**
 * Фигура, которой играет пользователь (по умолчанию — крестик).
 * @constant {Player}
 */
export const PLAYER_FIGURE: Player = CROSS;

/**
 * Фигура, которой играет бот (по умолчанию — нолик).
 * @constant {Player}
 */
export const BOT_FIGURE: Player = OVAL;

/**
 * Размер игрового поля (число ячеек).
 * @constant {number}
 */
export const BOARD_SIZE = 9;

/**
 * Начальное состояние игрового поля (массив из 9 пустых ячеек).
 * @constant {Player[]}
 */
export const BOARD_ARRAY: Player[] = Array(BOARD_SIZE).fill(null);

/**
 * Статус игры в случае ничьей.
 * @constant {'draw'}
 */
export const DRAW_STATUS = 'draw' as const;

/**
 * Задержка перед ходом бота (в миллисекундах).
 * @constant {number}
 */
export const BOT_MOVE_TIME = 600;
