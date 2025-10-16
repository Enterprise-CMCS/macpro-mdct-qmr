import { ResolverResult } from "react-hook-form";
import twentyTwentyOneMeasures, { QualifierData as data2021 } from "./2021";
import twentyTwentyTwoMeasures, { QualifierData as data2022 } from "./2022";
import twentyTwentyThreeMeasures, { QualifierData as data2023 } from "./2023";
import twentyTwentyFourMeasures, { QualifierData as data2024 } from "./2024";
import twentyTwentyFiveMeasures, { QualifierData as data2025 } from "./2025";
import twentyTwentySixMeasures, { QualifierData as data2026 } from "./2026";
import * as QMR from "components";

export type CustomValidator = (res: ResolverResult) => ResolverResult;

interface MeasuresByYear {
  [year: string]: {
    [measure: string]: (
      props: QMR.MeasureWrapperProps
    ) => React.ReactNode | null;
  };
}

interface IQualifierData {
  year: string;
  data: any;
}

const measuresByYear: MeasuresByYear = {
  2021: twentyTwentyOneMeasures,
  2022: twentyTwentyTwoMeasures,
  2023: twentyTwentyThreeMeasures,
  2024: twentyTwentyFourMeasures,
  2025: twentyTwentyFiveMeasures,
  2026: twentyTwentySixMeasures,
};

export default measuresByYear;
export const QualifierData: IQualifierData[] = [
  { year: "2021", data: data2021 },
  { year: "2022", data: data2022 },
  { year: "2023", data: data2023 },
  { year: "2024", data: data2024 },
  { year: "2025", data: data2025 },
  { year: "2026", data: data2026 },
];
