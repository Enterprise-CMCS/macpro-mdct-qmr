import { Key } from "aws-sdk/clients/dynamodb";

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
  ExclusiveStartKey?: Key;
}

export interface DynamoFetch {
  TableName: string;
  Key: {
    compoundKey: string;
    coreSet: string;
  };
}

export const enum CoreSetAbbr {
  ACS = "ACS", // adult
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
