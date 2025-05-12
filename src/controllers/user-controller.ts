import { GameFigure } from '@types/types';
import { Controller } from './controllers-type';

export class UserController implements Controller {
  public readonly figure: GameFigure;
  private resolveClick!: (index: number) => void;

  constructor(public readonly name: string, figure: GameFigure) {
    this.figure = figure;
  }

  getTitle = (): string => 'Ход игрока: ' + this.name;

  async getAction(_: number | null): Promise<number | undefined> {
    return new Promise<number>((resolve) => {
      this.resolveClick = resolve;
    });
  }

  onUserClick(index: number) {
    if (this.resolveClick) {
      this.resolveClick(index);
    }
  }
}
