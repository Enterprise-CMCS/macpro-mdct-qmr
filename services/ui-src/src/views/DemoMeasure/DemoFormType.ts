export namespace DemoForm {
  export interface DemoFormType {
    areYouReporting: string;
    statusOfData: StatusOfData;
    dataSource: DataSource;
  }

  export interface StatusOfData {
    status: string;
    statusOfDataAdditional?: string;
  }

  export interface DataSource {
    "reporting.selections": string[];
    "adminData.selections"?: string[];
    "adminData.other.dataSource"?: string;
    "adminData.other.explain"?: string;
  }
}
