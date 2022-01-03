import Joi from "joi";
import { Measure } from "./types";

const RateJoiValidator = Joi.array().items(
  Joi.object({
    numerator: Joi.string(),
    denominator: Joi.string(),
    rate: Joi.string(),
  })
);

const OptionalMeasureStratificationRateJoi = Joi.object({
  ageData: Joi.array().items(Joi.string()),
  subRates: Joi.array().items(RateJoiValidator),
  total: RateJoiValidator,
});

const startDateRangeValidator = (endDateRangeLabel: string) => {
  const now = new Date();
  const validMonth = now.getMonth() + 2;
  console.log(`now.getMonth()`, now.getMonth());
  console.log(`validMonth`, validMonth);
  return Joi.object({
    selectedMonth: Joi.number()
      // not in the future
      .when(Joi.ref("selectedYear"), {
        is: now.getFullYear(),
        then: Joi.number()
          .less(validMonth)
          .message("Start Date Month cannot be in the future."),
      })

      // less than end date
      .when(Joi.ref(`...${endDateRangeLabel}.selectedYear`), {
        is: Joi.ref("selectedYear"),
        then: Joi.number()
          .less(Joi.ref(`...${endDateRangeLabel}.selectedMonth`))
          .message("Start Date cannot be equal or greater than End Date."),
      })

      .label("Start Month"),
    selectedYear: Joi.number()
      // not in the future
      .less(new Date().getFullYear() + 1)
      .message("Start Date Year cannot be in the future.")
      .max(Joi.ref(`...${endDateRangeLabel}.selectedYear`))
      .message("Start Year cannot be after End Year.")
      .label("Start Year"),
  });
};

// This is the validation schema for any/all state measures
export const validationSchema = Joi.object<Measure.Form>({
  //Report
  DidReport: Joi.string().label("Are you reporting"),

  //Status
  DataStatus: Joi.string().label("Status of Data Reported"),
  "DataStatus-ProvisionalExplanation": Joi.string(),

  //DataSource
  DataSource: Joi.array().items(Joi.string()),
  "DataSource-Administrative": Joi.array().items(Joi.string()),
  "DataSource-Administrative-Other": Joi.string(),
  "DataSource-Administrative-Other-Explanation": Joi.string(),
  "DataSource-Other": Joi.string(),
  "DataSource-Other-Explanation": Joi.string(),
  "DataSource-Hybrid": Joi.array().items(Joi.string()),
  "DataSource-Hybrid-Other": Joi.string(),
  "DataSource-Hybrid-Other-Explanation": Joi.string(),
  "DataSource-Hybrid-MedicalRecord-DataSoruce": Joi.string(),
  "DataSource-ElectronicHealthRecords": Joi.string(),
  "DataSource-ElectronicHealthRecords-Explanation": Joi.string(),

  //CombinedRates
  CombinedRates: Joi.string(),
  "CombinedRates-CombinedRates": Joi.string(),
  "CombinedRates-CombinedRates-Other-Explanation": Joi.string(),

  //MeasurementSpecification
  MeasurementSpecification: Joi.string(),
  "MeasurementSpecification-HEDISVersion": Joi.string(),
  "MeasurementSpecification-OtherMeasurementSpecificationDescription":
    Joi.string(),
  "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload":
    Joi.array().items(Joi.any()),

  //WhyAreYouNotReporting
  WhyAreYouNotReporting: Joi.array().items(Joi.string()),
  AmountOfPopulationNotCovered: Joi.string(),
  PartialPopulationNotCoveredExplanation: Joi.string(),
  WhyIsDataNotAvailable: Joi.array().items(Joi.string()),
  "WhyIsDataNotAvailable-Other": Joi.string(),
  DataIconAccuracyIssues: Joi.string(),
  DataSourceNotEasilyAccessible: Joi.array().items(Joi.string()),
  "DataSourceNotEasilyAccessible-Other": Joi.string(),
  InformationNotCollected: Joi.array().items(Joi.string()),
  "InformationNotCollected-Other": Joi.string(),
  LimitationWithDatCollecitonReportAccuracyCovid: Joi.string(),
  SmallSampleSizeLessThan30: Joi.string(),
  "WhyAreYouNotReporting-Other": Joi.string(),

  //AdditionalNotes
  "AdditionalNotes-AdditionalNotes": Joi.string(),
  "AdditionalNotes-Upload": Joi.array().items(Joi.any()),

  //OttherPerformanceMeasure
  "OtherPerformanceMeasure-Explanation": Joi.string(),
  "OtherPerformanceMeasure-Notes": Joi.string(),
  "OtherPerformanceMeasure-Rates-TextInput": Joi.string(),
  "OtherPerformanceMeasure-Rates": Joi.array()
    .items(
      Joi.object({
        description: Joi.string().empty(""),
        rate: RateJoiValidator,
      })
    )
    .sparse(),

  //DefinitionOfPopulation
  DefinitionOfDenominator: Joi.array().items(Joi.string()),
  "DefinitionOfDenominator-Other": Joi.string(),
  ChangeInPopulationExplanation: Joi.string(),
  DenominatorDefineTotalTechSpec: Joi.string(),
  "DenominatorDefineTotalTechSpec-No-Explanation": Joi.string(),
  "DenominatorDefineTotalTechSpec-No-Size": Joi.string().empty(""),
  DeliverySysRepresentationDenominator: Joi.array().items(Joi.string()),
  "DeliverySys-FreeForService": Joi.string(),
  "DeliverySys-FreeForService-No-Percent": Joi.string(),
  "DeliverySys-FreeForService-No-Population": Joi.string(),
  "DeliverySys-PrimaryCareManagement": Joi.string(),
  "DeliverySys-PrimaryCareManagement-No-Percent": Joi.string(),
  "DeliverySys-PrimaryCareManagement-No-Population": Joi.string().empty(""),
  "DeliverySys-MCO_POHP": Joi.string(),
  "DeliverySys-MCO_POHP-Percent": Joi.string(),
  "DeliverySys-MCO_POHP-NumberOfPlans": Joi.string().empty(""),
  "DeliverySys-MCO_POHP-No-Included": Joi.string(),
  "DeliverySys-MCO_POHP-No-Excluded": Joi.string(),
  "DeliverySys-IntegratedCareModel": Joi.string(),
  "DeliverySys-IntegratedCareModel-No-Percent": Joi.string(),
  "DeliverySys-IntegratedCareModel-No-Population": Joi.string().empty(""),
  "DeliverySys-Other": Joi.string(),
  "DeliverySys-Other-Percent": Joi.string(),
  "DeliverySys-Other-NumberOfHealthPlans": Joi.string(),
  "DeliverySys-Other-Population": Joi.string(),

  //DeviationFromMeasureSpec
  DidCalculationsDeviate: Joi.string(),
  DeviationOptions: Joi.array().items(Joi.string()),
  "DeviationOptions-Within7-AgeRange": Joi.array().items(Joi.string()),
  "DeviationFields-Within7": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator"),
        denominator: Joi.string().label("Denominator"),
        other: Joi.string().label("Other"),
      })
    )
    .sparse(),
  "DeviationFields-Within30": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator"),
        denominator: Joi.string().label("Denominator"),
        other: Joi.string().label("Other"),
      })
    )
    .sparse(),
  "DeviationOptions-Within30-AgeRange": Joi.array().items(Joi.string()),
  "PerformanceMeasure-Explanation": Joi.string(),
  "PerformanceMeasure-AgeRates-30Days": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator"),
        denominator: Joi.string().label("Denominator"),
        other: Joi.string().label("Other"),
        id: Joi.string(),
        label: Joi.string(),
        rate: Joi.string(),
      })
    )
    .sparse(),
  "PerformanceMeasure-AgeRates-7Days": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator"),
        denominator: Joi.string().label("Denominator"),
        other: Joi.string().label("Other"),
        id: Joi.string(),
        label: Joi.string(),
        rate: Joi.string(),
      })
    )
    .sparse(),
  DateRange: Joi.object({
    endDate: Joi.object({
      selectedMonth: Joi.number().label("End Month"),
      selectedYear: Joi.number().label("End Year"),
    }),
    startDate: startDateRangeValidator("endDate"),
  }),

  //OptionalMeasureStratification
  CategoriesReported: Joi.array().items(Joi.string()),

  AddtnlEthnicity: Joi.array().items(Joi.string()),
  AddtnlEthnicityRates: Joi.array().items(OptionalMeasureStratificationRateJoi),

  AddtnlNonHispanicRace: Joi.array().items(Joi.string()),
  AddtnlNonHispanicRaceAggregation: Joi.array().items(Joi.string()),
  AddtnlNonHispanicRaceRates: Joi.array().items(
    OptionalMeasureStratificationRateJoi
  ),

  AddtnlNonHispanicSubCat: Joi.array().items(Joi.string()),
  AddtnlNonHispanicSubCatRates: Joi.array().items(
    OptionalMeasureStratificationRateJoi
  ),

  NonHispanicRacialCategories: Joi.array().items(Joi.string()),
  "NHRC-WhiteRates": OptionalMeasureStratificationRateJoi,
  "NHRC-BlackOrAfricanAmericanRates": OptionalMeasureStratificationRateJoi,
  "NHRC-AmericanIndianOrAlaskaNativeRates":
    OptionalMeasureStratificationRateJoi,
  "NHRC-AggregateAsianRates": OptionalMeasureStratificationRateJoi,
  "NHRC-IndependentAsianRates": Joi.array()
    .items(OptionalMeasureStratificationRateJoi)
    .sparse(),
  "NHRC-AggregateHawaiianOrPacificIslanderRates":
    OptionalMeasureStratificationRateJoi,
  "NHRC-IndependentHawaiianOrPacificIslanderRates": Joi.array()
    .items(OptionalMeasureStratificationRateJoi)
    .sparse(),

  EthnicityCategories: Joi.array().items(Joi.string()),
  NonHispanicEthnicityRates: OptionalMeasureStratificationRateJoi,
  HispanicIndependentReporting: Joi.string(),
  HispanicEthnicityAggregateRate: OptionalMeasureStratificationRateJoi,
  IndependentHispanicOptions: Joi.array().items(Joi.string()),
  IndependentHispanicRates: Joi.array()
    .items(OptionalMeasureStratificationRateJoi)
    .sparse(),

  AsianIndependentReporting: Joi.string(),
  IndependentAsianOptions: Joi.array().items(Joi.string()),
  NativeHawaiianIndependentReporting: Joi.string(),
  IndependentNativeHawaiianOptions: Joi.array().items(Joi.string()),

  SexOptions: Joi.array().items(Joi.string()),
  MaleSexRates: OptionalMeasureStratificationRateJoi,
  FemaleSexRates: OptionalMeasureStratificationRateJoi,

  AddtnlPrimaryLanguage: Joi.array().items(Joi.string()),
  PrimaryLanguageOptions: Joi.array().items(Joi.string()),
  AddtnlPrimaryLanguageRates: Joi.array().items(
    OptionalMeasureStratificationRateJoi
  ),
  EnglishLanguageRate: OptionalMeasureStratificationRateJoi,
  SpanishLanguageRate: OptionalMeasureStratificationRateJoi,

  DisabilityStatusOptions: Joi.array().items(Joi.string()),
  DisabilitySSIRate: OptionalMeasureStratificationRateJoi,
  DisabilityNonSSIRate: OptionalMeasureStratificationRateJoi,
  AddtnlDisabilityStatusDesc: Joi.string(),
  AddtnlDisabilityRate: OptionalMeasureStratificationRateJoi,

  GeographyOptions: Joi.array().items(Joi.string()),
  UrbanGeographyRate: OptionalMeasureStratificationRateJoi,
  RuralGeographyRate: OptionalMeasureStratificationRateJoi,
  AddtnlGeographyDesc: Joi.string(),
  AddtnlGeographyRate: OptionalMeasureStratificationRateJoi,

  ACAGroupRate: OptionalMeasureStratificationRateJoi,
});
