import React from 'react';
import { useTrapGame } from '../lib/stores/useTrapGame';
import { cn } from '../lib/utils';

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
    const baseStyle = "aspect-square rounded-xl border-3 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center font-black text-2xl shadow-xl backdrop-blur-sm";
    
    if (phase === 'trap_placement') {
      const isMyTrap = currentTrapPlacer === 1 ? grid[index].trapOwner === 1 : grid[index].trapOwner === 2;
      const isOtherTrap = currentTrapPlacer === 1 ? grid[index].trapOwner === 2 : grid[index].trapOwner === 1;
      
      if (isMyTrap) {
        return cn(baseStyle, "bg-gradient-to-br from-pink-600 to-rose-800 border-pink-900 text-white ring-4 ring-pink-400/50 shadow-2xl");
      } else if (isOtherTrap) {
        return cn(baseStyle, "bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400 hover:scale-100 cursor-not-allowed opacity-50");
      } else {
        return cn(baseStyle, "bg-gradient-to-br from-white to-pink-50 border-pink-200 hover:border-pink-600 hover:bg-pink-100 hover:ring-4 hover:ring-pink-300/50");
      }
    }
    
    if (box.revealed) {
      if (box.state === 'safe') {
        return cn(baseStyle, "bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-600 text-white hover:scale-100 ring-4 ring-emerald-300/50 shadow-2xl");
      } else if (box.state === 'trap') {
        return cn(baseStyle, "bg-gradient-to-br from-red-500 to-red-700 border-red-800 text-white hover:scale-100 ring-4 ring-red-400/50 shadow-2xl");
      }
    }
    
    return cn(baseStyle, "bg-gradient-to-br from-white to-pink-50 border-pink-200 hover:border-pink-600 hover:bg-pink-100 hover:ring-4 hover:ring-pink-300/50");
  };

  const getBoxContent = (box: typeof grid[0], index: number) => {
    if (phase === 'trap_placement') {
      const isMyTrap = currentTrapPlacer === 1 ? grid[index].trapOwner === 1 : grid[index].trapOwner === 2;
      if (isMyTrap) return '💣';
    }
    
    if (box.revealed) {
      if (box.state === 'safe') return '✓';
      if (box.state === 'trap') return '💥';
    }
    
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 p-4">
      <div className="w-full max-w-2xl">
        {/* Game Status */}
        <div className="text-center mb-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl border-2 border-pink-200">
            <h2 className="text-4xl font-black bg-gradient-to-r from-pink-700 to-rose-900 bg-clip-text text-transparent mb-4 tracking-tight uppercase">
              {phase === 'trap_placement' ? 'PLACE YOUR TRAP' : 'FIND THE TRAPS!'}
            </h2>
            <p className="text-pink-700 font-bold text-xl tracking-wide uppercase">
              {phase === 'trap_placement' 
                ? `${playerNames[currentTrapPlacer].toUpperCase()}, CHOOSE A BOX FOR YOUR TRAP`
                : `${playerNames[currentPlayer].toUpperCase()}'S TURN`
              }
            </p>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-5 gap-4 p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-3 border-pink-200">
          {grid.map((box, index) => (
            <button
              key={box.id}
              onClick={() => handleBoxClick(index)}
              className={getBoxStyle(box, index)}
              disabled={
                (phase === 'trap_placement' && grid[index].state === 'trap' && grid[index].trapOwner !== currentTrapPlacer) ||
                (phase === 'gameplay' && box.revealed) ||
                phase === 'game_over'
              }
            >
              {getBoxContent(box, index)}
            </button>
          ))}
        </div>

        {/* Player Info */}
        <div className="mt-10 grid grid-cols-2 gap-8">
          <div className={cn(
            "p-8 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm",
            (phase === 'trap_placement' && currentTrapPlacer === 1) || (phase === 'gameplay' && currentPlayer === 1)
              ? "bg-gradient-to-br from-pink-100 to-rose-200 border-pink-600 shadow-2xl ring-4 ring-pink-400/50"
              : "bg-white/80 border-pink-200"
          )}>
            <h3 className="font-black text-pink-900 text-xl uppercase tracking-wide">{playerNames[1].toUpperCase()}</h3>
            <p className="text-sm text-pink-700 font-bold uppercase tracking-widest">PLAYER 1</p>
          </div>
          <div className={cn(
            "p-8 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm",
            (phase === 'trap_placement' && currentTrapPlacer === 2) || (phase === 'gameplay' && currentPlayer === 2)
              ? "bg-gradient-to-br from-pink-100 to-rose-200 border-pink-600 shadow-2xl ring-4 ring-pink-400/50"
              : "bg-white/80 border-pink-200"
          )}>
            <h3 className="font-black text-pink-900 text-xl uppercase tracking-wide">{playerNames[2].toUpperCase()}</h3>
            <p className="text-sm text-pink-700 font-bold uppercase tracking-widest">PLAYER 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};