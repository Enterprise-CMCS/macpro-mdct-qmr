import * as Types from "../../CommonQuestions/types";
export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }

  export interface Form
    extends Types.DefinitionOfPopulation,
      Types.DateRange,
      Types.DidReport,
      Types.WhyAreYouNotReporting,
      Types.StatusOfData,
      Types.AdditionalNotes,
      Types.CombinedRates,
      Types.OtherPerformanceMeasure,
      Types.DataSource,
      Types.MeasurementSpecification,
      Types.PerformanceMeasure {
    //DeviationFromMeasureSpec
    DidCalculationsDeviate: string;
    DeviationOptions: string[];
    "DeviationOptions-InitAlcohol-AgeRange": string[];
    "DeviationFields-InitAlcohol": Types.DeviationFields;

    "DeviationOptions-EngageAlcohol-AgeRange": string[];
    "DeviationFields-EngageAlcohol": Types.DeviationFields;

    "DeviationOptions-InitOpioid-AgeRange": string[];
    "DeviationFields-InitOpioid": Types.DeviationFields;

    "DeviationOptions-EngageOpioid-AgeRange": string[];
    "DeviationFields-EngageOpioid": Types.DeviationFields;

    "DeviationOptions-InitOther-AgeRange": string[];
    "DeviationFields-InitOther": Types.DeviationFields;

    "DeviationOptions-EngageOther-AgeRange": string[];
    "DeviationFields-EngageOther": Types.DeviationFields;

    "DeviationOptions-InitTotal-AgeRange": string[];
    "DeviationFields-InitTotal": Types.DeviationFields;

    "DeviationOptions-EngageTotal-AgeRange": string[];
    "DeviationFields-EngageTotal": Types.DeviationFields;
  }
}
