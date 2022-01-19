import { useQuery } from "react-query";
import { listMeasures } from "libs/api";
import { usePathParams } from "./usePathParams";
import { useUser } from "hooks/authHooks";
import { useParams } from "react-router-dom";

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
  const {
    state: statePath,
    year: yearPath,
    coreSet: coreSetPath,
  } = usePathParams();
  const { state, year, coreSetId } = useParams();

  if (
    (state || statePath) &&
    (year || yearPath) &&
    (coreSetId || coreSetPath)
  ) {
    return useQuery(["coreSets", state, year], () =>
      getMeasures({
        state: state || statePath,
        year: year || yearPath,
        coreSet: coreSetId || coreSetPath,
        userState,
        userRole,
      })
    );
  }
  throw Error("state or year unavailable");
};
