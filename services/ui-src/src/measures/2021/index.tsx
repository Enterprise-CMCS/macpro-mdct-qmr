import { lazy } from "react";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2021/qualifierFormsData";
import { measureTemplate } from "./measureTemplate";
/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

const AIFHH = lazy(() =>
  import("./AIFHH").then((module) => ({ default: module.AIFHH }))
);
const AMBHH = lazy(() =>
  import("./AMBHH").then((module) => ({ default: module.AMBHH }))
);
const AMMAD = lazy(() =>
  import("./AMMAD").then((module) => ({ default: module.AMMAD }))
);
const AMRAD = lazy(() =>
  import("./AMRAD").then((module) => ({ default: module.AMRAD }))
);
const BCSAD = lazy(() =>
  import("./BCSAD").then((module) => ({ default: module.BCSAD }))
);
const CBPAD = lazy(() =>
  import("./CBPAD").then((module) => ({ default: module.CBPAD }))
);
const CBPHH = lazy(() =>
  import("./CBPHH").then((module) => ({ default: module.CBPHH }))
);
const CCPAD = lazy(() =>
  import("./CCPAD").then((module) => ({ default: module.CCPAD }))
);
const CCSAD = lazy(() =>
  import("./CCSAD").then((module) => ({ default: module.CCSAD }))
);
const CCWAD = lazy(() =>
  import("./CCWAD").then((module) => ({ default: module.CCWAD }))
);
const CDFAD = lazy(() =>
  import("./CDFAD").then((module) => ({ default: module.CDFAD }))
);
const CDFHH = lazy(() =>
  import("./CDFHH").then((module) => ({ default: module.CDFHH }))
);
const CHLAD = lazy(() =>
  import("./CHLAD").then((module) => ({ default: module.CHLAD }))
);
const COBAD = lazy(() =>
  import("./COBAD").then((module) => ({ default: module.COBAD }))
);
const CPAAD = lazy(() =>
  import("./CPAAD").then((module) => ({ default: module.CPAAD }))
);
const CPCCH = lazy(() =>
  import("./CPCCH").then((module) => ({ default: module.CPCCH }))
);
const FUAAD = lazy(() =>
  import("./FUAAD").then((module) => ({ default: module.FUAAD }))
);
const FUAHH = lazy(() =>
  import("./FUAHH").then((module) => ({ default: module.FUAHH }))
);
const FUHHH = lazy(() =>
  import("./FUHHH").then((module) => ({ default: module.FUHHH }))
);
const FUMAD = lazy(() =>
  import("./FUMAD").then((module) => ({ default: module.FUMAD }))
);
const FVAAD = lazy(() =>
  import("./FVAAD").then((module) => ({ default: module.FVAAD }))
);
const HVLAD = lazy(() =>
  import("./HVLAD").then((module) => ({ default: module.HVLAD }))
);
const HPCAD = lazy(() =>
  import("./HPCAD").then((module) => ({ default: module.HPCAD }))
);
const HPCMIAD = lazy(() =>
  import("./HPCMIAD").then((module) => ({ default: module.HPCMIAD }))
);
const IETAD = lazy(() =>
  import("./IETAD").then((module) => ({ default: module.IETAD }))
);
const IETHH = lazy(() =>
  import("./IETHH").then((module) => ({ default: module.IETHH }))
);
const IUHH = lazy(() =>
  import("./IUHH").then((module) => ({ default: module.IUHH }))
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
const OHDAD = lazy(() =>
  import("./OHDAD").then((module) => ({ default: module.OHDAD }))
);
const OUDAD = lazy(() =>
  import("./OUDAD").then((module) => ({ default: module.OUDAD }))
);
const PC01AD = lazy(() =>
  import("./PC01AD").then((module) => ({ default: module.PC01AD }))
);
const PCRAD = lazy(() =>
  import("./PCRAD").then((module) => ({ default: module.PCRAD }))
);
const PCRHH = lazy(() =>
  import("./PCRHH").then((module) => ({ default: module.PCRHH }))
);
const PDENTCH = lazy(() =>
  import("./PDENTCH").then((module) => ({ default: module.PDENTCH }))
);
const PPCAD = lazy(() =>
  import("./PPCAD").then((module) => ({ default: module.PPCAD }))
);
const PQI01AD = lazy(() =>
  import("./PQI01AD").then((module) => ({ default: module.PQI01AD }))
);
const PQI05AD = lazy(() =>
  import("./PQI05AD").then((module) => ({ default: module.PQI05AD }))
);
const FUHAD = lazy(() =>
  import("./FUHAD").then((module) => ({ default: module.FUHAD }))
);
const PQI08AD = lazy(() =>
  import("./PQI08AD").then((module) => ({ default: module.PQI08AD }))
);
const PQI15AD = lazy(() =>
  import("./PQI15AD").then((module) => ({ default: module.PQI15AD }))
);
const PQI92HH = lazy(() =>
  import("./PQI92HH").then((module) => ({ default: module.PQI92HH }))
);
const SAAAD = lazy(() =>
  import("./SAAAD").then((module) => ({ default: module.SAAAD }))
);
const SSDAD = lazy(() =>
  import("./SSDAD").then((module) => ({ default: module.SSDAD }))
);
const SSHH = lazy(() =>
  import("./SSHH").then((module) => ({ default: module.SSHH }))
);
const OUDHH = lazy(() =>
  import("./OUDHH").then((module) => ({ default: module.OUDHH }))
);
const twentyTwentyOneMeasures = {
  "ADD-CH": measureTemplate,
  "AIF-HH": AIFHH,
  "AMB-CH": measureTemplate,
  "AMB-HH": AMBHH,
  "AMM-AD": AMMAD,
  "AMR-AD": AMRAD,
  "AMR-CH": measureTemplate,
  "APM-CH": measureTemplate,
  "APP-CH": measureTemplate,
  "AUD-CH": measureTemplate,
  "BCS-AD": BCSAD,
  "CBP-AD": CBPAD,
  "CBP-HH": CBPHH,
  "CCP-AD": CCPAD,
  "CCP-CH": measureTemplate,
  "CCS-AD": CCSAD,
  "CCW-AD": CCWAD,
  "CCW-CH": measureTemplate,
  "CDF-AD": CDFAD,
  "CDF-CH": measureTemplate,
  "CDF-HH": CDFHH,
  "CHL-AD": CHLAD,
  "CHL-CH": measureTemplate,
  "CIS-CH": measureTemplate,
  "COB-AD": COBAD,
  "CPA-AD": CPAAD,
  "CPC-CH": CPCCH,
  "DEV-CH": measureTemplate,
  "FUA-AD": FUAAD,
  "FUA-HH": FUAHH,
  "FUH-AD": FUHAD,
  "FUH-CH": measureTemplate,
  "FUH-HH": FUHHH,
  "FUM-AD": FUMAD,
  "FVA-AD": FVAAD,
  "HVL-AD": HVLAD,
  "HPC-AD": HPCAD,
  "HPCMI-AD": HPCMIAD,
  "IET-AD": IETAD,
  "IET-HH": IETHH,
  "IMA-CH": measureTemplate,
  "IU-HH": IUHH,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "MSC-AD": MSCAD,
  "NCIDDS-AD": NCIDDSAD,
  "OHD-AD": OHDAD,
  "OUD-AD": OUDAD,
  "OUD-HH": OUDHH,
  "PC01-AD": PC01AD,
  "PCR-AD": PCRAD,
  "PCR-HH": PCRHH,
  "PDENT-CH": PDENTCH,
  "PPC-AD": PPCAD,
  "PPC-CH": measureTemplate,
  "PQI01-AD": PQI01AD,
  "PQI05-AD": PQI05AD,
  "PQI08-AD": PQI08AD,
  "PQI15-AD": PQI15AD,
  "PQI92-HH": PQI92HH,
  "SAA-AD": SAAAD,
  "SFM-CH": measureTemplate,
  "SS-1-HH": SSHH,
  "SS-2-HH": SSHH,
  "SS-3-HH": SSHH,
  "SS-4-HH": SSHH,
  "SS-5-HH": SSHH,
  "SSD-AD": SSDAD,
  "W30-CH": measureTemplate,
  "WCC-CH": measureTemplate,
  "WCV-CH": measureTemplate,
  Qualifier,
};
export default twentyTwentyOneMeasures;
export const QualifierData = Data;
