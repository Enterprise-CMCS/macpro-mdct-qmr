import { useMutation } from "@tanstack/react-query";
import { editMeasure } from "libs/api";
import { CoreSetAbbr, Params, MeasureStatus } from "types";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router-dom";

interface UpdateMeasure<DataType = any> {
  coreSet?: string;
  data: DataType;
  description?: string;
  detailedDescription?: string;
  measure?: string;
  status: MeasureStatus;
  reporting?: string | undefined;
}

const updateMeasure = ({
  state,
  year,
  coreSet,
  description,
  detailedDescription,
  status,
  reporting,
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
      description,
      detailedDescription,
      reporting,
      status,
    },
  });
};

export const useUpdateMeasure = () => {
  const {
    state: statePath,
    year: yearPath,
    coreSet,
    measureId,
  } = usePathParams();
  const { state, year, coreSetId } = useParams();

  if ((state || statePath) && (year || yearPath) && (coreSet || coreSetId)) {
    return useMutation({
      mutationFn: (data: UpdateMeasure) =>
        updateMeasure({
          measure: measureId,
          year: year || yearPath,
          state: state || statePath,
          coreSet: (coreSetId as CoreSetAbbr) || (coreSet as CoreSetAbbr),
          ...data,
        }),
    });
  }
  throw new Error("Missing required fields");
};
