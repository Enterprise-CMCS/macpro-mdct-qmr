import { useMutation } from "@tanstack/react-query";
import * as Api from "libs/api";
import { CoreSetIdentifier } from "@qmr/shared";

interface DeleteCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetIdentifier;
}

const deleteCoreSet = async ({ state, year, coreSet }: DeleteCoreSet) => {
  return await Api.deleteCoreSet({
    state,
    year,
    coreSet,
  });
};

export const useDeleteCoreSet = () => {
  return useMutation({
    mutationFn: (data: DeleteCoreSet) => deleteCoreSet(data),
  });
};
