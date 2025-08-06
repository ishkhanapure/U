import React, { useEffect } from 'react';
import { useTrapGame } from '../lib/stores/useTrapGame';

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
        background: "rgba(255,255,255,0.7)",
        borderRadius: "20px",
        padding: "2rem 1.5rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.11)",
        minWidth: "260px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        fontFamily: "'Inter', sans-serif",
        alignItems: "center"
      }}
    >
      <div
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "2rem",
          color: "#e27661",
        }}
      >
        ENTER YOUR NAMES TO BEGIN
      </div>
      <label
        style={{ fontWeight: 700, fontFamily: "'Luckiest Guy', cursive", color: "#ff6e4e" }}>
        Player 1
        <input
          style={{
            border: "2px solid #e6886a",
            padding: "0.6rem 1.1rem",
            borderRadius: "13px",
            fontSize: "1.2rem",
            marginLeft: "1rem",
            fontFamily: "'Inter', sans-serif"
          }}
          value={playerNames[1]}
          onChange={e => setPlayerName(1, e.target.value)}
        />
      </label>
      <label
        style={{ fontWeight: 700, fontFamily: "'Luckiest Guy', cursive", color: "#6e82ff" }}>
        Player 2
        <input
          style={{
            border: "2px solid #7182e0",
            padding: "0.6rem 1.1rem",
            borderRadius: "13px",
            fontSize: "1.2rem",
            marginLeft: "1rem",
            fontFamily: "'Inter', sans-serif"
          }}
          value={playerNames[2]}
          onChange={e => setPlayerName(2, e.target.value)}
        />
      </label>
    </div>
  );
};
