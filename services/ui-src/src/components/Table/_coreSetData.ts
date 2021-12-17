import { CoreSet } from "./types";

// Example Core Set list data for testing and demo page.
export const exampleCoreSetData: CoreSet.Data[] = [
  {
    path: "/adult",
    title: "Adult Core Set Measures",
    type: CoreSet.Type.ADULT,
    progress: { numAvailable: 12, numComplete: 12 },
    actions: [
      { itemText: "Export", id: "6", handleSelect: (id) => console.log(id) },
    ],
    submitted: true,
    id: "test1",
    year: "2021",
  },
  {
    path: "/child",
    title: "Child Core Set Measures: CHIP",
    type: CoreSet.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 12 },
    actions: [
      { itemText: "Export", id: "6", handleSelect: (id) => console.log(id) },
    ],
    submitted: false,
    id: "test2",
    year: "2021",
  },
  {
    path: "/child",
    title: "Child Core Set Measures: Medicaid",
    type: CoreSet.Type.CHILD,
    progress: { numAvailable: 12, numComplete: 4 },
    actions: [
      { itemText: "Export", id: "4", handleSelect: (id) => console.log(id) },
    ],
    submitted: false,
    id: "test3",
    year: "2021",
  },
  {
    path: "/health-homes",
    title: "Health Homes Core Set Questions: SPA Name",
    type: CoreSet.Type.HEALTH_HOMES,
    progress: { numAvailable: 12, numComplete: 4 },
    actions: [
      { itemText: "Export", id: "5", handleSelect: (id) => console.log(id) },
    ],
    submitted: false,
    id: "test4",
    year: "2021",
  },
];
