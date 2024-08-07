import { useMutation } from "@tanstack/react-query";
import * as Api from "libs/api";
import { CoreSetAbbr } from "types";

interface DeleteCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const deleteCoreSet = async ({ state, year, coreSet }: DeleteCoreSet) => {
  return await Api.deleteCoreSet({
    state,
    year,
    coreSet,
  });
};

export const useDeleteCoreSet = () => {
  return useMutation((data: DeleteCoreSet) => deleteCoreSet(data));
};
