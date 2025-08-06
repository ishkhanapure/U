import React from 'react';
import { useTrapGame } from './useTrapGame';

export const GameGrid: React.FC = () => {
  const {
    grid,
    phase,
    placeTrap,
    clickBox,
    currentTrapPlacer,
    currentPlayer,
    playerNames,
  } = useTrapGame();

  const handleBoxClick = (index: number) => {
    if (phase === 'trap_placement') {
      placeTrap(index);
    } else if (phase === 'gameplay') {
      clickBox(index);
    }
  };

  const getBoxStyle = (box: typeof grid[0], index: number) => {
    const base =
      "aspect-square rounded-xl border-4 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center font-black text-3xl shadow-xl m-1 select-none";

    if (phase === 'trap_placement') {
      const isMyTrap = box.trapOwner === currentTrapPlacer;
      const isOtherTrap = box.trapOwner && box.trapOwner !== currentTrapPlacer;
      if (isMyTrap) return base + " bg-rose-700 border-rose-900 text-white ring-4 ring-rose-300";
      if (isOtherTrap) return base + " bg-gray-200 border-gray-400 opacity-50 cursor-not-allowed hover:scale-100";
      return base + " bg-pink-50 border-pink-300 hover:bg-pink-200 ring-2 ring-pink-300/50";
    }

    if (box.revealed) {
      if (box.state === 'trap')
        return base + " bg-red-600 border-red-800 text-white ring-4 ring-red-400/50";
      if (box.state === 'safe')
        return base + " bg-green-500 border-green-700 text-white ring-4 ring-green-300/50";
    }

    return base + " bg-white border-gray-300 hover:bg-yellow-100";
  };

  const getBoxContent = (box: typeof grid[0], index: number) => {
    if (phase === 'trap_placement' && box.trapOwner === currentTrapPlacer)
      return '💣';

    if (phase === 'gameplay') {
      if (
        box.state === 'trap' &&
        !box.revealed &&
        box.trapOwner === currentPlayer
      ) return '💣';
    }

    if (box.revealed) {
      if (box.state === 'trap') return '💥';
      if (box.state === 'safe') return '✓';
    }

    return '';
  };

  return (
    <div
      style={{
        width: "min(360px, 90vw)",
        margin: "1.5rem auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          color: "#8b1d5e",
          textShadow: "1px 1px 4px #ffbdd8",
        }}
      >
        {phase === 'trap_placement'
          ? `${playerNames[currentTrapPlacer].toUpperCase()}, PLACE YOUR TRAP`
          : phase === 'gameplay'
          ? `${playerNames[currentPlayer].toUpperCase()}'S TURN`
          : null}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "6px",
        }}
      >
        {grid.map((box, i) => (
          <button
            key={i}
            onClick={() => handleBoxClick(i)}
            className={getBoxStyle(box, i)}
            disabled={
              phase === 'trap_placement'
                ? box.trapOwner !== undefined
                : box.revealed || phase === 'game_over'
            }
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              height: "56px",
              minWidth: "56px",
              fontSize: "2rem",
              outline: "none",
            }}
          >
            {getBoxContent(box, i)}
          </button>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "1.1rem",
        }}
      >
        <span style={{ color: "#4e63ff" }}>PLAYER 1</span>
        <span style={{ color: "#f76786" }}>PLAYER 2</span>
      </div>
    </div>
  );
};
