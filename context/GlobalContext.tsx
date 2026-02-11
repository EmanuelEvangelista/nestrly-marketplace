"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

// Create a context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
// Create a provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to acces the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
