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
