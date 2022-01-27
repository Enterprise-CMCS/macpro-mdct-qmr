import Joi from "joi";

export namespace Measure {
  export interface Props {
    name: string;
    year: string;
    handleSubmit?: any;
    handleValidation?: any;
    setMeasureSchema?: React.Dispatch<
      React.SetStateAction<Joi.ObjectSchema<any>>
    >;
    setValidationFunctions?: React.Dispatch<React.SetStateAction<any>>;
  }
  export interface Form {
    //Report
    DidCollect: string;

    //HowDidYouReport
    HowDidYouReport: string[];
    "HowDidYouReport-Explanation": string;

    //DataSource
    "DataSource-Included-ItemSets": string[];
    "DataSource-Included-ItemSets-Other": string;
    "DataSource-CAHPS-Version": string;
    "DataSource-CAHPS-Version-Other": string;
    "DataSource-Admin-Protocol": string;
    "DataSource-Admin-Protocol-Other": string;

    //CombinedRates
    CombinedRates: string;
    "CombinedRates-CombinedRates": string;
    "CombinedRates-CombinedRates-Other-Explanation": string;

    //MeasurementSpecification
    MeasurementSpecification: string;
    "MeasurementSpecification-HEDISVersion": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription": string;
    "MeasurementSpecification-OtherMeasurementSpecificationDescription-Upload": File;

    //WhyDidYouNotCollect
    WhyDidYouNotCollect: string[];
    AmountOfPopulationNotCovered: string;
    PopulationNotCovered: string;
    PartialPopulationNotCoveredExplanation: string;
    WhyIsDataNotAvailable: string;
    "WhyIsDataNotAvailable-Other": string;
    DataIconAccuracyIssues: string;
    DataSourceNotEasilyAccessible: string;
    "DataSourceNotEasilyAccessible-Other": string;
    InformationNotCollected: string;
    "InformationNotCollected-Other": string;
    LimitationWithDatCollecitonReportAccuracyCovid: string;
    SmallSampleSizeLessThan30: string;
    "WhyDidYouNotCollect-Other": string;

    //AdditionalNotes
    "AdditionalNotes-AdditionalNotes"?: string;
    "AdditionalNotes-Upload"?: File[];

    //DefinitionOfPopulation
    DefinitionOfSurveySample: string[];
    "DefinitionOfSurveySample-Other": string;
    "DefinitionOfSurveySample-Changes": string;
  }
}
