import { useMutation } from "react-query";
import { editMeasure } from "libs/api";
import { CoreSetAbbr, Params, MeasureStatus } from "types";
import { usePathParams } from "./usePathParams";

interface UpdateMeasure<DataType = any> {
  coreSet?: CoreSetAbbr;
  data: DataType;
  measure?: string;
  status: MeasureStatus;
}

const updateMeasure = ({
  state,
  year,
  coreSet,
  status,
  data,
  measure,
}: UpdateMeasure & Params) => {
  return editMeasure({
    state,
    year,
    coreSet,
    measure,
    body: {
      data,
      status,
    },
  });
};

export const useUpdateMeasure = <DataType,>() => {
  const { state, year, coreSet, measureId } = usePathParams();
  if (state && year) {
    return useMutation((data: UpdateMeasure<DataType>) =>
      updateMeasure({
        state,
        year,
        coreSet: coreSet as CoreSetAbbr,
        measure: measureId,
        ...data,
      })
    );
  }
  throw Error("Missing required fields");
};
