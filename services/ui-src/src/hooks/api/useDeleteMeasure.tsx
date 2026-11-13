import * as Api from "libs/api";
import { CoreSetIdentifier, MeasureIdentifier } from "@qmr/shared";
import { useMutation } from "@tanstack/react-query";

interface DeleteMeasure {
  coreSet: CoreSetIdentifier;
  measure: MeasureIdentifier;
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
  return useMutation({
    mutationFn: (data: DeleteMeasure) => deleteMeasure(data),
  });
};
