import { useQuery } from "@tanstack/react-query";
import { listMeasures } from "libs/api";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router";
import { CoreSetIdentifier, Measure } from "@qmr/shared";

interface GetMeasures {
  state: string;
  year: string;
  coreSet: CoreSetIdentifier;
}

const getMeasures = async ({ state, year, coreSet }: GetMeasures) => {
  return await listMeasures({
    state,
    year,
    coreSet,
  });
};

export const useGetMeasures = (coreSetIdentifier?: CoreSetIdentifier) => {
  const {
    state: statePath,
    year: yearPath,
    coreSet: coreSetPath,
  } = usePathParams();
  let { state, year, coreSetId } = useParams();

  coreSetId = coreSetIdentifier ?? coreSetId;

  if (
    (state || statePath) &&
    (year || yearPath) &&
    (coreSetId || coreSetPath)
  ) {
    return useQuery<{ Items: Measure[] }>({
      queryKey: ["measures", state, year, coreSetId || coreSetPath],
      queryFn: () =>
        getMeasures({
          state: state || statePath,
          year: year || yearPath,
          coreSet: (coreSetId || coreSetPath) as CoreSetIdentifier,
        }),
    });
  }
  throw new Error("state or year unavailable");
};
