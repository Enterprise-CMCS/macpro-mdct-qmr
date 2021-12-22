import { Measure } from "./types";

// Example Measures list data for testing and demo page.
export const exampleMeasuresData: Measure.Data[] = [
  {
    path: "/example-measures-path-1",
    abbr: "AMM-AD",
    title: "Antidepressant Medication Management",
    rateComplete: 0,
    actions: [
      { itemText: "Edit", id: "1", handleSelect: (id) => console.log(id) },
    ],
    lastDateModified: "Fri Nov 26 2021 12:53:04 GMT-0700",
    id: "test1",
    isReporting: null,
  },
  {
    path: "/example-measures-path-2",
    abbr: "AMR-AD",
    title: "Asthma Medication Ratio: Ages 19 to 64",
    rateComplete: 0,
    actions: [
      { itemText: "Edit", id: "1", handleSelect: (id) => console.log(id) },
    ],
    lastDateModified: "Fri Nov 26 2021 12:53:04 GMT-0700",
    id: "test2",
    isReporting: null,
  },
  {
    path: "/example-measures-path-3",
    abbr: "BCS-AD",
    title: "Breast Cancer Screening",
    rateComplete: 0.678,
    actions: [
      { itemText: "Edit", id: "1", handleSelect: (id) => console.log(id) },
    ],
    lastDateModified: "Fri Nov 26 2021 12:53:04 GMT-0700",
    id: "test3",
    isReporting: true,
  },
  {
    path: "/example-measures-path-4",
    abbr: "CBP-AD",
    title: "Controlling High Blood Pressure",
    rateComplete: 1,
    actions: [
      { itemText: "Edit", id: "1", handleSelect: (id) => console.log(id) },
    ],
    lastDateModified: "Fri Nov 26 2021 12:53:04 GMT-0700",
    id: "test4",
    isReporting: false,
  },
];
