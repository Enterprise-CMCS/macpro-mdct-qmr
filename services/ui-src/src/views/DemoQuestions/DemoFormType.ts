export namespace DemoForm {
  export interface DemoFormType {
    areYouReporting: string;
    statusOfDataReporting: StatusOfDataReportingNested;
  }

  export interface StatusOfDataReportingNested {
    statusOfDataReporting: string;
    statusOfDataReportingAdditional?: string;
  }
}
