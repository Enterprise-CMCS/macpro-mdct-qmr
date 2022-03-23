/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/
import { BCSAD } from "./BCSAD";
import { AMMAD } from "./AMMAD";
import { CBPAD } from "./CBPAD";
import { CCWAD } from "./CCWAD";
import { CCPAD } from "./CCPAD";
import { COBAD } from "./COBAD";
import { CHLAD } from "./CHLAD";
import { CISCH } from "./CISCH";
import { CPAAD } from "./CPAAD";
import { CPCCH } from "./CPCCH";
import { FUAAD } from "./FUAAD";
import { FUHCH } from "./FUHCH";
import { FUMAD } from "./FUMAD";
import { FVAAD } from "./FVAAD";
import { HVLAD } from "./HVLAD";
import { IETAD } from "./IETAD";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { MSCAD } from "./MSCAD";
import { OUDAD } from "./OUDAD";
import { NCIDDSAD } from "./NCIDDSAD";
import { PDENTCH } from "./PDENTCH";
import { PPCAD } from "./PPCAD";
import { PQI08AD } from "./PQI08AD";
import { PQI01AD } from "./PQI01AD";
import { PQI15AD } from "./PQI15AD";
import { PQI05AD } from "./PQI05AD";

const twentyTwentyOneMeasures = {
  "AMM-AD": AMMAD,
  "BCS-AD": BCSAD,
  "CBP-AD": CBPAD,
  "CCP-AD": CCPAD,
  "CIS-CH": CISCH,
  "CCW-AD": CCWAD,
  "CPA-AD": CPAAD,
  "COB-AD": COBAD,
  "CHL-AD": CHLAD,
  "CPC-CH": CPCCH,
  "FUA-AD": FUAAD,
  "FUH-CH": FUHCH,
  "FUM-AD": FUMAD,
  "FVA-AD": FVAAD,
  "HVL-AD": HVLAD,
  "IET-AD": IETAD,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "MSC-AD": MSCAD,
  "NCIDDS-AD": NCIDDSAD,
  "OUD-AD": OUDAD,
  "PDENT-CH": PDENTCH,
  "PPC-AD": PPCAD,
  "PQI01-AD": PQI01AD,
  "PQI05-AD": PQI05AD,
  "PQI08-AD": PQI08AD,
  "PQI15-AD": PQI15AD,
};

export default twentyTwentyOneMeasures;
