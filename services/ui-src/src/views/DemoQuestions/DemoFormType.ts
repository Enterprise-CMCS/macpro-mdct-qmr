export namespace DemoForm {
  export interface DemoFormType {
    areYouReporting: string;
    statusOfDataReporting: StatusOfDataReportingNested;
    dataSource: any;
  }

  export interface StatusOfDataReportingNested {
    statusOfDataReporting: string;
    statusOfDataReportingAdditional?: string;
  }
}

