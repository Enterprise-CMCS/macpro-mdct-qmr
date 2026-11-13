import { Measure, MeasureData } from "./measure";

/**
 * The shape of an object in the `rate` table.
 *
 * All of the data stored in this table is redundant;
 * it is derived from data already found in the measure table.
 *
 * Whenever a measure is saved, if it is a measure from 2024 or later,
 * it also goes through the combined rate calculations.
 * Those calculations combine Medicaid rates with Separate CHIP rates.
 * Therefore they only do anything if the measure being saved is
 * in a separated core set: ACSC, ACSM, CCSC, or CCSM.
 * Measures in the ACS, CCS, or HHCS core sets are already combined.
 * The calculation results are stored in this shape.
 *
 * When a user views the combined rates page,
 * we display the data as queried from this table.
 */
export type CombinedRate = {
  /**
   * Includes state, year, and core set identifier. The Dynamo partition key.
   *
   * Note that the core set identifier here will always be ACS or CCS,
   * since the data will always be made up of ACSC + ACSM, or CCSC + CCSM.
   * @example "AL2024ACS"
   */
  compoundKey: Measure["compoundKey"];

  /** Which U.S. state does this measure belong to? @example "AL" */
  state: Measure["state"];

  /** Which year does this measure pertain to? @example 2024 */
  year: Measure["year"];

  /** Which core set does this measure belong to? @example "ACS" */
  coreSet: Measure["coreSet"];

  /** What kind of measure is this? @example "CCS-AD" */
  measure: Measure["measure"];

  /**
   * When was this data most recently modified? Milliseconds since epoch.
   * @example 1792188303331
   */
  lastAltered: number;

  data: CombinedRateData;
};

export type CombinedRateData = {
  /**
   * Lists the data sources the user entered when completing the rate.
   * Also includes flags indicating how those sources affect the calculation.
   */
  DataSources: {
    Medicaid: DataSourceInformation;
    CHIP: DataSourceInformation;
  };
  /**
   * Lists all of the rates completed in at least one core set.
   * If a rate was left empty for both Medicaid and CHIP, it will be omitted.
   *
   * This list may not be in sorted order; the frontend re-sorts on render.
   */
  Rates: {
    uid: string;
    category?: string;
    label?: string;
    Medicaid: WeightedRateShape;
    CHIP: WeightedRateShape;
    Combined: WeightedRateShape;
  }[];
  /**
   * Certain measures (currently PCR-AD and CPU-AD) collect numbers
   * outside of the usual numerator/denominator/rate triplets.
   * Those values are listed here. For most measures this array will be empty.
   */
  AdditionalValues: {
    uid: string;
    /**
     * NOTE: this label is included  for debugging purposes only.
     *
     * It is not guaranteed to be present! When displaying AdditionalValues,
     * we must look up the labels from measures/[year]/rateLabelText.ts
     */
    label: string;
    Medicaid?: number;
    CHIP?: number;
    Combined?: number;
  }[];
};

/**
 * Includes a set of flags relevant for Combined Rates,
 * plus the complete `DataSource` and `DataSourceSelections` for a measure.
 */
export type DataSourceInformation = {
  /**
   * If a measure was reported with "Other" as a data source,
   * or if it uses an alternative measure specification,
   * we cannot perform combined rate calculations on it.
   */
  isUnusableForCalc: boolean;
  hasOtherDataSource: boolean;
  /**
   * Prior to 2025, data sourced from ECDS was also unusable for combined rates.
   * So in 2024, when this flag is true, `isUnusableForCalc` will also be true.
   * In 2025 and on, `isUnusableForCalc` may be false even when this is true.
   *
   * In fact, this field is _deleted_ by the frontend in 2025 and on.
   * However, that change is not stored back; the DB still has it.
   */
  hasECDSDataSource?: boolean;
  hasOtherSpecification: boolean;
  /**
   * If a measure was reported with a hybrid data source,
   * we must weight the combined rate according to measure populations.
   */
  requiresWeightedCalc: boolean;
  /**
   * Top-level data source selections. Same type as `Measure.data.DataSource`.
   */
  DataSource: NonNullable<MeasureData["DataSource"]>;
  /**
   * Data source sub-selections and descriptions.
   */
  DataSourceSelections: NonNullable<MeasureData["DataSourceSelections"]>;
};

export type WeightedRateShape = {
  numerator?: number;
  denominator?: number;
  rate?: number;
  /**
   * For measures with a hybrid data source, this is the
   * Measure-Eligible Population. For measures with an admin data source,
   * this is the denominator for the rate - unless it is overridden by a
   * user-entered population at the measure level.
   */
  population?: number;
  weightedRate?: number;
};
