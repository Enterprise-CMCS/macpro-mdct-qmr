import { validationTemplate } from "./validationTemplate";
import { DefaultFormData as FormData } from "shared/types/FormData";
import { testFormData } from "shared/globalValidations/testHelpers/_testFormData";
import {
  testComplexValidations,
  testMeasure,
  testOMSValidations,
  testValidations,
} from "shared/globalValidations/testHelpers/_testMeasure";
import * as DC from "dataConstants";

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  isLegacyLabel: jest.fn().mockReturnValue(false),
}));

const defaultFormData = {
  ...(testFormData as FormData),
  [DC.DATA_SOURCE_SELECTIONS]: {},
  [DC.DEFINITION_DENOMINATOR_OTHER]: "mock other description",
};

describe("Test validationTemplate", () => {
  it("there are not validation errors", () => {
    const modifiedTestMeasure = {
      ...testMeasure,
      validations: [...testValidations, ...testComplexValidations],
    };
    const error = validationTemplate(defaultFormData, modifiedTestMeasure);
    expect(error).toStrictEqual([]);
  });
  it("throws an error when a validation doesn't exist", () => {
    const modifiedTestMeasure = {
      ...testMeasure,
      validations: ["NonExistentValidation"] as any,
    };
    expect(() =>
      validationTemplate(defaultFormData, modifiedTestMeasure)
    ).toThrow(
      `Validation function NonExistentValidation not recognized! See validationTemplate.tsx`
    );
  });
  it("validateEqualQualifierDenominatorsPM error", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.PERFORMANCE_MEASURE]: {
        [DC.RATES]: {
          qyic1D: [{ numberator: "2", denominator: "3", rate: "66.7" }],
        },
      },
    };
    const modifiedTestMeasure = {
      ...testMeasure,
      validations: [...testValidations],
      override: {
        validateEqualQualifierDenominatorsPM: {
          category: true,
          errorMessage: true,
        },
        validateEqualCategoryDenominatorsPM: {
          qualifiers: testMeasure.performanceMeasure.qualifiers,
        },
      },
    };
    const error = validationTemplate(modifiedFormData, modifiedTestMeasure);
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage:
          "Should not have partially filled NDR sets for Ages 18 to 64.",
      },
    ]);
  });
  it("there are no oms validations errors", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OMS]: { [DC.OPTIONS]: [], [DC.SELECTIONS]: {} },
    };
    const modifiedTestMeasure = {
      ...testMeasure,
      validations: [...testOMSValidations],
    };
    const error = validationTemplate(modifiedFormData, modifiedTestMeasure);
    expect(error).toStrictEqual([]);
  });
  it("there are no complex validations errors", () => {
    const modifiedTestMeasure = {
      ...testMeasure,
      validations: [...testValidations, ...testComplexValidations],
    };
    modifiedTestMeasure.performanceMeasure.measureName = "AIFHH";

    const AIFHHerror = validationTemplate(defaultFormData, modifiedTestMeasure);
    expect(AIFHHerror).toStrictEqual([]);

    modifiedTestMeasure.performanceMeasure.measureName = "IUHH";
    const IUHHerror = validationTemplate(defaultFormData, modifiedTestMeasure);
    expect(IUHHerror).toStrictEqual([]);
  });
  it("there are no PCRHH validations errors", () => {
    const modifiedFormData = {
      ...defaultFormData,
      [DC.OMS]: { [DC.OPTIONS]: [], [DC.SELECTIONS]: {} },
    };
    const modifiedTestMeasure = {
      ...testMeasure,
      validations: [...testValidations, ...testComplexValidations],
    };
    modifiedTestMeasure.performanceMeasure.measureName = "PCRHH";
    const error = validationTemplate(modifiedFormData, modifiedTestMeasure);
    expect(error).toStrictEqual([]);
  });
});
