import { ResolverResult } from "react-hook-form";
import twentyTwentyOneMeasures from "./2021";
import * as QMR from "components";

export type CustomValidator = (res: ResolverResult) => ResolverResult;

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (props: QMR.MeasureWrapperProps) => JSX.Element;
  };
}

const measuresByYear: MeasuresByYear = {
  2021: twentyTwentyOneMeasures,
};

export default measuresByYear;
