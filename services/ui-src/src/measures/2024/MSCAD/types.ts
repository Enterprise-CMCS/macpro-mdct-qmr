import * as Types from "measures/2023/shared/CommonQuestions/types";
import * as Type from "shared/types";

export interface FormData
  extends Types.DefinitionOfPopulation,
    Type.StatusOfData,
    Types.DateRange,
    Types.DidReport,
    Type.AdditionalNotes,
    Types.WhyAreYouNotReporting,
    Type.CombinedRates,
    Types.OtherPerformanceMeasure,
    Types.MeasurementSpecification,
    Types.PerformanceMeasure,
    Types.DeviationFromMeasureSpecification,
    Types.OptionalMeasureStratification {
  //DataSource
  "DataSource-CAHPS-Version": string;
  "DataSource-CAHPS-Version-Other": string;
}
