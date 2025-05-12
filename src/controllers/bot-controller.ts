import { Board, GameFigure } from "@types/types";
import { getBotMoveIndex } from "@utils/game-logic";
import { BOT_MOVE_TIME } from "@utils/game-const";
import { Controller } from "./controllers-type";

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export class BotController implements Controller {
  public readonly figure: GameFigure;

  constructor(public readonly name: string, figure: GameFigure) {
    this.figure = figure;
  }

  getTitle = (): string => 'Ход бота: ' + this.name;

  async getAction(lastMoveIndex: number | null, board: Board): Promise<number | undefined> {
    await delay(BOT_MOVE_TIME); // имитация "мышления"

    const index = getBotMoveIndex(board, lastMoveIndex, this.figure);
    return index;
  }
}





