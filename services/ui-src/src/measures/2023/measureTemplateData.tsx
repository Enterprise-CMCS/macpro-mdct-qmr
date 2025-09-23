import { validationFunctions } from "./validationTemplate";

import { validationFunctions as DEVCH_Validations } from "./DEVCH/validation";
import { validationFunctions as IETAD_Validations } from "./IETAD/validation";
import { validationFunctions as IETHH_Validations } from "./IETHH/validation";
import { validationFunctions as IMACH_Validations } from "./IMACH/validation";
import { validationFunctions as IUHH_Validations } from "./IUHH/validation";
import { validationFunctions as LSCCH_Validations } from "./LSCCH/validation";
import { validationFunctions as OEVCH_Validations } from "./OEVCH/validation";
import { validationFunctions as OHDAD_Validations } from "./OHDAD/validation";
import { validationFunctions as OUDAD_Validations } from "./OUDAD/validation";
import { validationFunctions as OUDHH_Validations } from "./OUDHH/validation";
import { validationFunctions as PPCAD_Validations } from "./PPCAD/validation";
import { validationFunctions as PPCCH_Validations } from "./PPCCH/validation";
import { validationFunctions as PQI01AD_Validations } from "./PQI01AD/validation";
import { validationFunctions as PQI05AD_Validations } from "./PQI05AD/validation";
import { validationFunctions as PQI08AD_Validations } from "./PQI08AD/validation";
import { validationFunctions as PQI15AD_Validations } from "./PQI15AD/validation";
import { validationFunctions as PQI92HH_Validations } from "./PQI92HH/validation";
import { validationFunctions as SAAAD_Validations } from "./SAAAD/validation";
import { validationFunctions as SFMCH_Validations } from "./SFMCH/validation";
import { validationFunctions as SSDAD_Validations } from "./SSDAD/validation";
import { validationFunctions as TFLCH_Validations } from "./TFLCH/validation";
import { validationFunctions as W30CH_Validations } from "./W30CH/validation";
import { validationFunctions as WCCCH_Validations } from "./WCCCH/validation";
import { validationFunctions as WCVCH_Validations } from "./WCVCH/validation";

import { data as AABAD_Data } from "./AABAD/data";
import { data as AABCH_Data } from "./AABCH/data";
import { data as ADDCH_Data } from "./ADDCH/data";
import { data as AIFHH_Data } from "./AIFHH/data";
import { data as AMBCH_Data } from "./AMBCH/data";
import { data as AMBHH_Data } from "./AMBHH/data";
import { data as AMMAD_Data } from "./AMMAD/data";
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
import { data as CPUAD_Data } from "./CPUAD/data";
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
import { data as FVAAD_Data } from "./FVAAD/data";
import { data as HBDAD_Data } from "./HBDAD/data";
import { data as HPCMIAD_Data } from "./HPCMIAD/data";
import { data as HVLAD_Data } from "./HVLAD/data";
import { data as IETAD_Data } from "./IETAD/data";
import { data as IETHH_Data } from "./IETHH/data";
import { data as IMACH_Data } from "./IMACH/data";
import { data as IUHH_Data } from "./IUHH/data";
import { data as LSCCH_Data } from "./LSCCH/data";
import { data as OEVCH_Data } from "./OEVCH/data";
import { data as OHDAD_Data } from "./OHDAD/data";
import { data as OUDAD_Data } from "./OUDAD/data";
import { data as OUDHH_Data } from "./OUDHH/data";
import { data as PPCAD_Data } from "./PPCAD/data";
import { data as PPCCH_Data } from "./PPCCH/data";
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
  "CPU-AD": { data: CPUAD_Data, validationFunctions: validationFunctions },
  "DEV-CH": { data: DEVCH_Data, validationFunctions: DEVCH_Validations },
  "FUA-AD": { data: FUAAD_Data, validationFunctions: validationFunctions },
  "FUA-CH": { data: FUACH_Data, validationFunctions: validationFunctions },
  "FUA-HH": { data: FUAHH_Data, validationFunctions: validationFunctions },
  "FUH-AD": { data: FUHAD_Data, validationFunctions: validationFunctions },
  "FUH-CH": { data: FUHCH_Data, validationFunctions: validationFunctions },
  "FUH-HH": { data: FUHHH_Data, validationFunctions: validationFunctions },
  "FUM-AD": { data: FUMAD_Data, validationFunctions: validationFunctions },
  "FUM-CH": { data: FUMCH_Data, validationFunctions: validationFunctions },
  "FUM-HH": { data: FUMHH_Data, validationFunctions: validationFunctions },
  "FVA-AD": { data: FVAAD_Data, validationFunctions: validationFunctions },
  "HBD-AD": { data: HBDAD_Data, validationFunctions: validationFunctions },
  "HPCMI-AD": { data: HPCMIAD_Data, validationFunctions: validationFunctions },
  "HVL-AD": { data: HVLAD_Data, validationFunctions: validationFunctions },
  "IET-AD": { data: IETAD_Data, validationFunctions: IETAD_Validations },
  "IET-HH": { data: IETHH_Data, validationFunctions: IETHH_Validations },
  "IMA-CH": { data: IMACH_Data, validationFunctions: IMACH_Validations },
  "IU-HH": { data: IUHH_Data, validationFunctions: IUHH_Validations },
  "LSC-CH": { data: LSCCH_Data, validationFunctions: LSCCH_Validations },
  "OEV-CH": { data: OEVCH_Data, validationFunctions: OEVCH_Validations },
  "OHD-AD": { data: OHDAD_Data, validationFunctions: OHDAD_Validations },
  "OUD-AD": { data: OUDAD_Data, validationFunctions: OUDAD_Validations },
  "OUD-HH": { data: OUDHH_Data, validationFunctions: OUDHH_Validations },
  "PPC-AD": { data: PPCAD_Data, validationFunctions: PPCAD_Validations },
  "PPC-CH": { data: PPCCH_Data, validationFunctions: PPCCH_Validations },
  "PQI01-AD": { data: PQI01AD_Data, validationFunctions: PQI01AD_Validations },
  "PQI05-AD": { data: PQI05AD_Data, validationFunctions: PQI05AD_Validations },
  "PQI08-AD": { data: PQI08AD_Data, validationFunctions: PQI08AD_Validations },
  "PQI15-AD": { data: PQI15AD_Data, validationFunctions: PQI15AD_Validations },
  "PQI92-HH": { data: PQI92HH_Data, validationFunctions: PQI92HH_Validations },
  "SAA-AD": { data: SAAAD_Data, validationFunctions: SAAAD_Validations },
  "SFM-CH": { data: SFMCH_Data, validationFunctions: SFMCH_Validations },
  "SSD-AD": { data: SSDAD_Data, validationFunctions: SSDAD_Validations },
  "TFL-CH": { data: TFLCH_Data, validationFunctions: TFLCH_Validations },
  "W30-CH": { data: W30CH_Data, validationFunctions: W30CH_Validations },
  "WCC-CH": { data: WCCCH_Data, validationFunctions: WCCCH_Validations },
  "WCV-CH": { data: WCVCH_Data, validationFunctions: WCVCH_Validations },
};
