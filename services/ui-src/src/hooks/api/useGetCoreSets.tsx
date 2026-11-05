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

// TODO: We're always loading the state and year from the URL no matter the releasedYear flag. Need to determine a proper fallback.
export const useGetCoreSets = (releasedYear: boolean) => {
  const { state, year } = useParams();
  if (state && year && (releasedYear || featuresByYear.reportingYearReleased)) {
    return useQuery({
      queryKey: ["coreSets", state, year],
      queryFn: () => getCoreSets({ state, year }),
    });
  }
  throw new Error("state or year unavailable");
};
