import twentyTwentyOneMeasures from "./2021";
import { MeasureProps } from "./types";

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (props: MeasureProps) => JSX.Element;
  };
}

const measuresByYear: MeasuresByYear = {
  2021: twentyTwentyOneMeasures,
};

export default measuresByYear;
