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
  