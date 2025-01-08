import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2021/qualifierFormsData";

import { data as ADDCH_Data } from "./ADDCH/data";
import { validationFunctions as ADDCH_Validations } from "./ADDCH/validation";

import { data as AMBCH_Data } from "./AMBCH/data";
import { validationFunctions as AMBCH_Validations } from "./AMBCH/validation";

import { data as AMRCH_Data } from "./AMRCH/data";
import { validationFunctions as AMRCH_Validations } from "./AMRCH/validation";

import { data as APMCH_Data } from "./APMCH/data";
import { validationFunctions as APMCH_Validations } from "./APMCH/validation";

import { data as APPCH_Data } from "./APPCH/data";
import { validationFunctions as APPCH_Validations } from "./APPCH/validation";

import { data as AUDCH_Data } from "./AUDCH/data";
import { validationFunctions as AUDCH_Validations } from "./AUDCH/validation";

import { data as CCPCH_Data } from "./CCPCH/data";
import { validationFunctions as CCPCH_Validations } from "./CCPCH/validation";

import { data as CCWCH_Data } from "./CCWCH/data";
import { validationFunctions as CCWCH_Validations } from "./CCWCH/validation";

import { data as CDFCH_Data } from "./CDFCH/data";
import { validationFunctions as CDFCH_Validations } from "./CDFCH/validation";

import { data as CHLCH_Data } from "./CHLCH/data";
import { validationFunctions as CHLCH_Validations } from "./CHLCH/validation";

import { data as CISCH_Data } from "./CISCH/data";
import { validationFunctions as CISCH_Validations } from "./CISCH/validation";

import { data as DEVCH_Data } from "./DEVCH/data";
import { validationFunctions as DEVCH_Validations } from "./DEVCH/validation";

import { data as FUHCH_Data } from "./FUHCH/data";
import { validationFunctions as FUHCH_Validations } from "./FUHCH/validation";

import { data as IMACH_Data } from "./IMACH/data";
import { validationFunctions as IMACH_Validations } from "./IMACH/validation";

import { data as PPCCH_Data } from "./PPCCH/data";
import { validationFunctions as PPCCH_Validations } from "./PPCCH/validation";

import { data as SFMCH_Data } from "./SFMCH/data";
import { validationFunctions as SFMCH_Validations } from "./SFMCH/validation";

import { data as W30CH_Data } from "./W30CH/data";
import { validationFunctions as W30CH_Validations } from "./W30CH/validation";

import { data as WCCCH_Data } from "./WCCCH/data";
import { validationFunctions as WCCCH_Validations } from "./WCCCH/validation";

import { data as WCVCH_Data } from "./WCVCH/data";
import { validationFunctions as WCVCH_Validations } from "./WCVCH/validation";

const measureImports = {
  "ADD-CH": { data: ADDCH_Data, validationFunctions: ADDCH_Validations },
  "AMB-CH": { data: AMBCH_Data, validationFunctions: AMBCH_Validations },
  "AMR-CH": { data: AMRCH_Data, validationFunctions: AMRCH_Validations },
  "APM-CH": { data: APMCH_Data, validationFunctions: APMCH_Validations },
  "APP-CH": { data: APPCH_Data, validationFunctions: APPCH_Validations },
  "AUD-CH": { data: AUDCH_Data, validationFunctions: AUDCH_Validations },
  "CCP-CH": { data: CCPCH_Data, validationFunctions: CCPCH_Validations },
  "CCW-CH": { data: CCWCH_Data, validationFunctions: CCWCH_Validations },
  "CDF-CH": { data: CDFCH_Data, validationFunctions: CDFCH_Validations },
  "CHL-CH": { data: CHLCH_Data, validationFunctions: CHLCH_Validations },
  "CIS-CH": { data: CISCH_Data, validationFunctions: CISCH_Validations },
  "DEV-CH": { data: DEVCH_Data, validationFunctions: DEVCH_Validations },
  "FUH-CH": { data: FUHCH_Data, validationFunctions: FUHCH_Validations },
  "IMA-CH": { data: IMACH_Data, validationFunctions: IMACH_Validations },
  "PPC-CH": { data: PPCCH_Data, validationFunctions: PPCCH_Validations },
  "SFM-CH": { data: SFMCH_Data, validationFunctions: SFMCH_Validations },
  "W30-CH": { data: W30CH_Data, validationFunctions: W30CH_Validations },
  "WCC-CH": { data: WCCCH_Data, validationFunctions: WCCCH_Validations },
  "WCV-CH": { data: WCVCH_Data, validationFunctions: WCVCH_Validations },
  Qualifier,
};
export default measureImports;
export const QualifierData = Data;
