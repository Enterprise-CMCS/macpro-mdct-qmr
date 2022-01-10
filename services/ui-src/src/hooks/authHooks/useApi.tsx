import { useContext } from "react";
import { ApiContext } from "./ApiProvider";

export const useApi = () => {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error("`useApi` hook must be used within a `UserApi` component");
  }
  return context;
};
