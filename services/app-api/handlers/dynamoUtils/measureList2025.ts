import { CoreSetAbbr, MeasureType } from "../../types";
import type { MeasureMetaData } from "./measureList";

export const measureList2025: MeasureMetaData[] = [
  {
    type: "A",
    measure: "CSQ",
  },
  {
    type: "C",
    measure: "CSQ",
  },
  {
    type: "H",
    measure: "CSQ",
  },
  {
    type: "A",
    measure: "AAB-AD",
  },
  {
    type: "A",
    measure: "AMM-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "AMR-AD",
  },
  {
    type: "A",
    measure: "AIS-AD",
  },
  {
    type: "A",
    measure: "BCS-AD",
  },
  {
    type: "A",
    measure: "CBP-AD",
  },
  {
    type: "A",
    measure: "CCP-AD",
  },
  {
    type: "A",
    measure: "CCS-AD",
  },
  {
    type: "A",
    measure: "CCW-AD",
  },
  {
    type: "A",
    measure: "CDF-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "CHL-AD",
  },
  {
    type: "A",
    measure: "COB-AD",
  },
  {
    type: "A",
    measure: "COL-AD",
  },
  {
    type: "A",
    measure: "CPA-AD",
  },
  {
    type: "A",
    measure: "CPU-AD",
  },
  {
    type: "A",
    measure: "EDV-AD",
  },
  {
    type: "A",
    measure: "FUA-AD",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [CoreSetAbbr.ACSM],
  },
  {
    type: "A",
    measure: "FUH-AD",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [CoreSetAbbr.ACSM],
  },
  {
    type: "A",
    measure: "FUM-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "GSD-AD",
  },
  {
    type: "A",
    measure: "HPCMI-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "HVL-AD",
  },
  {
    type: "A",
    measure: "IET-AD",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [CoreSetAbbr.ACSM],
  },
  {
    type: "A",
    measure: "LRCD-AD",
    autocompleteOnCreation: true,
  },
  {
    type: "A",
    measure: "MSC-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "NCIIDD-AD",
    autocompleteOnCreation: true,
  },
  {
    type: "A",
    measure: "OEVP-AD",
  },
  {
    type: "A",
    measure: "OHD-AD",
  },
  {
    type: "A",
    measure: "OUD-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "PCR-AD",
  },
  {
    type: "A",
    measure: "PDS-AD",
    measureType: MeasureType.PROVISIONAL,
  },
  {
    type: "A",
    measure: "PPC2-AD",
  },
  {
    type: "A",
    measure: "PQI01-AD",
  },
  {
    type: "A",
    measure: "PQI05-AD",
  },
  {
    type: "A",
    measure: "PQI08-AD",
  },
  {
    type: "A",
    measure: "PQI15-AD",
  },
  {
    type: "A",
    measure: "PRS-AD",
  },
  {
    type: "A",
    measure: "SAA-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "A",
    measure: "SSD-AD",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "AAB-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "ADD-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "AMR-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "APM-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "APP-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "CCP-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "CCW-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "CDF-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "CHL-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "CIS-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "CPC-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "DEV-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "FUA-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "FUH-CH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [
      CoreSetAbbr.CCS,
      CoreSetAbbr.CCSC,
      CoreSetAbbr.CCSM,
    ],
  },
  {
    type: "C",
    measure: "FUM-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "IMA-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "LSC-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "LBW-CH",
    measureType: MeasureType.MANDATORY,
    autocompleteOnCreation: true,
  },
  {
    type: "C",
    measure: "LRCD-CH",
    measureType: MeasureType.MANDATORY,
    autocompleteOnCreation: true,
  },
  {
    type: "C",
    measure: "OEV-CH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [
      CoreSetAbbr.CCS,
      CoreSetAbbr.CCSC,
      CoreSetAbbr.CCSM,
    ],
  },
  {
    type: "C",
    measure: "OEVP-CH",
    measureType: MeasureType.PROVISIONAL,
  },
  {
    type: "C",
    measure: "PDS-CH",
    measureType: MeasureType.PROVISIONAL,
  },
  {
    type: "C",
    measure: "PPC2-CH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [
      CoreSetAbbr.CCS,
      CoreSetAbbr.CCSC,
      CoreSetAbbr.CCSM,
    ],
  },
  {
    type: "C",
    measure: "PRS-CH",
    measureType: MeasureType.PROVISIONAL,
  },
  {
    type: "C",
    measure: "SFM-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "TFL-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "W30-CH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [
      CoreSetAbbr.CCS,
      CoreSetAbbr.CCSC,
      CoreSetAbbr.CCSM,
    ],
  },
  {
    type: "C",
    measure: "WCC-CH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "C",
    measure: "WCV-CH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [
      CoreSetAbbr.CCS,
      CoreSetAbbr.CCSC,
      CoreSetAbbr.CCSM,
    ],
  },
  {
    type: "H",
    measure: "AIF-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "CBP-HH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [CoreSetAbbr.HHCS],
  },
  {
    type: "H",
    measure: "CDF-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "COL-HH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [CoreSetAbbr.HHCS],
  },
  {
    type: "H",
    measure: "FUA-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "FUH-HH",
    measureType: MeasureType.MANDATORY,
    stratificationRequired: [CoreSetAbbr.HHCS],
  },
  {
    type: "H",
    measure: "FUM-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "IET-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "IU-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "OUD-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "PCR-HH",
    measureType: MeasureType.MANDATORY,
  },
  {
    type: "H",
    measure: "SS-1-HH",
    measureType: MeasureType.MANDATORY,
    placeholder: true,
  },
  {
    type: "H",
    measure: "SS-2-HH",
    measureType: MeasureType.MANDATORY,
    placeholder: true,
  },
  {
    type: "H",
    measure: "SS-3-HH",
    measureType: MeasureType.MANDATORY,
    placeholder: true,
  },
  {
    type: "H",
    measure: "SS-4-HH",
    measureType: MeasureType.MANDATORY,
    placeholder: true,
  },
  {
    type: "H",
    measure: "SS-5-HH",
    measureType: MeasureType.MANDATORY,
    placeholder: true,
  },
];
