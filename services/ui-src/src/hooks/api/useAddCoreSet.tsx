import { useMutation } from "@tanstack/react-query";
import { createCoreSet } from "libs/api";
import { CoreSetAbbr } from "types";
import { useParams } from "react-router-dom";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const addCoreSet = async ({ state, year, coreSet }: AddCoreSet) => {
  return await createCoreSet({
    state,
    year,
    coreSet,
  });
};

export const useAddCoreSet = () => {
  const { state, year } = useParams();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr) =>
      addCoreSet({ state, year, coreSet })
    );
  }
  throw Error("Missing required fields");
};
