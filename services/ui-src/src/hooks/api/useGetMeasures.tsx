import { useQuery } from "react-query";
import { listMeasures } from "libs/api";
import { usePathParams } from "./usePathParams";
import { useUser } from "hooks/authHooks";

interface GetMeasures {
  state: string;
  year: string;
  coreSet: string;
  userState: string;
  userRole: string;
}

const getMeasures = ({
  state,
  year,
  coreSet,
  userRole,
  userState,
}: GetMeasures) => {
  return listMeasures({
    state,
    year,
    coreSet,
    body: {
      userState,
      userRole,
    },
  });
};

export const useGetMeasures = () => {
  const userInfo = useUser();
  const userState = userInfo!.userState!;
  const userRole = userInfo!.userRole!;
  const { state, year, coreSet } = usePathParams();
  if (state && year && coreSet) {
    return useQuery(["coreSets", state, year], () =>
      getMeasures({ state, year, coreSet, userState, userRole })
    );
  }
  throw Error("state or year unavailable");
};
