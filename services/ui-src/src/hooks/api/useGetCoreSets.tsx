import { useQuery } from "react-query";
import { getAllCoreSets } from "libs/api";
import { usePathParams } from "./usePathParams";

interface GetCoreSets {
  state: string;
  year: string;
}

const getCoreSets = ({ state, year }: GetCoreSets) => {
  return getAllCoreSets({
    state,
    year,
  });
};

export const useGetCoreSets = () => {
  const { state, year } = usePathParams();
  if (state && year) {
    return useQuery(["coreSets", state, year], () =>
      getCoreSets({ state, year })
    );
  }
  throw Error("state or year unavailable");
};
