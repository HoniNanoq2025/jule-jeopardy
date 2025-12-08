import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [lastValue, setLastValue] = useState(null);

  return (
    <GameContext.Provider value={{ lastValue, setLastValue }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
