/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/
import { AABAD } from "./AABAD";
import { ADDCH } from "./ADDCH";
import { AIFHH } from "./AIFHH";
import { AMBCH } from "./AMBCH";
import { AMBHH } from "./AMBHH";
import { AMMAD } from "./AMMAD";
import { AMRAD } from "./AMRAD";
import { AMRCH } from "./AMRCH";
import { APMCH } from "./APMCH";
import { APPCH } from "./APPCH";
import { BCSAD } from "./BCSAD";
import { CBPAD } from "./CBPAD";
import { CBPHH } from "./CBPHH";
import { CCPAD } from "./CCPAD";
import { CCPCH } from "./CCPCH";
import { CCSAD } from "./CCSAD";
import { CCWAD } from "./CCWAD";
import { CCWCH } from "./CCWCH";
import { CDFAD } from "./CDFAD";
import { CDFCH } from "./CDFCH";
import { CDFHH } from "./CDFHH";
import { CHLAD } from "./CHLAD";
import { CHLCH } from "./CHLCH";
import { CISCH } from "./CISCH";
import { COBAD } from "./COBAD";
import { COLHH } from "./COLHH";
import { COLAD } from "./COLAD";
import { CPAAD } from "./CPAAD";
import { CPCCH } from "./CPCCH";
import { DEVCH } from "./DEVCH";
import { FUAAD } from "./FUAAD";
import { FUACH } from "./FUACH";
import { FUAHH } from "./FUAHH";
import { FUHAD } from "./FUHAD";
import { FUHCH } from "./FUHCH";
import { FUHHH } from "./FUHHH";
import { FUMAD } from "./FUMAD";
import { FUMCH } from "./FUMCH";
import { FUMHH } from "./FUMHH";
import { FVAAD } from "./FVAAD";
import { HPCAD } from "./HPCAD";
import { HPCMIAD } from "./HPCMIAD";
import { HVLAD } from "./HVLAD";
import { IETAD } from "./IETAD";
import { IETHH } from "./IETHH";
import { IMACH } from "./IMACH";
import { IUHH } from "./IUHH";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { MSCAD } from "./MSCAD";
import { NCIDDSAD } from "./NCIDDSAD";
import { OEVCH } from "./OEVCH";
import { OHDAD } from "./OHDAD";
import { OUDAD } from "./OUDAD";
import { OUDHH } from "./OUDHH";
import { PCRAD } from "./PCRAD";
import { PCRHH } from "./PCRHH";
import { PPCAD } from "./PPCAD";
import { PPCCH } from "./PPCCH";
import { PQI01AD } from "./PQI01AD";
import { PQI05AD } from "./PQI05AD";
import { PQI08AD } from "./PQI08AD";
import { PQI15AD } from "./PQI15AD";
import { PQI92HH } from "./PQI92HH";
import { SAAAD } from "./SAAAD";
import { SFMCH } from "./SFMCH";
import { SSDAD } from "./SSDAD";
import { TFLCH } from "./TFLCH";
import { W30CH } from "./W30CH";
import { WCCCH } from "./WCCCH";
import { WCVCH } from "./WCVCH";

import { Data, Qualifier } from "./Qualifiers";

const twentyTwentyTwoMeasures = {
  "AAB-AD": AABAD,
  "ADD-CH": ADDCH,
  "AIF-HH": AIFHH,
  "AMB-CH": AMBCH,
  "AMB-HH": AMBHH,
  "AMM-AD": AMMAD,
  "AMR-AD": AMRAD,
  "AMR-CH": AMRCH,
  "APM-CH": APMCH,
  "APP-CH": APPCH,
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
  "COL-AD": COLAD,
  "COL-HH": COLHH,
  "CPA-AD": CPAAD,
  "CPC-CH": CPCCH,
  "DEV-CH": DEVCH,
  "FUA-AD": FUAAD,
  "FUA-CH": FUACH,
  "FUA-HH": FUAHH,
  "FUH-AD": FUHAD,
  "FUH-CH": FUHCH,
  "FUH-HH": FUHHH,
  "FUM-AD": FUMAD,
  "FUM-CH": FUMCH,
  "FUM-HH": FUMHH,
  "FVA-AD": FVAAD,
  "HPC-AD": HPCAD,
  "HPCMI-AD": HPCMIAD,
  "HVL-AD": HVLAD,
  "IET-AD": IETAD,
  "IET-HH": IETHH,
  "IMA-CH": IMACH,
  "IU-HH": IUHH,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "MSC-AD": MSCAD,
  "NCIDDS-AD": NCIDDSAD,
  "OEV-CH": OEVCH,
  "OHD-AD": OHDAD,
  "OUD-AD": OUDAD,
  "OUD-HH": OUDHH,
  "PCR-AD": PCRAD,
  "PCR-HH": PCRHH,
  "PPC-AD": PPCAD,
  "PPC-CH": PPCCH,
  "PQI01-AD": PQI01AD,
  "PQI05-AD": PQI05AD,
  "PQI08-AD": PQI08AD,
  "PQI15-AD": PQI15AD,
  "PQI92-HH": PQI92HH,
  "SAA-AD": SAAAD,
  "SFM-CH": SFMCH,
  "SSD-AD": SSDAD,
  "TFL-CH": TFLCH,
  "W30-CH": W30CH,
  "WCC-CH": WCCCH,
  "WCV-CH": WCVCH,
  Qualifier,
};

export const QualifierData = Data;
export default twentyTwentyTwoMeasures;
