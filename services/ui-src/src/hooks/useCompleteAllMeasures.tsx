import { CoreSetAbbr } from "types";
import { useMutation, useQuery } from "react-query";
import { getMeasure, listMeasures } from "libs/api";

interface Params {
  state: string;
  year: string;
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
  return useQuery(["coreSets", data.state, data.year], () =>
    getMeasures({
      state: data.state,
      year: data.year,
      coreSet: data.coreSet,
    })
  );
};

interface GetMeasure {
  measure: string;
}

const _getMeasure = ({
  state,
  year,
  coreSet,
  measure,
}: GetMeasure & Params) => {
  return getMeasure({
    state,
    year,
    coreSet,
    measure,
  });
};

// interface UpdateMeasure<DataType = any> {
//   coreSet?: CoreSetAbbr;
//   data: DataType;
//   measure?: string;
//   status: MeasureStatus;
//   reporting?: string | undefined;
// }

// const updateMeasure = ({
//   state,
//   year,
//   coreSet,
//   status,
//   reporting,
//   data,
//   measure,
// }: UpdateMeasure & Params) => {
//   return editMeasure({
//     state,
//     year,
//     coreSet,
//     measure,
//     body: {
//       data,
//       reporting,
//       status,
//     },
//   });
// };

export const useCompleteAllMeasures = (data: Params) => {
  // const measureList = useGetMeasures(data);
  // return useMutation((data: Params) => {
  //   const measureList = useGetMeasures(data);
  //   for (const measureInfo of measureList?.data?.Items) {
  //     const measure = _getMeasure(measureInfo);
  //     console.log(measure);
  //   }
  // });
};
