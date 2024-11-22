import { useMutation } from "@tanstack/react-query";
import { CoreSetAbbr } from "types";
import { useAddCoreSet } from "./api/useAddCoreSet";
import { useDeleteCoreSet } from "./api/useDeleteCoreSet";

interface CoreSetData {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

export const useResetCoreSet = () => {
  const { mutate: deleteCoreSet } = useDeleteCoreSet();
  const { mutate: addCoreSet } = useAddCoreSet();
  return useMutation(async (data: CoreSetData) => {
    await new Promise<void>((resolve, reject) => {
      deleteCoreSet(data, {
        onSuccess: () => {
          addCoreSet(data.coreSet, {
            onSuccess: () => {
              resolve();
            },
            onError: (err) => {
              reject(err);
            },
          });
        },
        onError: (err) => {
          reject(err);
        },
      });
    });
  });
};
