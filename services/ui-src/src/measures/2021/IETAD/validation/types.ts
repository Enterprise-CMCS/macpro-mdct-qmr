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
      Types.MeasurementSpecification,
      Types.DeviationFromMeasureSpecification,
      Types.PerformanceMeasure {
    //DataSource
    DataSource: string[];
    "DataSource-Administrative"?: string[];
    "DataSource-Administrative-Other"?: string;
    "DataSource-Administrative-Other-Explanation"?: string;
    "DataSource-Electronic": string;
    "DataSource-Electronic-Explanation": string;
    "DataSource-Other": string;
    "DataSource-Other-Explanation": string;
    "DataSource-ElectronicHealthRecords"?: string;
    "DataSource-ElectronicHealthRecords-Explanation"?: string;
  }
}
