import { DataDrivenTypes } from "measures/CommonQuestions/types";

export const qualifiers = [
  "DTaP",
  "IPV",
  "MMR",
  "HiB",
  "Hep B",
  "VZV",
  "PCV",
  "Hep A",
  "RV",
  "Flu",
  "Combo 2",
  "Combo 3",
  "Combo 4",
  "Combo 5",
  "Combo 6",
  "Combo 7",
  "Combo 8",
  "Combo 9",
  "Combo 10",
];
export const categories = [];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText:
    "Percentage of children age 2 who had four diphtheria, tetanus and acellular pertussis (DTaP); three polio (IPV); one measles, mumps and rubella (MMR); three haemophilus influenza type B (HiB); three hepatitis B (Hep B), one chicken pox (VZV); four pneumococcal conjugate (PCV); one hepatitis A (HepA); two or three rotavirus (RV); and two influenza (flu) vaccines by their second birthday. The measure calculates a rate for each vaccine and nine separate combination rates.",
  questionListItems: [],
  categories,
  qualifiers,
};

export const dataSourceData: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: "Administrative Data",
      subOptions: {
        label: "What is the Administrative Data Source?",
        options: [
          {
            value: "Medicaid Management Information System (MMIS)",
          },
          {
            value: "Immunization Registry",
          },
          {
            value: "Administrative Data Other",
            description: true,
          },
        ],
      },
    },
    {
      value: "Hybird (Administrative and Medicial Records Data)",
      subOptions: {
        label: "What is the Administrative Data Source?",
        options: [
          {
            value: "Medicaid Management Information System (MMIS)",
          },
          {
            value: "Immunization Registry",
          },
          {
            value: "Hybrid Data Other",
            description: true,
          },
        ],
      },
    },
    {
      value: "Electronic Health Records",
    },
    {
      value: "Other Data Source",
      description: true,
    },
  ],
};
