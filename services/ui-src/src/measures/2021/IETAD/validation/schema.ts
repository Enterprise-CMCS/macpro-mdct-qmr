import Joi from "joi";
import { Measure } from "./types";

const RateJoiValidator = Joi.array().items(
  Joi.object({
    numerator: Joi.string().empty(""),
    denominator: Joi.string().empty(""),
    rate: Joi.string().empty(""),
  })
);

const OptionalMeasureStratificationRateJoi = Joi.object({
  ageData: Joi.array().items(Joi.string().empty("")),
  subRates: Joi.array().items(Joi.any()),
  total: RateJoiValidator,
});

const startDateRangeValidator = (endDateRangeLabel: string) => {
  const now = new Date();
  const validMonth = now.getMonth() + 1;
  return Joi.object({
    selectedMonth: Joi.number()
      // not in the future
      .when(Joi.ref("selectedYear"), {
        is: now.getFullYear(),
        then: Joi.number()
          .max(validMonth)
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
  DidReport: Joi.string().label("Are you reporting").empty(""),

  //Status
  DataStatus: Joi.string().label("Status of Data Reported").empty(""),
  "DataStatus-ProvisionalExplanation": Joi.string().empty(""),

  //DataSource
  DataSource: Joi.array().items(Joi.string().empty("")),
  "DataSource-Administrative": Joi.array().items(Joi.string().empty("")),
  "DataSource-Administrative-Other": Joi.string().empty(""),
  "DataSource-Administrative-Other-Explanation": Joi.string().empty(""),
  "DataSource-Electronic": Joi.string().empty(""),
  "DataSource-Electronic-Explanation": Joi.string().empty(""),
  "DataSource-Other": Joi.string().empty(""),
  "DataSource-Other-Explanation": Joi.string().empty(""),
  "DataSource-Hybrid": Joi.array().items(Joi.string().empty("")),
  "DataSource-Hybrid-Other": Joi.string().empty(""),
  "DataSource-Hybrid-Other-Explanation": Joi.string().empty(""),
  "DataSource-Hybrid-MedicalRecord-DataSoruce": Joi.string().empty(""),
  "DataSource-ElectronicHealthRecords": Joi.string().empty(""),
  "DataSource-ElectronicHealthRecords-Explanation": Joi.string().empty(""),

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

  //WhyAreYouNotReporting
  WhyAreYouNotReporting: Joi.array().items(Joi.string().empty("")),
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
  "WhyAreYouNotReporting-Other": Joi.string().empty(""),

  //AdditionalNotes
  "AdditionalNotes-AdditionalNotes": Joi.string().empty(""),
  "AdditionalNotes-Upload": Joi.array().items(Joi.any()),

  //OttherPerformanceMeasure
  "OtherPerformanceMeasure-Explanation": Joi.string().empty(""),
  "OtherPerformanceMeasure-Notes": Joi.string().empty(""),
  "OtherPerformanceMeasure-Rates-TextInput": Joi.string().empty(""),
  "OtherPerformanceMeasure-Rates": Joi.array()
    .items(
      Joi.object({
        description: Joi.string().empty(""),
        rate: RateJoiValidator,
      })
    )
    .sparse(),

  //DefinitionOfPopulation
  DefinitionOfDenominator: Joi.array().items(Joi.string().empty("")),
  "DefinitionOfDenominator-Other": Joi.string().empty(""),
  ChangeInPopulationExplanation: Joi.string().empty(""),
  DenominatorDefineTotalTechSpec: Joi.string().empty(""),
  "DenominatorDefineTotalTechSpec-No-Explanation": Joi.string().empty(""),
  "DenominatorDefineTotalTechSpec-No-Size": Joi.string().empty(""),
  DeliverySysRepresentationDenominator: Joi.array().items(
    Joi.string().empty("")
  ),
  "DeliverySys-FreeForService": Joi.string().empty(""),
  "DeliverySys-FreeForService-No-Percent": Joi.string().empty(""),
  "DeliverySys-FreeForService-No-Population": Joi.string().empty(""),
  "DeliverySys-PrimaryCareManagement": Joi.string().empty(""),
  "DeliverySys-PrimaryCareManagement-No-Percent": Joi.string().empty(""),
  "DeliverySys-PrimaryCareManagement-No-Population": Joi.string().empty(""),
  "DeliverySys-MCO_POHP": Joi.string().empty(""),
  "DeliverySys-MCO_POHP-Percent": Joi.string().empty(""),
  "DeliverySys-MCO_POHP-NumberOfPlans": Joi.string().empty(""),
  "DeliverySys-MCO_POHP-No-Included": Joi.string().empty(""),
  "DeliverySys-MCO_POHP-No-Excluded": Joi.string().empty(""),
  "DeliverySys-IntegratedCareModel": Joi.string().empty(""),
  "DeliverySys-IntegratedCareModel-No-Percent": Joi.string().empty(""),
  "DeliverySys-IntegratedCareModel-No-Population": Joi.string().empty(""),
  "DeliverySys-Other": Joi.string().empty(""),
  "DeliverySys-Other-Percent": Joi.string().empty(""),
  "DeliverySys-Other-NumberOfHealthPlans": Joi.string().empty(""),
  "DeliverySys-Other-Population": Joi.string().empty(""),

  //DeviationFromMeasureSpec
  DidCalculationsDeviate: Joi.string().empty(""),
  DeviationOptions: Joi.array().items(Joi.string().empty("")),
  "DeviationOptions-Within7-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-Within7": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationFields-Within30": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-Within30-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationOptions-InitAlcohol-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-InitAlcohol": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-EngageAlcohol-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-EngageAlcohol": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-InitOpioid-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-InitOpioid": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-EngageOpioid-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-EngageOpioid": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-InitOther-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-InitOther": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-EngageOther-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-EngageOther": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-InitTotal-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-InitTotal": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "DeviationOptions-EngageTotal-AgeRange": Joi.array().items(
    Joi.string().empty("")
  ),
  "DeviationFields-EngageTotal": Joi.array()
    .items(
      Joi.object({
        options: Joi.array().items(Joi.string()),
        numerator: Joi.string().label("Numerator").empty(""),
        denominator: Joi.string().label("Denominator").empty(""),
        other: Joi.string().label("Other").empty(""),
      })
    )
    .sparse(),
  "PerformanceMeasure-Explanation": Joi.string().empty(""),
  "PerformanceMeasure-AgeRates-30Days": RateJoiValidator,
  "PerformanceMeasure-AgeRates-7Days": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Initiation-Alcohol": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Engagement-Alcohol": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Initiation-Opioid": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Engagement-Opioid": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Initiation-Other": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Engagement-Other": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Initiation-Total": RateJoiValidator,
  "PerformanceMeasure-AgeRates-Engagement-Total": RateJoiValidator,
  DateRange: Joi.object({
    endDate: Joi.object({
      selectedMonth: Joi.number().label("End Month"),
      selectedYear: Joi.number().label("End Year"),
    }),
    startDate: startDateRangeValidator("endDate"),
  }),

  //OptionalMeasureStratification
  CategoriesReported: Joi.array().items(Joi.string().empty("")),

  AddtnlEthnicity: Joi.array().items(Joi.string().empty("")).sparse(),
  AddtnlEthnicityRates: Joi.array().items(OptionalMeasureStratificationRateJoi),

  AddtnlNonHispanicRace: Joi.array().items(Joi.string()),
  AddtnlNonHispanicRaceRates: Joi.array().items(
    OptionalMeasureStratificationRateJoi
  ),
  AddtnlNonHispanicRaceSubCatTitle: Joi.array()
    .items(Joi.array().items(Joi.string()).sparse())
    .sparse(),
  AddtnlNonHispanicRaceSubCatOptions: Joi.array()
    .items(Joi.array().items(Joi.string()).sparse())
    .sparse(),
  AddtnlNonHispanicRaceSubCatRates: Joi.array()
    .items(Joi.array().items(OptionalMeasureStratificationRateJoi).sparse())
    .sparse(),

  AddtnlNonHispanicSubCat: Joi.array().items(Joi.string().empty("")),
  AddtnlNonHispanicSubCatRates: Joi.array().items(
    OptionalMeasureStratificationRateJoi
  ),

  NonHispanicRacialCategories: Joi.array().items(Joi.string().empty("")),
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
  EthnicitySubCategories: Joi.array().items(Joi.string()),
  NonHispanicEthnicityRates: OptionalMeasureStratificationRateJoi,
  HispanicIndependentReporting: Joi.string().empty(""),
  HispanicEthnicityAggregateRate: OptionalMeasureStratificationRateJoi,
  IndependentHispanicOptions: Joi.array().items(Joi.string().empty("")),
  IndependentHispanicRates: Joi.array()
    .items(OptionalMeasureStratificationRateJoi)
    .sparse(),

  AsianIndependentReporting: Joi.string().empty(""),
  IndependentAsianOptions: Joi.array().items(Joi.string().empty("")),
  NativeHawaiianIndependentReporting: Joi.string().empty(""),
  IndependentNativeHawaiianOptions: Joi.array().items(Joi.string().empty("")),

  SexOptions: Joi.array().items(Joi.string().empty("")),
  MaleSexRates: OptionalMeasureStratificationRateJoi,
  FemaleSexRates: OptionalMeasureStratificationRateJoi,

  AddtnlPrimaryLanguage: Joi.array().items(Joi.string().empty("")),
  PrimaryLanguageOptions: Joi.array().items(Joi.string().empty("")),
  AddtnlPrimaryLanguageRates: Joi.array().items(
    OptionalMeasureStratificationRateJoi
  ),
  EnglishLanguageRate: OptionalMeasureStratificationRateJoi,
  SpanishLanguageRate: OptionalMeasureStratificationRateJoi,

  DisabilityStatusOptions: Joi.array().items(Joi.string().empty("")),
  DisabilitySSIRate: OptionalMeasureStratificationRateJoi,
  DisabilityNonSSIRate: OptionalMeasureStratificationRateJoi,
  AddtnlDisabilityStatusDesc: Joi.string().empty(""),
  AddtnlDisabilityRate: OptionalMeasureStratificationRateJoi,

  GeographyOptions: Joi.array().items(Joi.string().empty("")),
  UrbanGeographyRate: OptionalMeasureStratificationRateJoi,
  RuralGeographyRate: OptionalMeasureStratificationRateJoi,
  AddtnlGeographyDesc: Joi.string().empty(""),
  AddtnlGeographyRate: OptionalMeasureStratificationRateJoi,

  ACAGroupRate: OptionalMeasureStratificationRateJoi,
});
