import React, { useState } from "react";
import Board from "./components/Board/Board";
import FigureSelect from "./components/FigureSelect/FigureSelect";
import { RoleToFigureMap, Figure } from "./types/types";
import './App.css'
const App: React.FC = () => {
  const [figureMap, setFigureMap] = useState<RoleToFigureMap | null>(null);

  const handleSelect = (figure: Figure) => {
    const map: RoleToFigureMap = {
      human: figure,
      bot: figure === "X" ? "O" : "X",
    };
    setFigureMap(map);
  };

  return (
    <>
      {!figureMap ? (
        <FigureSelect onSelect={handleSelect} />
      ) : (
        <>
          <header>Tic Tac Toe</header>
          <main>
            <Board figureMap={figureMap} />
          </main>
        </>
      )}
    </>
  );
};

export default App;
