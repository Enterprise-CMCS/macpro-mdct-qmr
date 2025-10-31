import * as Types from "shared/types";

export interface FormData
  extends Types.DefinitionOfPopulation,
    Types.StatusOfData,
    Types.DateRange,
    Types.DidReport,
    Types.AdditionalNotes,
    Types.WhyAreYouNotReporting,
    Types.CombinedRates,
    Types.OtherPerformanceMeasure,
    Types.MeasurementSpecification,
    Types.PerformanceMeasure,
    Types.DeviationFromMeasureSpecificationCheckboxes,
    Types.OptionalMeasureStratification {
  //DataSource
  "DataSource-CAHPS-Version": string;
  "DataSource-CAHPS-Version-Other": string;
}
