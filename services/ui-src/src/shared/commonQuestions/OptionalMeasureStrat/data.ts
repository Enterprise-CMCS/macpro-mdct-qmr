import { OmsNode } from "shared/types";

export const OMSData = (year: number, adultMeasure?: boolean): OmsNode[] => {
  switch (Number(year)) {
    case 2021:
    case 2022:
      return dataLegacy(adultMeasure);
    case 2023:
    case 2024:
      return omb1997();
    default:
      return omb2024();
  }
};

const omb2024 = () => {
  return [
    {
      id: "3dpUZu",
      label: "Race and Ethnicity",
      options: [
        {
          id: "ll9YP8",
          label: "American Indian or Alaska Native alone or in combination",
          options: [],
          flagSubCat: true,
          flagSubLabel:
            "(Enter, for example, Navajo Nation, Blackfeet Tribe of the Blackfeet Indian Reservation of Montana, Native Village of Barrow Inupiat Traditional Government, Nome Eskimo Community, Aztec, Maya, etc.)",
        },
        {
          id: "RKWD6S",
          label: "Asian alone or in combination",
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
          flagSubLabel: "(Enter, for example, Pakistani, Hmong, Afghan, etc.)",
        },
        {
          id: "6NrBa5",
          label: "Black or African American alone or in combination",
          options: [
            { id: "XQaB61", flagSubCat: false, label: "African American" },
            { id: "xHb3ck", flagSubCat: false, label: "Jamaican" },
            { id: "EMlkr3", flagSubCat: false, label: "Haitian" },
            { id: "fTJuWo", flagSubCat: false, label: "Nigerian" },
            { id: "AiPI2q", flagSubCat: false, label: "Ethiopian" },
            { id: "v9x98F", flagSubCat: false, label: "Somali" },
          ],
          flagSubCat: true,
          flagSubLabel:
            "(Enter, for example, Trinidadian and Tobagonian, Ghanian, Congolese, etc.)",
        },
        {
          id: "v767bB",
          label: "Hispanic or Latino alone or in combination",
          options: [
            { id: "ewnAoV", flagSubCat: false, label: "Mexican" },
            { id: "3K1E74", flagSubCat: false, label: "Puerto Rican" },
            { id: "BFSyYw", flagSubCat: false, label: "Salvadoran" },
            { id: "kSlOBJ", flagSubCat: false, label: "Cuban" },
            { id: "WSlday", flagSubCat: false, label: "Dominican" },
            { id: "WydNDy", flagSubCat: false, label: "Guatemalan" },
          ],
          flagSubCat: true,
          flagSubLabel:
            "(Enter, for example, Colombian, Honduran, Spaniard, etc.)",
        },
        {
          id: "6dmrjv",
          label: "Middle Eastern or North African alone or in combination",
          options: [
            { id: "u9iUVC", flagSubCat: false, label: "Lebanese" },
            { id: "tNsJcL", flagSubCat: false, label: "Iranian" },
            { id: "KPKl3q", flagSubCat: false, label: "Egyptian" },
            { id: "s5YpXA", flagSubCat: false, label: "Syrian" },
            { id: "ftRehA", flagSubCat: false, label: "Iraqi" },
            { id: "YYRo8f", flagSubCat: false, label: "Israeli" },
          ],
          flagSubCat: true,
          flagSubLabel: "(Enter, for example, Moroccan, Yemeni, Kurdish, etc.)",
        },
        {
          id: "Qu4kZK",
          label: "Native Hawaiian or Pacific Islander alone or in combination",
          options: [
            { id: "PDpYy7", flagSubCat: false, label: "Native Hawaiian" },
            { id: "3jNqHV", flagSubCat: false, label: "Samoan" },
            { id: "HnV4z1", flagSubCat: false, label: "Chamorro" },
            { id: "33Sq6p", flagSubCat: false, label: "Tongan" },
            { id: "H9uJ5F", flagSubCat: false, label: "Fijian" },
            { id: "NTwVSH", flagSubCat: false, label: "Marshallese" },
          ],
          flagSubCat: true,
          flagSubLabel:
            "(Enter, for example, Chuukese, Palauan, Tahitian, etc.)",
        },
        {
          id: "szjphG",
          label: "White alone or in combination",
          options: [
            { id: "kI1u5T", flagSubCat: false, label: "English" },
            { id: "8vWJhL", flagSubCat: false, label: "German" },
            { id: "0QudFK", flagSubCat: false, label: "Irish" },
            { id: "9UDXzB", flagSubCat: false, label: "Italian" },
            { id: "62QFXg", flagSubCat: false, label: "Polish" },
            { id: "27hKIg", flagSubCat: false, label: "Scottish" },
          ],
          flagSubCat: true,
          flagSubLabel:
            "(Enter, for example, French, Swedish, Norwegian, etc.)",
        },
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
      id: "O8BrOa",
      label: "Sex",
      options: [
        { id: "KRwFRN", label: "Male" },
        { id: "8M0aAo", label: "Female" },
        { id: "BnVURC", label: "Missing or not reported" },
      ],
      addMore: false,
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

const omb1997 = () => {
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
const dataLegacy = (adultMeasure?: boolean) => {
  let data: OmsNode[] = [
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
      addMoreSubCatFlag: true,
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
      id: "Primary Language (including sign language)",
      aggregateTitle: "Primary Language",
      options: [{ id: "English" }, { id: "Spanish" }],
      addMore: true,
    },
    {
      id: "Disability Status",
      options: [{ id: "SSI" }, { id: "Non-SSI" }],
      addMore: true,
    },
    {
      id: "Geography",
      options: [{ id: "Urban" }, { id: "Rural" }],
      addMore: true,
    },
  ];

  data = addLabelToData(data);

  adultMeasure &&
    data.push({
      id: "Adult Eligibility Group (ACA Expansion Group)",
      label: "Adult Eligibility Group (ACA Expansion Group)",
      addMore: false,
    });
  return data;
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
