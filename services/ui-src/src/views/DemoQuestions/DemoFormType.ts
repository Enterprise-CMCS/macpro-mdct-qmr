export interface DemoFormType {
  areYouReporting: string;
  statusOfDataReporting: StatusOfDataReportingNested;
}

interface StatusOfDataReportingNested {
  statusOfDataReporting: string;
  statusOfDataReportingAdditional?: string;
}
