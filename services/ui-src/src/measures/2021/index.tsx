/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

import { AMMAD } from "./AMMAD";
import { CPAAD } from "./CPAAD";
import { FUAAD } from "./FUAAD";
import { IETAD } from "./IETAD";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { NCIDDSAD } from "./NCIDDSAD";
import { PDENTCH } from "./PDENTCH";
import { PQI05AD } from "./PQI05AD";
import { PQI01AD } from "./PQI01AD";

const twentyTwentyOneMeasures = {
  "AMM-AD": AMMAD,
  "CPA-AD": CPAAD,
  "FUA-AD": FUAAD,
  "IET-AD": IETAD,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "NCIDDS-AD": NCIDDSAD,
  "PDENT-CH": PDENTCH,
  "PQI05-AD": PQI05AD,
  "PQI01-AD": PQI01AD,
};

export default twentyTwentyOneMeasures;
