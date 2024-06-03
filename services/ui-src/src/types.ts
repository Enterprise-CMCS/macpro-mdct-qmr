export enum CoreSetAbbr {
  ACS = "ACS",
  ACSM = "ACSM",
  ACSC = "ACSC",
  CCS = "CCS",
  CCSM = "CCSM",
  CCSC = "CCSC",
  HHCS = "HHCS",
}

export enum coreSetType {
  ACS = "Adult",
  ACSM = "Adult - Medicaid",
  ACSC = "Adult - CHIP",
  CCS = "Child",
  CCSM = "Child - Medicaid",
  CCSC = "Child - CHIP",
  HHCS = "Health Home",
}

export enum UserRoles {
  ADMIN = "mdctqmr-bor", // "MDCT QMR ADMIN"
  APPROVER = "mdctqmr-approver", // "MDCT QMR APPROVER"
  INTERNAL = "mdctqmr-internal-user", // "MDCT QMR INTERNAL USER"
  HELP_DESK = "mdctqmr-help-desk", // "MDCT QMR HELP DESK USER"
  STATE_USER = "mdctqmr-state-user", // "MDCT QMR STATE USER"
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
  detailedDescription?: string;
  lastAltered: number;
  autoCompleted?: boolean;
  measure: string;
  state: string;
  status: "incomplete" | "complete" | undefined;
  reporting: "yes" | "no" | null | undefined;
  year: number;
  data: DataType;
  userCreated?: boolean;
  placeholder?: boolean;
}

export interface ndrFormula {
  num: number;
  denom: number;
  rate: number;
  mult: number;
}

// BANNER

export interface BannerData {
  title: string;
  description: string;
  link?: string;
  [key: string]: any;
}

export interface AdminBannerData extends BannerData {
  key: string;
  startDate?: number;
  endDate?: number;
  isActive?: boolean;
}

export interface AdminBannerMethods {
  fetchAdminBanner: Function;
  writeAdminBanner: Function;
  deleteAdminBanner: Function;
}

export interface AdminBannerShape extends AdminBannerMethods {
  bannerData?: AdminBannerData;
  isLoading: boolean;
  errorMessage?: string;
}

// ALERTS

export enum AlertTypes {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

// OTHER
export interface AnyObject {
  [key: string]: any;
}

// TIME

export interface DateShape {
  year: number;
  month: number;
  day: number;
}

export interface TimeShape {
  hour: number;
  minute: number;
  second: number;
}
