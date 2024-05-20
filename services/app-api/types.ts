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
   * The `autoCompleted` property is not present on measures in the database;
   * it is set on fetch, according to the metadata in measureList.ts.
   */
  autoCompleted?: boolean;
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
  ACSM = "ACSM", // adult multiple
  ACSC = "ACSC", // adult combined
  CCS = "CCS", // child combined
  CCSM = "CCSM", // child medicaid
  CCSC = "CCSC", // child chip
  HHCS = "HHCS", // helth homes
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
