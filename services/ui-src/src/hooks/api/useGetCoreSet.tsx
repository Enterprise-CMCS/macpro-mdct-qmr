import { useQuery } from "@tanstack/react-query";
import { getCoreSet } from "libs/api";

interface GetCoreSet {
  coreSetId: string;
  state: string;
  year: string;
}

const _getCoreSet = async ({ coreSetId, state, year }: GetCoreSet) => {
  return await getCoreSet({
    coreSetId,
    state,
    year,
  });
};

export const useGetCoreSet = ({ coreSetId, state, year }: GetCoreSet) => {
  if (coreSetId && state && year) {
    return useQuery({
      queryKey: ["coreSet", state, year, coreSetId],
      queryFn: () => _getCoreSet({ coreSetId, state, year }),
    });
  }
  throw Error("state or year unavailable");
};
