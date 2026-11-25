import { useQuery } from "@tanstack/react-query";
import { getRate } from "libs/api";
import {
  CombinedRateData,
  CoreSetIdentifier,
  MeasureIdentifier,
} from "@qmr/shared";

interface GetRate {
  measure: MeasureIdentifier;
  state: string;
  year: string;
  coreSet: CoreSetIdentifier;
}

const _getRate = async ({ measure, state, coreSet, year }: GetRate) => {
  return (await getRate({
    measure,
    state,
    coreSet,
    year,
  })) as CombinedRateData | undefined;
};

export const useGetRate = ({ measure, state, coreSet, year }: GetRate) => {
  if (measure && state && year) {
    return useQuery({
      queryKey: ["rate", state, year, measure],
      queryFn: () => _getRate({ measure, state, coreSet, year }),
    });
  }
  throw new Error("state or year unavailable");
};
