import { useContext, createContext } from "react";
import { IAppContextInterface } from "libs/IAppContext";

export const AppContext = createContext<IAppContextInterface>({});

export function useAppContext() {
  return useContext(AppContext);
}
