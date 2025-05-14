import { OmsNode } from "shared/types";

export const OMSData = (): OmsNode[] => {
  return data();
};

const data = () => {
  return [
    {
      id: "3dpUZu",
      label: "Race",
      options: [
        {
          id: "ll9YP8",
          flagSubCat: false,
          label: "American Indian or Alaska Native",
        },
        {
          id: "RKWD6S",
          label: "Asian",
          options: [
            { id: "e68Cj8", flagSubCat: false, label: "Asian Indian" },
            { id: "gCxXhf", flagSubCat: false, label: "Chinese" },
            { id: "i2fIgY", flagSubCat: false, label: "Filipino" },
            { id: "WxWvJ8", flagSubCat: false, label: "Japanese" },
            { id: "78IBC7", flagSubCat: false, label: "Korean" },
            { id: "GPgIYd", flagSubCat: false, label: "Vietnamese" },
            { id: "5v7GMy", flagSubCat: false, label: "Other Asian" },
          ],
          flagSubCat: true,
        },
        {
          id: "6NrBa5",
          flagSubCat: false,
          label: "Black or African American",
        },
        {
          id: "Qu4kZK",
          label: "Native Hawaiian or Other Pacific Islander",
          options: [
            {
              id: "GDJJx4",
              flagSubCat: false,
              label: "Native Hawaiian",
            },
            {
              id: "LgwPP1",
              flagSubCat: false,
              label: "Guamanian or Chamorro",
            },
            { id: "LTJcrA", flagSubCat: false, label: "Samoan" },
            {
              id: "Ri1PWc",
              flagSubCat: false,
              label: "Other Pacific Islander",
            },
          ],
          flagSubCat: true,
        },
        { id: "szjphG", flagSubCat: false, label: "White" },
        {
          id: "OmjSBa",
          flagSubCat: false,
          label: "Two or More Races",
        },
        { id: "uZTnKi", flagSubCat: false, label: "Some Other Race" },
        {
          id: "nN7fNs",
          flagSubCat: false,
          label: "Missing or not reported",
        },
      ],
      addMore: true,
      addMoreSubCatFlag: false,
    },
    {
      id: "elakUl",
      label: "Ethnicity",
      options: [
        {
          id: "51ZZEh",
          label: "Not of Hispanic, Latino/a, or Spanish origin",
        },
        {
          id: "BFeF4k",
          label: "Hispanic, Latino/a, or Spanish origin",
          aggregateTitle: "Hispanic, Latino/a, or Spanish origin",
          options: [
            {
              id: "ZP5n08",
              label: "Mexican, Mexican American, Chicano/a",
            },
            { id: "4cq5P4", label: "Puerto Rican" },
            { id: "XCzK5D", label: "Cuban" },
            {
              id: "kHsTcd",
              label: "Another Hispanic, Latino/a or Spanish origin",
            },
          ],
        },
        { id: "WBIqgU", label: "Missing or not reported" },
      ],
      addMore: true,
    },
    {
      id: "O8BrOa",
      label: "Sex",
      options: [
        { id: "KRwFRN", label: "Male" },
        { id: "8M0aAo", label: "Female" },
        { id: "BnVURC", label: "Missing or not reported" },
      ],
      addMore: true,
    },
    {
      id: "afMbTr",
      label: "Geography",
      options: [
        { id: "r07WKZ", label: "Urban" },
        { id: "bbaSzG", label: "Rural" },
        { id: "i11ZUj", label: "Missing or not reported" },
      ],
      addMore: true,
    },
  ];
};

const addLabelToData = (data: OmsNode[]): OmsNode[] => {
  return data.map((item) => {
    if (item.options) {
      item.label = item.id;
      item.options = addLabelToData(item.options);
      return item;
    } else {
      return { ...item, label: item.id };
    }
  });
};
