import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { useParams } from "react-router-dom";
import { Params } from "Routes";
import { CoreSetAbbr } from "types";
import { useUser } from "hooks/authHooks";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
  user_state: string;
  user_role: string;
}

const addCoreSet = ({
  state,
  year,
  coreSet,
  user_state,
  user_role,
}: AddCoreSet) => {
  return createCoreSet({
    state,
    year,
    coreSet,
    body: {
      user_state,
      user_role,
    },
  });
};

export const useAddCoreSet = () => {
  const userInfo = useUser();
  const user_state = userInfo!.userState!;
  const user_role = userInfo!.user!.role;
  const { state, year } = useParams<Params>();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr) =>
      addCoreSet({ state, year, coreSet, user_state, user_role })
    );
  }
  throw Error("Missing required fields");
};
