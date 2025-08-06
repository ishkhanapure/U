import React from 'react';
import { useTrapGame } from '../lib/stores/useTrapGame';

export const GameGrid: React.FC = () => {
  const { grid, phase, placeTrap, clickBox, currentTrapPlacer, currentPlayer, playerNames } = useTrapGame();

  const handleBoxClick = (index: number) => {
    if (phase === 'trap_placement') {
      placeTrap(index);
    } else if (phase === 'gameplay') {
      clickBox(index);
    }
  };

  const getBoxStyle = (box: typeof grid[0], index: number) => {
    const baseStyle =
      "aspect-square rounded-xl border-4 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center font-black text-3xl shadow-xl backdrop-blur-sm m-1 select-none";
    if (phase === 'trap_placement') {
      const isMyTrap = currentTrapPlacer === 1 ? grid[index].trapOwner === 1 : grid[index].trapOwner === 2;
      const isOtherTrap = currentTrapPlacer === 1 ? grid[index].trapOwner === 2 : grid[index].trapOwner === 1;
      if (isMyTrap) {
        return baseStyle + " bg-gradient-to-br from-pink-600 to-rose-800 border-pink-900 text-white ring-4 ring-pink-400/50 shadow-2xl";
      } else if (isOtherTrap) {
        return baseStyle + " bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400 hover:scale-100 cursor-not-allowed opacity-50";
      } else {
        return baseStyle + " bg-gradient-to-br from-white to-pink-50 border-pink-200 hover:border-pink-600 hover:bg-pink-100 hover:ring-4 hover:ring-pink-300/50";
      }
    }
    if (box.revealed) {
      if (box.state === 'safe') {
        return baseStyle + " bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-600 text-white hover:scale-100 ring-4 ring-emerald-300/50 shadow-2xl";
      }
      if (box.state === 'trap') {
        return baseStyle + " bg-gradient-to-br from-red-500 to-red-700 border-red-800 text-white hover:scale-100 ring-4 ring-red-400/50 shadow-2xl";
      }
    }
    return baseStyle + " bg-gradient-to-br from-white to-pink-50 border-pink-200 hover:border-pink-600 hover:bg-pink-100 hover:ring-4 hover:ring-pink-300/50";
  };

  const getBoxContent = (box: typeof grid[0], index: number) => {
    // Show player's own trap during gameplay (unrevealed)
    if (
      phase === 'gameplay' &&
      !box.revealed &&
      box.state === 'trap' &&
      ((currentPlayer === 1 && box.trapOwner === 1) ||
        (currentPlayer === 2 && box.trapOwner === 2))
    ) {
      return '💣';
    }
    // Show bomb during trap placement
    if (phase === 'trap_placement') {
      const isMyTrap = currentTrapPlacer === 1 ? grid[index].trapOwner === 1 : grid[index].trapOwner === 2;
      if (isMyTrap) return '💣';
    }
    // Show if revealed
    if (box.revealed) {
      if (box.state === 'safe') return '✓';
      if (box.state === 'trap') return '💥';
    }
    return '';
  };

  return (
    <div style={{
      width: "min(360px, 98vw)",
      margin: "1rem auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        fontFamily: "'Luckiest Guy', cursive",
        fontSize: "1.35rem",
        marginBottom: "0.8rem",
        letterSpacing: "0.5px",
        color: "#be3881",
        textShadow: "2px 2px 8px #ffb3c6",
      }}>
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
          gap: "5px",
        }}
      >
        {grid.map((box, i) => (
          <button
            onClick={() => handleBoxClick(i)}
            className={getBoxStyle(box, i)}
            key={i}
            style={{
              fontFamily: "'Luckiest Guy', cursive",
              height: "54px",
              minWidth: "54px",
              fontSize: "2rem",
              outline: "none"
            }}
            disabled={
              phase === 'trap_placement'
                ? (currentTrapPlacer === 1
                   ? grid[i].trapOwner === 1
                   : grid[i].trapOwner === 2) ||
                  (currentTrapPlacer === 1
                    ? grid[i].trapOwner === 2
                    : grid[i].trapOwner === 1)
                : box.revealed || phase === 'game_over'
            }
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
          marginTop: "0.8rem",
          fontFamily: "'Luckiest Guy', cursive",
          fontSize: "1.1rem"
        }}
      >
        <span style={{ color: "#9346ff" }}>PLAYER 1</span>
        <span style={{ color: "#f76868" }}>PLAYER 2</span>
      </div>
    </div>
  );
};
