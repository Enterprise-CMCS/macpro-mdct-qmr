import { Type } from "../../types";

interface Measure {
  [year: number]: MeasureMetaData[];
}

export interface MeasureMetaData {
  coreType: "A" | "C" | "H";
  measure: string;
  autocompleteOnCreation?: boolean;
  placeholder?: boolean;
  type?: Type;
}

export const measures: Measure = {
  2021: [
    {
      coreType: "A",
      measure: "CSQ",
    },
    {
      coreType: "C",
      measure: "CSQ",
    },
    {
      coreType: "H",
      measure: "CSQ",
    },
    {
      coreType: "A",
      measure: "AMM-AD",
    },
    {
      coreType: "A",
      measure: "AMR-AD",
    },
    {
      coreType: "A",
      measure: "BCS-AD",
    },
    {
      coreType: "A",
      measure: "CBP-AD",
    },
    {
      coreType: "A",
      measure: "CCP-AD",
    },
    {
      coreType: "A",
      measure: "CCS-AD",
    },
    {
      coreType: "A",
      measure: "CCW-AD",
    },
    {
      coreType: "A",
      measure: "CDF-AD",
    },
    {
      coreType: "A",
      measure: "CHL-AD",
    },
    {
      coreType: "A",
      measure: "COB-AD",
    },
    {
      coreType: "A",
      measure: "CPA-AD",
    },
    {
      coreType: "A",
      measure: "FUA-AD",
    },
    {
      coreType: "A",
      measure: "FUH-AD",
    },
    {
      coreType: "A",
      measure: "FUM-AD",
    },
    {
      coreType: "A",
      measure: "FVA-AD",
    },
    {
      coreType: "A",
      measure: "HPC-AD",
    },
    {
      coreType: "A",
      measure: "HPCMI-AD",
    },
    {
      coreType: "A",
      measure: "HVL-AD",
    },
    {
      coreType: "A",
      measure: "IET-AD",
    },
    {
      coreType: "A",
      measure: "MSC-AD",
    },
    {
      coreType: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      coreType: "A",
      measure: "OHD-AD",
    },
    {
      coreType: "A",
      measure: "OUD-AD",
    },
    {
      coreType: "A",
      measure: "PC01-AD",
    },
    {
      coreType: "A",
      measure: "PCR-AD",
    },
    {
      coreType: "A",
      measure: "PPC-AD",
    },
    {
      coreType: "A",
      measure: "PQI01-AD",
    },
    {
      coreType: "A",
      measure: "PQI05-AD",
    },
    {
      coreType: "A",
      measure: "PQI08-AD",
    },
    {
      coreType: "A",
      measure: "PQI15-AD",
    },
    {
      coreType: "A",
      measure: "SAA-AD",
    },
    {
      coreType: "A",
      measure: "SSD-AD",
    },
    {
      coreType: "C",
      measure: "ADD-CH",
    },
    {
      coreType: "C",
      measure: "AMB-CH",
    },
    {
      coreType: "C",
      measure: "AMR-CH",
    },
    {
      coreType: "C",
      measure: "APM-CH",
    },
    {
      coreType: "C",
      measure: "APP-CH",
    },
    {
      coreType: "C",
      measure: "AUD-CH",
    },
    {
      coreType: "C",
      measure: "CCP-CH",
    },
    {
      coreType: "C",
      measure: "CCW-CH",
    },
    {
      coreType: "C",
      measure: "CDF-CH",
    },
    {
      coreType: "C",
      measure: "CHL-CH",
    },
    {
      coreType: "C",
      measure: "CIS-CH",
    },
    {
      coreType: "C",
      measure: "CPC-CH",
    },
    {
      coreType: "C",
      measure: "DEV-CH",
    },
    {
      coreType: "C",
      measure: "FUH-CH",
    },
    {
      coreType: "C",
      measure: "IMA-CH",
    },
    {
      coreType: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "PDENT-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "PPC-CH",
    },
    {
      coreType: "C",
      measure: "SFM-CH",
    },
    {
      coreType: "C",
      measure: "W30-CH",
    },
    {
      coreType: "C",
      measure: "WCC-CH",
    },
    {
      coreType: "C",
      measure: "WCV-CH",
    },
    {
      coreType: "H",
      measure: "AIF-HH",
    },
    {
      coreType: "H",
      measure: "AMB-HH",
    },
    {
      coreType: "H",
      measure: "CBP-HH",
    },
    {
      coreType: "H",
      measure: "CDF-HH",
    },
    {
      coreType: "H",
      measure: "FUA-HH",
    },
    {
      coreType: "H",
      measure: "FUH-HH",
    },
    {
      coreType: "H",
      measure: "IET-HH",
    },
    {
      coreType: "H",
      measure: "IU-HH",
    },
    {
      coreType: "H",
      measure: "OUD-HH",
    },
    {
      coreType: "H",
      measure: "PCR-HH",
    },
    {
      coreType: "H",
      measure: "PQI92-HH",
    },
    {
      coreType: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2022: [
    {
      coreType: "A",
      measure: "CSQ",
    },
    {
      coreType: "C",
      measure: "CSQ",
    },
    {
      coreType: "H",
      measure: "CSQ",
    },
    {
      coreType: "A",
      measure: "AAB-AD",
    },
    {
      coreType: "A",
      measure: "AMM-AD",
    },
    {
      coreType: "A",
      measure: "AMR-AD",
    },
    {
      coreType: "A",
      measure: "BCS-AD",
    },
    {
      coreType: "A",
      measure: "CBP-AD",
    },
    {
      coreType: "A",
      measure: "CCP-AD",
    },
    {
      coreType: "A",
      measure: "CCS-AD",
    },
    {
      coreType: "A",
      measure: "CCW-AD",
    },
    {
      coreType: "A",
      measure: "CDF-AD",
    },
    {
      coreType: "A",
      measure: "CHL-AD",
    },
    {
      coreType: "A",
      measure: "COB-AD",
    },
    {
      coreType: "A",
      measure: "COL-AD",
    },
    {
      coreType: "A",
      measure: "CPA-AD",
    },
    {
      coreType: "A",
      measure: "FUA-AD",
    },
    {
      coreType: "A",
      measure: "FUH-AD",
    },
    {
      coreType: "A",
      measure: "FUM-AD",
    },
    {
      coreType: "A",
      measure: "FVA-AD",
    },
    {
      coreType: "A",
      measure: "HPC-AD",
    },
    {
      coreType: "A",
      measure: "HPCMI-AD",
    },
    {
      coreType: "A",
      measure: "HVL-AD",
    },
    {
      coreType: "A",
      measure: "IET-AD",
    },
    {
      coreType: "A",
      measure: "MSC-AD",
    },
    {
      coreType: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      coreType: "A",
      measure: "OHD-AD",
    },
    {
      coreType: "A",
      measure: "OUD-AD",
    },
    {
      coreType: "A",
      measure: "PCR-AD",
    },
    {
      coreType: "A",
      measure: "PPC-AD",
    },
    {
      coreType: "A",
      measure: "PQI01-AD",
    },
    {
      coreType: "A",
      measure: "PQI05-AD",
    },
    {
      coreType: "A",
      measure: "PQI08-AD",
    },
    {
      coreType: "A",
      measure: "PQI15-AD",
    },
    {
      coreType: "A",
      measure: "SAA-AD",
    },
    {
      coreType: "A",
      measure: "SSD-AD",
    },
    {
      coreType: "C",
      measure: "ADD-CH",
    },
    {
      coreType: "C",
      measure: "AMB-CH",
    },
    {
      coreType: "C",
      measure: "AMR-CH",
    },
    {
      coreType: "C",
      measure: "APM-CH",
    },
    {
      coreType: "C",
      measure: "APP-CH",
    },
    {
      coreType: "C",
      measure: "CCP-CH",
    },
    {
      coreType: "C",
      measure: "CCW-CH",
    },
    {
      coreType: "C",
      measure: "CDF-CH",
    },
    {
      coreType: "C",
      measure: "CHL-CH",
    },
    {
      coreType: "C",
      measure: "CIS-CH",
    },
    {
      coreType: "C",
      measure: "CPC-CH",
    },
    {
      coreType: "C",
      measure: "DEV-CH",
    },
    {
      coreType: "C",
      measure: "FUA-CH",
    },
    {
      coreType: "C",
      measure: "FUH-CH",
    },
    {
      coreType: "C",
      measure: "FUM-CH",
    },
    {
      coreType: "C",
      measure: "IMA-CH",
    },
    {
      coreType: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "OEV-CH",
    },
    {
      coreType: "C",
      measure: "PPC-CH",
    },
    {
      coreType: "C",
      measure: "SFM-CH",
    },
    {
      coreType: "C",
      measure: "TFL-CH",
    },
    {
      coreType: "C",
      measure: "W30-CH",
    },
    {
      coreType: "C",
      measure: "WCC-CH",
    },
    {
      coreType: "C",
      measure: "WCV-CH",
    },
    {
      coreType: "H",
      measure: "AIF-HH",
    },
    {
      coreType: "H",
      measure: "AMB-HH",
    },
    {
      coreType: "H",
      measure: "CBP-HH",
    },
    {
      coreType: "H",
      measure: "CDF-HH",
    },
    {
      coreType: "H",
      measure: "COL-HH",
    },
    {
      coreType: "H",
      measure: "FUA-HH",
    },
    {
      coreType: "H",
      measure: "FUH-HH",
    },
    {
      coreType: "H",
      measure: "FUM-HH",
    },
    {
      coreType: "H",
      measure: "IET-HH",
    },
    {
      coreType: "H",
      measure: "IU-HH",
    },
    {
      coreType: "H",
      measure: "OUD-HH",
    },
    {
      coreType: "H",
      measure: "PCR-HH",
    },
    {
      coreType: "H",
      measure: "PQI92-HH",
    },
    {
      coreType: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2023: [
    {
      coreType: "A",
      measure: "CSQ",
    },
    {
      coreType: "C",
      measure: "CSQ",
    },
    {
      coreType: "H",
      measure: "CSQ",
    },
    {
      coreType: "A",
      measure: "AAB-AD",
    },
    {
      coreType: "A",
      measure: "AMM-AD",
    },
    {
      coreType: "A",
      measure: "AMR-AD",
    },
    {
      coreType: "A",
      measure: "BCS-AD",
    },
    {
      coreType: "A",
      measure: "CBP-AD",
    },
    {
      coreType: "A",
      measure: "CCP-AD",
    },
    {
      coreType: "A",
      measure: "CCS-AD",
    },
    {
      coreType: "A",
      measure: "CCW-AD",
    },
    {
      coreType: "A",
      measure: "CDF-AD",
    },
    {
      coreType: "A",
      measure: "CHL-AD",
    },
    {
      coreType: "A",
      measure: "COB-AD",
    },
    {
      coreType: "A",
      measure: "COL-AD",
    },
    {
      coreType: "A",
      measure: "CPA-AD",
    },
    {
      coreType: "A",
      measure: "CPU-AD",
    },
    {
      coreType: "A",
      measure: "FUA-AD",
    },
    {
      coreType: "A",
      measure: "FUH-AD",
    },
    {
      coreType: "A",
      measure: "FUM-AD",
    },
    {
      coreType: "A",
      measure: "FVA-AD",
    },
    {
      coreType: "A",
      measure: "HBD-AD",
    },
    {
      coreType: "A",
      measure: "HPCMI-AD",
    },
    {
      coreType: "A",
      measure: "HVL-AD",
    },
    {
      coreType: "A",
      measure: "IET-AD",
    },
    {
      coreType: "A",
      measure: "MSC-AD",
    },
    {
      coreType: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      coreType: "A",
      measure: "OHD-AD",
    },
    {
      coreType: "A",
      measure: "OUD-AD",
    },
    {
      coreType: "A",
      measure: "PCR-AD",
    },
    {
      coreType: "A",
      measure: "PPC-AD",
    },
    {
      coreType: "A",
      measure: "PQI01-AD",
    },
    {
      coreType: "A",
      measure: "PQI05-AD",
    },
    {
      coreType: "A",
      measure: "PQI08-AD",
    },
    {
      coreType: "A",
      measure: "PQI15-AD",
    },
    {
      coreType: "A",
      measure: "SAA-AD",
    },
    {
      coreType: "A",
      measure: "SSD-AD",
    },
    {
      coreType: "C",
      measure: "AAB-CH",
    },
    {
      coreType: "C",
      measure: "ADD-CH",
    },
    {
      coreType: "C",
      measure: "AMB-CH",
    },
    {
      coreType: "C",
      measure: "AMR-CH",
    },
    {
      coreType: "C",
      measure: "APM-CH",
    },
    {
      coreType: "C",
      measure: "APP-CH",
    },
    {
      coreType: "C",
      measure: "CCP-CH",
    },
    {
      coreType: "C",
      measure: "CCW-CH",
    },
    {
      coreType: "C",
      measure: "CDF-CH",
    },
    {
      coreType: "C",
      measure: "CHL-CH",
    },
    {
      coreType: "C",
      measure: "CIS-CH",
    },
    {
      coreType: "C",
      measure: "CPC-CH",
    },
    {
      coreType: "C",
      measure: "DEV-CH",
    },
    {
      coreType: "C",
      measure: "FUA-CH",
    },
    {
      coreType: "C",
      measure: "FUH-CH",
    },
    {
      coreType: "C",
      measure: "FUM-CH",
    },
    {
      coreType: "C",
      measure: "IMA-CH",
    },
    {
      coreType: "C",
      measure: "LSC-CH",
    },
    {
      coreType: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "OEV-CH",
    },
    {
      coreType: "C",
      measure: "PPC-CH",
    },
    {
      coreType: "C",
      measure: "SFM-CH",
    },
    {
      coreType: "C",
      measure: "TFL-CH",
    },
    {
      coreType: "C",
      measure: "W30-CH",
    },
    {
      coreType: "C",
      measure: "WCC-CH",
    },
    {
      coreType: "C",
      measure: "WCV-CH",
    },
    {
      coreType: "H",
      measure: "AIF-HH",
    },
    {
      coreType: "H",
      measure: "AMB-HH",
    },
    {
      coreType: "H",
      measure: "CBP-HH",
    },
    {
      coreType: "H",
      measure: "CDF-HH",
    },
    {
      coreType: "H",
      measure: "COL-HH",
    },
    {
      coreType: "H",
      measure: "FUA-HH",
    },
    {
      coreType: "H",
      measure: "FUH-HH",
    },
    {
      coreType: "H",
      measure: "FUM-HH",
    },
    {
      coreType: "H",
      measure: "IET-HH",
    },
    {
      coreType: "H",
      measure: "IU-HH",
    },
    {
      coreType: "H",
      measure: "OUD-HH",
    },
    {
      coreType: "H",
      measure: "PCR-HH",
    },
    {
      coreType: "H",
      measure: "PQI92-HH",
    },
    {
      coreType: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2024: [
    {
      coreType: "A",
      measure: "CSQ",
    },
    {
      coreType: "C",
      measure: "CSQ",
    },
    {
      coreType: "H",
      measure: "CSQ",
    },
    {
      coreType: "A",
      measure: "AAB-AD",
    },
    {
      coreType: "A",
      measure: "AMM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "AMR-AD",
    },
    {
      coreType: "A",
      measure: "BCS-AD",
    },
    {
      coreType: "A",
      measure: "CBP-AD",
    },
    {
      coreType: "A",
      measure: "CCP-AD",
    },
    {
      coreType: "A",
      measure: "CCS-AD",
    },
    {
      coreType: "A",
      measure: "CCW-AD",
    },
    {
      coreType: "A",
      measure: "CDF-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "CHL-AD",
    },
    {
      coreType: "A",
      measure: "COB-AD",
    },
    {
      coreType: "A",
      measure: "COL-AD",
    },
    {
      coreType: "A",
      measure: "CPA-AD",
    },
    {
      coreType: "A",
      measure: "CPU-AD",
    },
    {
      coreType: "A",
      measure: "FUA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "FUH-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "FUM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "HBD-AD",
    },
    {
      coreType: "A",
      measure: "HPCMI-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "HVL-AD",
    },
    {
      coreType: "A",
      measure: "IET-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "MSC-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "NCIIDD-AD",
      autocompleteOnCreation: true,
    },
    {
      coreType: "A",
      measure: "OHD-AD",
    },
    {
      coreType: "A",
      measure: "OUD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "PCR-AD",
    },
    {
      coreType: "A",
      measure: "PPC2-AD",
    },
    {
      coreType: "A",
      measure: "PQI01-AD",
    },
    {
      coreType: "A",
      measure: "PQI05-AD",
    },
    {
      coreType: "A",
      measure: "PQI08-AD",
    },
    {
      coreType: "A",
      measure: "PQI15-AD",
    },
    {
      coreType: "A",
      measure: "SAA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "SSD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "AAB-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "ADD-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "AMB-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "AMR-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "APM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "APP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CCP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CCW-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CDF-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CHL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CIS-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CPC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "DEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "FUA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "FUH-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "FUM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "IMA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "LSC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "LBW-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "LRCD-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "OEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "PPC2-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "SFM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "TFL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "W30-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "WCC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "WCV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "AIF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "AMB-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "CBP-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "CDF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "COL-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "FUA-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "FUH-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "FUM-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "IET-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "IU-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "OUD-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "PCR-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "PQI92-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "SS-1-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-2-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-3-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-4-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-5-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
  ],
  2025: [
    {
      coreType: "A",
      measure: "CSQ",
    },
    {
      coreType: "C",
      measure: "CSQ",
    },
    {
      coreType: "H",
      measure: "CSQ",
    },
    {
      coreType: "A",
      measure: "AAB-AD",
    },
    {
      coreType: "A",
      measure: "AMM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "AMR-AD",
    },
    {
      coreType: "A",
      measure: "AIS-AD",
    },
    {
      coreType: "A",
      measure: "BCS-AD",
    },
    {
      coreType: "A",
      measure: "CBP-AD",
    },
    {
      coreType: "A",
      measure: "CCP-AD",
    },
    {
      coreType: "A",
      measure: "CCS-AD",
    },
    {
      coreType: "A",
      measure: "CCW-AD",
    },
    {
      coreType: "A",
      measure: "CDF-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "CHL-AD",
    },
    {
      coreType: "A",
      measure: "COB-AD",
    },
    {
      coreType: "A",
      measure: "COL-AD",
    },
    {
      coreType: "A",
      measure: "CPA-AD",
    },
    {
      coreType: "A",
      measure: "CPU-AD",
    },
    {
      coreType: "A",
      measure: "EDV-AD",
    },
    {
      coreType: "A",
      measure: "FUA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "FUH-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "FUM-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "GSD-AD",
    },
    {
      coreType: "A",
      measure: "HPCMI-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "HVL-AD",
    },
    {
      coreType: "A",
      measure: "IET-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "LRCD-AD",
      autocompleteOnCreation: true,
    },
    {
      coreType: "A",
      measure: "MSC-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "NCIIDD-AD",
      autocompleteOnCreation: true,
    },
    {
      coreType: "A",
      measure: "OEVP-AD",
    },
    {
      coreType: "A",
      measure: "OHD-AD",
    },
    {
      coreType: "A",
      measure: "OUD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "PCR-AD",
    },
    {
      coreType: "A",
      measure: "PDS-AD",
      type: Type?.PROVISIONAL,
    },
    {
      coreType: "A",
      measure: "PPC2-AD",
    },
    {
      coreType: "A",
      measure: "PQI01-AD",
    },
    {
      coreType: "A",
      measure: "PQI05-AD",
    },
    {
      coreType: "A",
      measure: "PQI08-AD",
    },
    {
      coreType: "A",
      measure: "PQI15-AD",
    },
    {
      coreType: "A",
      measure: "PRS-AD",
    },
    {
      coreType: "A",
      measure: "SAA-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "A",
      measure: "SSD-AD",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "AAB-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "ADD-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "AMR-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "APM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "APP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CCP-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CCW-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CDF-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CHL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CIS-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "CPC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "DEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "FUA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "FUH-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "FUM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "IMA-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "LSC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "LBW-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "LRCD-CH",
      type: Type?.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      coreType: "C",
      measure: "OEV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "OEVP-CH",
      type: Type?.PROVISIONAL,
    },
    {
      coreType: "C",
      measure: "PDS-CH",
      type: Type?.PROVISIONAL,
    },
    {
      coreType: "C",
      measure: "PPC2-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "PRS-CH",
      type: Type?.PROVISIONAL,
    },
    {
      coreType: "C",
      measure: "SFM-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "TFL-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "W30-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "WCC-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "C",
      measure: "WCV-CH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "AIF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "CBP-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "CDF-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "COL-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "FUA-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "FUH-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "FUM-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "IET-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "IU-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "OUD-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "PCR-HH",
      type: Type?.MANDATORY,
    },
    {
      coreType: "H",
      measure: "SS-1-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-2-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-3-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-4-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
    {
      coreType: "H",
      measure: "SS-5-HH",
      type: Type?.MANDATORY,
      placeholder: true,
    },
  ],
};
