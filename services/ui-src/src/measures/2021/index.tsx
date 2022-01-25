/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

import { AMMAD } from "./AMMAD";
import { CPAAD } from "./CPAAD";
import { FUAAD } from "./FUAAD";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { NCIDDSAD } from "./NCIDDSAD";
import { PDENTCH } from "./PDENTCH";

const twentyTwentyOneMeasures = {
  "AMM-AD": AMMAD,
  "CPA-AD": CPAAD,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "NCIDDS-AD": NCIDDSAD,
  "PDENT-CH": PDENTCH,
  "FUA-AD": FUAAD,
};

export default twentyTwentyOneMeasures;
