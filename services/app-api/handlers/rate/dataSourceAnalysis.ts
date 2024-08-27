import {
  Measure,
  DataSource as DataSourceTypes,
  MeasurementSpecificationType,
} from "../../types";

/**
 * Pull the data sources and sub-selections out of the measure,
 * and determine how they will affect the calculation.
 */
export const collectDataSources = (
  medicaidMeasure: Measure | undefined,
  chipMeasure: Measure | undefined
) => {
  return {
    Medicaid: collectDataSourcesForMeasure(medicaidMeasure),
    CHIP: collectDataSourcesForMeasure(chipMeasure),
  };
};

export const collectDataSourcesForMeasure = (measure: Measure | undefined) => {
  const DataSource = measure?.data?.DataSource ?? [];
  const DataSourceSelections = measure?.data?.DataSourceSelections ?? {};
  const MeasurementSpecification = measure?.data?.MeasurementSpecification;

  const hasOtherDataSource = DataSource.includes(DataSourceTypes.Other);
  const hasECDSDataSource = DataSource.includes(DataSourceTypes.ECDS);
  const hasOtherSpecification =
    MeasurementSpecification === MeasurementSpecificationType.Other;
  const isUnusableForCalc =
    hasOtherDataSource || hasECDSDataSource || hasOtherSpecification;

  // There is no need to flag a measure as requiring weights
  // if it is not usable for combined calculations in the first place.
  const requiresWeightedCalc =
    !isUnusableForCalc &&
    (DataSource.includes(DataSourceTypes.Hybrid) ||
      DataSource.includes(DataSourceTypes.CaseMagementRecordReview));

  return {
    isUnusableForCalc,
    hasOtherDataSource,
    hasECDSDataSource,
    hasOtherSpecification,
    requiresWeightedCalc,
    DataSource,
    DataSourceSelections,
  };
};
