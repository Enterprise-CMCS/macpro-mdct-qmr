import * as DC from "dataConstants";

type YesNo = typeof DC.YES | typeof DC.NO;

export interface DidReport {
  [DC.DID_REPORT]: YesNo;
}
