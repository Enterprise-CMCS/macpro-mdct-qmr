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
  /**
   * OMS rate data is shaped differently for certain measures,
   * with an extra layer of nesting before the rate data, under these keys.
   */
  export enum CustomKeys {
    Aifhh = "aifhh-rate",
    Iuhh = "iuhh-rate",
    Pcr = "pcr-rate",
  }

  export interface OmsRateMap {
    rates?: {
      [topKey: string]: {
        [midKey: string]: {
          fields: {
            value?: string;
          }[];
        }[];
      };
    };
  }

  export type OmsRateArray = {
    id?: number;
    value?: string;
    label?: string;
  }[];

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
    [CustomKeys.Aifhh]?: never;
    [CustomKeys.Iuhh]?: never;
    [CustomKeys.Pcr]?: never;
  }

  export interface AifOmsNode {
    rates?: never;
    [CustomKeys.Aifhh]?: OmsRateMap;
    [CustomKeys.Iuhh]?: never;
    [CustomKeys.Pcr]?: never;
  }

  export interface IuOmsNode {
    rates?: never;
    [CustomKeys.Aifhh]?: never;
    [CustomKeys.Iuhh]?: OmsRateMap;
    [CustomKeys.Pcr]?: never;
  }

  export interface PcrOmsNode {
    rates?: never;
    [CustomKeys.Aifhh]?: never;
    [CustomKeys.Iuhh]?: never;
    [CustomKeys.Pcr]?: OmsRateArray;
  }

  /*
   * Note that these types are fairly repetitive, with optional keys as `never`
   * This is only to appease the typescript spirits, so there are no complaints
   * when we check for the presence of CustomKeys on the object.
   */
  export type OmsRateData =
    | OmsRateFields // if just ndr sets
    | AifOmsNode
    | IuOmsNode
    | PcrOmsNode;

  export interface LowLevelOmsNode {
    [DC.RATE_DATA]?: OmsRateData;
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
