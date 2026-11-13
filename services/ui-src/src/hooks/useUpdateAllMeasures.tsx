import {
  CoreSetIdentifier,
  MeasureIdentifier,
  MeasureStatus,
} from "@qmr/shared";
import { useMutation } from "@tanstack/react-query";
import { editMeasure, listMeasures } from "libs/api";

interface GetMeasures {
  state?: string;
  year?: string;
  coreSet: CoreSetIdentifier;
}

const getMeasures = async ({ state, year, coreSet }: GetMeasures) => {
  return await listMeasures({
    state,
    year,
    coreSet,
  });
};

interface UpdateMeasure<DataType = any> {
  state?: string;
  year?: string;
  coreSet?: CoreSetIdentifier;
  data: DataType;
  measure?: MeasureIdentifier;
  status: MeasureStatus;
  reporting?: string | undefined;
}

const updateMeasure = ({
  state,
  year,
  coreSet,
  status,
  reporting,
  data,
  measure,
}: UpdateMeasure) => {
  return editMeasure({
    state,
    year,
    coreSet,
    measure,
    body: {
      data,
      reporting,
      status,
    },
  });
};

interface Params {
  state?: string;
  year?: string;
  coreSet: CoreSetIdentifier;
  measureStatus: MeasureStatus;
}

export const useUpdateAllMeasures = () => {
  return useMutation({
    mutationFn: async (data: Params) => {
      await getMeasures({
        state: data.state,
        year: data.year,
        coreSet: data.coreSet,
      }).then(async (measureList) => {
        for (const measureInfo of measureList.Items) {
          const measureData = measureInfo.data ?? {};
          await updateMeasure({
            ...measureInfo,
            status: data.measureStatus,
            data: measureData,
          });
        }
      });
    },
  });
};
