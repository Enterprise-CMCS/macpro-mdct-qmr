import { CoreSetAbbr } from "types";

const optionalStratificationByCoreSet: Partial<Record<CoreSetAbbr, string>> = {
  [CoreSetAbbr.CCSM]:
    "States are encouraged, but not required, to report stratified data for foster care.",
  [CoreSetAbbr.ACSM]:
    "States are encouraged, but not required, to report stratified data for Medicaid expansion.",
  [CoreSetAbbr.HHCS]:
    "States are encouraged, but not required, to report stratified data for foster care and Medicaid expansion.",
};

export const getStratificationBannerDescription = (
  year: string,
  coreSet: CoreSetAbbr,
  hasTailoredStratificationBanner: boolean
): string => {
  const base = `For ${year} Core Sets reporting, states are expected to report stratified data for this measure`;

  if (!hasTailoredStratificationBanner) {
    return `${base}.`;
  }

  return [
    `${base} for each of the following required stratification standards: race and ethnicity, sex, and geography.`,
    optionalStratificationByCoreSet[coreSet],
  ]
    .filter(Boolean)
    .join(" ");
};
