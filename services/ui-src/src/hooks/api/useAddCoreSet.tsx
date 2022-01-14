import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { CoreSetAbbr } from "types";
import { usePathParams } from "./usePathParams";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const addCoreSet = ({ state, year, coreSet }: AddCoreSet) => {
  return createCoreSet({
    state,
    year,
    coreSet,
  });
};

export const useAddCoreSet = () => {
  const { state, year } = usePathParams();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr) =>
      addCoreSet({ state, year, coreSet })
    );
  }
  throw Error("Missing required fields");
};
