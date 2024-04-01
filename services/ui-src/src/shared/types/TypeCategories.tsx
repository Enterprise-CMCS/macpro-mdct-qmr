import { LabelData } from "utils";
import * as DC from "dataConstants";

export interface CategoryLabelData extends LabelData {
  [DC.EXCLUDE_FROM_OMS]?: boolean;
}

export interface Categories {
  [DC.CATEGORIES]?: CategoryLabelData[];
}
