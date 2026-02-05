import * as DC from "dataConstants";
import { OtherRatesFields, RateFields } from "./TypeRateFields";
import { Categories, Qualifiers } from ".";
import { ComponentFlagType } from "shared/commonQuestions/OptionalMeasureStrat/context";
import { ndrFormula } from "types";
import { LabelData } from "utils";

export interface MeasureStratificationLabels {
  subHeader: string[];
  addAnotherType: string;
}

export interface OmsCheckboxProps {
  /** name for react-hook-form registration */
  name: string;
  /** data object for dynamic rendering */
  data: OmsNode[];
  year: number;
  excludeOptions: string[];
  overrideAccordion?: (option: string) => boolean;
  customLabels?: MeasureStratificationLabels;
}

export interface BaseProps extends Qualifiers, Categories {
  measureName?: string;
  inputFieldNames?: LabelData[];
  ndrFormulas?: ndrFormula[];
  /** string array for perfromance measure descriptions */
  performanceMeasureArray?: RateFields[][];
  /** should the total for each portion of OMS be calculated? */
  calcTotal?: boolean;
  rateMultiplicationValue?: number;
  allowNumeratorGreaterThanDenominator?: boolean;
  customMask?: RegExp;
  excludeOptions?: string[];
  rateAlwaysEditable?: boolean;
  numberOfDecimals?: number;
  componentFlag?: ComponentFlagType;
  customNumeratorLabel?: string;
  customDenominatorLabel?: string;
  customRateLabel?: string;
  customPrompt?: string;
  rateCalc?: RateFormula;
}

/** data for dynamic rendering will be provided */
interface DataDrivenProp {
  /** data array for dynamic rendering */
  data: OmsNode[];
  /** cannot set adultMeasure if using custom data*/
  coreset?: never;
}

/** default data is being used for this component */
interface DefaultDataProp {
  /** is this an adult measure? Should this contain the ACA portion? */
  coreset: string;
  /** cannot set data if using default data */
  data?: never;
}

export type OMSProps = BaseProps & (DataDrivenProp | DefaultDataProp);

/** OMS react-hook-form typing */
export type OMSType = OptionalMeasureStratification & {
  DataSource: string[];
} & { MeasurementSpecification: string } & {
  "OtherPerformanceMeasure-Rates": OtherRatesFields[];
};

export interface OmsNode {
  /** id value for option */
  id: string;
  /** displayName value for option*/
  label?: string;
  /** should additional category render? */
  addMore?: boolean;
  /** should this node have a subCatOption? */
  flagSubCat?: boolean;
  /** if this node have a a subCatOption does it have any label text */
  flagSubLabel?: string;
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
      [category: string /** rate label will be some combination of ageRange_perfDesc or opmFieldLabel */]: {
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
    [DC.VERSION]?: string;
    [DC.OPTIONS]: string[]; //checkbox
    [DC.SELECTIONS]: {
      [option: string]: OmsNodes.TopLevelOmsNode;
    };
    [DC.ADDITIONAL_CONTEXT]?: string;
  };
}
