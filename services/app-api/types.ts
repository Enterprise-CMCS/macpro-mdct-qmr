export interface CoreSet {
  compoundKey: string;
  coreSet: CoreSetAbbr;
  createdAt: number;
  lastAltered: number;
  lastAlteredBy?: string;
  progress: {
    numAvailable: number;
    numComplete: number;
  };
  state: string;
  submitted: boolean;
  year: number;
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
export const isRateNDRShape = (rate: StandardRateShape): rate is RateNDRShape => {
  return ["numerator", "denominator", "rate"].some((field) => field in rate);
}

export interface RateValueShape {
  uid?: string;
  label: string;
  value?: string;
}
export const isRateValueShape = (rate: StandardRateShape): rate is RateValueShape => {
  return "value" in rate;
}

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
   * The `autoCompleted` and `mandatory` properties are not present on
   * measures in the database; they are set on fetch, according to the
   * metadata in measureList.ts.
   */
  autoCompleted?: boolean;
  mandatory?: boolean;
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
    // TODO can we make this type more specific?
    // Do we know the exhaustive list of keys?
    // The exhaustive list of possible selected values?
    // How can we keep that in sync with the rest of the app?
    DataSourceSelections?: DataSourceSelectionsType;
    MeasurementSpecification: MeasurementSpecificationType;
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
  }
} & {
  [key in DataSourceDescriptionParentKeys]?: {
    description?: string;
  }
};

enum DataSourceSelectedParentKeys {
  /** Only appears for FUA-AD, PQI01-AD, PQI15-AD in VAL in 2021. Possibly a bug? */
  _Admin = "AdministrativeData",
  Admin = "AdministrativeData0",
  CaseManagementRecordReview = "Casemanagementrecordreview0",
  Hybrid0 = "HybridAdministrativeandMedicalRecordsData0",
  Hybrid1 = "HybridAdministrativeandMedicalRecordsData1",
};

enum DataSourceDescriptionParentKeys {
  AdminOther = "AdministrativeData0-AdministrativeDataOther",
  EHR = "ElectronicHealthRecords",
  HybridAdminOther = "HybridAdministrativeandMedicalRecordsData0-AdministrativeDataOther",
  HybridOther = "HybridAdministrativeandMedicalRecordsData0-Other",
  /** Only appears for PC01-AD, in 2021 */
  _HybridOther = "HybridAdministrativeandMedicalRecordsData0-OtherDataSource",
  /** Only appears for AUD-CH (obsolete in 2022) */
  _Other = "Other",
  Other = "OtherDataSource",
};

enum DataSourceSelectedValueType {
  MMIS = "MedicaidManagementInformationSystemMMIS",
  AdminOther = "AdministrativeDataOther",
  EHR = "ElectronicHealthRecordEHRData",
  /** Only appears for PC01-AD, in 2021 */
  _Other = "Other",
  Paper = "Paper",
  /** Renamed in 2023 to `ImmunizationRegistryImmunizationInformationSystemIIS` */
  _ImmunizationRegistry = "ImmunizationRegistry",
  ImmunizationRegistry = "ImmunizationRegistryImmunizationInformationSystemIIS",
  VitalRecords = "VitalRecords",
  Other = "OtherDataSource",
};

export enum MeasurementSpecificationType {
  DQA = "ADA-DQA",
  AHRQ = "AHRQ",
  AHRQ_NCQA = "AHRQ-NCQA",
  /** Only for AUD-CH (obsolete in 2022) */
  CDC = "CDC",
  CMS = "CMS",
  HRSA = "HRSA",
  NCQA_HEDIS = "NCQA/HEDIS",
  OHSU = "OHSU",
  OPA = "OPA",
  Other = "Other",
  PQA = "PQA",
  /** Only for PC01-AD (obsolete in 2022) */
  TheJointCommission = "TheJointCommission",
}

export interface MeasureParameters {
  state: string;
  year: string;
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
  return Object.values(CoreSetAbbr).includes(coreSet as CoreSetAbbr);
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
 * This is the shape of data saved to the Rates table
 */
export type CombinedRatesPayload = {
  DataSources: {
    Medicaid: DataSourcePayload;
    CHIP: DataSourcePayload;
  };
  Rates: {
    uid: string;
    category?: string;
    label?: string;
    Medicaid: WeightedRateShape;
    CHIP: WeightedRateShape;
    Combined: WeightedRateShape;
  }[];
  AdditionalValues: {
    uid: string;
    label: string;
    Medicaid: number | undefined;
    CHIP: number | undefined;
    Combined: number | undefined;
  }[];
};

type DataSourcePayload = {
  includesHybrid: boolean;
  isNotApplicable: boolean;
  DataSource: DataSource[];
  DataSourceSelections: unknown;
};

type WeightedRateShape = {
  isReported: boolean;
  numerator?: number;
  denominator?: number;
  rate?: number;
  population?: number;
  weightedRate?: number;
};

/**
 * This utility is most useful when filtering undefined values from an array,
 * _while convincing Typescript you've done so_.
 *
 * @example
 * const a = words.map(word => getThirdChar(word));
 * // a's type is (string | undefined)[]
 *
 * const b = a.filter(char => char !== undefined);
 * // b's type is still (string | undefined)[], boo!
 *
 * const c = a.filter(isDefined);
 * // c's type is just string[], hurray!
 */
export const isDefined = <T>(x: T | undefined): x is T => x !== undefined;
