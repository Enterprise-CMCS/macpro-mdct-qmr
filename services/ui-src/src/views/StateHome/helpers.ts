// const exampleData: CoreSet.Data[] = [
//     {
//       path: "ACS",
//       title: "Adult Core Set Measures",
//       type: CoreSet.Type.ADULT,
//       progress: { numAvailable: 12, numComplete: 0 },
//       actions: coreSetActions[CoreSet.Type.ADULT]("OH2021-ACS"),
//       submitted: false,
//       id: "OH2021-ACS",
//       year: "2021",
//     },
//     {
//       path: "CCS",
//       title: "Child Core Set Measures: Both",
//       type: CoreSet.Type.CHILD,
//       progress: { numAvailable: 12, numComplete: 2 },
//       actions: coreSetActions[CoreSet.Type.CHILD]("OH2021-CCS"),
//       submitted: false,
//       id: "OH2021-CCS",
//       year: "2021",
//     },
//     {
//       path: "CCSM",
//       title: "Child Core Set Measures: Medicaid",
//       type: CoreSet.Type.CHILD,
//       progress: { numAvailable: 12, numComplete: 3 },
//       actions: coreSetActions[CoreSet.Type.CHILD]("OH2021-CCSM"),
//       submitted: false,
//       id: "OH2021-CCSM",
//       year: "2021",
//     },
//     {
//       path: "CCSC",
//       title: "Child Core Set Measures: CHIP",
//       type: CoreSet.Type.CHILD,
//       progress: { numAvailable: 12, numComplete: 11 },
//       actions: coreSetActions[CoreSet.Type.CHILD]("OH2021-CCSC"),
//       submitted: false,
//       id: "OH2021-CCSC",
//       year: "2021",
//     },
//     {
//       path: "HHCS",
//       title: "Health Homes Set Measures",
//       type: CoreSet.Type.HEALTH_HOMES,
//       progress: { numAvailable: 12, numComplete: 5 },
//       actions: coreSetActions[CoreSet.Type.HEALTH_HOMES]("OH2021-HHCS"),
//       submitted: false,
//       id: "OH2021-HHCS",
//       year: "2021",
//     },
//   ];

import { CoreSet } from "components/Table/types";
import { coreSetMeasureTitle } from "views";
import { coreSetActions } from "./actions";

type CoreSetType = "ACS" | "CCS" | "CCSM" | "CCSC" | "HHCS";

export interface CoreSetDataItem {
  compoundKey: string;
  coreSet: CoreSetType;
  createdAt: number;
  lastAltered: number;
  lastAlteredBy: string;
  progress: { numAvailable: number; numComplete: number };
  state: string;
  submitted: boolean;
  year: number;
}

const getCoreSetType = (type: CoreSetType) => {
  let result;
  switch (type) {
    case "ACS":
      result = CoreSet.Type.ADULT;
      break;
    case "HHCS":
      result = CoreSet.Type.HEALTH_HOMES;
      break;
    default:
      result = CoreSet.Type.CHILD;
  }
  return result;
};

export const formatTableItems = (items: CoreSetDataItem[]) => {
  return items.map((item: CoreSetDataItem) => {
    const type = getCoreSetType(item.coreSet);
    const title = coreSetMeasureTitle[item.coreSet];
    return {
      path: item.coreSet,
      title,
      type,
      progress: item.progress,
      actions: coreSetActions[type](item.compoundKey),
      submitted: item.submitted,
      id: item.compoundKey,
      year: item.year.toString(),
    };
  });
};
