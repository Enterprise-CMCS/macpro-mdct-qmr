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

describe("Test Data Driven Tools", () => {
  const categories = ["TestCat1", "TestCat2"];
  const qualifiers = ["TestQual1", "TestQual2"];

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
      const func = omsLocationDictionary(OMSData(2022), qualifiers, categories);
      expect(func(qualifiers)).toBe(`${qualifiers[0]} - ${qualifiers[1]}`);
      expect(func(categories)).toBe(`${categories[0]} - ${categories[1]}`);
      expect(func([qualifiers[0]])).toBe(qualifiers[0]);
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
      expect(dictionary?.[categories[0]]).toBe(categories[0]);
      expect(dictionary?.[categories[1]]).toBe(categories[1]);
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
