import * as DC from "dataConstants";
import { RateFields } from "./TypeRateFields";

export interface OmsNode {
  /** id value for option */
  id: string;
  /** displayName value for option*/
  label?: string;
  /** should additional category render? */
  addMore?: boolean;
  /** should this node have a subCatOption? */
  flagSubCat?: boolean;
  /** additional checkbox options below this node */
  options?: OmsNode[];
  /** should additional category values have subCatOptions? */
  addMoreSubCatFlag?: boolean;
  /** should the aggregate question have a diffrent title than label? */
  aggregateTitle?: string;
}

export namespace OmsNodes {
  export interface OmsRateFields {
    [DC.OPTIONS]?: string[];
    [DC.RATES]?: {
      [
        category: string /** rate label will be some combination of ageRange_perfDesc or opmFieldLabel */
      ]: {
        [qualifier: string]: RateFields[];
      };
    };
    [DC.TOTAL]?: RateFields[];
  }

  export interface LowLevelOmsNode {
    [DC.RATE_DATA]?: OmsRateFields; // if just ndr sets
    [DC.SUB_CAT_OPTIONS]?: string[]; // for additional subCats/add anothers
    [DC.SUB_CATS]?: {
      [DC.DESCRIPTION]?: string;
      [DC.RATE_DATA]?: OmsRateFields;
    }[];
  }
  export interface MidLevelOMSNode extends LowLevelOmsNode {
    // if sub-options
    [DC.AGGREGATE]?: string;
    [DC.LABEL]?: string;
    [DC.OPTIONS]?: string[];
    [DC.SELECTIONS]?: {
      [option: string]: LowLevelOmsNode;
    };
  }

  export interface TopLevelOmsNode {
    // top level child, ex: Race, Sex, Ethnicity
    [DC.LABEL]?: string;
    [DC.OPTIONS]?: string[]; // checkbox
    [DC.ADDITIONAL_CATS]?: string[]; // add another section
    [DC.SELECTIONS]?: {
      [option: string]: MidLevelOMSNode;
    };
    [DC.ADDITIONAL_SELECTIONS]?: AddtnlOmsNode[];

    // catch case for ACA
    [DC.RATE_DATA]?: OmsRateFields;
  }

  export interface AddtnlOmsNode extends LowLevelOmsNode {
    [DC.DESCRIPTION]?: string;
  }
}

export interface OptionalMeasureStratification {
  [DC.OMS]: {
    [DC.OPTIONS]: string[]; //checkbox
    [DC.SELECTIONS]: {
      [option: string]: OmsNodes.TopLevelOmsNode;
    };
    [DC.ADDITIONAL_CONTEXT]?: string;
  };
}
