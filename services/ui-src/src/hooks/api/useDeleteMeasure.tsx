import * as Api from "libs/api";
import { CoreSetAbbr } from "types";
import { useMutation } from "@tanstack/react-query";

interface DeleteMeasure {
  coreSet: CoreSetAbbr;
  measure: string;
  state: string;
  year: string;
}

const deleteMeasure = async ({
  coreSet,
  measure,
  state,
  year,
}: DeleteMeasure) => {
  return await Api.deleteMeasure({
    coreSet,
    measure,
    state,
    year,
  });
};

export const useDeleteMeasure = () => {
  return useMutation((data: DeleteMeasure) => deleteMeasure(data));
};
