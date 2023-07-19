export interface OmsNode {
  /** displayName value for option */
  id: string;
  /** should additional category render? */
  addMore?: boolean;
  /** should this node have a subCatOption? */
  flagSubCat?: boolean;
  /** additional checkbox options below this node */
  options?: OmsNode[];
  /** should additional category values have subCatOptions? */
  addMoreSubCatFlag?: boolean;
  /** should the aggregate question have a diffrent title than id? */
  aggregateTitle?: string;
}

export const OMSData = (): OmsNode[] => {
  const data: OmsNode[] = [
    {
      id: "Race",
      options: [
        { id: "American Indian or Alaska Native", flagSubCat: false },
        {
          id: "Asian",
          options: [
            { id: "Asian Indian", flagSubCat: false },
            { id: "Chinese", flagSubCat: false },
            { id: "Filipino", flagSubCat: false },
            { id: "Japanese", flagSubCat: false },
            { id: "Korean", flagSubCat: false },
            { id: "Vietnamese", flagSubCat: false },
            { id: "Other Asian", flagSubCat: false },
          ],
          flagSubCat: true,
        },
        { id: "Black or African American", flagSubCat: false },
        {
          id: "Native Hawaiian or Other Pacific Islander",
          options: [
            { id: "Native Hawaiian", flagSubCat: false },
            { id: "Guamanian or Chamorro", flagSubCat: false },
            { id: "Samoan", flagSubCat: false },
            { id: "Other Pacific Islander", flagSubCat: false },
          ],
          flagSubCat: true,
        },
        { id: "White", flagSubCat: false },
        { id: "Two or More Races", flagSubCat: false },
        { id: "Some Other Race", flagSubCat: false },
        { id: "Missing or not reported", flagSubCat: false },
      ],
      addMore: true,
      addMoreSubCatFlag: false,
    },
    {
      id: "Ethnicity",
      options: [
        { id: "Not of Hispanic, Latino/a, or Spanish origin" },
        {
          id: "Hispanic, Latino/a, or Spanish origin",
          aggregateTitle: "Hispanic, Latino/a, or Spanish origin",
          options: [
            { id: "Mexican, Mexican American, Chicano/a" },
            { id: "Puerto Rican" },
            { id: "Cuban" },
            { id: "Another Hispanic, Latino/a or Spanish origin" },
          ],
        },
        { id: "Missing or not reported" },
      ],
      addMore: true,
    },
    {
      id: "Sex",
      options: [
        { id: "Male" },
        { id: "Female" },
        { id: "Missing or not reported" },
      ],
      addMore: true,
    },
    {
      id: "Geography",
      options: [
        { id: "Urban" },
        { id: "Rural" },
        { id: "Missing or not reported" },
      ],
      addMore: true,
    },
  ];

  return data;
};
