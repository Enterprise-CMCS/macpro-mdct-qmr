import { useMutation } from "react-query";
import { editCoreSet } from "libs/api";
import { CoreSetAbbr, Params } from "types";
import { CoreSetTableItem } from "components/Table/types";

interface EditCoreSet {
  body: {
    submitted: boolean;
    status: CoreSetTableItem.Status;
    userState: string;
    userRole: string;
  };
  coreSet: CoreSetAbbr;
  state: string;
  year: string;
}

const _editCoreSet = ({ body, coreSet, state, year }: EditCoreSet & Params) => {
  return editCoreSet({
    body,
    coreSet,
    state,
    year,
  });
};

export const useEditCoreSet = () => {
  return useMutation((data: EditCoreSet) =>
    _editCoreSet({
      ...data,
    })
  );
};
