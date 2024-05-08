import { SPA } from "libs/spaLib";

export interface CoreSetFields {
  [key: string]: CoreSetField[];
}

export interface CoreSetField {
  type: string;
  label: string;
  loaded?: boolean;
  abbr?: string[];
  path?: string;
  exist?: boolean;
  stateList?: string[];
}

//health home isn't always avaliable for every state and sometimes has multiple HH coresets for a single state.
const getHHStates = (year: string) => {
  return SPA[year].map((item) => item.state);
};

export const coreSets: CoreSetFields = {
  "2021": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: true,
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: ["CCS", "CCSC", "CCSM"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
      stateList: getHHStates("2021"),
    },
    {
      type: "text",
      label:
        "Only one group of Adult Core Set Measures can be submitted per FFY",
    },
  ],
  "2022": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: true,
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: ["CCS", "CCSC", "CCSM"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
      stateList: getHHStates("2022"),
    },
    {
      type: "text",
      label:
        "Only one group of Adult Core Set Measures can be submitted per FFY",
    },
  ],
  "2023": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: true,
      abbr: ["ACS"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: ["CCS", "CCSC", "CCSM"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
      stateList: getHHStates("2023"),
    },
    {
      type: "text",
      label:
        "Only one group of Adult Core Set Measures can be submitted per FFY",
    },
  ],
  "2024": [
    {
      type: "coreSet",
      label: "Adult",
      path: "add-adult",
      loaded: false,
      abbr: ["ACS", "ACSC", "ACSM"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: false,
      abbr: ["CCS", "CCSC", "CCSM"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      loaded: false,
      abbr: ["HHCS"],
      stateList: getHHStates("2024"),
    },
  ],
};
