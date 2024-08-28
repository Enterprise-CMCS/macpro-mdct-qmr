import {
  stateCombinedLoadedList,
  stateLoadedSeparateList,
} from "./coreSetStatesList";

export interface CoreSetFields {
  [key: string]: CoreSetField[];
}

export interface CoreSetField {
  type: string;
  label: string;
  loaded?: string[];
  abbr: string[];
  path?: string;
  exist?: boolean;
  stateList?: string[];
}

export const coreSets: CoreSetFields = {
  "2021": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: [],
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: ["CCS"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
    },
  ],
  "2022": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: [],
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: ["CCS"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
    },
  ],
  "2023": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: [],
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: ["CCS"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
    },
  ],
  "2024": [
    {
      type: "coreSet",
      label: "Adult",
      path: "add-adult",
      loaded: stateCombinedLoadedList["2024"],
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Adult",
      path: "add-adult",
      loaded: stateLoadedSeparateList("2024"),
      abbr: ["ACSC", "ACSM"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: stateCombinedLoadedList["2024"],
      abbr: ["CCS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: stateLoadedSeparateList("2024"),
      abbr: ["CCSC", "CCSM"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
    },
  ],
};
