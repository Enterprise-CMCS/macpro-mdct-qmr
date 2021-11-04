import { useContext, createContext } from "react";
import { AppContextInterface } from "libs/AppContextInterface";

export const AppContext = createContext<AppContextInterface>({});

export function useAppContext() {
  return useContext(AppContext);
}
