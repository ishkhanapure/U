import React from 'react';
import { useTrapGame } from './useTrapGame'; // ✅ fixed path
import { PlayerSetup } from './PlayerSetup';
import { GameGrid } from './GameGrid';
import { GameUI } from './GameUI';
import "@fontsource/inter";
import "@fontsource/luckiest-guy";

function App() {
  const { phase } = useTrapGame();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffe8bc 0%, #ffa07a 100%)",
        fontFamily: "'Inter', 'sans-serif'",
      }}
      className="flex flex-col items-center justify-center"
    >
      <h1
        style={{
          fontFamily: "'Luckiest Guy', cursive, 'Playfair Display', serif",
          fontSize: "3rem",
          margin: "2rem 0 1.5rem 0",
          letterSpacing: "2px",
          background: "linear-gradient(135deg, #e06464 20%, #f7b86b 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="main-title"
      >
        BOMB BOX TRAP GAME
      </h1>
      {phase === 'setup' && <PlayerSetup />}
      {(phase === 'trap_placement' || phase === 'gameplay' || phase === 'game_over') && (
        <>
          <GameGrid />
          <GameUI />
        </>
      )}
    </div>
  );
}

export default App;
