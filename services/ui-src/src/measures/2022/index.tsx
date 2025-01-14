import { lazy } from "react";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2022/qualifierFormsData";
import { measureTemplate } from "./measureTemplate";

const CPAAD = lazy(() =>
  import("./CPAAD").then((module) => ({ default: module.CPAAD }))
);
const LRCDCH = lazy(() =>
  import("./LRCDCH").then((module) => ({ default: module.LRCDCH }))
);
const PCRHH = lazy(() =>
  import("./PCRHH").then((module) => ({ default: module.PCRHH }))
);
const NCIDDSAD = lazy(() =>
  import("./NCIDDSAD").then((module) => ({ default: module.NCIDDSAD }))
);
const MSCAD = lazy(() =>
  import("./MSCAD").then((module) => ({ default: module.MSCAD }))
);
const IUHH = lazy(() =>
  import("./IUHH").then((module) => ({ default: module.IUHH }))
);
const PCRAD = lazy(() =>
  import("./PCRAD").then((module) => ({ default: module.PCRAD }))
);
const SSHH = lazy(() =>
  import("./SSHH").then((module) => ({ default: module.SSHH }))
);
const AMRAD = lazy(() =>
  import("./AMRAD").then((module) => ({ default: module.AMRAD }))
);
const LBWCH = lazy(() =>
  import("./LBWCH").then((module) => ({ default: module.LBWCH }))
);
const AIFHH = lazy(() =>
  import("./AIFHH").then((module) => ({ default: module.AIFHH }))
);
const CPCCH = lazy(() =>
  import("./CPCCH").then((module) => ({ default: module.CPCCH }))
);
const twentyTwentyTwoMeasures = {
  "AAB-AD": measureTemplate,
  "ADD-CH": measureTemplate,
  "AIF-HH": AIFHH,
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
  "IU-HH": IUHH,
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
  "SSD-AD": measureTemplate,
  "SS-HH": SSHH,
  "TFL-CH": measureTemplate,
  "W30-CH": measureTemplate,
  "WCC-CH": measureTemplate,
  "WCV-CH": measureTemplate,
  Qualifier,
};

export const QualifierData = Data;
export default twentyTwentyTwoMeasures;
