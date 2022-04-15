import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { CoreSetAbbr } from "types";
import { useParams } from "react-router-dom";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
  id?: string;
}

const addCoreSet = async ({ state, year, coreSet, id }: AddCoreSet) => {
  return await createCoreSet({
    state,
    year,
    coreSet,
    id,
  });
};

export const useAddCoreSet = () => {
  const { state, year } = useParams();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr, id?: string) =>
      addCoreSet({ state, year, coreSet, id })
    );
  }
  throw Error("Missing required fields");
};
