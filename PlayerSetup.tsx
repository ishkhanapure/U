import React, { useEffect } from 'react';
import { useTrapGame } from './useTrapGame';

export const PlayerSetup: React.FC = () => {
  const { playerNames, setPlayerName, startGame } = useTrapGame();

  useEffect(() => {
    if (
      playerNames[1].trim() && playerNames[2].trim() &&
      playerNames[1] !== "Player 1" && playerNames[2] !== "Player 2"
    ) {
      const timer = setTimeout(() => {
        startGame();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [playerNames, startGame]);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.8)",
        borderRadius: "25px",
        padding: "2rem 1.5rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        minWidth: "280px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        fontFamily: "'Inter', sans-serif",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "2rem",
          color: "#e06464",
        }}
      >
        ENTER PLAYER NAMES
      </div>
      <label style={{ fontWeight: 700, fontFamily: "'Luckiest Guy'", color: "#ff6e4e" }}>
        Player 1
        <input
          style={{
            border: "2px solid #e6886a",
            padding: "0.6rem 1rem",
            borderRadius: "12px",
            fontSize: "1.2rem",
            marginLeft: "1rem",
            fontFamily: "'Inter', sans-serif",
          }}
          value={playerNames[1]}
          onChange={e => setPlayerName(1, e.target.value)}
        />
      </label>
      <label style={{ fontWeight: 700, fontFamily: "'Luckiest Guy'", color: "#4e63ff" }}>
        Player 2
        <input
          style={{
            border: "2px solid #7182e0",
            padding: "0.6rem 1rem",
            borderRadius: "12px",
            fontSize: "1.2rem",
            marginLeft: "1rem",
            fontFamily: "'Inter', sans-serif",
          }}
          value={playerNames[2]}
          onChange={e => setPlayerName(2, e.target.value)}
        />
      </label>
    </div>
  );
};
