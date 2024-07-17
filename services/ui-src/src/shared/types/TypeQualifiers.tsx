import { LabelData } from "utils";
import * as DC from "dataConstants";

export interface QualifierLabelData extends LabelData {
  [DC.EXCLUDE_FROM_OMS]?: boolean;
}

export interface Qualifiers {
  [DC.QUALIFIERS]?: QualifierLabelData[];
}
