/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

import { AMMAD } from "./AMMAD";
import { CCWAD } from "./CCWAD";
import { FUAAD } from "./FUAAD";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { NCIDDSAD } from "./NCIDDSAD";
import { PDENTCH } from "./PDENTCH";

const twentyTwentyOneMeasures = {
  "AMM-AD": AMMAD,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "NCIDDS-AD": NCIDDSAD,
  "PDENT-CH": PDENTCH,
  "FUA-AD": FUAAD,
  "CCW-AD": CCWAD,
};

export default twentyTwentyOneMeasures;
