import { useQuery } from "@tanstack/react-query";
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
    return useQuery({
      queryKey: ["rate", state, year, measure],
      queryFn: () => _getRate({ measure, state, coreSet, year }),
    });
  }
  throw Error("state or year unavailable");
};
