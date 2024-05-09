export interface CoreSetFields {
  [key: string]: CoreSetField[];
}

export interface CoreSetField {
  type: string;
  label: string;
  loaded?: string[];
  abbr: string;
  path?: string;
  exist?: boolean;
  stateList?: string[];
}

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
      abbr: "ACS",
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: "CCS",
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: "HHCS",
    },
  ],
  "2022": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: [],
      abbr: "ACS",
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: "CCS",
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: "HHCS",
    },
  ],
  "2023": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: [],
      abbr: "ACS",
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      abbr: "CCS",
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: "HHCS",
    },
  ],
  "2024": [
    {
      type: "coreSet",
      label: "Adult",
      path: "add-adult",
      loaded: stateLoadedList,
      abbr: "ACS",
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: stateLoadedList,
      abbr: "CCS",
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      abbr: "HHCS",
    },
  ],
};
