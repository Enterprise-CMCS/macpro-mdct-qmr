import { useQuery } from "react-query";
import * as API from "libs/api";
import { CoreSetAbbr, Params } from "types";
import { usePathParams } from "./usePathParams";

interface GetMeasure {
  coreSet: CoreSetAbbr;
  measure: string;
}

const getMeasure = ({ state, year, coreSet, measure }: GetMeasure & Params) => {
  return API.getMeasure({
    state,
    year,
    coreSet,
    measure,
  });
};

export const useGetMeasure = ({ coreSet, measure }: GetMeasure) => {
  const { state, year, coreSet: coreSetId, measureId } = usePathParams();
  if (state && year) {
    return useQuery(["measure", state, year, measure], () =>
      getMeasure({
        state,
        year,
        coreSet: (coreSetId as CoreSetAbbr) ?? coreSet,
        measure: measureId ?? measure,
      })
    );
  }
  throw Error("state or year unavailable");
};
