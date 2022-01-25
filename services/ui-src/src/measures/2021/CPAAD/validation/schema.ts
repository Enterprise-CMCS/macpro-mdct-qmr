import Joi from "joi";
import { Measure } from "./types";

// This is the validation schema for any/all state measures
export const validationSchema = Joi.object<Measure.Form>({
  //Report
  DidCollect: Joi.string().label("Did you collect").empty(""),

  //HowDidYouReport
  HowDidYouReport: Joi.string()
    .label("How did you report this measure?")
    .empty(""),
  "HowDidYouReport-Explanation": Joi.string().empty(""),

  //DataSource
  "DataSource-Included-ItemSets": Joi.array().items(Joi.string().empty("")),
  "DataSource-Included-ItemSets-Other": Joi.string().empty(""),
  "DataSource-CAHPS-Version": Joi.string().empty(""),
  "DataSource-CAHPS-Version-Other": Joi.string().empty(""),
  "DataSource-Admin-Protocol": Joi.string().empty(""),

  //CombinedRates
  CombinedRates: Joi.string().empty(""),
  "CombinedRates-CombinedRates": Joi.string().empty(""),
  "CombinedRates-CombinedRates-Other-Explanation": Joi.string().empty(""),

  //MeasurementSpecification
  MeasurementSpecification: Joi.string().empty(""),
  "MeasurementSpecification-HEDISVersion": Joi.string().empty(""),
  "MeasurementSpecification-OtherMeasurementSpecificationDescription":
    Joi.string().empty(""),
  "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload":
    Joi.array().items(Joi.any()),

  //WhyDidYouNotCollect
  WhyDidYouNotCollect: Joi.array().items(Joi.string().empty("")),
  AmountOfPopulationNotCovered: Joi.string().empty(""),
  PartialPopulationNotCoveredExplanation: Joi.string().empty(""),
  WhyIsDataNotAvailable: Joi.array().items(Joi.string().empty("")),
  "WhyIsDataNotAvailable-Other": Joi.string().empty(""),
  DataIconAccuracyIssues: Joi.string().empty(""),
  DataSourceNotEasilyAccessible: Joi.array().items(Joi.string().empty("")),
  "DataSourceNotEasilyAccessible-Other": Joi.string().empty(""),
  InformationNotCollected: Joi.array().items(Joi.string().empty("")),
  "InformationNotCollected-Other": Joi.string().empty(""),
  LimitationWithDatCollecitonReportAccuracyCovid: Joi.string().empty(""),
  SmallSampleSizeLessThan30: Joi.string().empty(""),
  "WhyDidYouNotCollect-Other": Joi.string().empty(""),

  //AdditionalNotes
  "AdditionalNotes-AdditionalNotes": Joi.string().empty(""),
  "AdditionalNotes-Upload": Joi.array().items(Joi.any()),

  //DefinitionOfPopulation
  DefinitionOfSurveySample: Joi.array().items(Joi.string().empty("")),
  "DefinitionOfSurveySample-Other": Joi.string().empty(""),
});
