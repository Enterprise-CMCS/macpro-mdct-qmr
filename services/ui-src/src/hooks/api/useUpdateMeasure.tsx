import { useMutation } from "react-query";
import { editMeasure } from "libs/api";
import { CoreSetAbbr, Params, MeasureStatus } from "types";
import { useUser } from "hooks/authHooks";
import { usePathParams } from "./usePathParams";
import { useParams } from "react-router-dom";

interface User {
  userState?: string;
  userRole: string;
}

interface UpdateMeasure<DataType = any> {
  coreSet?: CoreSetAbbr;
  data: DataType;
  measure?: string;
  status: MeasureStatus;
  reporting?: string;
}

const updateMeasure = ({
  state,
  year,
  coreSet,
  status,
  reporting,
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
      reporting,
      status,
      userState,
      userRole,
    },
  });
};

export const useUpdateMeasure = () => {
  const {
    state: statePath,
    year: yearPath,
    coreSet,
    measureId,
  } = usePathParams();
  const { state, year, coreSetId } = useParams();

  const userInfo = useUser();
  const userState = userInfo!.userState!;
  const userRole = userInfo!.userRole!;

  if ((state || statePath) && (year || yearPath) && (coreSet || coreSetId)) {
    return useMutation((data: UpdateMeasure) =>
      updateMeasure({
        measure: measureId,
        year: year || yearPath,
        state: state || statePath,
        coreSet: (coreSetId as CoreSetAbbr) || (coreSet as CoreSetAbbr),
        userRole,
        userState,
        ...data,
      })
    );
  }
  throw Error("Missing required fields");
};
