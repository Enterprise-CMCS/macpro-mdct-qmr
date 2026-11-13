import { CoreSetAbbr, CoreSetIdentifier } from "@qmr/shared";

export const coreSetLabels = {
  ACS: "Adult",
  ACSM: "Adult - Medicaid",
  ACSC: "Adult - CHIP",
  CCS: "Child",
  CCSM: "Child - Medicaid",
  CCSC: "Child - CHIP",
  HHCS: "Health Home",
} as const satisfies { [key in CoreSetAbbr]: string };

export interface Params {
  state?: string;
  year?: string;
  coreSetId?: CoreSetIdentifier;
}

export interface ndrFormula {
  numerator: number;
  denominator: number;
  rateIndex: number;
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
