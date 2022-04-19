import { CoreSetAbbr, MeasureStatus } from "types";
import { useMutation, useQuery } from "react-query";
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

const useGetMeasures = (data: Params) => {
  // throw Error("state or year unavailable");
  return useQuery(["coreSetsCompletionFetch", data.state, data.year], () =>
    getMeasures({
      state: data.state,
      year: data.year,
      coreSet: data.coreSet,
    })
  );
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

export const useCompleteAllMeasures = (data: Params) => {
  const measureList = useGetMeasures(data);
  return useMutation(async () => {
    for (const measureInfo of measureList?.data?.Items) {
      const data = measureInfo.data ?? {};
      await updateMeasure({
        ...measureInfo,
        status: MeasureStatus.COMPLETE,
        data,
      });
    }
  });
};
