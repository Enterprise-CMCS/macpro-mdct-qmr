import { useMutation } from "@tanstack/react-query";
import { editMeasure } from "libs/api";
import {
  CoreSetIdentifier,
  MeasureIdentifier,
  MeasureStatus,
} from "@qmr/shared";
import { Params } from "types";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router";

interface UpdateMeasure<DataType = any> {
  coreSet?: CoreSetIdentifier;
  data: DataType;
  description?: string;
  detailedDescription?: string;
  measure?: MeasureIdentifier;
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
          coreSet: (coreSetId || coreSet) as CoreSetIdentifier,
          ...data,
        }),
    });
  }
  throw new Error("Missing required fields");
};
