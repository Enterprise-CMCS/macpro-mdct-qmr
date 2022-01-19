export interface CreateCoreSet {
  TableName: string;
  Item: {
    compoundKey: string;
    state: string;
    year: number;
    coreSet: string;
    createdAt: number;
    lastAltered: number;
    lastAlteredBy?: string;
    progress: { numAvailable: number; numComplete: number };
    submitted: boolean;
  };
}

export enum MeasureStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}

export interface CreateMeasure {
  TableName: string;
  Item: {
    compoundKey: string;
    state: string;
    year: number;
    coreSet: string;
    measure: string;
    createdAt: number;
    lastAltered: number;
    status: MeasureStatus;
    description: string;
  };
}

export enum CoreSetAbbr {
  ACS = "ACS",
  CCS = "CCS",
  CCSM = "CCSM",
  CCSC = "CCSC",
  HHCS = "HHCS",
}

export enum UserRoles {
  ADMIN = "mdctqmr-approver",
  STATE = "mdctqmr-state-user",
  HELP = "mdctqmr-help-desk",
  BO = "mdctqmr-bo-user",
}

export enum RequestMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}
