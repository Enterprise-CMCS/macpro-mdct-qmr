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

export enum MeasureType {
  MANDATORY = "Mandatory",
  PROVISIONAL = "Provisional",
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
  measureType?: MeasureType;
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
  numerator: number;
  denominator: number;
  rate: number;
  mult?: number;
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

export enum DataSource {
  Administrative = "AdministrativeData",
  EHR = "ElectronicHealthRecords",
  Hybrid = "HybridAdministrativeandMedicalRecordsData",
  CaseMagementRecordReview = "Casemanagementrecordreview",
  ECDS = "ElectronicClinicalDataSystemsECDS",
  Other = "OtherDataSource",
}

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
    /**
     * This label is included in the payload for debugging purposes only.
     * It is not guaranteed to be present! When displaying AdditionalValues,
     * we must look up the labels from measures/[year]/rateLabelText.ts
     */
    label: string;
    Medicaid: number | undefined;
    CHIP: number | undefined;
    Combined: number | undefined;
  }[];
};

export type DataSourcePayload = {
  requiresWeightedCalc: boolean;
  isUnusableForCalc: boolean;
  hasOtherDataSource: boolean;
  hasECDSDataSource?: boolean;
  hasOtherSpecification: boolean;
  DataSource: DataSource[];
  /** Note: this is a simplified version of the typedef found in app-api. */
  DataSourceSelections: {
    [key: string]: {
      selected?: string[];
      description?: string;
    };
  };
};

export type WeightedRateShape = {
  numerator?: number;
  denominator?: number;
  rate?: number;
  population?: number;
  weightedRate?: number;
};

export enum ProgramTypes {
  Medicaid = "Medicaid",
  CHIP = "CHIP",
  Combined = "Combined",
}

export const ProgramTypeList = [
  ProgramTypes.Medicaid,
  ProgramTypes.CHIP,
  ProgramTypes.Combined,
] as const;

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
export const isDefined = <T>(x: T | undefined): x is T =>
  x !== undefined && x !== "";
