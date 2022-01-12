import { useQuery } from "react-query";
import * as API from "libs/api";
import { useParams } from "react-router-dom";
import { CoreSetAbbr, Params } from "types";

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
  const { state, year } = useParams();
  if (state && year) {
    return useQuery(["measure", state, year, measure], () =>
      getMeasure({ state, year, coreSet, measure })
    );
  }
  throw Error("state or year unavailable");
};
