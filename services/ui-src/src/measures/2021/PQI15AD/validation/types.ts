import * as Types from "../../CommonQuestions/types";

export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    measureId: string;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }

  export interface Form
    extends Types.AdditionalNotes,
      Types.StatusOfData,
      Types.WhyAreYouNotReporting,
      Types.DidReport,
      Types.CombinedRates,
      Types.DateRange,
      Types.DefinitionOfPopulation,
      Types.MeasurementSpecification,
      Types.OtherPerformanceMeasure,
      Types.OptionalMeasureStratification,
      Types.PerformanceMeasure {
    //DataSource
    DataSource: string[];
    "DataSource-Administrative"?: string[];
    "DataSource-Administrative-Other"?: string;
    "DataSource-Administrative-Other-Explanation"?: string;
    "DataSource-Other": string;
    "DataSource-Other-Explanation": string;

    //DeviationFromMeasureSpec
    DidCalculationsDeviate: string;
    DeviationOptions: string[];
    "DeviationOptions-AgeRanges": string[];
    DeviationFields: {
      options: string[];
      denominator: string;
      numerator: string;
      other: string;
    };
  }
}
