import { useMutation } from "react-query";
import * as Api from "libs/api";
import { CoreSetAbbr } from "types";
import { useUser } from "hooks/authHooks";

interface DeleteCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

const deleteCoreSet = (
  { state, year, coreSet }: DeleteCoreSet,
  userState: string,
  userRole: string
) => {
  return Api.deleteCoreSet({
    state,
    year,
    coreSet,
    body: {
      userState,
      userRole,
    },
  });
};

export const useDeleteCoreSet = () => {
  const userInfo = useUser();
  const userState = userInfo!.userState!;
  const userRole = userInfo!.userRole!;
  return useMutation((data: DeleteCoreSet) =>
    deleteCoreSet(data, userState, userRole)
  );
};
