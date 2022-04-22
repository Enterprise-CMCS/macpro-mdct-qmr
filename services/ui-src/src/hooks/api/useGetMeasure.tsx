import { useQuery } from "react-query";
import * as API from "libs/api";
import { CoreSetAbbr, Params } from "types";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router-dom";

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
  const { state: statePath, year: yearPath } = usePathParams();
  const { state, year } = useParams();

  if ((state || statePath) && (year || yearPath)) {
    return useQuery(
      ["measure", state || statePath, year || yearPath, coreSet, measure],
      () =>
        getMeasure({
          state: state || statePath,
          year: year || yearPath,
          coreSet,
          measure,
        })
    );
  }
  throw Error("state or year unavailable");
};
