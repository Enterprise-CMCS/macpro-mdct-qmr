import * as DC from "dataConstants";

export const validateDefinitionOfDenominatorNoExplain = (data: any) => {
  if (data[DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC] !== DC.NO) return [];
  if (data[DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN]) return [];

  return [
    {
      errorLocation: "Denominator Includes Total Measure-Eligible Population",
      errorMessage:
        "Complete the additional fields to explain which populations are excluded and why and, if possible, estimate the size of the excluded measure-eligible population.",
    },
  ];
};
