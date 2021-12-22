import Joi from "joi";
import { Measure } from "./types";

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
  "PerformanceMeassure-AgeRates-30Days": Joi.array()
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
  "PerformanceMeassure-AgeRates-7Days": Joi.array()
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
});
