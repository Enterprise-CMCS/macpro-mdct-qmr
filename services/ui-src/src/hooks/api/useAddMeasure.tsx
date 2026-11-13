import { useMutation } from "@tanstack/react-query";
import { createMeasure } from "libs/api";
import { CoreSetIdentifier, MeasureIdentifier } from "@qmr/shared";
import { Params } from "types";

interface CreateMeasure {
  body: {
    description: string;
    userCreated?: boolean;
    userState: string;
  };
  coreSet: CoreSetIdentifier;
  measure: MeasureIdentifier;
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
  return useMutation({
    mutationFn: (data: CreateMeasure) => addMeasure({ ...data }),
  });
};
