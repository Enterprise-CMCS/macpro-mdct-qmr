// import { SINGLE_CATEGORY } from "dataConstants";
import {
  convertOmsDataToRateArray,
  //   getDeviationNDRArray,
  //   getPerfMeasureRateArray,
  //   omsLocationDictionary,
  //   performanceMeasureErrorLocationDicitonary,
} from "./dataDrivenTools";

describe("Test Data Driven Tools", () => {
  const categories = ["TestCat1", "TestCat2"];
  const qualifiers = ["TestQual1", "TestQual2"];
  //   const singleCat = [SINGLE_CATEGORY];
  //   const noCats = [];

  describe("convertOmsDataToRateArray", () => {
    it("should take an oms structure and return an array or rate arrays", () => {
      expect(
        convertOmsDataToRateArray(categories, qualifiers, {})
      ).toBeTruthy();
    });
  });
});
