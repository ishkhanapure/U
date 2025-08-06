import React from 'react';
import { useTrapGame } from '../lib/stores/useTrapGame';

export const GameUI: React.FC = () => {
  const { phase, winner, playerNames, message, resetGame } = useTrapGame();
  if (phase !== 'game_over') return null;
  return (
    <div
      style={{
        marginTop: "2rem",
        textAlign: "center",
        fontFamily: "'Luckiest Guy', cursive",
        fontSize: "2rem",
        color: "#e06464",
        textShadow: "1px 2px 12px #ffd2c9"
      }}
    >
      {message.toUpperCase()}
      <br />
      <button
        onClick={resetGame}
        style={{
          marginTop: "1.5rem",
          padding: "0.7rem 2.1rem",
          borderRadius: "13px",
          border: "none",
          background: "linear-gradient(80deg, #f67676, #ffba85)",
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "1.25rem",
          cursor: "pointer",
          color: "white",
          boxShadow: "0 7px 21px #eee"
        }}
      >
        Play Again!
      </button>
    </div>
  );
};
