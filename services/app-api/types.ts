import { states } from "./utils/constants/constants";
export interface CoreSet {
  compoundKey: string;
  coreSet: CoreSetAbbr;
  createdAt: number;
  lastAltered: number;
  lastAlteredBy?: string;
  status?: string;
  progress: {
    numAvailable: number;
    numComplete: number;
  };
  state: string;
  submitted: boolean;
  year: number;
}

export enum MeasureType {
  MANDATORY = "Mandatory",
  PROVISIONAL = "Provisional",
}

export type StandardRateShape = RateNDRShape | RateValueShape;

export interface RateNDRShape {
  uid?: string;
  label: string;
  category?: string;
  numerator?: string;
  denominator?: string;
  rate?: string;
}
export const isRateNDRShape = (
  rate: StandardRateShape
): rate is RateNDRShape => {
  return ["numerator", "denominator", "rate"].some((field) => field in rate);
};

export interface RateValueShape {
  uid?: string;
  label: string;
  value?: string;
}
export const isRateValueShape = (
  rate: StandardRateShape
): rate is RateValueShape => {
  return "value" in rate;
};

export interface Measure {
  compoundKey: string;
  coreSet: CoreSetAbbr;
  createdAt: number;
  detailedDescription?: string;
  description?: string;
  lastAltered: number;
  lastAlteredBy?: string;
  measure: string;
  state: string;
  status: MeasureStatus;
  userCreated?: boolean;
  year: number;
  placeholder?: boolean;
  /**
   * The `autoCompleted`, `measureType`, and `stratificationRequired` properties are not present on
   * measures in the database; they are set on fetch, according to the
   * metadata in measureList.ts.
   */
  autoCompleted?: boolean;
  measureType?: MeasureType;
  stratificationRequired?: CoreSetAbbr[];
  data?: {
    /**
     * An array of strings from the `DataSource` enum.
     * Lists the top-level checkboxes selected for the Data Source question.
     *
     * This type is correct as of 2024. Prior years have exceptions:
     * * The measure FVA-AD (obsolete in 2024) would have a single string
     *   instead of an array; it would be `"CAHPS 5.1H"` or `"Other"`.
     * * The measure AUD-CH (obsolete in 2022) could include in its array the
     *   string `"Other"`, as opposed to the standard `"OtherDataSource"`.
     */
    DataSource?: DataSource[];
    /**
     * A map of data source keys to sub-objects, which may contain selected
     * arrays, or string descriptions.
     *
     * Certain keys may have selected arrays, other keys may have string
     * descriptions. No key will ever have both.
     *
     * The type definition enumerates the specific keys observed in the wild;
     * it is complete as of 2024. However there is no mechanism (yet) tying
     * this type definition to the actual data generation process,
     * so it may be incomplete for future years. It is probably worthwhile
     * keeping around (even without such a mechanism), to give concrete
     * examples of typical data shapes.
     */
    DataSourceSelections?: DataSourceSelectionsType;
    MeasurementSpecification?: MeasurementSpecificationType;
    PerformanceMeasure?: {
      rates?: {
        [key: string]: StandardRateShape[];
      };
    };
    HybridMeasurePopulationIncluded?: string;
  };
}

export enum DataSource {
  Administrative = "AdministrativeData",
  EHR = "ElectronicHealthRecords",
  Hybrid = "HybridAdministrativeandMedicalRecordsData",
  CaseMagementRecordReview = "Casemanagementrecordreview",
  ECDS = "ElectronicClinicalDataSystemsECDS",
  Other = "OtherDataSource",
}

export type DataSourceSelectionsType = {
  [key in DataSourceSelectedParentKeys]?: {
    selected?: DataSourceSelectedValueType[];
  };
} & {
  [key in DataSourceDescriptionParentKeys]?: {
    description?: string;
  };
};

enum DataSourceSelectedParentKeys {
  Admin = "AdministrativeData0",
  CaseManagementRecordReview = "Casemanagementrecordreview0",
  Hybrid0 = "HybridAdministrativeandMedicalRecordsData0",
  Hybrid1 = "HybridAdministrativeandMedicalRecordsData1",
  /** Only appears for FUA-AD, PQI01-AD, PQI15-AD, in VAL, in 2021. Possibly a bug? */
  _Admin = "AdministrativeData",
}

enum DataSourceDescriptionParentKeys {
  AdminOther = "AdministrativeData0-AdministrativeDataOther",
  EHR = "ElectronicHealthRecords",
  HybridAdminOther = "HybridAdministrativeandMedicalRecordsData0-AdministrativeDataOther",
  HybridOther = "HybridAdministrativeandMedicalRecordsData0-Other",
  Other = "OtherDataSource",
  /** Only appears for PC01-AD, in 2021 */
  _HybridOther = "HybridAdministrativeandMedicalRecordsData0-OtherDataSource",
  /** Only appears for AUD-CH (obsolete in 2022) */
  _Other = "Other",
}

enum DataSourceSelectedValueType {
  AdminOther = "AdministrativeDataOther",
  EHR = "ElectronicHealthRecordEHRData",
  ImmunizationRegistry = "ImmunizationRegistryImmunizationInformationSystemIIS",
  MMIS = "MedicaidManagementInformationSystemMMIS",
  Other = "OtherDataSource",
  Paper = "Paper",
  VitalRecords = "VitalRecords",
  /** Renamed in 2023 to `ImmunizationRegistryImmunizationInformationSystemIIS` */
  _ImmunizationRegistry = "ImmunizationRegistry",
  /** Only appears for PC01-AD, in 2021 */
  _Other = "Other",
}

export enum MeasurementSpecificationType {
  AHRQ = "AHRQ",
  AHRQ_NCQA = "AHRQ-NCQA",
  CMS = "CMS",
  DQA = "ADA-DQA",
  HRSA = "HRSA",
  NCQA_HEDIS = "NCQA/HEDIS",
  OHSU = "OHSU",
  OPA = "OPA",
  Other = "Other",
  PQA = "PQA",
  /** Only for AUD-CH (obsolete in 2022) */
  CDC = "CDC",
  /** Only for PC01-AD (obsolete in 2022) */
  TheJointCommission = "TheJointCommission",
  SAMHSA = "SAMHSA",
}

export interface RateParameters {
  state: string;
  year: number;
  coreSet: string;
  measure: string;
}

/** This type subject to change, if/when we move to a multi-banner system. */
export interface Banner {
  key: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;

  createdAt: Date;
  lastAltered: Date;
  lastAlteredBy: string;
}

export enum CoreSetAbbr {
  ACS = "ACS", // adult
  ACSM = "ACSM", // adult medicaid
  ACSC = "ACSC", // adult chip
  CCS = "CCS", // child
  CCSM = "CCSM", // child medicaid
  CCSC = "CCSC", // child chip
  HHCS = "HHCS", // health homes
}

export const isCoreSetAbbr = (coreSet: string): coreSet is CoreSetAbbr => {
  return (
    Object.values(CoreSetAbbr).includes(coreSet as CoreSetAbbr) ||
    coreSet.startsWith("HHCS")
  );
};

export enum Program {
  M = "Medicaid",
  C = "CHIP",
}

export const enum MeasureStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}

export const enum UserRoles {
  ADMIN = "mdctqmr-bor", // "MDCT QMR ADMIN"
  APPROVER = "mdctqmr-approver", // "MDCT QMR APPROVER"
  INTERNAL = "mdctqmr-internal-user", // "MDCT QMR INTERNAL USER"
  HELP_DESK = "mdctqmr-help-desk", // "MDCT QMR HELP DESK USER"
  STATE_USER = "mdctqmr-state-user", // "MDCT QMR STATE USER"
}

export const enum RequestMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * Abridged copy of the type used by `aws-lambda@1.0.7` (from `@types/aws-lambda@8.10.88`)
 * We only use this one type from the package, and we use only a subset of the
 * properties. Since `aws-lambda` depends on `aws-sdk` (that is, SDK v2),
 * we can save ourselves a big dependency with this small redundancy.
 */
export interface APIGatewayProxyEvent {
  body: string | null;
  headers: EventParameters;
  multiValueHeaders: EventParameters;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: EventParameters | null;
  queryStringParameters: EventParameters | null;
  multiValueQueryStringParameters: EventParameters | null;
  stageVariables: EventParameters | null;
  /** The context is complicated, and we don't (as of 2023) use it at all. */
  requestContext: any;
  resource: string;
}

export type EventParameters = Record<string, string | undefined>;

/**
 * This is the shape of data saved to the Rates table.
 */
export type CombinedRatesTableEntry = RateParameters & {
  /** This will be `${stateAbbr}${year}${coreSetAbbr}`. Example: `MI2024ACS` */
  compoundKey: string;
  lastAltered: number;
  data: CombinedRatesPayload;
};

export type CombinedRatesPayload = {
  /**
   * Lists the data sources the user entered when completing the rate.
   * Also includes flags indicating how those sources affect the calculation.
   */
  DataSources: {
    Medicaid: DataSourcePayload;
    CHIP: DataSourcePayload;
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
   * Certain measures collect numbers outside of the usual
   * numerator/denominator/rate triplets. Those values are listed here.
   */
  AdditionalValues: {
    uid: string;
    label: string;
    Medicaid?: number;
    CHIP?: number;
    Combined?: number;
  }[];
};

export type DataSourcePayload = {
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
   */
  hasECDSDataSource: boolean;
  hasOtherSpecification: boolean;
  /**
   * If a measure was reported with a hybrid data source,
   * we must weight the combined rate according to measure populations.
   */
  requiresWeightedCalc: boolean;
  /**
   * Top-level data source selections.
   */
  DataSource: DataSource[];
  /**
   * Data source sub-selections and descriptions.
   */
  DataSourceSelections: DataSourceSelectionsType;
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

export type State = typeof states[number];
