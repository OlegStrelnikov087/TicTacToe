/**
 * Тип игрока: 'X' или 'O'.
 * null означает пустую ячейку.
 */
export type Player = 'X' | 'O' | null;

/**
 * Символ крестика.
 */
export const CROSS: Player = 'X';

/**
 * Символ нолика.
 */
export const OVAL: Player = 'O';

/**
 * Фигура, за которую играет пользователь.
 */
export const PLAYER_FIGURE: Player = CROSS;

/**
 * Фигура, за которую играет бот.
 */
export const BOT_FIGURE: Player = OVAL;

/**
 * Количество ячеек на игровом поле (3x3).
 */
export const BOARD_SIZE = 9;

/**
 * Начальное состояние игрового поля — массив из 9 пустых ячеек.
 */
export const BOARD_ARRAY: Player[] = Array(BOARD_SIZE).fill(null);

/**
 * Константа, обозначающая ничью.
 */
export const DRAW_STATUS = 'draw' as const;

/**
 * Возможный результат игры: победа одного из игроков или ничья.
 */
export type GameResult = Player | typeof DRAW_STATUS;
