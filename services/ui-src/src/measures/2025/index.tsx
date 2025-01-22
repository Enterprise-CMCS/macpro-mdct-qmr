import { lazy } from "react";
import { measureTemplate } from "./measureTemplate";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2025/qualifierFormsData";

const AIFHH = lazy(() =>
  import("./AIFHH").then((module) => ({ default: module.AIFHH }))
);
const AMRAD = lazy(() =>
  import("./AMRAD").then((module) => ({ default: module.AMRAD }))
);
const CPAAD = lazy(() =>
  import("./CPAAD").then((module) => ({ default: module.CPAAD }))
);
const CPCCH = lazy(() =>
  import("./CPCCH").then((module) => ({ default: module.CPCCH }))
);
const CPUAD = lazy(() =>
  import("./CPUAD").then((module) => ({ default: module.CPUAD }))
);
const LBWCH = lazy(() =>
  import("./LBWCH").then((module) => ({ default: module.LBWCH }))
);
const LRCDAD = lazy(() =>
  import("./LRCDAD").then((module) => ({ default: module.LRCDAD }))
);
const LRCDCH = lazy(() =>
  import("./LRCDCH").then((module) => ({ default: module.LRCDCH }))
);
const MSCAD = lazy(() =>
  import("./MSCAD").then((module) => ({ default: module.MSCAD }))
);
const NCIIDDAD = lazy(() =>
  import("./NCIIDDAD").then((module) => ({ default: module.NCIIDDAD }))
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
const twentyTwentyFiveMeasures = {
  "AAB-AD": measureTemplate,
  "AAB-CH": measureTemplate,
  "ADD-CH": measureTemplate,
  "AIF-HH": AIFHH,
  // "AIS-AD": measureTemplate, //TO DO: replace with real measure
  "AMM-AD": measureTemplate,
  "AMR-AD": AMRAD,
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
  "HBD-AD": measureTemplate,
  "HPCMI-AD": measureTemplate,
  "HVL-AD": measureTemplate,
  "IET-AD": measureTemplate,
  "IET-HH": measureTemplate,
  "IMA-CH": measureTemplate,
  "IU-HH": measureTemplate,
  "LBW-CH": LBWCH,
  "LRCD-AD": LRCDAD,
  "LRCD-CH": LRCDCH,
  "LSC-CH": measureTemplate,
  "MSC-AD": MSCAD,
  "NCIIDD-AD": NCIIDDAD,
  "OEV-CH": measureTemplate,
  "OEVP-AD": measureTemplate,
  "OEVP-CH": measureTemplate,
  "OHD-AD": measureTemplate,
  "OUD-AD": measureTemplate,
  "OUD-HH": measureTemplate,
  "PCR-AD": PCRAD,
  "PCR-HH": PCRHH,
  // "PDS-AD": measureTemplate, //TO DO: replace with real measure
  // "PDS-CH": measureTemplate, //TO DO: replace with real measure
  "PPC2-AD": measureTemplate,
  "PPC2-CH": measureTemplate,
  "PQI01-AD": measureTemplate,
  "PQI05-AD": measureTemplate,
  "PQI08-AD": measureTemplate,
  "PQI15-AD": measureTemplate,
  // "PRS-AD": measureTemplate, //TO DO: replace with real measure
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
export default twentyTwentyFiveMeasures;
