import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { CoreSetAbbr } from "types";

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
  const { state, year } = useParams<Params>();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr) =>
      addCoreSet({ state, year, coreSet })
    );
  }
  throw Error("Missing required fields");
};
