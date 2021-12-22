/*
When importing a measure it should be a named import and added to the measures object below so that it routes correctly
the key should be the measure id as a string (with '-XX' included) 
*/

import { AMMAD } from "./AMMAD";

const twentyTwentyOneMeasures = {
  "AMM-AD": AMMAD,
};

export default twentyTwentyOneMeasures;
