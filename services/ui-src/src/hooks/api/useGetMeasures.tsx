import { useQuery } from "react-query";
import { listMeasures } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { useUser } from "hooks/authHooks";

interface GetMeasures {
  state: string;
  year: string;
  coreSet: string;
  user_state: string;
  user_role: string;
}

const getMeasures = ({
  state,
  year,
  coreSet,
  user_role,
  user_state,
}: GetMeasures) => {
  return listMeasures({
    state,
    year,
    coreSet,
    body: {
      user_state,
      user_role,
    },
  });
};

export const useGetMeasures = () => {
  const userInfo = useUser();
  const user_state = userInfo!.userState!;
  const user_role = userInfo!.user!.role;
  const { state, year, coreSetId } = useParams<Params>();
  if (state && year && coreSetId) {
    return useQuery(["coreSets", state, year], () =>
      getMeasures({ state, year, coreSet: coreSetId, user_state, user_role })
    );
  }
  throw Error("state or year unavailable");
};
