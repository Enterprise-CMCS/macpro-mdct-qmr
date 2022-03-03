import { ResolverResult } from "react-hook-form";
import twentyTwentyOneMeasures from "./2021";

export type CustomValidator = (res: ResolverResult) => ResolverResult;

export interface Props {
  name: string;
  year: string;
  measureId: string;
  setValidationFunctions?: React.Dispatch<
    React.SetStateAction<CustomValidator[]>
  >;
}

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (props: Props) => JSX.Element;
  };
}

const measuresByYear: MeasuresByYear = {
  // @ts-ignore
  2021: twentyTwentyOneMeasures,
};

export default measuresByYear;
