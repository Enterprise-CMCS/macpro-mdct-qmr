import { DataSource } from "./handlers/rate/types";

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

export interface StandardRateShape {
  label: string;
  uid?: string;
}

export interface RateNDRShape extends StandardRateShape {
  category?: string;
  numerator?: string;
  denominator?: string;
  rate?: string;
}

export interface RateValueShape extends StandardRateShape {
  value?: string;
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
    // TODO, can we make this type more specific?
    DataSourceSelections?: string[];
    PerformanceMeasure?: {
      rates?: {
        [key: string]: StandardRateShape[];
      };
    };
    HybridMeasurePopulationIncluded?: string;
  };
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
