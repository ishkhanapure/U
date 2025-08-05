import React from 'react';
import { useTrapGame } from './lib/stores/useTrapGame';
import { PlayerSetup } from './components/PlayerSetup';
import { GameGrid } from './components/GameGrid';
import { GameUI } from './components/GameUI';
import "@fontsource/inter";

function App() {
  const { phase } = useTrapGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100">
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