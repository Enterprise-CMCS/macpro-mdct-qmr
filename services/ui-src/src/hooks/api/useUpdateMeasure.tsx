import { useMutation } from "react-query";
import { editMeasure } from "libs/api";
import { useParams } from "react-router-dom";
import { CoreSetAbbr, Params, MeasureStatus } from "types";
import { useUser } from "hooks/authHooks";

interface User {
  userState?: string;
  userRole: string;
}

interface UpdateMeasure {
  coreSet: CoreSetAbbr;
  data: any;
  measure: string;
  status: MeasureStatus;
}

const updateMeasure = ({
  state,
  year,
  coreSet,
  status,
  data,
  measure,
  userState,
  userRole,
}: UpdateMeasure & Params & User) => {
  return editMeasure({
    state,
    year,
    coreSet,
    measure,
    body: {
      data,
      status,
      userState,
      userRole,
    },
  });
};

export const useUpdateMeasure = () => {
  const { state, year } = useParams();
  const userInfo = useUser();
  const userState = userInfo!.userState!;
  const userRole = userInfo!.userRole!;
  if (state && year) {
    return useMutation((data: UpdateMeasure) =>
      updateMeasure({ state, year, userRole, userState, ...data })
    );
  }
  throw Error("Missing required fields");
};
