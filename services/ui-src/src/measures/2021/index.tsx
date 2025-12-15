import { lazy } from "react";
import { Qualifier } from "shared/Qualifiers";
import { Data } from "labels/2021/qualifierFormsData";
import { measureTemplate } from "./measureTemplate";
import { AutocompletedMeasureTemplate2 } from "components";
/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

const CPAAD = lazy(() =>
  import("./CPAAD").then((module) => ({ default: module.CPAAD }))
);
const CPCCH = lazy(() =>
  import("./CPCCH").then((module) => ({ default: module.CPCCH }))
);
const MSCAD = lazy(() =>
  import("./MSCAD").then((module) => ({ default: module.MSCAD }))
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
const twentyTwentyOneMeasures = {
  "ADD-CH": measureTemplate,
  "AIF-HH": measureTemplate,
  "AMB-CH": measureTemplate,
  "AMB-HH": measureTemplate,
  "AMM-AD": measureTemplate,
  "AMR-AD": measureTemplate,
  "AMR-CH": measureTemplate,
  "APM-CH": measureTemplate,
  "APP-CH": measureTemplate,
  "AUD-CH": measureTemplate,
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
  "CPA-AD": CPAAD,
  "CPC-CH": CPCCH,
  "DEV-CH": measureTemplate,
  "FUA-AD": measureTemplate,
  "FUA-HH": measureTemplate,
  "FUH-AD": measureTemplate,
  "FUH-CH": measureTemplate,
  "FUH-HH": measureTemplate,
  "FUM-AD": measureTemplate,
  "FVA-AD": measureTemplate,
  "HVL-AD": measureTemplate,
  "HPC-AD": measureTemplate,
  "HPCMI-AD": measureTemplate,
  "IET-AD": measureTemplate,
  "IET-HH": measureTemplate,
  "IMA-CH": measureTemplate,
  "IU-HH": measureTemplate,
  "LBW-CH": AutocompletedMeasureTemplate2,
  "LRCD-CH": AutocompletedMeasureTemplate2,
  "MSC-AD": MSCAD,
  "NCIDDS-AD": AutocompletedMeasureTemplate2,
  "OHD-AD": measureTemplate,
  "OUD-AD": measureTemplate,
  "OUD-HH": measureTemplate,
  "PC01-AD": measureTemplate,
  "PCR-AD": PCRAD,
  "PCR-HH": PCRHH,
  "PDENT-CH": AutocompletedMeasureTemplate2,
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
  "W30-CH": measureTemplate,
  "WCC-CH": measureTemplate,
  "WCV-CH": measureTemplate,
  Qualifier,
};
export default twentyTwentyOneMeasures;
export const QualifierData = Data;
