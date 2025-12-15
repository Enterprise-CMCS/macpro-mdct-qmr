import { lazy } from "react";
import { measureTemplate } from "./measureTemplate";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2026/qualifierFormsData";
import { AutocompletedMeasureTemplate2 } from "components";

const CPAAD = lazy(() =>
  import("./CPAAD").then((module) => ({ default: module.CPAAD }))
);
const CPCCH = lazy(() =>
  import("./CPCCH").then((module) => ({ default: module.CPCCH }))
);
const CPUAD = lazy(() =>
  import("./CPUAD").then((module) => ({ default: module.CPUAD }))
);
const MSCAD = lazy(() =>
  import("./MSCAD").then((module) => ({ default: module.MSCAD }))
);
const PCRAD = lazy(() =>
  import("./PCRAD").then((module) => ({ default: module.PCRAD }))
);
const PCRHH = lazy(() =>
  import("./PCRHH").then((module) => ({ default: module.PCRHH }))
);
const SSHH = lazy(() =>
  import("./SSHH").then((module) => ({ default: module.SSHH }))
);
const twentyTwentySixMeasures = {
  "AAB-AD": measureTemplate,
  "AAB-CH": measureTemplate,
  "ADD-CH": measureTemplate,
  "AIF-HH": measureTemplate,
  "AIS-AD": measureTemplate,
  "AMM-AD": measureTemplate,
  "AMR-AD": measureTemplate,
  "AMR-CH": measureTemplate,
  "APM-CH": measureTemplate,
  "APP-CH": measureTemplate,
  "BCS-AD": measureTemplate,
  "CBP-AD": measureTemplate,
  "CBP-HH": measureTemplate,
  "CCP-AD": measureTemplate,
  "CCP-CH": measureTemplate,
  "CCS-AD": measureTemplate,
  "CCW-AD": measureTemplate,
  "CCW-CH": measureTemplate,
  "CDF-AD": measureTemplate,
  "CDF-CH": measureTemplate,
  "CDF-HH": measureTemplate,
  "CHL-AD": measureTemplate,
  "CHL-CH": measureTemplate,
  "CIS-CH": measureTemplate,
  "COB-AD": measureTemplate,
  "COL-AD": measureTemplate,
  "COL-HH": measureTemplate,
  "CPA-AD": CPAAD,
  "CPC-CH": CPCCH,
  "CPU-AD": CPUAD,
  "DEV-CH": measureTemplate,
  "EDV-AD": measureTemplate,
  "FUA-AD": measureTemplate,
  "FUA-CH": measureTemplate,
  "FUA-HH": measureTemplate,
  "FUH-AD": measureTemplate,
  "FUH-CH": measureTemplate,
  "FUH-HH": measureTemplate,
  "FUM-AD": measureTemplate,
  "FUM-CH": measureTemplate,
  "FUM-HH": measureTemplate,
  "GSD-AD": measureTemplate,
  "HPCMI-AD": measureTemplate,
  "HVL-AD": measureTemplate,
  "IET-AD": measureTemplate,
  "IET-HH": measureTemplate,
  "IMA-CH": measureTemplate,
  "IU-HH": measureTemplate,
  "LBW-CH": AutocompletedMeasureTemplate2,
  "LRCD-AD": AutocompletedMeasureTemplate2,
  "LRCD-CH": AutocompletedMeasureTemplate2,
  "LSC-CH": measureTemplate,
  "MSC-AD": MSCAD,
  "NCIIDD-AD": AutocompletedMeasureTemplate2,
  "OEV-CH": measureTemplate,
  "OEVP-AD": measureTemplate,
  "OEVP-CH": measureTemplate,
  "OHD-AD": measureTemplate,
  "OUD-AD": measureTemplate,
  "OUD-HH": measureTemplate,
  "PCR-AD": PCRAD,
  "PCR-HH": PCRHH,
  "PDS-AD": measureTemplate,
  "PDS-CH": measureTemplate,
  "PPC2-AD": measureTemplate,
  "PPC2-CH": measureTemplate,
  "PQI01-AD": measureTemplate,
  "PQI05-AD": measureTemplate,
  "PQI08-AD": measureTemplate,
  "PQI15-AD": measureTemplate,
  "PRS-AD": measureTemplate,
  "PRS-CH": measureTemplate,
  "SAA-AD": measureTemplate,
  "SFM-CH": measureTemplate,
  "SSD-AD": measureTemplate,
  "SS-1-HH": SSHH,
  "SS-2-HH": SSHH,
  "SS-3-HH": SSHH,
  "SS-4-HH": SSHH,
  "SS-5-HH": SSHH,
  "TFL-CH": measureTemplate,
  "W30-CH": measureTemplate,
  "WCC-CH": measureTemplate,
  "WCV-CH": measureTemplate,
  Qualifier,
};

export const QualifierData = Data;
export default twentyTwentySixMeasures;
