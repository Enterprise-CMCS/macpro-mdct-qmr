import { useMutation } from "react-query";
import { createCoreSet } from "libs/api";
import { CoreSetAbbr, Params } from "types";
import { useUser } from "hooks/authHooks";
import { useParams } from "react-router-dom";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
  userState: string;
  userRole: string;
}

const addCoreSet = ({
  state,
  year,
  coreSet,
  userState,
  userRole,
}: AddCoreSet) => {
  return createCoreSet({
    state,
    year,
    coreSet,
    body: {
      userState,
      userRole,
    },
  });
};

export const useAddCoreSet = () => {
  const userInfo = useUser();
  const userState = userInfo!.userState!;
  const userRole = userInfo!.user!.role;
  const { state, year } = useParams<Params>();
  if (state && year) {
    return useMutation((coreSet: CoreSetAbbr) =>
      addCoreSet({ state, year, coreSet, userState, userRole })
    );
  }
  throw Error("Missing required fields");
};
