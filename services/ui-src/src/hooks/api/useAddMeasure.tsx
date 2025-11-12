import { useMutation } from "@tanstack/react-query";
import { createMeasure } from "libs/api";
import { CoreSetAbbr, Params } from "types";

interface CreateMeasure {
  body: {
    description: string;
    userCreated?: boolean;
    userState: string;
  };
  coreSet: CoreSetAbbr;
  measure: string;
  state: string;
  year: string;
}

export const addMeasure = ({
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
  return useMutation({
    mutationFn: (data: CreateMeasure) => addMeasure({ ...data }),
  });
};
