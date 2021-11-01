import { useContext, createContext } from "react";

export const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}
