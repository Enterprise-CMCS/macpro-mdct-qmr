import { useMutation } from "react-query";
import * as Api from "libs/api";
import { CoreSetType } from "views/StateHome/helpers";

interface DeleteCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetType;
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
