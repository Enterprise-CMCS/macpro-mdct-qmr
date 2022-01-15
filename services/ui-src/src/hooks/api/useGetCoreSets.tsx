import { useQuery } from "react-query";
import { getAllCoreSets } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { useUser } from "hooks/authHooks";

interface GetCoreSets {
  state: string;
  year: string;
  user_state: string;
  user_role: string;
}

const getCoreSets = ({ state, year, user_state, user_role }: GetCoreSets) => {
  return getAllCoreSets({
    state,
    year,
    body: {
      user_state,
      user_role,
    },
  });
};

export const useGetCoreSets = () => {
  const userInfo = useUser();
  const user_state = userInfo!.userState!;
  const user_role = userInfo!.user!.role;
  const { state, year } = useParams<Params>();
  if (state && year) {
    return useQuery(["coreSets", state, year], () =>
      getCoreSets({ state, year, user_state, user_role })
    );
  }
  throw Error("state or year unavailable");
};
