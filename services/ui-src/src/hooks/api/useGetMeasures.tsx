import { useQuery } from "react-query";
import { listMeasures } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

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
  const { state, year, coreSetId } = useParams<Params>();
  if (state && year && coreSetId) {
    return useQuery(["coreSets", state, year], () =>
      getMeasures({ state, year, coreSet: coreSetId })
    );
  }
  throw Error("state or year unavailable");
};
