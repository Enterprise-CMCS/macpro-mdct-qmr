import { useQuery } from "@tanstack/react-query";
import { getReportingYears } from "libs/api";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router";

interface GetYears {
  state: string;
  year: string;
}

const getYears = async ({ state, year }: GetYears) => {
  return await getReportingYears({
    state,
    year,
  });
};

export const useGetReportingYears = () => {
  const { state: statePath, year: yearPath } = usePathParams();
  const { state, year } = useParams();

  if ((state || statePath) && (year || yearPath)) {
    return useQuery({
      queryKey: ["reportingYears", state, year],
      queryFn: () =>
        getYears({
          state: state || statePath,
          year: year || yearPath,
        }),
    });
  }
  throw Error("state or year unavailable");
};
