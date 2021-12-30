import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { CoreSetType } from "views/StateHome/helpers";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetType;
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
    return useMutation((coreSet: CoreSetType) =>
      addCoreSet({ state, year, coreSet })
    );
  }
  throw Error("Missing required fields");
};
