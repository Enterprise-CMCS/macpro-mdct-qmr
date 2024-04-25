export interface CoreSetFields {
  [key: string]: CoreSetField[];
}

export interface CoreSetField {
  type: string;
  label: string;
  loaded?: boolean;
  abbr: string;
  path?: string;
  exist?: boolean;
  stateList?: string[];
}

export const coreSets: CoreSetFields = {
  "2021": [
    {
      type: "coreSet",
      label: "Adult",
      loaded: true,
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
      loaded: true,
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
      loaded: true,
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
      loaded: false,
      abbr: "ACS",
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: false,
      abbr: "CCS",
    },
    {
      type: "coreSet",
      label: "Health Home",
      path: "add-hh",
      loaded: false,
      abbr: "HHCS",
    },
  ],
};
