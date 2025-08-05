import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "setup" | "trap_placement" | "gameplay" | "game_over";
export type Player = 1 | 2;
export type BoxState = "hidden" | "safe" | "trap";

interface Box {
  id: number;
  state: BoxState;
  revealed: boolean;
  trapOwner?: Player;
}

interface GameState {
  phase: GamePhase;
  currentPlayer: Player;
  playerNames: { [key in Player]: string };
  grid: Box[];
  trapsPlaced: { [key in Player]: number | null };
  currentTrapPlacer: Player;
  winner: Player | null;
  message: string;
  
  // Actions
  setPlayerName: (player: Player, name: string) => void;
  startGame: () => void;
  placeTrap: (boxIndex: number) => void;
  clickBox: (boxIndex: number) => void;
  resetGame: () => void;
}

const initializeGrid = (): Box[] => {
  return Array.from({ length: 25 }, (_, index) => ({
    id: index,
    state: "hidden",
    revealed: false,
  }));
};

export const useTrapGame = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "setup",
    currentPlayer: 1,
    playerNames: { 1: "Player 1", 2: "Player 2" },
    grid: initializeGrid(),
    trapsPlaced: { 1: null, 2: null },
    currentTrapPlacer: 1,
    winner: null,
    message: "Enter player names to begin",
    
    setPlayerName: (player, name) => {
      set((state) => ({
        playerNames: {
          ...state.playerNames,
          [player]: name || `Player ${player}`,
        }
      }));
    },
    
    startGame: () => {
      set({
        phase: "trap_placement",
        grid: initializeGrid(),
        trapsPlaced: { 1: null, 2: null },
        currentTrapPlacer: 1,
        message: `${get().playerNames[1]}, place your trap!`,
        winner: null,
      });
    },
    
    placeTrap: (boxIndex) => {
      const state = get();
      if (state.phase !== "trap_placement" || state.trapsPlaced[state.currentTrapPlacer] !== null) {
        return;
      }
      
      const updatedGrid = [...state.grid];
      updatedGrid[boxIndex] = {
        ...updatedGrid[boxIndex],
        state: "trap",
        trapOwner: state.currentTrapPlacer,
      };
      
      const updatedTrapsPlaced = {
        ...state.trapsPlaced,
        [state.currentTrapPlacer]: boxIndex,
      };
      
      if (state.currentTrapPlacer === 1) {
        set({
          grid: updatedGrid,
          trapsPlaced: updatedTrapsPlaced,
          currentTrapPlacer: 2,
          message: `${state.playerNames[2]}, place your trap!`,
        });
      } else {
        set({
          phase: "gameplay",
          grid: updatedGrid,
          trapsPlaced: updatedTrapsPlaced,
          currentPlayer: 1,
          message: `${state.playerNames[1]}, make your move!`,
        });
      }
    },
    
    clickBox: (boxIndex) => {
      const state = get();
      if (state.phase !== "gameplay" || state.grid[boxIndex].revealed) {
        return;
      }
      
      const updatedGrid = [...state.grid];
      const clickedBox = updatedGrid[boxIndex];
      clickedBox.revealed = true;
      
      if (clickedBox.state === "trap") {
        const winner = clickedBox.trapOwner === 1 ? 2 : 1;
        set({
          grid: updatedGrid,
          phase: "game_over",
          winner,
          message: `${state.playerNames[winner]} wins! ${state.playerNames[state.currentPlayer]} hit a trap!`,
        });
      } else {
        clickedBox.state = "safe";
        const nextPlayer = state.currentPlayer === 1 ? 2 : 1;
        set({
          grid: updatedGrid,
          currentPlayer: nextPlayer,
          message: `${state.playerNames[nextPlayer]}, make your move!`,
        });
      }
    },
    
    resetGame: () => {
      set({
        phase: "setup",
        grid: initializeGrid(),
        trapsPlaced: { 1: null, 2: null },
        currentTrapPlacer: 1,
        currentPlayer: 1,
        winner: null,
        message: "Enter player names to begin",
      });
    },
  }))
);