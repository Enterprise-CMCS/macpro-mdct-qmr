import { useQuery } from "react-query";
import { getRate } from "libs/api";
import { CombinedRatesPayload } from "types";

interface GetRate {
  measure: string;
  state: string;
  year: string;
  coreSet: string;
}

const _getRate = async ({ measure, state, coreSet, year }: GetRate) => {
  return (await getRate({
    measure,
    state,
    coreSet,
    year,
  })) as CombinedRatesPayload | undefined;
};

export const useGetRate = ({ measure, state, coreSet, year }: GetRate) => {
  if (measure && state && year) {
    return useQuery(["rate", state, year, measure], () =>
      _getRate({ measure, state, coreSet, year })
    );
  }
  throw Error("state or year unavailable");
};
