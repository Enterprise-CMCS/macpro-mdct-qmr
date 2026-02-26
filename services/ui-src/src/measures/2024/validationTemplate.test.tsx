import { validationTemplate } from "./validationTemplate";
import * as DC from "dataConstants";
import { data as PMD } from "./BCSAD/data";
import { data as PMD2 } from "./W30CH/data";
import { data as PMD3 } from "./AIFHH/data";
import { data as PMD4 } from "./IUHH/data";
import { data as PMD5 } from "./PCRAD/data";
import { data as PMD6 } from "./APMCH/data";

const data = {
  "AdditionalNotes-AdditionalNotes": "",
  "AdditionalNotes-Upload": [],
  DidCollect: "no",
  "DataStatus-ProvisionalExplanation": "",
  DataStatus: "ReportingFinalData",
  WhyAreYouNotReporting: [],
  AmountOfPopulationNotCovered: "EntirePopulationNotCovered",
  PartialPopulationNotCoveredExplanation: "",
  WhyIsDataNotAvailable: [],
  "WhyIsDataNotAvailable-Other": "",
  DataInconsistenciesAccuracyIssues: "",
  DataSourceNotEasilyAccessible: [],
  "DataSourceNotEasilyAccessible-Other": "",
  InformationNotCollected: [],
  "InformationNotCollected-Other": "",
  LimitationWithDatCollecitonReportAccuracyCovid: "",
  SmallSampleSizeLessThan30: "",
  "WhyAreYouNotReporting-Other": "",
  DidReport: "yes",
  DateRange: {
    [DC.END_DATE]: {
      selectedMonth: 0,
      selectedYear: 0,
    },
    [DC.START_DATE]: {
      selectedMonth: 0,
      selectedYear: 0,
    },
  },
};

describe("Test validationTemplate", () => {
  it("validationTemplate render", () => {
    PMD.validations?.push("validateEqualQualifierDenominatorsPM");
    PMD.validations?.push("validateOneCatRateHigherThanOtherCatPM");
    PMD.validations?.push("ComplexValidateDualPopInformation");
    PMD.validations?.push("ComplexAtLeastOneRateComplete");
    PMD.validations?.push("ComplexNoNonZeroNumOrDenom");
    PMD.validations?.push("ComplexValidateNDRTotals");
    PMD.validations?.push("validateOneQualDenomHigherThanOtherDenomOMS");
    PMD.validations?.push("validateEqualQualifierDenominatorsOMS");
    PMD.validations?.push("validateOneCatRateHigherThanOtherCatOMS");
    PMD.validations?.push("validateOneQualRateHigherThanOtherQualOMS");
    PMD.validations?.push("validateSameDenominatorSetsOMS");
    PMD.validations?.push("validateEqualCategoryDenominatorsOMS");

    //oms validations
    const validations = validationTemplate(data as any, PMD);
    console.log(validations);
  });

  it("W30-CH validation render", () => {
    const validations = validationTemplate(data as any, PMD2);
    console.log(validations);
  });

  it("AIF-HH validation render", () => {
    const validations = validationTemplate(data as any, PMD3);
    console.log(validations);
  });

  it("IU-HH validation render", () => {
    const validations = validationTemplate(data as any, PMD4);
    console.log(validations);
  });

  it("PCR-AD validation render", () => {
    const validations = validationTemplate(data as any, PMD5);
    console.log(validations);
  });

  it("APM-CH validation render", () => {
    const validations = validationTemplate(data as any, PMD6);
    console.log(validations);
  });
});
