import * as DC from "dataConstants";

export interface StatusOfData {
  [DC.DATA_STATUS]:
    | typeof DC.REPORTING_FINAL_DATA
    | typeof DC.REPORTING_PROVISIONAL_DATA;
  [DC.DATA_STATUS_PROVISIONAL_EXPLAINATION]: string;
}
