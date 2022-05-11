import { useMutation } from "react-query";
import { createMeasure } from "libs/api";
import { CoreSetAbbr, Params } from "types";

interface CreateMeasure {
  body: {
    description: string;
    userState: string;
  };
  coreSet: CoreSetAbbr;
  measure: string;
  state: string;
  year: string;
}

const addMeasure = ({
  body,
  coreSet,
  measure,
  state,
  year,
}: CreateMeasure & Params) => {
  return createMeasure({
    body,
    coreSet,
    measure,
    state,
    year,
  });
};

export const useAddMeasure = () => {
  return useMutation((data: CreateMeasure) => addMeasure({ ...data }));
};
