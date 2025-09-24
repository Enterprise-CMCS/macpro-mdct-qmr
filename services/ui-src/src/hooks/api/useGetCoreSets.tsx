import { useQuery } from "@tanstack/react-query";
import { getAllCoreSets } from "libs/api";
import { useParams } from "react-router";
import { featuresByYear } from "utils/featuresByYear";

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

export const useGetCoreSets = (releasedTwentyTwentyFive: boolean) => {
  const { state, year } = useParams();
  if (
    state &&
    year &&
    (releasedTwentyTwentyFive || featuresByYear.reportingYearReleased)
  ) {
    return useQuery({
      queryKey: ["coreSets", state, year],
      queryFn: () => getCoreSets({ state, year }),
    });
  }
  throw Error("state or year unavailable");
};
