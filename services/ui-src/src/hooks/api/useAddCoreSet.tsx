import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

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
  const { state, year } = useParams<Params>();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr) =>
      addCoreSet({ state, year, coreSet })
    );
  }
  throw Error("Missing required fields");
};
