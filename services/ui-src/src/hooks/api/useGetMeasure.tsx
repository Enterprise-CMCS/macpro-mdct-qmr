import { useQuery } from "@tanstack/react-query";
import * as API from "libs/api";
import { Params } from "types";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router-dom";

interface GetMeasure {
  coreSet: string;
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
    return useQuery({
      queryKey: [
        "measure",
        state || statePath,
        year || yearPath,
        coreSet,
        measure,
      ],
      queryFn: () =>
        getMeasure({
          state: state || statePath,
          year: year || yearPath,
          coreSet,
          measure,
        }),
      refetchOnWindowFocus: false,
    });
  }
  throw Error("state or year unavailable");
};
