import { useQuery } from "react-query";
import { getAllCoreSets } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";

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
  const { state, year } = useParams<Params>();
  if (state && year) {
    return useQuery(["coreSets", state, year], () =>
      getCoreSets({ state, year })
    );
  }
  throw Error("state or year unavailable");
};
