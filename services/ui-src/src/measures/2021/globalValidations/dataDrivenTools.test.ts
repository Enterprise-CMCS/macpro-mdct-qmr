import { LabelData } from "utils/getLabelText";
import { SINGLE_CATEGORY, PERFORMANCE_MEASURE } from "dataConstants";
import { OMSData } from "shared/commonQuestions/OptionalMeasureStrat/data";
import {
  generateOmsQualifierRateData,
  generatePmQualifierRateData,
  simpleRate,
} from "utils/testUtils/validationHelpers";
import {
  convertOmsDataToRateArray,
  getPerfMeasureRateArray,
  omsLocationDictionary,
  performanceMeasureErrorLocationDicitonary,
  getDeviationNDRArray,
} from "./dataDrivenTools";

jest.mock("utils/getLabelText", () => ({
  isLegacyLabel: () => true,
}));

describe("Test Data Driven Tools", () => {
  const categories: LabelData[] = [
    { id: "TestCat1", label: "TestCat1", text: "TestCat1" },
    { id: "TestCat2", label: "TestCat2", text: "TestCat2" },
  ];
  const qualifiers: LabelData[] = [
    { id: "TestQual1", label: "TestQual1", text: "TestQual1" },
    { id: "TestQual2", label: "TestQual2", text: "TestQual2" },
  ];

  describe("convertOmsDataToRateArray", () => {
    it("should take an oms structure and return an array or rate arrays", () => {
      const rateData = generateOmsQualifierRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const arr = convertOmsDataToRateArray(categories, qualifiers, rateData);
      expect(arr.length).toBe(2);
      expect(arr[0].length).toBe(2);
      expect(arr[0][0]).toBe(simpleRate);
    });

    it("should return an empty array if no data", () => {
      const arr = convertOmsDataToRateArray(categories, qualifiers, {});
      expect(arr.length).toBe(2);
      expect(arr[0].length).toBe(2);
      expect(JSON.stringify(arr[0][0])).toBe("{}");
    });
  });

  describe("omsLocationDictionary", () => {
    it("should make a dictionary function", () => {
      const func = omsLocationDictionary(OMSData(2021), qualifiers, categories);
      expect(func(qualifiers.map((item) => item.label))).toBe(
        `${qualifiers[0].label} - ${qualifiers[1].label}`
      );
      expect(func(categories.map((item) => item.label))).toBe(
        `${categories[0].label} - ${categories[1].label}`
      );
      expect(func([qualifiers[0].label])).toBe(qualifiers[0].label);
    });
  });

  describe("getPerfMeasureRateArray", () => {
    it("should return a rate field double array", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        simpleRate,
        simpleRate,
      ]);
      const arr = getPerfMeasureRateArray(data, { categories, qualifiers });
      expect(arr.length).toBe(2);
      expect(arr[0].length).toBe(2);
      expect(arr[0][0]).toBe(simpleRate);
    });
  });

  describe("performanceMeasureErrorLocationDicitonary", () => {
    it("should generate a location dictionary", () => {
      const dictionary = performanceMeasureErrorLocationDicitonary({
        categories,
        qualifiers,
      });
      expect(dictionary?.[categories[0].label]).toBe(categories[0].label);
      expect(dictionary?.[categories[1].label]).toBe(categories[1].label);
      expect(dictionary?.[SINGLE_CATEGORY]).toBe(PERFORMANCE_MEASURE);
    });
  });

  describe("getDeviationNDRArray", () => {
    it("should return empty array if no values passed", () => {
      const data = getDeviationNDRArray([], {});
      expect(data.length).toBe(0);
    });
  });
});
