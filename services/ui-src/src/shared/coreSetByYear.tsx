import { SPA } from "libs/spaLib";

export type CoreSetType = "coreSet" | "text";

export interface CoreSetFields {
  [key: string]: CoreSetField[];
}

export interface CoreSetField {
  type: CoreSetType;
  label: string;
  loaded?: string[]; //an empty [] means its pre-loaded for all states
  abbr?: string[];
  path?: string;
  exist?: boolean;
  stateList?: string[];
}

//health home isn't always avaliable for every state and sometimes has multiple HH coresets for a single state.
const getHHStates = (year: string) => {
  return SPA[year].map((item) => item.state);
};

//this state list is used for both child & adult core split to check which states have them preloaded in the table
const stateLoadedList = [
  "AK",
  "AS",
  "DC",
  "GU",
  "HI",
  "NH",
  "NM",
  "NC",
  "ND",
  "MP",
  "OH",
  "PR",
  "SC",
  "VI",
  "VT",
  "WY",
];

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
      loaded: [],
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
      loaded: [],
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
      loaded: stateLoadedList,
      abbr: ["ACS", "ACSC", "ACSM"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: stateLoadedList,
      abbr: ["CCS", "CCSC", "CCSM"],
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: ["HHCS"],
      stateList: getHHStates("2024"),
    },
  ],
};
