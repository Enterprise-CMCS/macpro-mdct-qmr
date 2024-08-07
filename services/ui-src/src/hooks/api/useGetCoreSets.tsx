import { useQuery } from "@tanstack/react-query";
import { getAllCoreSets } from "libs/api";
import { useParams } from "react-router-dom";

interface GetCoreSets {
  state: string;
  year: string;
}

const getCoreSets = async ({ state, year }: GetCoreSets) => {
  return await getAllCoreSets({
    state,
    year,
  });
};

export const useGetCoreSets = (releasedTwentyTwentyFour: boolean) => {
  const { state, year } = useParams();
  if (state && year && (releasedTwentyTwentyFour || year !== "2024")) {
    return useQuery(["coreSets", state, year], () =>
      getCoreSets({ state, year })
    );
  }
  throw Error("state or year unavailable");
};
