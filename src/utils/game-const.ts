import { CellValue} from '../types/types';

/** Фигуры */
export const CROSS: CellValue = 'X';
export const OVAL: CellValue = 'O';
// export const EMPTY: CellValue = 'empty';

/** Размеры доски */
export const BOARD_WIDTH = 3;
export const BOARD_HEIGHT = 3;

/** Кол-во клеток */
export const BOARD_SIZE = BOARD_WIDTH * BOARD_HEIGHT;

/** Начальное состояние доски */
export const BOARD_ARRAY: CellValue[] = Array(BOARD_SIZE).fill(null);

/** Значение для ничьей */
export const DRAW_STATUS = 'draw' as const;

/** Задержка перед ходом бота */
export const BOT_MOVE_TIME = 600;

/** Победные линии (можно сгенерировать динамически при необходимости) */
export const WINNING_LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
