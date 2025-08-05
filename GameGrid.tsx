import React, { useEffect } from 'react';
import { useTrapGame } from '../lib/stores/useTrapGame';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const PlayerSetup: React.FC = () => {
  const { playerNames, setPlayerName, startGame } = useTrapGame();
  
  // Auto-start game when both players have entered their names
  useEffect(() => {
    if (playerNames[1].trim() && playerNames[2].trim() && 
        playerNames[1] !== "Player 1" && playerNames[2] !== "Player 2") {
      const timer = setTimeout(() => {
        startGame();
      }, 1000); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [playerNames, startGame]);

  const isReadyToStart = playerNames[1].trim() && playerNames[2].trim() && 
                      playerNames[1] !== "Player 1" && playerNames[2] !== "Player 2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white/95 backdrop-blur-md border-0 shadow-2xl ring-1 ring-pink-300/50">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-5xl font-black bg-gradient-to-r from-pink-700 to-rose-900 bg-clip-text text-transparent mb-3 tracking-tight letter-spacing-wide">
            TRAP STRATEGY
          </CardTitle>
          <p className="text-pink-700 font-semibold text-xl tracking-wide">ENTER YOUR NAMES TO BEGIN</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-pink-800 mb-2 tracking-widest uppercase">
                FIRST PLAYER
              </label>
              <Input
                type="text"
                placeholder="ENTER YOUR NAME..."
                value={playerNames[1] === "Player 1" ? "" : playerNames[1]}
                onChange={(e) => setPlayerName(1, e.target.value)}
                className="border-pink-200 focus:border-pink-600 focus:ring-pink-300/50 text-lg py-4 px-6 rounded-xl bg-white/90 backdrop-blur-sm font-semibold placeholder:text-pink-400 placeholder:font-semibold placeholder:tracking-wide"
                autoFocus
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-pink-800 mb-2 tracking-widest uppercase">
                SECOND PLAYER
              </label>
              <Input
                type="text"
                placeholder="ENTER YOUR NAME..."
                value={playerNames[2] === "Player 2" ? "" : playerNames[2]}
                onChange={(e) => setPlayerName(2, e.target.value)}
                className="border-pink-200 focus:border-pink-600 focus:ring-pink-300/50 text-lg py-4 px-6 rounded-xl bg-white/90 backdrop-blur-sm font-semibold placeholder:text-pink-400 placeholder:font-semibold placeholder:tracking-wide"
              />
            </div>
          </div>
          
          {isReadyToStart && (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-100 to-rose-200 border-2 border-pink-300">
                <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
                <span className="text-pink-800 font-bold text-sm tracking-wide uppercase">STARTING GAME...</span>
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border-2 border-pink-200">
            <h3 className="font-black text-pink-900 mb-6 flex items-center gap-3 text-lg tracking-wide uppercase">
              <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
              GAME RULES
            </h3>
            <ul className="text-sm text-pink-800 space-y-3 leading-relaxed">
              <li className="flex items-start gap-4">
                <span className="text-pink-700 font-black text-lg">1.</span>
                <span className="font-semibold uppercase tracking-wide">Each Player Secretly Places One Trap On The Grid</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-pink-700 font-black text-lg">2.</span>
                <span className="font-semibold uppercase tracking-wide">Take Turns Clicking Boxes To Find Your Opponent's Trap</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-pink-700 font-black text-lg">3.</span>
                <span className="font-semibold uppercase tracking-wide">Player Who Hits A Trap Loses The Game!</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-green-600 font-black text-lg">✓</span>
                <span className="font-bold uppercase tracking-wide text-green-700">Green Boxes Are Safe</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};