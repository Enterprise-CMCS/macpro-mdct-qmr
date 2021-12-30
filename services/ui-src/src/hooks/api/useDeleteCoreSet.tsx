import { useMutation } from "react-query";
import * as Api from "libs/api";

interface DeleteCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const deleteCoreSet = ({ state, year, coreSet }: DeleteCoreSet) => {
  return Api.deleteCoreSet({
    state,
    year,
    coreSet,
  });
};

export const useDeleteCoreSet = () => {
  return useMutation((data: DeleteCoreSet) => deleteCoreSet(data));
};
