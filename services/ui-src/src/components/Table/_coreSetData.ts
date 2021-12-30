import { CoreSetTableItem } from "./types";

// Example Core Set list data for testing and demo page.
export const exampleCoreSetData: CoreSetTableItem.Data[] = [
  {
    path: "/adult",
    title: "Adult Core Set Measures",
    type: CoreSetTableItem.Type.ADULT,
    progress: { numAvailable: 12, numComplete: 12 },
    actions: [{ itemText: "Export", handleSelect: (id) => console.log(id) }],
    submitted: true,
    id: "test1",
    year: "2021",
  },
  {
    path: "/child",
    title: "Child Core Set Measures: CHIP",
    type: CoreSetTableItem.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 12 },
    actions: [{ itemText: "Export", handleSelect: (id) => console.log(id) }],
    submitted: false,
    id: "test2",
    year: "2021",
  },
  {
    path: "/child",
    title: "Child Core Set Measures: Medicaid",
    type: CoreSetTableItem.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 4 },
    actions: [{ itemText: "Export", handleSelect: (id) => console.log(id) }],
    submitted: false,
    id: "test3",
    year: "2021",
  },
  {
    path: "/health-homes",
    title: "Health Homes Core Set Questions: SPA Name",
    type: CoreSetTableItem.Type.HEALTH_HOMES,
    progress: { numAvailable: 12, numComplete: 4 },
    actions: [{ itemText: "Export", handleSelect: (id) => console.log(id) }],
    submitted: false,
    id: "test4",
    year: "2021",
  },
];
