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

// This is the validation schema for any/all state measures
export const validationSchema = Joi.object<Measure.Form>({
  DidReport: Joi.string().label("Are you reporting"),
  DataStatus: Joi.string().label("Status of Data Reported"),
  DataSource: Joi.array().items(Joi.string()),
  "DataStatus-ProvisionalExplanation": Joi.string(),
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
  CombinedRates: Joi.string(),
  "CombinedRates-CombinedRates": Joi.string(),
  "CombinedRates-CombinedRates-Other-Explanation": Joi.string(),
  MeasurementSpecification: Joi.string(),
  "MeasurementSpecification-HEDISVersion": Joi.string(),
  "MeasurementSpecification-OtherMeasurementSpecificationDescription":
    Joi.string(),
  "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload":
    Joi.array().items(Joi.any()),
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
  "AdditionalNotes-AdditionalNotes": Joi.string(),
  "AdditionalNotes-Upload": Joi.array().items(Joi.any()),
  "OtherPerformanceMeasure-Explanation": Joi.string(),
  "OtherPerformanceMeasure-Notes": Joi.string(),
  "OtherPerformanceMeasure-Rates-TextInput": Joi.string(),
  "OtherPerformanceMeasure-Rates": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator"),
        denominator: Joi.string().label("Denominator"),
        other: Joi.string().label("Other"),
        id: Joi.string(),
        label: Joi.string(),
        rate: Joi.string(),
        description: Joi.string(),
      })
    )
    .sparse(),
  DefinitionOfDenominator: Joi.array().items(Joi.string()),
  "DefinitionOfDenominator-Other": Joi.string(),
  ChangeInPopulationExplanation: Joi.string(),
  DenominatorDefineTotalTechSpec: Joi.string(),
  "DenominatorDefineTotalTechSpec-No-Explanation": Joi.string(),
  "DenominatorDefineTotalTechSpec-No-Size": Joi.string(),
  DeliverySysRepresentationDenominator: Joi.array().items(Joi.string()),
  "DeliverySys-FreeForService": Joi.string(),
  "DeliverySys-FreeForService-No-Percent": Joi.string(),
  "DeliverySys-FreeForService-No-Population": Joi.string(),
  "DeliverySys-PrimaryCareManagement": Joi.string(),
  "DeliverySys-PrimaryCareManagement-No-Percent": Joi.string(),
  "DeliverySys-PrimaryCareManagement-No-Population": Joi.string(),
  "DeliverySys-MCO_POHP": Joi.string(),
  "DeliverySys-MCO_POHP-Percent": Joi.string(),
  "DeliverySys-MCO_POHP-NumberOfPlans": Joi.string(),
  "DeliverySys-MCO_POHP-No-Included": Joi.string(),
  "DeliverySys-MCO_POHP-No-Excluded": Joi.string(),
  "DeliverySys-IntegratedCareModel": Joi.string(),
  "DeliverySys-IntegratedCareModel-No-Percent": Joi.string(),
  "DeliverySys-IntegratedCareModel-No-Population": Joi.string(),
  "DeliverySys-Other": Joi.string(),
  "DeliverySys-Other-Percent": Joi.string(),
  "DeliverySys-Other-NumberOfHealthPlans": Joi.string(),
  "DeliverySys-Other-Population": Joi.string(),
  DidCalculationsDeviate: Joi.string(),
  DeviationOptions: Joi.array().items(Joi.string()),
  DeviationFields: Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator"),
        denominator: Joi.string().label("Denominator"),
        other: Joi.string().label("Other"),
      })
    )
    .sparse(),

  //OptionalMeasureStratification
  CategoriesReported: Joi.array().items(Joi.string()),

  AddtnlEthnicity: Joi.array().items(Joi.string()),

  AddtnlNonHispanicRace: Joi.array().items(Joi.string()),
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
  HispanicIndependentReporting: Joi.string(),
  IndependentHispanicOptions: Joi.array().items(Joi.string()),

  AsianIndependentReporting: Joi.string(),
  IndependentAsianOptions: Joi.array().items(Joi.string()),
  NativeHawaiianIndependentReporting: Joi.string(),
  IndependentNativeHawaiianOptions: Joi.array().items(Joi.string()),
  SexOptions: Joi.array().items(Joi.string()),

  AddtnlPrimaryLanguage: Joi.array().items(Joi.string()),
  PrimaryLanguageOptions: Joi.array().items(Joi.string()),

  DisabilityStatusOptions: Joi.array().items(Joi.string()),
  AddtnlDisabilityStatusDesc: Joi.string(),
  GeographyOptions: Joi.array().items(Joi.string()),
  AddtnlGeographyDesc: Joi.string(),
});
