export interface OmsNode {
  id: string;
  addMore?: boolean;
  flagSubCat?: boolean;
  options?: OmsNode[];
  aggregateTitle?: string;
}

export const OMSData: OmsNode[] = [
  {
    id: "Race (Non-Hispanic)",
    options: [
      { id: "White", flagSubCat: true },
      { id: "Black or African American", flagSubCat: true },
      { id: "American Indian or Alaska Native", flagSubCat: true },
      {
        id: "Asian",
        options: [
          { id: "Asian Indian", flagSubCat: true },
          { id: "Chinese", flagSubCat: true },
          { id: "Filipino", flagSubCat: true },
          { id: "Japanese", flagSubCat: true },
          { id: "Korean", flagSubCat: true },
          { id: "Vietnamese", flagSubCat: true },
          { id: "Other Asian", flagSubCat: true },
        ],
        flagSubCat: true,
      },
      {
        id: "Native Hawaiian or Other Pacific Islander",
        options: [
          { id: "Native Hawaiian", flagSubCat: true },
          { id: "Guamanian or Chamorro", flagSubCat: true },
          { id: "Samoan", flagSubCat: true },
          { id: "Other Pacific Islander", flagSubCat: true },
        ],
        flagSubCat: true,
      },
    ],
    addMore: true,
  },
  {
    id: "Ethnicity",
    options: [
      { id: "Not of Hispanic, Latino/a, or Spanish origin" },
      {
        id: "Hispanic or Latino",
        aggregateTitle: "Hispanic, Latino/a, or Spanish origin",
        options: [
          { id: "Mexican, Mexican American, Chicano/a" },
          { id: "Puerto Rican" },
          { id: "Cuban" },
          { id: "Another Hispanic, Latino/a or Spanish origin" },
        ],
      },
    ],
    addMore: true,
  },
  {
    id: "Sex",
    options: [{ id: "Male" }, { id: "Female" }],
    addMore: false,
  },
  {
    id: "Language",
    options: [{ id: "English" }, { id: "Spanish" }],
    addMore: true,
  },
  {
    id: "Disability Status",
    options: [{ id: "SSI" }, { id: "Non-SSI" }],
    addMore: true,
  },
  {
    id: "Ethnicity",
    options: [{ id: "Urban" }, { id: "Rural" }],
    addMore: true,
  },
  {
    id: "Adult Eligibility Group (ACA Expansion Group)",
    addMore: false,
  },
];
