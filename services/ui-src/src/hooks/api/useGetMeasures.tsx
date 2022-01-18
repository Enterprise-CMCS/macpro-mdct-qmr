import { useQuery } from "react-query";
import { listMeasures } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
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
  const { state, year, coreSetId } = useParams<Params>();
  if (state && year && coreSetId) {
    return useQuery(["coreSets", state, year], () =>
      getMeasures({ state, year, coreSet: coreSetId, userState, userRole })
    );
  }
  throw Error("state or year unavailable");
};
