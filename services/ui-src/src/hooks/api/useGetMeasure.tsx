import { useQuery } from "react-query";
import * as API from "libs/api";
import { CoreSetAbbr, Params } from "types";
import { useUser } from "hooks/authHooks";
import { usePathParams } from "./usePathParams";

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
  console.log(`getMeasure`, state, year, coreSet, measure, userState, userRole);
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
  const { state, year } = usePathParams();

  if (state && year) {
    return useQuery(["measure", state, year, measure], () =>
      getMeasure({ state, year, coreSet, measure, userState, userRole })
    );
  }
  throw Error("state or year unavailable");
};
