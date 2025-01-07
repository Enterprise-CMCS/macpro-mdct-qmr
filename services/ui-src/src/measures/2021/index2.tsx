import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2021/qualifierFormsData";

const ADDCH_Data = await import("./ADDCH/data").then((module) => module.data);
const ADDCH_Validations = await import("./ADDCH/validation").then(
  (module) => module.validationFunctions
);
const AMBCH_Data = await import("./AMBCH/data").then((module) => module.data);
const AMBCH_Validations = await import("./AMBCH/validation").then(
  (module) => module.validationFunctions
);
const AMRCH_Data = await import("./AMRCH/data").then((module) => module.data);
const AMRCH_Validations = await import("./AMRCH/validation").then(
  (module) => module.validationFunctions
);
const APMCH_Data = await import("./APMCH/data").then((module) => module.data);
const APMCH_Validations = await import("./APMCH/validation").then(
  (module) => module.validationFunctions
);
const APPCH_Data = await import("./APPCH/data").then((module) => module.data);
const APPCH_Validations = await import("./APPCH/validation").then(
  (module) => module.validationFunctions
);
const AUDCH_Data = await import("./AUDCH/data").then((module) => module.data);
const AUDCH_Validations = await import("./AUDCH/validation").then(
  (module) => module.validationFunctions
);
const CCPCH_Data = await import("./CCPCH/data").then((module) => module.data);
const CCPCH_Validations = await import("./CCPCH/validation").then(
  (module) => module.validationFunctions
);
const CCWCH_Data = await import("./CCWCH/data").then((module) => module.data);
const CCWCH_Validations = await import("./CCWCH/validation").then(
  (module) => module.validationFunctions
);
const CDFCH_Data = await import("./CDFCH/data").then((module) => module.data);
const CDFCH_Validations = await import("./CDFCH/validation").then(
  (module) => module.validationFunctions
);
const CHLCH_Data = await import("./CHLCH/data").then((module) => module.data);
const CHLCH_Validations = await import("./CHLCH/validation").then(
  (module) => module.validationFunctions
);
const CISCH_Data = await import("./CISCH/data").then((module) => module.data);
const CISCH_Validations = await import("./CISCH/validation").then(
  (module) => module.validationFunctions
);
const DEVCH_Data = await import("./DEVCH/data").then((module) => module.data);
const DEVCH_Validations = await import("./DEVCH/validation").then(
  (module) => module.validationFunctions
);
const FUHCH_Data = await import("./FUHCH/data").then((module) => module.data);
const FUHCH_Validations = await import("./FUHCH/validation").then(
  (module) => module.validationFunctions
);
const IMACH_Data = await import("./IMACH/data").then((module) => module.data);
const IMACH_Validations = await import("./IMACH/validation").then(
  (module) => module.validationFunctions
);
const PPCCH_Data = await import("./PPCCH/data").then((module) => module.data);
const PPCCH_Validations = await import("./PPCCH/validation").then(
  (module) => module.validationFunctions
);
const SFMCH_Data = await import("./SFMCH/data").then((module) => module.data);
const SFMCH_Validations = await import("./SFMCH/validation").then(
  (module) => module.validationFunctions
);
const W30CH_Data = await import("./W30CH/data").then((module) => module.data);
const W30CH_Validations = await import("./W30CH/validation").then(
  (module) => module.validationFunctions
);
const WCCCH_Data = await import("./WCCCH/data").then((module) => module.data);
const WCCCH_Validations = await import("./WCCCH/validation").then(
  (module) => module.validationFunctions
);
const WCVCH_Data = await import("./WCVCH/data").then((module) => module.data);
const WCVCH_Validations = await import("./WCVCH/validation").then(
  (module) => module.validationFunctions
);

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
