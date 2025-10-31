/* eslint-disable no-console */
import { CoreSetAbbr } from "types";
import { CoreSetTableItem } from "./types";

// Example Core Set list data for testing and demo page.
export const exampleCoreSetData: CoreSetTableItem.Data[] = [
  {
    coreSet: CoreSetAbbr.ACS,
    title: "Adult Core Set Measures",
    type: CoreSetTableItem.Type.ADULT,
    progress: { numAvailable: 12, numComplete: 12 },
    actions: [{ itemText: "Export", handleSelect: () => console.log("1") }],
    submitted: true,
    id: "test1",
    year: "2021",
  },
  {
    coreSet: CoreSetAbbr.CCSC,
    title: "Child Core Set Measures: CHIP",
    type: CoreSetTableItem.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 12 },
    actions: [{ itemText: "Export", handleSelect: () => console.log("1") }],
    submitted: false,
    id: "test2",
    year: "2021",
  },
  {
    coreSet: CoreSetAbbr.CCSM,
    title: "Child Core Set Measures: Medicaid",
    type: CoreSetTableItem.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 4 },
    actions: [{ itemText: "Export", handleSelect: () => console.log("1") }],
    submitted: false,
    id: "test3",
    year: "2021",
  },
  {
    coreSet: CoreSetAbbr.HHCS,
    title: "Health Home Core Set Questions: SPA Name",
    type: CoreSetTableItem.Type.HEALTH_HOME,
    progress: { numAvailable: 12, numComplete: 4 },
    actions: [{ itemText: "Export", handleSelect: () => console.log("1") }],
    submitted: false,
    id: "test4",
    year: "2021",
  },
];
