export enum CoreSetAbbr {
  ACS = "ACS",
  CCS = "CCS",
  CCSM = "CCSM",
  CCSC = "CCSC",
  HHCS = "HHCS",
}

export enum UserRoles {
  STATE = "mdctqmr-state-user",
  ADMIN = "mdctqmr-approver",
}

export enum MeasureStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}

export interface Params {
  state?: string;
  year?: string;
  coreSetId?: CoreSetAbbr;
}

export interface MeasureData<DataType = any> {
  compoundKey: string;
  coreSet: CoreSetAbbr;
  createdAt: number;
  description: string;
  lastAltered: number;
  measure: string;
  state: string;
  status: "incomplete" | "complete" | undefined;
  reporting: "yes" | undefined;
  year: number;
  data: DataType;
}
