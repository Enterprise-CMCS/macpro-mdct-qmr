import { useQuery } from "@tanstack/react-query";
import { listMeasures } from "libs/api";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router-dom";

interface GetMeasures {
  state: string;
  year: string;
  coreSet: string;
}

const getMeasures = async ({ state, year, coreSet }: GetMeasures) => {
  return await listMeasures({
    state,
    year,
    coreSet,
  });
};

export const useGetMeasures = (coreSetAbbr?: string) => {
  const {
    state: statePath,
    year: yearPath,
    coreSet: coreSetPath,
  } = usePathParams();
  let { state, year, coreSetId } = useParams();

  coreSetId = coreSetAbbr ?? coreSetId;

  if (
    (state || statePath) &&
    (year || yearPath) &&
    (coreSetId || coreSetPath)
  ) {
    return useQuery({
      queryKey: ["measures", state, year, coreSetId || coreSetPath],
      queryFn: () =>
        getMeasures({
          state: state || statePath,
          year: year || yearPath,
          coreSet: coreSetId || coreSetPath,
        }),
    });
  }
  throw new Error("state or year unavailable");
};
