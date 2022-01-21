import { useQuery } from "react-query";
import * as API from "libs/api";
import { CoreSetAbbr, Params } from "types";
import { useUser } from "hooks/authHooks";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router-dom";

interface User {
  userState?: string;
  userRole: string;
}

interface GetMeasure {
  coreSet: CoreSetAbbr;
  measure: string;
}

const getMeasure = ({
  state,
  year,
  coreSet,
  measure,
  userState,
  userRole,
}: GetMeasure & Params & User) => {
  return API.getMeasure({
    state,
    year,
    coreSet,
    measure,
    body: {
      userState,
      userRole,
    },
  });
};

export const useGetMeasure = ({ coreSet, measure }: GetMeasure) => {
  const userInfo = useUser();
  const userState = userInfo!.userState!;
  const userRole = userInfo!.userRole!;
  const { state: statePath, year: yearPath } = usePathParams();
  const { state, year } = useParams();

  if ((state || statePath) && (year || yearPath)) {
    return useQuery(
      ["measure", state || statePath, year || yearPath, measure],
      () =>
        getMeasure({
          state: state || statePath,
          year: year || yearPath,
          coreSet,
          measure,
          userState,
          userRole,
        })
    );
  }
  throw Error("state or year unavailable");
};
