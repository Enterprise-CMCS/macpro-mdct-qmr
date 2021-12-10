export namespace DemoForm {
  export interface DemoFormType {
    DidReport: string;
    DataStatus: string[];
    DataSource: string[];
    "DataStatus-ProvisionalExplanation": string;
    "DataSource-Administrative"?: string[];
    "DataSource-Administrative-Other"?: string;
    "DataSource-Administrative-Other-Explanation"?: string;
    "DataSource-Other": string;
    "DataSource-Other-Explanation": string;
    "DataSource-Hybrid"?: string[];
    "DataSource-Hybrid-Other"?: string;
    "DataSource-Hybrid-Other-Explanation"?: string;
    "DataSource-Hybrid-MedicalRecord-DataSoruce"?: string;
    "DataSource-ElectronicHealthRecords"?: string;
    "DataSource-ElectronicHealthRecords-Explanation"?: string;
    "AdditionalNotes-AdditionalNotes"?: string;
    "AdditionalNotes-Upload"?: File[];
  }
}
