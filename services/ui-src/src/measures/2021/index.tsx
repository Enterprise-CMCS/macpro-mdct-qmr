import { lazy } from "react";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2021/qualifierFormsData";
/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

const ADDCH = lazy(() =>
  import("./ADDCH").then((module) => ({ default: module.ADDCH }))
);
const AIFHH = lazy(() =>
  import("./AIFHH").then((module) => ({ default: module.AIFHH }))
);
const AMBCH = lazy(() =>
  import("./AMBCH").then((module) => ({ default: module.AMBCH }))
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
const AMRCH = lazy(() =>
  import("./AMRCH").then((module) => ({ default: module.AMRCH }))
);
const APMCH = lazy(() =>
  import("./APMCH").then((module) => ({ default: module.APMCH }))
);
const APPCH = lazy(() =>
  import("./APPCH").then((module) => ({ default: module.APPCH }))
);
const AUDCH = lazy(() =>
  import("./AUDCH").then((module) => ({ default: module.AUDCH }))
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
const CCPCH = lazy(() =>
  import("./CCPCH").then((module) => ({ default: module.CCPCH }))
);
const CCSAD = lazy(() =>
  import("./CCSAD").then((module) => ({ default: module.CCSAD }))
);
const CCWAD = lazy(() =>
  import("./CCWAD").then((module) => ({ default: module.CCWAD }))
);
const CCWCH = lazy(() =>
  import("./CCWCH").then((module) => ({ default: module.CCWCH }))
);
const CDFAD = lazy(() =>
  import("./CDFAD").then((module) => ({ default: module.CDFAD }))
);
const CDFCH = lazy(() =>
  import("./CDFCH").then((module) => ({ default: module.CDFCH }))
);
const CDFHH = lazy(() =>
  import("./CDFHH").then((module) => ({ default: module.CDFHH }))
);
const CHLAD = lazy(() =>
  import("./CHLAD").then((module) => ({ default: module.CHLAD }))
);
const CHLCH = lazy(() =>
  import("./CHLCH").then((module) => ({ default: module.CHLCH }))
);
const CISCH = lazy(() =>
  import("./CISCH").then((module) => ({ default: module.CISCH }))
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
const DEVCH = lazy(() =>
  import("./DEVCH").then((module) => ({ default: module.DEVCH }))
);
const FUAAD = lazy(() =>
  import("./FUAAD").then((module) => ({ default: module.FUAAD }))
);
const FUAHH = lazy(() =>
  import("./FUAHH").then((module) => ({ default: module.FUAHH }))
);
const FUHCH = lazy(() =>
  import("./FUHCH").then((module) => ({ default: module.FUHCH }))
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
const IMACH = lazy(() =>
  import("./IMACH").then((module) => ({ default: module.IMACH }))
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
const PPCCH = lazy(() =>
  import("./PPCCH").then((module) => ({ default: module.PPCCH }))
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
const SFMCH = lazy(() =>
  import("./SFMCH").then((module) => ({ default: module.SFMCH }))
);
const SSDAD = lazy(() =>
  import("./SSDAD").then((module) => ({ default: module.SSDAD }))
);
const SSHH = lazy(() =>
  import("./SSHH").then((module) => ({ default: module.SSHH }))
);
const W30CH = lazy(() =>
  import("./W30CH").then((module) => ({ default: module.W30CH }))
);
const WCCCH = lazy(() =>
  import("./WCCCH").then((module) => ({ default: module.WCCCH }))
);
const WCVCH = lazy(() =>
  import("./WCVCH").then((module) => ({ default: module.WCVCH }))
);
const OUDHH = lazy(() =>
  import("./OUDHH").then((module) => ({ default: module.OUDHH }))
);
const twentyTwentyOneMeasures = {
  "ADD-CH": ADDCH,
  "AIF-HH": AIFHH,
  "AMB-CH": AMBCH,
  "AMB-HH": AMBHH,
  "AMM-AD": AMMAD,
  "AMR-AD": AMRAD,
  "AMR-CH": AMRCH,
  "APM-CH": APMCH,
  "APP-CH": APPCH,
  "AUD-CH": AUDCH,
  "BCS-AD": BCSAD,
  "CBP-AD": CBPAD,
  "CBP-HH": CBPHH,
  "CCP-AD": CCPAD,
  "CCP-CH": CCPCH,
  "CCS-AD": CCSAD,
  "CCW-AD": CCWAD,
  "CCW-CH": CCWCH,
  "CDF-AD": CDFAD,
  "CDF-CH": CDFCH,
  "CDF-HH": CDFHH,
  "CHL-AD": CHLAD,
  "CHL-CH": CHLCH,
  "CIS-CH": CISCH,
  "COB-AD": COBAD,
  "CPA-AD": CPAAD,
  "CPC-CH": CPCCH,
  "DEV-CH": DEVCH,
  "FUA-AD": FUAAD,
  "FUA-HH": FUAHH,
  "FUH-AD": FUHAD,
  "FUH-CH": FUHCH,
  "FUH-HH": FUHHH,
  "FUM-AD": FUMAD,
  "FVA-AD": FVAAD,
  "HVL-AD": HVLAD,
  "HPC-AD": HPCAD,
  "HPCMI-AD": HPCMIAD,
  "IET-AD": IETAD,
  "IET-HH": IETHH,
  "IMA-CH": IMACH,
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
  "PPC-CH": PPCCH,
  "PQI01-AD": PQI01AD,
  "PQI05-AD": PQI05AD,
  "PQI08-AD": PQI08AD,
  "PQI15-AD": PQI15AD,
  "PQI92-HH": PQI92HH,
  "SAA-AD": SAAAD,
  "SFM-CH": SFMCH,
  "SS-1-HH": SSHH,
  "SS-2-HH": SSHH,
  "SS-3-HH": SSHH,
  "SS-4-HH": SSHH,
  "SS-5-HH": SSHH,
  "SSD-AD": SSDAD,
  "W30-CH": W30CH,
  "WCC-CH": WCCCH,
  "WCV-CH": WCVCH,
  Qualifier,
};
export default twentyTwentyOneMeasures;
export const QualifierData = Data;
