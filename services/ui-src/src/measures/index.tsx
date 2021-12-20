import twentyTwentyOneMeasures from "./2021";
import { Measure } from "./types";

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (props: Measure.Props) => JSX.Element;
  };
}

const measuresByYear: MeasuresByYear = {
  2021: twentyTwentyOneMeasures,
};

export default measuresByYear;
