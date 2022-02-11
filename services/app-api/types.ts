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

export interface DynamoCoreSetList {
  Items?: CoreSet[];
  Count?: number;
  ScannedCount?: number;
}

export interface Measure {
  compoundKey: string;
  coreSet: CoreSetAbbr;
  createdAt: number;
  description: string;
  lastAltered: number;
  lastAlteredBy?: string;
  measure: string;
  state: string;
  status: MeasureStatus;
  year: number;
}

export interface DynamoMeasureList {
  Items?: Measure[];
  Count?: number;
  ScannedCount?: number;
}

export interface DynamoCreate {
  TableName: string;
  Item: Measure | CoreSet;
}

export interface DynamoDelete {
  TableName: string;
  Key: {
    compoundKey: string;
    coreSet: string;
  };
}

export interface DynamoUpdate {
  TableName: string;
  Key: {
    compoundKey: string;
    coreSet: string;
  };
  UpdateExpression?: string;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
}

export interface DynamoScan {
  TableName: string;
  FilterExpression?: string;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
}

export interface DynamoFetch {
  TableName: string;
  Key: {
    compoundKey: string;
    coreSet: string;
  };
}

export const enum CoreSetAbbr {
  ACS = "ACS",
  CCS = "CCS",
  CCSM = "CCSM",
  CCSC = "CCSC",
  HHCS = "HHCS",
}

export const enum MeasureStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}

export const enum UserRoles {
  ADMIN = "mdctqmr-approver",
  STATE = "mdctqmr-state-user",
  HELP = "mdctqmr-help-desk",
  BO = "mdctqmr-bo-user",
  BOR = "mdctqmr-bor",
}

export const enum RequestMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}
