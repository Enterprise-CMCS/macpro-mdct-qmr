/* eslint-disable no-console */
import { MeasureTableItem } from "./types";

// Example Measures list data for testing and demo page.
export const exampleMeasuresData: MeasureTableItem.Data[] = [
  {
    path: "/example-measures-path-1",
    abbr: "AMM-AD",
    title: "Antidepressant Medication Management",
    rateComplete: 0,
    actions: [{ itemText: "Edit", handleSelect: () => console.log("1") }],
    createdAt: 1642190951029,
    lastDateModified: 1642190951029,
    id: "test1",
    reporting: undefined,
  },
  {
    path: "/example-measures-path-2",
    abbr: "AMR-AD",
    title: "Asthma Medication Ratio: Ages 19 to 64",
    rateComplete: 0,
    createdAt: 1642190951029,
    actions: [{ itemText: "Edit", handleSelect: () => console.log("1") }],
    lastDateModified: 1642190951029,
    id: "test2",
    reporting: undefined,
  },
  {
    path: "/example-measures-path-3",
    abbr: "BCS-AD",
    title: "Breast Cancer Screening",
    rateComplete: 0.678,
    actions: [{ itemText: "Edit", handleSelect: () => console.log("1") }],
    lastDateModified: 1642190951029,
    createdAt: 1642190951029,
    id: "test3",
    reporting: "yes",
  },
  {
    path: "/example-measures-path-4",
    abbr: "CBP-AD",
    title: "Controlling High Blood Pressure",
    createdAt: 1642190951029,
    rateComplete: 1,
    actions: [{ itemText: "Edit", handleSelect: () => console.log("1") }],
    lastDateModified: 1642190951029,
    id: "test4",
    reporting: "no",
  },
];
