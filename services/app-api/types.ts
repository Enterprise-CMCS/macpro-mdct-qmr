import { DataSource } from "./handlers/rate/calculations/types";
import { coreSets, states } from "./utils/constants/constants";

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
  ["weighted rate"]?: string;
}

export interface RateValueShape extends StandardRateShape {
  label: string;
  uid?: string;
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
    DataSource?: DataSource[];
    DataSourceSelections?: unknown;
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

export const enum CoreSetAbbr {
  ACS = "ACS", // adult
  ACSM = "ACSM", // adult medicaid
  ACSC = "ACSC", // adult chip
  CCS = "CCS", // child
  CCSM = "CCSM", // child medicaid
  CCSC = "CCSC", // child chip
  HHCS = "HHCS", // health homes
}

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

export type State = typeof states[number];

export const isState = (state: unknown): state is State => {
  return states.includes(state as State);
};

export const isValidYear = (year: unknown) => {
  return (
    year === "2021" || year === "2022" || year === "2023" || year === "2024"
  );
};

export const isCoreSet = (coreSet: string) => {
  return coreSets.includes(coreSet) || coreSet.startsWith("HHCS_");
};
