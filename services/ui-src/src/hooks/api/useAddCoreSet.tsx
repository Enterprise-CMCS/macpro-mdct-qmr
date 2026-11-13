import { useMutation } from "@tanstack/react-query";
import { createCoreSet } from "libs/api";
import { CoreSetIdentifier } from "@qmr/shared";
import { useParams } from "react-router";

interface AddCoreSet {
  state: string;
  year: string;
  coreSet: CoreSetIdentifier;
}

const addCoreSet = async ({ state, year, coreSet }: AddCoreSet) => {
  return await createCoreSet({
    state,
    year,
    coreSet,
  });
};

export const useAddCoreSet = () => {
  const { state, year } = useParams();
  if (state && year) {
    return useMutation({
      mutationFn: (coreSet: CoreSetIdentifier) =>
        addCoreSet({ state, year, coreSet }),
    });
  }
  throw new Error("Missing required fields");
};
