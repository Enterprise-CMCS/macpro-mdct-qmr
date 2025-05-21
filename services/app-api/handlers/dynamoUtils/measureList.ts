import { Type } from "../../types";

interface Measure {
  [year: number]: MeasureMetaData[];
}

export interface MeasureMetaData {
  coreSet: "A" | "C" | "H";
  measure: string;
  autocompleteOnCreation?: boolean;
  placeholder?: boolean;
  type?: Type;
}

export const measures: Measure = {
  2021: [
    {
      coreSet: "A",
      measure: "CSQ",
    },
    {
      coreSet: "C",
      measure: "CSQ",
    },
    {
      coreSet: "H",
      measure: "CSQ",
    },
    {
      coreSet: "A",
      measure: "AMM-AD",
    },
    {
      coreSet: "A",
      measure: "AMR-AD",
    },
    {
      coreSet: "A",
      measure: "BCS-AD",
    },
    {
      coreSet: "A",
      measure: "CBP-AD",
    },
    {
      coreSet: "A",
      measure: "CCP-AD",
    },
    {
      coreSet: "A",
      measure: "CCS-AD",
    },
    {
      coreSet: "A",
      measure: "CCW-AD",
    },
    {
      coreSet: "A",
      measure: "CDF-AD",
    },
    {
      coreSet: "A",
      measure: "CHL-AD",
    },
    {
      coreSet: "A",
      measure: "COB-AD",
    },
    {
      coreSet: "A",
      measure: "CPA-AD",
    },
    {
      coreSet: "A",
      measure: "FUA-AD",
    },
    {
      coreSet: "A",
      measure: "FUH-AD",
    },
    {
      coreSet: "A",
      measure: "FUM-AD",
    },
    {
      coreSet: "A",
      measure: "FVA-AD",
    },
    {
      coreSet: "A",
      measure: "HPC-AD",
    },
    {
      coreSet: "A",
      measure: "HPCMI-AD",
    },
    {
      coreSet: "A",
      measure: "HVL-AD",
    },
    {
      coreSet: "A",
      measure: "IET-AD",
    },
    {
      coreSet: "A",
      measure: "MSC-AD",
    },
    {
      coreSet: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "A",
      measure: "OHD-AD",
    },
    {
      coreSet: "A",
      measure: "OUD-AD",
    },
    {
      coreSet: "A",
      measure: "PC01-AD",
    },
    {
      coreSet: "A",
      measure: "PCR-AD",
    },
    {
      coreSet: "A",
      measure: "PPC-AD",
    },
    {
      coreSet: "A",
      measure: "PQI01-AD",
    },
    {
      coreSet: "A",
      measure: "PQI05-AD",
    },
    {
      coreSet: "A",
      measure: "PQI08-AD",
    },
    {
      coreSet: "A",
      measure: "PQI15-AD",
    },
    {
      coreSet: "A",
      measure: "SAA-AD",
    },
    {
      coreSet: "A",
      measure: "SSD-AD",
    },
    {
      coreSet: "C",
      measure: "ADD-CH",
    },
    {
      coreSet: "C",
      measure: "AMB-CH",
    },
    {
      coreSet: "C",
      measure: "AMR-CH",
    },
    {
      coreSet: "C",
      measure: "APM-CH",
    },
    {
      coreSet: "C",
      measure: "APP-CH",
    },
    {
      coreSet: "C",
      measure: "AUD-CH",
    },
    {
      coreSet: "C",
      measure: "CCP-CH",
    },
    {
      coreSet: "C",
      measure: "CCW-CH",
    },
    {
      coreSet: "C",
      measure: "CDF-CH",
    },
    {
      coreSet: "C",
      measure: "CHL-CH",
    },
    {
      coreSet: "C",
      measure: "CIS-CH",
    },
    {
      coreSet: "C",
      measure: "CPC-CH",
    },
    {
      coreSet: "C",
      measure: "DEV-CH",
    },
    {
      coreSet: "C",
      measure: "FUH-CH",
    },
    {
      coreSet: "C",
      measure: "IMA-CH",
    },
    {
      coreSet: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "PDENT-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "PPC-CH",
    },
    {
      coreSet: "C",
      measure: "SFM-CH",
    },
    {
      coreSet: "C",
      measure: "W30-CH",
    },
    {
      coreSet: "C",
      measure: "WCC-CH",
    },
    {
      coreSet: "C",
      measure: "WCV-CH",
    },
    {
      coreSet: "H",
      measure: "AIF-HH",
    },
    {
      coreSet: "H",
      measure: "AMB-HH",
    },
    {
      coreSet: "H",
      measure: "CBP-HH",
    },
    {
      coreSet: "H",
      measure: "CDF-HH",
    },
    {
      coreSet: "H",
      measure: "FUA-HH",
    },
    {
      coreSet: "H",
      measure: "FUH-HH",
    },
    {
      coreSet: "H",
      measure: "IET-HH",
    },
    {
      coreSet: "H",
      measure: "IU-HH",
    },
    {
      coreSet: "H",
      measure: "OUD-HH",
    },
    {
      coreSet: "H",
      measure: "PCR-HH",
    },
    {
      coreSet: "H",
      measure: "PQI92-HH",
    },
    {
      coreSet: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2022: [
    {
      coreSet: "A",
      measure: "CSQ",
    },
    {
      coreSet: "C",
      measure: "CSQ",
    },
    {
      coreSet: "H",
      measure: "CSQ",
    },
    {
      coreSet: "A",
      measure: "AAB-AD",
    },
    {
      coreSet: "A",
      measure: "AMM-AD",
    },
    {
      coreSet: "A",
      measure: "AMR-AD",
    },
    {
      coreSet: "A",
      measure: "BCS-AD",
    },
    {
      coreSet: "A",
      measure: "CBP-AD",
    },
    {
      coreSet: "A",
      measure: "CCP-AD",
    },
    {
      coreSet: "A",
      measure: "CCS-AD",
    },
    {
      coreSet: "A",
      measure: "CCW-AD",
    },
    {
      coreSet: "A",
      measure: "CDF-AD",
    },
    {
      coreSet: "A",
      measure: "CHL-AD",
    },
    {
      coreSet: "A",
      measure: "COB-AD",
    },
    {
      coreSet: "A",
      measure: "COL-AD",
    },
    {
      coreSet: "A",
      measure: "CPA-AD",
    },
    {
      coreSet: "A",
      measure: "FUA-AD",
    },
    {
      coreSet: "A",
      measure: "FUH-AD",
    },
    {
      coreSet: "A",
      measure: "FUM-AD",
    },
    {
      coreSet: "A",
      measure: "FVA-AD",
    },
    {
      coreSet: "A",
      measure: "HPC-AD",
    },
    {
      coreSet: "A",
      measure: "HPCMI-AD",
    },
    {
      coreSet: "A",
      measure: "HVL-AD",
    },
    {
      coreSet: "A",
      measure: "IET-AD",
    },
    {
      coreSet: "A",
      measure: "MSC-AD",
    },
    {
      coreSet: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "A",
      measure: "OHD-AD",
    },
    {
      coreSet: "A",
      measure: "OUD-AD",
    },
    {
      coreSet: "A",
      measure: "PCR-AD",
    },
    {
      coreSet: "A",
      measure: "PPC-AD",
    },
    {
      coreSet: "A",
      measure: "PQI01-AD",
    },
    {
      coreSet: "A",
      measure: "PQI05-AD",
    },
    {
      coreSet: "A",
      measure: "PQI08-AD",
    },
    {
      coreSet: "A",
      measure: "PQI15-AD",
    },
    {
      coreSet: "A",
      measure: "SAA-AD",
    },
    {
      coreSet: "A",
      measure: "SSD-AD",
    },
    {
      coreSet: "C",
      measure: "ADD-CH",
    },
    {
      coreSet: "C",
      measure: "AMB-CH",
    },
    {
      coreSet: "C",
      measure: "AMR-CH",
    },
    {
      coreSet: "C",
      measure: "APM-CH",
    },
    {
      coreSet: "C",
      measure: "APP-CH",
    },
    {
      coreSet: "C",
      measure: "CCP-CH",
    },
    {
      coreSet: "C",
      measure: "CCW-CH",
    },
    {
      coreSet: "C",
      measure: "CDF-CH",
    },
    {
      coreSet: "C",
      measure: "CHL-CH",
    },
    {
      coreSet: "C",
      measure: "CIS-CH",
    },
    {
      coreSet: "C",
      measure: "CPC-CH",
    },
    {
      coreSet: "C",
      measure: "DEV-CH",
    },
    {
      coreSet: "C",
      measure: "FUA-CH",
    },
    {
      coreSet: "C",
      measure: "FUH-CH",
    },
    {
      coreSet: "C",
      measure: "FUM-CH",
    },
    {
      coreSet: "C",
      measure: "IMA-CH",
    },
    {
      coreSet: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "OEV-CH",
    },
    {
      coreSet: "C",
      measure: "PPC-CH",
    },
    {
      coreSet: "C",
      measure: "SFM-CH",
    },
    {
      coreSet: "C",
      measure: "TFL-CH",
    },
    {
      coreSet: "C",
      measure: "W30-CH",
    },
    {
      coreSet: "C",
      measure: "WCC-CH",
    },
    {
      coreSet: "C",
      measure: "WCV-CH",
    },
    {
      coreSet: "H",
      measure: "AIF-HH",
    },
    {
      coreSet: "H",
      measure: "AMB-HH",
    },
    {
      coreSet: "H",
      measure: "CBP-HH",
    },
    {
      coreSet: "H",
      measure: "CDF-HH",
    },
    {
      coreSet: "H",
      measure: "COL-HH",
    },
    {
      coreSet: "H",
      measure: "FUA-HH",
    },
    {
      coreSet: "H",
      measure: "FUH-HH",
    },
    {
      coreSet: "H",
      measure: "FUM-HH",
    },
    {
      coreSet: "H",
      measure: "IET-HH",
    },
    {
      coreSet: "H",
      measure: "IU-HH",
    },
    {
      coreSet: "H",
      measure: "OUD-HH",
    },
    {
      coreSet: "H",
      measure: "PCR-HH",
    },
    {
      coreSet: "H",
      measure: "PQI92-HH",
    },
    {
      coreSet: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2023: [
    {
      coreSet: "A",
      measure: "CSQ",
    },
    {
      coreSet: "C",
      measure: "CSQ",
    },
    {
      coreSet: "H",
      measure: "CSQ",
    },
    {
      coreSet: "A",
      measure: "AAB-AD",
    },
    {
      coreSet: "A",
      measure: "AMM-AD",
    },
    {
      coreSet: "A",
      measure: "AMR-AD",
    },
    {
      coreSet: "A",
      measure: "BCS-AD",
    },
    {
      coreSet: "A",
      measure: "CBP-AD",
    },
    {
      coreSet: "A",
      measure: "CCP-AD",
    },
    {
      coreSet: "A",
      measure: "CCS-AD",
    },
    {
      coreSet: "A",
      measure: "CCW-AD",
    },
    {
      coreSet: "A",
      measure: "CDF-AD",
    },
    {
      coreSet: "A",
      measure: "CHL-AD",
    },
    {
      coreSet: "A",
      measure: "COB-AD",
    },
    {
      coreSet: "A",
      measure: "COL-AD",
    },
    {
      coreSet: "A",
      measure: "CPA-AD",
    },
    {
      coreSet: "A",
      measure: "CPU-AD",
    },
    {
      coreSet: "A",
      measure: "FUA-AD",
    },
    {
      coreSet: "A",
      measure: "FUH-AD",
    },
    {
      coreSet: "A",
      measure: "FUM-AD",
    },
    {
      coreSet: "A",
      measure: "FVA-AD",
    },
    {
      coreSet: "A",
      measure: "HBD-AD",
    },
    {
      coreSet: "A",
      measure: "HPCMI-AD",
    },
    {
      coreSet: "A",
      measure: "HVL-AD",
    },
    {
      coreSet: "A",
      measure: "IET-AD",
    },
    {
      coreSet: "A",
      measure: "MSC-AD",
    },
    {
      coreSet: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "A",
      measure: "OHD-AD",
    },
    {
      coreSet: "A",
      measure: "OUD-AD",
    },
    {
      coreSet: "A",
      measure: "PCR-AD",
    },
    {
      coreSet: "A",
      measure: "PPC-AD",
    },
    {
      coreSet: "A",
      measure: "PQI01-AD",
    },
    {
      coreSet: "A",
      measure: "PQI05-AD",
    },
    {
      coreSet: "A",
      measure: "PQI08-AD",
    },
    {
      coreSet: "A",
      measure: "PQI15-AD",
    },
    {
      coreSet: "A",
      measure: "SAA-AD",
    },
    {
      coreSet: "A",
      measure: "SSD-AD",
    },
    {
      coreSet: "C",
      measure: "AAB-CH",
    },
    {
      coreSet: "C",
      measure: "ADD-CH",
    },
    {
      coreSet: "C",
      measure: "AMB-CH",
    },
    {
      coreSet: "C",
      measure: "AMR-CH",
    },
    {
      coreSet: "C",
      measure: "APM-CH",
    },
    {
      coreSet: "C",
      measure: "APP-CH",
    },
    {
      coreSet: "C",
      measure: "CCP-CH",
    },
    {
      coreSet: "C",
      measure: "CCW-CH",
    },
    {
      coreSet: "C",
      measure: "CDF-CH",
    },
    {
      coreSet: "C",
      measure: "CHL-CH",
    },
    {
      coreSet: "C",
      measure: "CIS-CH",
    },
    {
      coreSet: "C",
      measure: "CPC-CH",
    },
    {
      coreSet: "C",
      measure: "DEV-CH",
    },
    {
      coreSet: "C",
      measure: "FUA-CH",
    },
    {
      coreSet: "C",
      measure: "FUH-CH",
    },
    {
      coreSet: "C",
      measure: "FUM-CH",
    },
    {
      coreSet: "C",
      measure: "IMA-CH",
    },
    {
      coreSet: "C",
      measure: "LSC-CH",
    },
    {
      coreSet: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "OEV-CH",
    },
    {
      coreSet: "C",
      measure: "PPC-CH",
    },
    {
      coreSet: "C",
      measure: "SFM-CH",
    },
    {
      coreSet: "C",
      measure: "TFL-CH",
    },
    {
      coreSet: "C",
      measure: "W30-CH",
    },
    {
      coreSet: "C",
      measure: "WCC-CH",
    },
    {
      coreSet: "C",
      measure: "WCV-CH",
    },
    {
      coreSet: "H",
      measure: "AIF-HH",
    },
    {
      coreSet: "H",
      measure: "AMB-HH",
    },
    {
      coreSet: "H",
      measure: "CBP-HH",
    },
    {
      coreSet: "H",
      measure: "CDF-HH",
    },
    {
      coreSet: "H",
      measure: "COL-HH",
    },
    {
      coreSet: "H",
      measure: "FUA-HH",
    },
    {
      coreSet: "H",
      measure: "FUH-HH",
    },
    {
      coreSet: "H",
      measure: "FUM-HH",
    },
    {
      coreSet: "H",
      measure: "IET-HH",
    },
    {
      coreSet: "H",
      measure: "IU-HH",
    },
    {
      coreSet: "H",
      measure: "OUD-HH",
    },
    {
      coreSet: "H",
      measure: "PCR-HH",
    },
    {
      coreSet: "H",
      measure: "PQI92-HH",
    },
    {
      coreSet: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2024: [
    {
      coreSet: "A",
      measure: "CSQ",
    },
    {
      coreSet: "C",
      measure: "CSQ",
    },
    {
      coreSet: "H",
      measure: "CSQ",
    },
    {
      coreSet: "A",
      measure: "AAB-AD",
    },
    {
      coreSet: "A",
      measure: "AMM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "AMR-AD",
    },
    {
      coreSet: "A",
      measure: "BCS-AD",
    },
    {
      coreSet: "A",
      measure: "CBP-AD",
    },
    {
      coreSet: "A",
      measure: "CCP-AD",
    },
    {
      coreSet: "A",
      measure: "CCS-AD",
    },
    {
      coreSet: "A",
      measure: "CCW-AD",
    },
    {
      coreSet: "A",
      measure: "CDF-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "CHL-AD",
    },
    {
      coreSet: "A",
      measure: "COB-AD",
    },
    {
      coreSet: "A",
      measure: "COL-AD",
    },
    {
      coreSet: "A",
      measure: "CPA-AD",
    },
    {
      coreSet: "A",
      measure: "CPU-AD",
    },
    {
      coreSet: "A",
      measure: "FUA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "FUH-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "FUM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "HBD-AD",
    },
    {
      coreSet: "A",
      measure: "HPCMI-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "HVL-AD",
    },
    {
      coreSet: "A",
      measure: "IET-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "MSC-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "NCIIDD-AD",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "A",
      measure: "OHD-AD",
    },
    {
      coreSet: "A",
      measure: "OUD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "PCR-AD",
    },
    {
      coreSet: "A",
      measure: "PPC2-AD",
    },
    {
      coreSet: "A",
      measure: "PQI01-AD",
    },
    {
      coreSet: "A",
      measure: "PQI05-AD",
    },
    {
      coreSet: "A",
      measure: "PQI08-AD",
    },
    {
      coreSet: "A",
      measure: "PQI15-AD",
    },
    {
      coreSet: "A",
      measure: "SAA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "SSD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "AAB-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "ADD-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "AMB-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "AMR-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "APM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "APP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CCP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CCW-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CDF-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CHL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CIS-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CPC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "DEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "FUA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "FUH-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "FUM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "IMA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "LSC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "LBW-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "LRCD-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "OEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "PPC2-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "SFM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "TFL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "W30-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "WCC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "WCV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "AIF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "AMB-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "CBP-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "CDF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "COL-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "FUA-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "FUH-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "FUM-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "IET-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "IU-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "OUD-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "PCR-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "PQI92-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "SS-1-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-2-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-3-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-4-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-5-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
  ],
  2025: [
    {
      coreSet: "A",
      measure: "CSQ",
    },
    {
      coreSet: "C",
      measure: "CSQ",
    },
    {
      coreSet: "H",
      measure: "CSQ",
    },
    {
      coreSet: "A",
      measure: "AAB-AD",
    },
    {
      coreSet: "A",
      measure: "AMM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "AMR-AD",
    },
    {
      coreSet: "A",
      measure: "AIS-AD",
    },
    {
      coreSet: "A",
      measure: "BCS-AD",
    },
    {
      coreSet: "A",
      measure: "CBP-AD",
    },
    {
      coreSet: "A",
      measure: "CCP-AD",
    },
    {
      coreSet: "A",
      measure: "CCS-AD",
    },
    {
      coreSet: "A",
      measure: "CCW-AD",
    },
    {
      coreSet: "A",
      measure: "CDF-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "CHL-AD",
    },
    {
      coreSet: "A",
      measure: "COB-AD",
    },
    {
      coreSet: "A",
      measure: "COL-AD",
    },
    {
      coreSet: "A",
      measure: "CPA-AD",
    },
    {
      coreSet: "A",
      measure: "CPU-AD",
    },
    {
      coreSet: "A",
      measure: "EDV-AD",
    },
    {
      coreSet: "A",
      measure: "FUA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "FUH-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "FUM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "GSD-AD",
    },
    {
      coreSet: "A",
      measure: "HPCMI-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "HVL-AD",
    },
    {
      coreSet: "A",
      measure: "IET-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "LRCD-AD",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "A",
      measure: "MSC-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "NCIIDD-AD",
      autocompleteOnCreation: true,
    },
    {
      coreSet: "A",
      measure: "OEVP-AD",
    },
    {
      coreSet: "A",
      measure: "OHD-AD",
    },
    {
      coreSet: "A",
      measure: "OUD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "PCR-AD",
    },
    {
      coreSet: "A",
      measure: "PDS-AD",
      type: Type?.PROVISIONAL,
    },
    {
      coreSet: "A",
      measure: "PPC2-AD",
    },
    {
      coreSet: "A",
      measure: "PQI01-AD",
    },
    {
      coreSet: "A",
      measure: "PQI05-AD",
    },
    {
      coreSet: "A",
      measure: "PQI08-AD",
    },
    {
      coreSet: "A",
      measure: "PQI15-AD",
    },
    {
      coreSet: "A",
      measure: "PRS-AD",
    },
    {
      coreSet: "A",
      measure: "SAA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "A",
      measure: "SSD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "AAB-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "ADD-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "AMR-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "APM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "APP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CCP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CCW-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CDF-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CHL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CIS-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "CPC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "DEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "FUA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "FUH-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "FUM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "IMA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "LSC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "LBW-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "LRCD-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreSet: "C",
      measure: "OEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "OEVP-CH",
      type: Type?.PROVISIONAL,
    },
    {
      coreSet: "C",
      measure: "PDS-CH",
      type: Type?.PROVISIONAL,
    },
    {
      coreSet: "C",
      measure: "PPC2-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "PRS-CH",
      type: Type?.PROVISIONAL,
    },
    {
      coreSet: "C",
      measure: "SFM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "TFL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "W30-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "WCC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "C",
      measure: "WCV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "AIF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "CBP-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "CDF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "COL-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "FUA-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "FUH-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "FUM-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "IET-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "IU-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "OUD-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "PCR-HH",
      type: Type?.MANDATORY,
    },
    {
      coreSet: "H",
      measure: "SS-1-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-2-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-3-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-4-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreSet: "H",
      measure: "SS-5-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
  ],
};
