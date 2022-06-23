/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/
import { AABAD } from "./AABAD";
import { ADDCH } from "./ADDCH";
import { AMBCH } from "./AMBCH";
import { AMMAD } from "./AMMAD";
import { AMRAD } from "./AMRAD";
import { AMRCH } from "./AMRCH";
import { APMCH } from "./APMCH";
import { APPCH } from "./APPCH";
import { BCSAD } from "./BCSAD";
import { CBPAD } from "./CBPAD";
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
import { FUHCH } from "./FUHCH";
import { FUMAD } from "./FUMAD";
import { FUMCH } from "./FUMCH";
import { FVAAD } from "./FVAAD";
import { HVLAD } from "./HVLAD";
import { HPCAD } from "./HPCAD";
import { HPCMIAD } from "./HPCMIAD";
import { IETAD } from "./IETAD";
import { IMACH } from "./IMACH";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { MSCAD } from "./MSCAD";
import { NCIDDSAD } from "./NCIDDSAD";
import { OEVCH } from "./OEVCH";
import { OHDAD } from "./OHDAD";
import { OUDAD } from "./OUDAD";
import { PCRAD } from "./PCRAD";
import { PPCAD } from "./PPCAD";
import { PPCCH } from "./PPCCH";
import { PQI01AD } from "./PQI01AD";
import { PQI05AD } from "./PQI05AD";
import { FUHAD } from "./FUHAD";
import { PQI08AD } from "./PQI08AD";
import { PQI15AD } from "./PQI15AD";
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
  "AMB-CH": AMBCH,
  "AMM-AD": AMMAD,
  "AMR-AD": AMRAD,
  "AMR-CH": AMRCH,
  "APM-CH": APMCH,
  "APP-CH": APPCH,
  "BCS-AD": BCSAD,
  "CBP-AD": CBPAD,
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
  "FUH-AD": FUHAD,
  "FUH-CH": FUHCH,
  "FUM-AD": FUMAD,
  "FUM-CH": FUMCH,
  "FVA-AD": FVAAD,
  "HVL-AD": HVLAD,
  "HPC-AD": HPCAD,
  "HPCMI-AD": HPCMIAD,
  "IET-AD": IETAD,
  "IMA-CH": IMACH,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "MSC-AD": MSCAD,
  "NCIDDS-AD": NCIDDSAD,
  "OEV-CH": OEVCH,
  "OHD-AD": OHDAD,
  "OUD-AD": OUDAD,
  "PCR-AD": PCRAD,
  "PPC-AD": PPCAD,
  "PPC-CH": PPCCH,
  "PQI01-AD": PQI01AD,
  "PQI05-AD": PQI05AD,
  "PQI08-AD": PQI08AD,
  "PQI15-AD": PQI15AD,
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
