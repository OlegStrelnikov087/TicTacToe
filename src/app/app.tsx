import '@app/app.css';
import { Board } from '@/components/board/board';
import { FC, JSX } from 'react';

export const App: FC = (): JSX.Element => {
  return (
    <>
      <header>Tic Tac Toe</header>
      <main>
        <Board />
      </main>
    </>
  );
};
