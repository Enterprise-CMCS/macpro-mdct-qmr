import { CoreSetAbbr, MeasureStatus } from "types";
import { useMutation } from "react-query";
import { editMeasure, listMeasures } from "libs/api";

interface Params {
  state?: string;
  year?: string;
  coreSet: CoreSetAbbr;
}

const getMeasures = async ({ state, year, coreSet }: Params) => {
  return await listMeasures({
    state,
    year,
    coreSet,
  });
};

interface UpdateMeasure<DataType = any> {
  coreSet?: CoreSetAbbr;
  data: DataType;
  measure?: string;
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
}: UpdateMeasure & Params) => {
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

export const useCompleteAllMeasures = () => {
  return useMutation(async (data: Params) => {
    await getMeasures({
      state: data.state,
      year: data.year,
      coreSet: data.coreSet,
    }).then(async (measureList) => {
      for (const measureInfo of measureList?.Items) {
        const data = measureInfo.data ?? {};
        await updateMeasure({
          ...measureInfo,
          status: MeasureStatus.COMPLETE,
          data,
        });
      }
    });
  });
};
