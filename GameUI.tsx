import React from 'react';
import { useTrapGame } from './useTrapGame';

export const GameUI: React.FC = () => {
  const { phase, message, resetGame } = useTrapGame();

  if (phase !== 'game_over') return null;

  return (
    <div
      style={{
        marginTop: "2rem",
        textAlign: "center",
        fontFamily: "'Luckiest Guy', cursive",
        fontSize: "2rem",
        color: "#e06464",
        textShadow: "1px 2px 12px #ffd2c9",
      }}
    >
      {message.toUpperCase()}
      <br />
      <button
        onClick={resetGame}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 2.2rem",
          borderRadius: "15px",
          border: "none",
          background: "linear-gradient(80deg, #f67676, #ffba85)",
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "1.3rem",
          cursor: "pointer",
          color: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        Play Again 🎮
      </button>
    </div>
  );
};
