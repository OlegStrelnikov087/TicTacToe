import React, { useState } from 'react';
import { Setup } from '@components/setup/setup';
import { Board } from '@components/board/board';
import { Controller } from '@controllers/controller-type';
import '@app/app.css';
export function App() {
  const [controllers, setControllers] = useState<Controller[] | null>(null);

  return (
    <div>
      {controllers ? (
        <>
          <header>Tic Tac Toe</header>
          <main>
            <Board controllers={controllers} onRestart={() => setControllers(null)} />
          </main>
        </>
      ) : (
        <Setup onStart={setControllers} />
      )}
    </div>
  );
}
