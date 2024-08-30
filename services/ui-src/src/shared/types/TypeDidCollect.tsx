import * as DC from "dataConstants";

type YesNo = typeof DC.YES | typeof DC.NO;

export interface DidCollect {
  [DC.DID_COLLECT]: YesNo;
}
