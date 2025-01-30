import { lazy } from "react";
import { measureTemplate } from "./measureTemplate";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2022/qualifierFormsData";

const AMRAD = lazy(() =>
  import("./AMRAD").then((module) => ({ default: module.AMRAD }))
);
const CPAAD = lazy(() =>
  import("./CPAAD").then((module) => ({ default: module.CPAAD }))
);
const CPCCH = lazy(() =>
  import("./CPCCH").then((module) => ({ default: module.CPCCH }))
);
const LBWCH = lazy(() =>
  import("./LBWCH").then((module) => ({ default: module.LBWCH }))
);
const LRCDCH = lazy(() =>
  import("./LRCDCH").then((module) => ({ default: module.LRCDCH }))
);
const MSCAD = lazy(() =>
  import("./MSCAD").then((module) => ({ default: module.MSCAD }))
);
const NCIDDSAD = lazy(() =>
  import("./NCIDDSAD").then((module) => ({ default: module.NCIDDSAD }))
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
const twentyTwentyTwoMeasures = {
  "AAB-AD": measureTemplate,
  "ADD-CH": measureTemplate,
  "AIF-HH": measureTemplate,
  "AMB-CH": measureTemplate,
  "AMB-HH": measureTemplate,
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
  "DEV-CH": measureTemplate,
  "FUA-AD": measureTemplate,
  "FUA-CH": measureTemplate,
  "FUA-HH": measureTemplate,
  "FUH-AD": measureTemplate,
  "FUH-CH": measureTemplate,
  "FUH-HH": measureTemplate,
  "FUM-AD": measureTemplate,
  "FUM-CH": measureTemplate,
  "FUM-HH": measureTemplate,
  "FVA-AD": measureTemplate,
  "HPC-AD": measureTemplate,
  "HPCMI-AD": measureTemplate,
  "HVL-AD": measureTemplate,
  "IET-AD": measureTemplate,
  "IET-HH": measureTemplate,
  "IMA-CH": measureTemplate,
  "IU-HH": measureTemplate,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "MSC-AD": MSCAD,
  "NCIDDS-AD": NCIDDSAD,
  "OEV-CH": measureTemplate,
  "OHD-AD": measureTemplate,
  "OUD-AD": measureTemplate,
  "OUD-HH": measureTemplate,
  "PCR-AD": PCRAD,
  "PCR-HH": PCRHH,
  "PPC-AD": measureTemplate,
  "PPC-CH": measureTemplate,
  "PQI01-AD": measureTemplate,
  "PQI05-AD": measureTemplate,
  "PQI08-AD": measureTemplate,
  "PQI15-AD": measureTemplate,
  "PQI92-HH": measureTemplate,
  "SAA-AD": measureTemplate,
  "SFM-CH": measureTemplate,
  "SS-1-HH": SSHH,
  "SS-2-HH": SSHH,
  "SS-3-HH": SSHH,
  "SS-4-HH": SSHH,
  "SS-5-HH": SSHH,
  "SSD-AD": measureTemplate,
  "TFL-CH": measureTemplate,
  "W30-CH": measureTemplate,
  "WCC-CH": measureTemplate,
  "WCV-CH": measureTemplate,
  Qualifier,
};

export const QualifierData = Data;
export default twentyTwentyTwoMeasures;
