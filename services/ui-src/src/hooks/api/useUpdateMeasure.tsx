import { useMutation } from "react-query";
import { editMeasure } from "libs/api";
import { useParams } from "react-router-dom";
import { CoreSetAbbr } from "types";

interface IParams {
  state: string;
  year: string;
}

interface UpdateMeasure {
  coreSet: CoreSetAbbr;
  data: any;
  measure: string;
  status: "incomplete" | "complete";
}

const updateMeasure = ({
  state,
  year,
  coreSet,
  status,
  data,
  measure,
}: UpdateMeasure & IParams) => {
  return editMeasure({
    state,
    year,
    coreSet,
    measure,
    body: {
      data,
      status,
    },
  });
};

export const useUpdateMeasure = () => {
  const { state, year } = useParams();
  if (state && year) {
    return useMutation((data: UpdateMeasure) =>
      updateMeasure({ state, year, ...data })
    );
  }
  throw Error("Missing required fields");
};
