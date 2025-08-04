import { SPA } from "libs/spaLib";
import { CoreSetAbbr } from "types";
import { featuresByYear } from "utils/featuresByYear";
import { assertExhaustive } from "utils/typing";

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
    Adult: [CoreSetAbbr.ACS, CoreSetAbbr.ACSM, CoreSetAbbr.ACSC],
    Child: [CoreSetAbbr.CCS, CoreSetAbbr.CCSM, CoreSetAbbr.CCSC],
    "Health Home": [CoreSetAbbr.HHCS],
  };
  for (const [key, value] of Object.entries(list)) {
    if (value.includes(abbr as CoreSetAbbr)) return key;
  }
  return;
};

export const coreSetSubTitles = (abbr: CoreSetAbbr) => {
  const CCSMAbbrByYear = featuresByYear.hasMedicaidInclusiveReportName
    ? "Medicaid inclusive of CHIP-funded Medicaid expansion (Title XIX & XXI)"
    : "Medicaid (Title XIX & XXI)";
  if (featuresByYear.hasCombinedRates) {
    switch (abbr) {
      case CoreSetAbbr.ACS:
      case CoreSetAbbr.ACSM:
      case CoreSetAbbr.CCS:
      case CoreSetAbbr.CCSM:
        return CCSMAbbrByYear;
      case CoreSetAbbr.ACSC:
      case CoreSetAbbr.CCSC:
        return "Separate CHIP";
      case CoreSetAbbr.HHCS:
        return "";
      default:
        assertExhaustive(abbr);
        return "";
    }
  } else {
    switch (abbr) {
      case CoreSetAbbr.CCS:
        return "Medicaid & CHIP";
      case CoreSetAbbr.ACSM:
      case CoreSetAbbr.CCSM:
        return "Medicaid";
      case CoreSetAbbr.ACSC:
      case CoreSetAbbr.CCSC:
        return "CHIP";
      case CoreSetAbbr.ACS:
      case CoreSetAbbr.HHCS:
        return "";
      default:
        assertExhaustive(abbr);
        return "";
    }
  }
};

export const coreSetTitles = (abbr: string, year: number, type?: string) => {
  const subTitle = coreSetSubTitles(abbr as CoreSetAbbr, year);
  const subType = type || "Measures";
  let name = `${coreSetType(abbr)} Core Set ${subType}`;
  return subTitle ? `${name}: ${subTitle}` : name;
};

//seperated coresets have unique titles for their breadcrumb menu. this is only for 2024 and onward
export const coreSetBreadCrumbTitle = ():
  | { [key: string]: string }
  | undefined => {
  if (!featuresByYear.hasCombinedRates) return undefined;
  if (featuresByYear.hasMedicaidInclusiveReportName) {
    return {
      [CoreSetAbbr.ACSC]: "(Separate CHIP)",
      [CoreSetAbbr.ACSM]:
        "(Medicaid inclusive of CHIP-funded Medicaid expansion (Title XIX & XXI))",
      [CoreSetAbbr.CCSC]: "(Separate CHIP)",
      [CoreSetAbbr.CCSM]:
        "(Medicaid inclusive of CHIP-funded Medicaid expansion (Title XIX & XXI))",
    };
  }
  return {
    [CoreSetAbbr.ACSC]: "(Separate CHIP)",
    [CoreSetAbbr.ACSM]: "(Medicaid (Title XIX & XXI))",
    [CoreSetAbbr.CCSC]: "(Separate CHIP)",
    [CoreSetAbbr.CCSM]: "(Medicaid (Title XIX & XXI))",
  };
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
  "2025": [
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
      stateList: getHHStates("2025"),
    },
  ],
};
