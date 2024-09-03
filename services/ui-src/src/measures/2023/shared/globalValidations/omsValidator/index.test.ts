import { omsValidations } from ".";
import {
  locationDictionary,
  generateOmsQualifierRateData,
  simpleRate,
  generateOmsFormData,
} from "utils/testUtils/validationHelpers";
import { DefaultFormData } from "shared/types/FormData";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";

describe("Testing OMS validation processor", () => {
  const categories = [
    { id: "TestCat1", text: "TestCat1", label: "TestCat1" },
    { id: "TestCat2", text: "TestCat2", label: "TestCat2" },
  ];
  const qualifiers = [
    { id: "TestQual1", text: "TestQual1", label: "TestQual1" },
    { id: "TestQual2", text: "TestQual2", label: "TestQual2" },
  ];

  it("should have no errors for basic data", () => {
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

    expect(errors.length).toBe(0);
  });

  it("should have no errors for basic data - no ACA", () => {
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
        true,
        OMSData(2023)
      ) as DefaultFormData,
      validationCallbacks: [],
    });

    expect(errors.length).toBe(0);
  });

  it("should have no errors for no data", () => {
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

  it("should have errors for not filling data into selected checkboxes", () => {
    const errors = omsValidations({
      categories,
      qualifiers,
      locationDictionary,
      dataSource: [],
      checkIsFilled: true,
      data: generateOmsFormData(
        generateOmsQualifierRateData(categories, qualifiers, [{}, {}]),
        true
      ) as DefaultFormData,
      validationCallbacks: [],
    });

    expect(errors.length).toBe(136);
    expect(
      errors.some((e) =>
        e.errorMessage.includes("Must fill out at least one NDR set.")
      )
    );
    expect(
      errors.some((e) =>
        e.errorMessage.includes(
          "For any category selected, all NDR sets must be filled."
        )
      )
    );
  });

  it("should have errors from callbacks for every node", () => {
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
