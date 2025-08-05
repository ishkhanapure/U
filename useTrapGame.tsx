import React from 'react';
import { useTrapGame } from '../lib/stores/useTrapGame';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const GameUI: React.FC = () => {
  const { phase, winner, playerNames, message, resetGame } = useTrapGame();

  if (phase !== 'game_over') return null;

  return (
    <div className="fixed inset-0 bg-pink-900/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg bg-white/98 backdrop-blur-md border-3 border-pink-300 shadow-2xl">
        <CardHeader className="text-center pb-10">
          <CardTitle className="text-5xl font-black bg-gradient-to-r from-pink-700 to-rose-900 bg-clip-text text-transparent tracking-tight uppercase">
            GAME OVER!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-10">
          <div className="p-10 bg-gradient-to-br from-pink-50 to-white rounded-2xl border-2 border-pink-200">
            <div className="text-8xl mb-8">🎉</div>
            <h2 className="text-4xl font-black text-pink-900 mb-4 tracking-tight uppercase">
              {winner && playerNames[winner].toUpperCase()} WINS!
            </h2>
            <p className="text-pink-700 font-bold text-xl uppercase tracking-wide">
              {message.toUpperCase()}
            </p>
          </div>
          
          <Button 
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-800 hover:from-pink-700 hover:to-rose-900 text-white font-black py-6 text-xl transition-all duration-300 transform hover:scale-105 rounded-xl shadow-2xl border-2 border-pink-300 uppercase tracking-wide"
          >
            PLAY AGAIN
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};