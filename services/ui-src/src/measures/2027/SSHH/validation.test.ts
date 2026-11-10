import { validationFunctions } from "./validation";
import { DefaultFormData as FormData } from "shared/types/FormData";
import { testFormData } from "shared/globalValidations/testHelpers/_testFormData";
import * as DC from "dataConstants";

const defaultFormData = {
  ...(testFormData as FormData),
  [DC.DATA_SOURCE_SELECTIONS]: {},
  [DC.DEFINITION_DENOMINATOR_OTHER]: "mock other description",
};

const getRate = (
  numerator: string,
  denominator: string,
  rate: string,
  label?: string
) => {
  return [
    {
      [DC.DESCRIPTION]: label ?? "Label 1",
      [DC.RATE]: [
        {
          [DC.RATE]: numerator,
          [DC.NUMERATOR]: denominator,
          [DC.DENOMINATOR]: rate,
        },
      ],
    },
  ];
};

describe("Test SS-HH Validation", () => {
  it("validation has no errors", () => {
    const error = validationFunctions[0](defaultFormData);
    expect(error).toStrictEqual([]);
  });
  it("validateAtLeastOneRateComplete error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OPM_RATES]: [],
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage:
          "At least one Performance Measure Numerator, Denominator, and Rate must be completed",
      },
    ]);
  });
  it("validateNoNonZeroNumOrDenomPM error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OPM_RATES]: getRate("50.0", "0", "2"),
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage: "Manually entered rate should be 0 if numerator is 0",
      },
    ]);
  });
  it("validateNumeratorsLessThanDenominatorsPM error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OPM_RATES]: getRate("50.0", "7", "2"),
    };

    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage:
          "Numerators must be less than Denominators for all applicable performance measures",
      },
    ]);
  });
  it("validatePartialRateCompletion error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OPM_RATES]: getRate("50.0", "", "2"),
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage: "Should not have partially filled NDR sets",
      },
    ]);
  });
  it("validateAtLeastOneDataSource error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.DATA_SOURCE]: [],
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Data Source",
        errorMessage: "You must select at least one Data Source option",
      },
    ]);
  });
  it("validateAtLeastOneDataSourceType error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.DATA_SOURCE_SELECTIONS]: {
        [DC.ADMINISTRATIVE_DATA]: {
          [DC.DESCRIPTION]: "",
          [DC.SELECTED]: ["MedicaidManagementInformationSystemMMIS"],
        },
      },
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Data Source",
        errorMessage: "Please describe the Administrative Data Source",
      },
    ]);
  });
  it("validateDateRangeRadioButtonCompletion error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.MEASUREMENT_PERIOD_CORE_SET]: undefined,
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Date Range",
        errorMessage: "Date Range answer must be selected",
      },
    ]);
  });
  it("validateBothDatesCompleted error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.DATE_RANGE]: {
        [DC.END_DATE]: {} as any,
        [DC.START_DATE]: {} as any,
      },
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Date Range",
        errorMessage: "Date Range must be completed",
      },
    ]);
  });
  it("validateYearFormat error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.DATE_RANGE]: {
        [DC.END_DATE]: { [DC.SELECTED_MONTH]: 1, [DC.SELECTED_YEAR]: 202 },
        [DC.START_DATE]: { [DC.SELECTED_MONTH]: 12, [DC.SELECTED_YEAR]: 221 },
      },
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Date Range",
        errorMessage: "Please enter start date year in YYYY-format",
        errorType: "Warning",
      },
      {
        errorLocation: "Date Range",
        errorMessage: "Please enter end date year in YYYY-format",
        errorType: "Warning",
      },
    ]);
  });
  it("validateOPMRates error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OPM_RATES]: getRate("50.0", "1", "2", ""),
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Other Performance Measure",
        errorMessage: "Rate name required",
      },
    ]);
  });
  it("validateAtLeastOneDefinitionOfPopulation error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.DEFINITION_OF_DENOMINATOR]: [],
    };
    const error = validationFunctions[0](modifiedFormData);
    expect(error).toStrictEqual([
      {
        errorLocation: "Definition of Population",
        errorMessage:
          "You must select at least one definition of population option",
      },
    ]);
  });
});
