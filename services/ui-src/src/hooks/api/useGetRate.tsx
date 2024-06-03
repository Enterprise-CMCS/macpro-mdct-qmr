import { useQuery } from "react-query";
import { getRate } from "libs/api";

interface GetRate {
  measure: string;
  state: string;
  year: string;
}

const _getRate = async ({ measure, state, year }: GetRate) => {
  return await getRate({
    measure,
    state,
    year,
  });
};

export const useGetRate = ({ measure, state, year }: GetRate) => {
  if (measure && state && year) {
    return useQuery(["rate", state, year, measure], () =>
      _getRate({ measure, state, year })
    );
  }
  throw Error("state or year unavailable");
};
