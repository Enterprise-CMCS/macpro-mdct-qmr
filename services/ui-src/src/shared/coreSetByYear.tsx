import { SPA } from "libs/spaLib";
import { AnyObject } from "types";

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

export const coreSetType = (abbr: string) => {
  const list = {
    Adult: ["ACS", "ACSM", "ACSC"],
    Child: ["CCS", "CCSM", "CCSC"],
    "Health Home": ["HHCS"],
  };
  for (const [key, value] of Object.entries(list)) {
    if (value.includes(abbr)) return key;
  }
  return;
};

export const coreSetSubTitles = (year: string, abbr: string) => {
  let lastChar = abbr[abbr.length - 1];
  let coreType = coreSetType(abbr) || "";
  let list: AnyObject = {};
  //using the last char of the abbr, we can determine if there's a subtitle
  if (parseInt(year) <= 2023) {
    list = {
      C: "Chip",
      M: "Medicaid",
      MC: "Medicaid & CHIP",
    };
    lastChar = lastChar === "S" && coreType === "Child" ? "MC" : lastChar;
  } else {
    list = {
      C: "Separate CHIP",
      M: "Medicaid (Title XIX & XXI)",
      MC: "Medicaid (Title XIX & XXI)",
    };
    lastChar =
      lastChar === "S" && (coreType === "Adult" || coreType === "Child")
        ? "MC"
        : lastChar;
  }
  return list[lastChar] || "";
};

export const coreSetTitles = (year: string, abbr: string, type?: string) => {
  const subTitle = coreSetSubTitles(year, abbr);
  const subType = type || "Measures";
  let name = `${coreSetType(abbr)} Core Set ${subType}`;
  return subTitle ? `${name}: ${subTitle}` : name;
};

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
      loaded: [],
      abbr: ["ACS", "ACSC", "ACSM"],
    },
    {
      type: "coreSet",
      label: "Child",
      path: "add-child",
      loaded: [],
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
