/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

import { AMMAD } from "./AMMAD";
import { FUAAD } from "./FUAAD";
import { LBWCH } from "./LBWCH";
import { LRCDCH } from "./LRCDCH";
import { NCIDDSAD } from "./NCIDDSAD";
import { PDENTCH } from "./PDENTCH";
import { FUMAD } from "./FUMAD";

const twentyTwentyOneMeasures = {
  "AMM-AD": AMMAD,
  "LBW-CH": LBWCH,
  "LRCD-CH": LRCDCH,
  "NCIDDS-AD": NCIDDSAD,
  "PDENT-CH": PDENTCH,
  "FUA-AD": FUAAD,
  "FUM-AD": FUMAD,
};

export default twentyTwentyOneMeasures;
