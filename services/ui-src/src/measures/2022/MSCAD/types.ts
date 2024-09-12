import * as Types from "shared/types";
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
    Types.DeviationFromMeasureSpecificationCheckboxes,
    Types.OptionalMeasureStratification {
  //DataSource
  "DataSource-CAHPS-Version": string;
  "DataSource-CAHPS-Version-Other": string;
}
