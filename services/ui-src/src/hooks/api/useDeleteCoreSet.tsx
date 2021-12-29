import { useMutation } from "react-query";
import * as Api from "libs/api";
import { CoreSetType } from "views/StateHome/helpers";

interface DeleteCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetType;
}

const deleteCoreSet = async ({ state, year, coreSet }: DeleteCoreSet) => {
  const data = await Api.deleteCoreSet({
    state,
    year,
    coreSet,
  }).catch((e) => {
    console.log(e);
  });
  return data;
};

export const useDeleteCoreSet = () => {
  return useMutation((data: DeleteCoreSet) => deleteCoreSet(data));
};
