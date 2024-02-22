import * as Types from "measures/2024/shared/CommonQuestions/types";
import * as Type from "shared/types/Type";

export interface FormData
  extends Types.DefinitionOfPopulation,
    Types.StatusOfData,
    Types.DateRange,
    Types.DidReport,
    Type.AdditionalNotes,
    Types.WhyAreYouNotReporting,
    Types.CombinedRates,
    Types.OtherPerformanceMeasure,
    Types.MeasurementSpecification,
    Types.PerformanceMeasure,
    Types.DeviationFromMeasureSpecification,
    Types.OptionalMeasureStratification {
  //DataSource
  "DataSource-CAHPS-Version": string;
  "DataSource-CAHPS-Version-Other": string;
}
