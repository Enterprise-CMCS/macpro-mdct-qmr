import { useQuery } from "react-query";
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

export const useGetMeasures = () => {
  const {
    state: statePath,
    year: yearPath,
    coreSet: coreSetPath,
  } = usePathParams();
  const { state, year, coreSetId } = useParams();

  if (
    (state || statePath) &&
    (year || yearPath) &&
    (coreSetId || coreSetPath)
  ) {
    return useQuery(["measures", state, year, coreSetId || coreSetPath], () =>
      getMeasures({
        state: state || statePath,
        year: year || yearPath,
        coreSet: coreSetId || coreSetPath,
      })
    );
  }
  throw Error("state or year unavailable");
};
