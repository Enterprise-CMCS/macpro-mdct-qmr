import { ResolverResult } from "react-hook-form";
import twentyTwentyOneMeasures from "./2021";
import * as Types from "measures/CommonQuestions/types";

export type CustomValidator = (res: ResolverResult) => ResolverResult;

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (props: Types.MeasureWrapperProps) => JSX.Element;
  };
}

const measuresByYear: MeasuresByYear = {
  2021: twentyTwentyOneMeasures,
};

export default measuresByYear;
