import { createContext, useContext, useState, type ReactNode, useCallback } from "react";

export type UnitsSystem = "METRIC" | "IMPERIAL";

interface UnitsSystemContextType {
  unitsSystem: UnitsSystem;
  setUnitsSystem: (system: UnitsSystem) => void;
}

const UNITS_SYSTEM_KEY = "unitsSystem";

const UnitsSystemContext = createContext<UnitsSystemContextType | undefined>(undefined);

export function UnitsSystemProvider({ children }: { children: ReactNode }) {
  const [unitsSystem, setUnitsSystemState] = useState<UnitsSystem>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(UNITS_SYSTEM_KEY);
      if (stored === "METRIC" || stored === "IMPERIAL") {
        return stored;
      }
    } catch (error) {
      console.error("Failed to read units system from localStorage:", error);
    }
    return "METRIC"; // Default to metric
  });

  const setUnitsSystem = useCallback((system: UnitsSystem) => {
    setUnitsSystemState(system);
    try {
      localStorage.setItem(UNITS_SYSTEM_KEY, system);
    } catch (error) {
      console.error("Failed to save units system to localStorage:", error);
    }
  }, []);

  return <UnitsSystemContext.Provider value={{ unitsSystem, setUnitsSystem }}>{children}</UnitsSystemContext.Provider>;
}

export function useUnitsSystem() {
  const context = useContext(UnitsSystemContext);
  if (context === undefined) {
    throw new Error("useUnitsSystem must be used within a UnitsSystemProvider");
  }
  return context;
}
