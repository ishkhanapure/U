import React from 'react';
import { useTrapGame } from './useTrapGame';
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
        background: "linear-gradient(135deg, #ffe8bc 0%, #ff9a8b 100%)",
        fontFamily: "'Inter', sans-serif",
        padding: "2rem",
      }}
      className="flex flex-col items-center justify-center"
    >
      <h1
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "3rem",
          marginBottom: "2rem",
          letterSpacing: "2px",
          background: "linear-gradient(135deg, #f43f5e 20%, #fbbf24 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        🎯 BOMB BOX TRAP 🎯
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
