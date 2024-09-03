import * as Types from "shared/types";

export namespace DataDrivenTypes {
  export type OptionalMeasureStrat = Types.OmsNode[];
  export type SingleOmsNode = Types.OmsNode;
  export type PerformanceMeasure = Types.PerformanceMeasureData;
  export type DataSource = Types.DataSourceData;
}

export type DefaultFormDataLegacy = Types.AdditionalNotes &
  Types.DidCollect &
  Types.StatusOfData &
  Types.WhyAreYouNotReporting &
  Types.DidReport &
  Types.CombinedRates &
  Types.DateRange &
  Types.DefinitionOfPopulation &
  Types.MeasurementSpecification &
  Types.OtherPerformanceMeasure &
  Types.OptionalMeasureStratification &
  Types.PerformanceMeasure &
  Types.DeviationFromMeasureSpecification &
  Types.DeviationFromMeasureSpecificationCheckboxes &
  Types.DataSource;

export type DefaultFormData = Types.AdditionalNotes &
  Types.DidCollect &
  Types.StatusOfData &
  Types.WhyAreYouNotReporting &
  Types.DidReport &
  Types.CombinedRates &
  Types.DateRange &
  Types.DefinitionOfPopulation &
  Types.MeasurementSpecification &
  Types.OtherPerformanceMeasure &
  Types.OptionalMeasureStratification &
  Types.PerformanceMeasure &
  Types.DeviationFromMeasureSpecification &
  Types.DeviationFromMeasureSpecificationTextField &
  Types.DataSource;
