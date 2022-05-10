import { omsValidations } from "./index";
import {
  locationDictionary,
  generateOmsQualifierRateData,
  simpleRate,
  generateOmsFormData,
} from "utils/testUtils/validationHelpers";
import { DefaultFormData } from "measures/CommonQuestions/types";
import { writeFileSync } from "fs";

describe("Testing OMS validation processor", () => {
  const categories = ["Test Cat 1", "Test Cat 2"];
  const qualifiers = ["Test Qual 1", "Test Qual 2"];

  test("should have no errors for basic data", () => {
    const errors = omsValidations({
      categories,
      qualifiers,
      locationDictionary,
      dataSource: [],
      data: generateOmsFormData(
        generateOmsQualifierRateData(categories, qualifiers, [
          simpleRate,
          simpleRate,
        ])
      ) as DefaultFormData,
      validationCallbacks: [],
    });
    console.log(errors);
    expect(errors.length).toBe(0);
  });

  test("should have no errors for no data", () => {
    const errors = omsValidations({
      categories,
      qualifiers,
      locationDictionary,
      dataSource: [],
      data: generateOmsFormData(
        generateOmsQualifierRateData(categories, qualifiers, [
          simpleRate,
          simpleRate,
        ]),
        false
      ) as DefaultFormData,
      validationCallbacks: [],
    });

    expect(errors.length).toBe(0);
  });

  test("should have errors for not filling data into selected checkboxes", () => {
    const errors = omsValidations({
      categories,
      qualifiers,
      locationDictionary,
      dataSource: [],
      data: generateOmsFormData(
        generateOmsQualifierRateData(categories, qualifiers, [{}, {}]),
        false
      ) as DefaultFormData,
      validationCallbacks: [],
    });

    writeFileSync(
      "oms.json",
      JSON.stringify(
        generateOmsFormData(
          generateOmsQualifierRateData(categories, qualifiers, [{}, {}])
        ),
        undefined,
        2
      )
    );
    expect(errors.length).toBe(0);
  });

  test("should have errors from callbacks for every node", () => {
    const errors = omsValidations({
      categories,
      qualifiers,
      locationDictionary,
      dataSource: [],
      data: generateOmsFormData(
        generateOmsQualifierRateData(categories, qualifiers, [
          simpleRate,
          simpleRate,
        ])
      ) as DefaultFormData,
      validationCallbacks: [
        () => {
          return [
            { errorLocation: "TestLocation", errorMessage: "TestMessage" },
          ];
        },
      ],
    });

    expect(errors.length).toBe(74);
  });
});
