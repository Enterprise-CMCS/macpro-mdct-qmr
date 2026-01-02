import { validationFunctions } from "./validationTemplate";

import { data as AABAD_Data } from "./AABAD/data";
import { data as AABCH_Data } from "./AABCH/data";
import { data as ADDCH_Data } from "./ADDCH/data";
import { data as AIFHH_Data } from "./AIFHH/data";
import { data as AMBCH_Data } from "./AMBCH/data";
import { data as AMBHH_Data } from "./AMBHH/data";
import { data as AMMAD_Data } from "./AMMAD/data";
import { data as AMRAD_Data } from "./AMRAD/data";
import { data as AMRCH_Data } from "./AMRCH/data";
import { data as APMCH_Data } from "./APMCH/data";
import { data as APPCH_Data } from "./APPCH/data";
import { data as BCSAD_Data } from "./BCSAD/data";
import { data as CBPAD_Data } from "./CBPAD/data";
import { data as CBPHH_Data } from "./CBPHH/data";
import { data as CCPAD_Data } from "./CCPAD/data";
import { data as CCPCH_Data } from "./CCPCH/data";
import { data as CCSAD_Data } from "./CCSAD/data";
import { data as CCWAD_Data } from "./CCWAD/data";
import { data as CCWCH_Data } from "./CCWCH/data";
import { data as CDFAD_Data } from "./CDFAD/data";
import { data as CDFCH_Data } from "./CDFCH/data";
import { data as CDFHH_Data } from "./CDFHH/data";
import { data as CHLAD_Data } from "./CHLAD/data";
import { data as CHLCH_Data } from "./CHLCH/data";
import { data as CISCH_Data } from "./CISCH/data";
import { data as COBAD_Data } from "./COBAD/data";
import { data as COLAD_Data } from "./COLAD/data";
import { data as COLHH_Data } from "./COLHH/data";
import { data as DEVCH_Data } from "./DEVCH/data";
import { data as FUAAD_Data } from "./FUAAD/data";
import { data as FUACH_Data } from "./FUACH/data";
import { data as FUAHH_Data } from "./FUAHH/data";
import { data as FUHAD_Data } from "./FUHAD/data";
import { data as FUHCH_Data } from "./FUHCH/data";
import { data as FUHHH_Data } from "./FUHHH/data";
import { data as FUMAD_Data } from "./FUMAD/data";
import { data as FUMCH_Data } from "./FUMCH/data";
import { data as FUMHH_Data } from "./FUMHH/data";
import { data as HBDAD_Data } from "./HBDAD/data";
import { data as HPCMIAD_Data } from "./HPCMIAD/data";
import { data as HVLAD_Data } from "./HVLAD/data";
import { data as IETAD_Data } from "./IETAD/data";
import { data as IETHH_Data } from "./IETHH/data";
import { data as IMACH_Data } from "./IMACH/data";
import { data as IUHH_Data } from "./IUHH/data";
import { data as LBWCH_Data } from "./LBWCH/data";
import { data as LRCDCH_Data } from "./LRCDCH/data";
import { data as NCIIDDAD_Data } from "./NCIIDDAD/data";
import { data as LSCCH_Data } from "./LSCCH/data";
import { data as OEVCH_Data } from "./OEVCH/data";
import { data as OHDAD_Data } from "./OHDAD/data";
import { data as OUDAD_Data } from "./OUDAD/data";
import { data as OUDHH_Data } from "./OUDHH/data";
import { data as PPC2AD_Data } from "./PPC2AD/data";
import { data as PPC2CH_Data } from "./PPC2CH/data";
import { data as PQI01AD_Data } from "./PQI01AD/data";
import { data as PQI05AD_Data } from "./PQI05AD/data";
import { data as PQI08AD_Data } from "./PQI08AD/data";
import { data as PQI15AD_Data } from "./PQI15AD/data";
import { data as PQI92HH_Data } from "./PQI92HH/data";
import { data as SAAAD_Data } from "./SAAAD/data";
import { data as SFMCH_Data } from "./SFMCH/data";
import { data as SSDAD_Data } from "./SSDAD/data";
import { data as TFLCH_Data } from "./TFLCH/data";
import { data as W30CH_Data } from "./W30CH/data";
import { data as WCCCH_Data } from "./WCCCH/data";
import { data as WCVCH_Data } from "./WCVCH/data";

export const measureTemplateData: { [measure: string]: any } = {
  "AAB-AD": { data: AABAD_Data, validationFunctions: validationFunctions },
  "AAB-CH": { data: AABCH_Data, validationFunctions: validationFunctions },
  "ADD-CH": { data: ADDCH_Data, validationFunctions: validationFunctions },
  "AIF-HH": { data: AIFHH_Data, validationFunctions: validationFunctions },
  "AMB-CH": { data: AMBCH_Data, validationFunctions: validationFunctions },
  "AMB-HH": { data: AMBHH_Data, validationFunctions: validationFunctions },
  "AMM-AD": { data: AMMAD_Data, validationFunctions: validationFunctions },
  "AMR-AD": { data: AMRAD_Data, validationFunctions: validationFunctions },
  "AMR-CH": { data: AMRCH_Data, validationFunctions: validationFunctions },
  "APM-CH": { data: APMCH_Data, validationFunctions: validationFunctions },
  "APP-CH": { data: APPCH_Data, validationFunctions: validationFunctions },
  "BCS-AD": { data: BCSAD_Data, validationFunctions: validationFunctions },
  "CBP-AD": { data: CBPAD_Data, validationFunctions: validationFunctions },
  "CBP-HH": { data: CBPHH_Data, validationFunctions: validationFunctions },
  "CCP-AD": { data: CCPAD_Data, validationFunctions: validationFunctions },
  "CCP-CH": { data: CCPCH_Data, validationFunctions: validationFunctions },
  "CCS-AD": { data: CCSAD_Data, validationFunctions: validationFunctions },
  "CCW-AD": { data: CCWAD_Data, validationFunctions: validationFunctions },
  "CCW-CH": { data: CCWCH_Data, validationFunctions: validationFunctions },
  "CDF-AD": { data: CDFAD_Data, validationFunctions: validationFunctions },
  "CDF-CH": { data: CDFCH_Data, validationFunctions: validationFunctions },
  "CDF-HH": { data: CDFHH_Data, validationFunctions: validationFunctions },
  "CHL-AD": { data: CHLAD_Data, validationFunctions: validationFunctions },
  "CHL-CH": { data: CHLCH_Data, validationFunctions: validationFunctions },
  "CIS-CH": { data: CISCH_Data, validationFunctions: validationFunctions },
  "COB-AD": { data: COBAD_Data, validationFunctions: validationFunctions },
  "COL-AD": { data: COLAD_Data, validationFunctions: validationFunctions },
  "COL-HH": { data: COLHH_Data, validationFunctions: validationFunctions },
  "DEV-CH": { data: DEVCH_Data, validationFunctions: validationFunctions },
  "FUA-AD": { data: FUAAD_Data, validationFunctions: validationFunctions },
  "FUA-CH": { data: FUACH_Data, validationFunctions: validationFunctions },
  "FUA-HH": { data: FUAHH_Data, validationFunctions: validationFunctions },
  "FUH-AD": { data: FUHAD_Data, validationFunctions: validationFunctions },
  "FUH-CH": { data: FUHCH_Data, validationFunctions: validationFunctions },
  "FUH-HH": { data: FUHHH_Data, validationFunctions: validationFunctions },
  "FUM-AD": { data: FUMAD_Data, validationFunctions: validationFunctions },
  "FUM-CH": { data: FUMCH_Data, validationFunctions: validationFunctions },
  "FUM-HH": { data: FUMHH_Data, validationFunctions: validationFunctions },
  "HBD-AD": { data: HBDAD_Data, validationFunctions: validationFunctions },
  "HPCMI-AD": { data: HPCMIAD_Data, validationFunctions: validationFunctions },
  "HVL-AD": { data: HVLAD_Data, validationFunctions: validationFunctions },
  "IET-AD": { data: IETAD_Data, validationFunctions: validationFunctions },
  "IET-HH": { data: IETHH_Data, validationFunctions: validationFunctions },
  "IMA-CH": { data: IMACH_Data, validationFunctions: validationFunctions },
  "IU-HH": { data: IUHH_Data, validationFunctions: validationFunctions },
  "LBW-CH": { data: LBWCH_Data, validationFunctions: validationFunctions },
  "LRCD-CH": { data: LRCDCH_Data, validationFunctions: validationFunctions },
  "LSC-CH": { data: LSCCH_Data, validationFunctions: validationFunctions },
  "NCIIDD-AD": {
    data: NCIIDDAD_Data,
    validationFunctions: validationFunctions,
  },
  "OEV-CH": { data: OEVCH_Data, validationFunctions: validationFunctions },
  "OHD-AD": { data: OHDAD_Data, validationFunctions: validationFunctions },
  "OUD-AD": { data: OUDAD_Data, validationFunctions: validationFunctions },
  "OUD-HH": { data: OUDHH_Data, validationFunctions: validationFunctions },
  "PPC2-AD": { data: PPC2AD_Data, validationFunctions: validationFunctions },
  "PPC2-CH": { data: PPC2CH_Data, validationFunctions: validationFunctions },
  "PQI01-AD": { data: PQI01AD_Data, validationFunctions: validationFunctions },
  "PQI05-AD": { data: PQI05AD_Data, validationFunctions: validationFunctions },
  "PQI08-AD": { data: PQI08AD_Data, validationFunctions: validationFunctions },
  "PQI15-AD": { data: PQI15AD_Data, validationFunctions: validationFunctions },
  "PQI92-HH": { data: PQI92HH_Data, validationFunctions: validationFunctions },
  "SAA-AD": { data: SAAAD_Data, validationFunctions: validationFunctions },
  "SFM-CH": { data: SFMCH_Data, validationFunctions: validationFunctions },
  "SSD-AD": { data: SSDAD_Data, validationFunctions: validationFunctions },
  "TFL-CH": { data: TFLCH_Data, validationFunctions: validationFunctions },
  "W30-CH": { data: W30CH_Data, validationFunctions: validationFunctions },
  "WCC-CH": { data: WCCCH_Data, validationFunctions: validationFunctions },
  "WCV-CH": { data: WCVCH_Data, validationFunctions: validationFunctions },
};
