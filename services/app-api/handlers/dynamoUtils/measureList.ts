interface Measure {
  [year: number]: MeasureMetaData[];
}

export interface MeasureMetaData {
  type: "A" | "C" | "H";
  measure: string;
  autocompleteOnCreation?: boolean;
  placeholder?: boolean;
  mandatory?: boolean;
}

export const measures: Measure = {
  2021: [
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
      measure: "AMM-AD",
    },
    {
      type: "A",
      measure: "AMR-AD",
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
      measure: "CPA-AD",
    },
    {
      type: "A",
      measure: "FUA-AD",
    },
    {
      type: "A",
      measure: "FUH-AD",
    },
    {
      type: "A",
      measure: "FUM-AD",
    },
    {
      type: "A",
      measure: "FVA-AD",
    },
    {
      type: "A",
      measure: "HPC-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
    },
    {
      type: "A",
      measure: "MSC-AD",
    },
    {
      type: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      measure: "OHD-AD",
    },
    {
      type: "A",
      measure: "OUD-AD",
    },
    {
      type: "A",
      measure: "PC01-AD",
    },
    {
      type: "A",
      measure: "PCR-AD",
    },
    {
      type: "A",
      measure: "PPC-AD",
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
      measure: "SAA-AD",
    },
    {
      type: "A",
      measure: "SSD-AD",
    },
    {
      type: "C",
      measure: "ADD-CH",
    },
    {
      type: "C",
      measure: "AMB-CH",
    },
    {
      type: "C",
      measure: "AMR-CH",
    },
    {
      type: "C",
      measure: "APM-CH",
    },
    {
      type: "C",
      measure: "APP-CH",
    },
    {
      type: "C",
      measure: "AUD-CH",
    },
    {
      type: "C",
      measure: "CCP-CH",
    },
    {
      type: "C",
      measure: "CCW-CH",
    },
    {
      type: "C",
      measure: "CDF-CH",
    },
    {
      type: "C",
      measure: "CHL-CH",
    },
    {
      type: "C",
      measure: "CIS-CH",
    },
    {
      type: "C",
      measure: "CPC-CH",
    },
    {
      type: "C",
      measure: "DEV-CH",
    },
    {
      type: "C",
      measure: "FUH-CH",
    },
    {
      type: "C",
      measure: "IMA-CH",
    },
    {
      type: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "PDENT-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "PPC-CH",
    },
    {
      type: "C",
      measure: "SFM-CH",
    },
    {
      type: "C",
      measure: "W30-CH",
    },
    {
      type: "C",
      measure: "WCC-CH",
    },
    {
      type: "C",
      measure: "WCV-CH",
    },
    {
      type: "H",
      measure: "AIF-HH",
    },
    {
      type: "H",
      measure: "AMB-HH",
    },
    {
      type: "H",
      measure: "CBP-HH",
    },
    {
      type: "H",
      measure: "CDF-HH",
    },
    {
      type: "H",
      measure: "FUA-HH",
    },
    {
      type: "H",
      measure: "FUH-HH",
    },
    {
      type: "H",
      measure: "IET-HH",
    },
    {
      type: "H",
      measure: "IU-HH",
    },
    {
      type: "H",
      measure: "OUD-HH",
    },
    {
      type: "H",
      measure: "PCR-HH",
    },
    {
      type: "H",
      measure: "PQI92-HH",
    },
    {
      type: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2022: [
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
    },
    {
      type: "A",
      measure: "AMR-AD",
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
      measure: "FUA-AD",
    },
    {
      type: "A",
      measure: "FUH-AD",
    },
    {
      type: "A",
      measure: "FUM-AD",
    },
    {
      type: "A",
      measure: "FVA-AD",
    },
    {
      type: "A",
      measure: "HPC-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
    },
    {
      type: "A",
      measure: "MSC-AD",
    },
    {
      type: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      measure: "OHD-AD",
    },
    {
      type: "A",
      measure: "OUD-AD",
    },
    {
      type: "A",
      measure: "PCR-AD",
    },
    {
      type: "A",
      measure: "PPC-AD",
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
      measure: "SAA-AD",
    },
    {
      type: "A",
      measure: "SSD-AD",
    },
    {
      type: "C",
      measure: "ADD-CH",
    },
    {
      type: "C",
      measure: "AMB-CH",
    },
    {
      type: "C",
      measure: "AMR-CH",
    },
    {
      type: "C",
      measure: "APM-CH",
    },
    {
      type: "C",
      measure: "APP-CH",
    },
    {
      type: "C",
      measure: "CCP-CH",
    },
    {
      type: "C",
      measure: "CCW-CH",
    },
    {
      type: "C",
      measure: "CDF-CH",
    },
    {
      type: "C",
      measure: "CHL-CH",
    },
    {
      type: "C",
      measure: "CIS-CH",
    },
    {
      type: "C",
      measure: "CPC-CH",
    },
    {
      type: "C",
      measure: "DEV-CH",
    },
    {
      type: "C",
      measure: "FUA-CH",
    },
    {
      type: "C",
      measure: "FUH-CH",
    },
    {
      type: "C",
      measure: "FUM-CH",
    },
    {
      type: "C",
      measure: "IMA-CH",
    },
    {
      type: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "OEV-CH",
    },
    {
      type: "C",
      measure: "PPC-CH",
    },
    {
      type: "C",
      measure: "SFM-CH",
    },
    {
      type: "C",
      measure: "TFL-CH",
    },
    {
      type: "C",
      measure: "W30-CH",
    },
    {
      type: "C",
      measure: "WCC-CH",
    },
    {
      type: "C",
      measure: "WCV-CH",
    },
    {
      type: "H",
      measure: "AIF-HH",
    },
    {
      type: "H",
      measure: "AMB-HH",
    },
    {
      type: "H",
      measure: "CBP-HH",
    },
    {
      type: "H",
      measure: "CDF-HH",
    },
    {
      type: "H",
      measure: "COL-HH",
    },
    {
      type: "H",
      measure: "FUA-HH",
    },
    {
      type: "H",
      measure: "FUH-HH",
    },
    {
      type: "H",
      measure: "FUM-HH",
    },
    {
      type: "H",
      measure: "IET-HH",
    },
    {
      type: "H",
      measure: "IU-HH",
    },
    {
      type: "H",
      measure: "OUD-HH",
    },
    {
      type: "H",
      measure: "PCR-HH",
    },
    {
      type: "H",
      measure: "PQI92-HH",
    },
    {
      type: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2023: [
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
    },
    {
      type: "A",
      measure: "AMR-AD",
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
      measure: "FUA-AD",
    },
    {
      type: "A",
      measure: "FUH-AD",
    },
    {
      type: "A",
      measure: "FUM-AD",
    },
    {
      type: "A",
      measure: "FVA-AD",
    },
    {
      type: "A",
      measure: "HBD-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
    },
    {
      type: "A",
      measure: "MSC-AD",
    },
    {
      type: "A",
      measure: "NCIDDS-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      measure: "OHD-AD",
    },
    {
      type: "A",
      measure: "OUD-AD",
    },
    {
      type: "A",
      measure: "PCR-AD",
    },
    {
      type: "A",
      measure: "PPC-AD",
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
      measure: "SAA-AD",
    },
    {
      type: "A",
      measure: "SSD-AD",
    },
    {
      type: "C",
      measure: "AAB-CH",
    },
    {
      type: "C",
      measure: "ADD-CH",
    },
    {
      type: "C",
      measure: "AMB-CH",
    },
    {
      type: "C",
      measure: "AMR-CH",
    },
    {
      type: "C",
      measure: "APM-CH",
    },
    {
      type: "C",
      measure: "APP-CH",
    },
    {
      type: "C",
      measure: "CCP-CH",
    },
    {
      type: "C",
      measure: "CCW-CH",
    },
    {
      type: "C",
      measure: "CDF-CH",
    },
    {
      type: "C",
      measure: "CHL-CH",
    },
    {
      type: "C",
      measure: "CIS-CH",
    },
    {
      type: "C",
      measure: "CPC-CH",
    },
    {
      type: "C",
      measure: "DEV-CH",
    },
    {
      type: "C",
      measure: "FUA-CH",
    },
    {
      type: "C",
      measure: "FUH-CH",
    },
    {
      type: "C",
      measure: "FUM-CH",
    },
    {
      type: "C",
      measure: "IMA-CH",
    },
    {
      type: "C",
      measure: "LSC-CH",
    },
    {
      type: "C",
      measure: "LBW-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "OEV-CH",
    },
    {
      type: "C",
      measure: "PPC-CH",
    },
    {
      type: "C",
      measure: "SFM-CH",
    },
    {
      type: "C",
      measure: "TFL-CH",
    },
    {
      type: "C",
      measure: "W30-CH",
    },
    {
      type: "C",
      measure: "WCC-CH",
    },
    {
      type: "C",
      measure: "WCV-CH",
    },
    {
      type: "H",
      measure: "AIF-HH",
    },
    {
      type: "H",
      measure: "AMB-HH",
    },
    {
      type: "H",
      measure: "CBP-HH",
    },
    {
      type: "H",
      measure: "CDF-HH",
    },
    {
      type: "H",
      measure: "COL-HH",
    },
    {
      type: "H",
      measure: "FUA-HH",
    },
    {
      type: "H",
      measure: "FUH-HH",
    },
    {
      type: "H",
      measure: "FUM-HH",
    },
    {
      type: "H",
      measure: "IET-HH",
    },
    {
      type: "H",
      measure: "IU-HH",
    },
    {
      type: "H",
      measure: "OUD-HH",
    },
    {
      type: "H",
      measure: "PCR-HH",
    },
    {
      type: "H",
      measure: "PQI92-HH",
    },
    {
      type: "H",
      measure: "SS-1-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      placeholder: true,
    },
  ],
  2024: [
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
      mandatory: true,
    },
    {
      type: "A",
      measure: "AMR-AD",
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
      mandatory: true,
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
      measure: "FUA-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "FUH-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "FUM-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "HBD-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "MSC-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "NCIIDD-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      measure: "OHD-AD",
    },
    {
      type: "A",
      measure: "OUD-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "PCR-AD",
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
      measure: "SAA-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "SSD-AD",
      mandatory: true,
    },
    {
      type: "C",
      measure: "AAB-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "ADD-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "AMB-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "AMR-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "APM-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "APP-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CCP-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CCW-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CDF-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CHL-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CIS-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CPC-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "DEV-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "FUA-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "FUH-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "FUM-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "IMA-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "LSC-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "LBW-CH",
      mandatory: true,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      mandatory: true,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "OEV-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "PPC2-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "SFM-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "TFL-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "W30-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "WCC-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "WCV-CH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "AIF-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "AMB-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "CBP-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "CDF-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "COL-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "FUA-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "FUH-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "FUM-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "IET-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "IU-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "OUD-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "PCR-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "PQI92-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "SS-1-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      mandatory: true,
      placeholder: true,
    },
  ],
  2025: [
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
      mandatory: true,
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
      mandatory: true,
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
      mandatory: true,
    },
    {
      type: "A",
      measure: "FUH-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "FUM-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "HBD-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
      mandatory: true,
    },
    {
      type: "A",
      measure: "LRCD-AD",
    },
    {
      type: "A",
      measure: "MSC-AD",
      mandatory: true,
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
      mandatory: true,
    },
    {
      type: "A",
      measure: "PCR-AD",
    },
    {
      type: "A",
      measure: "PDS-AD",
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
      mandatory: true,
    },
    {
      type: "A",
      measure: "SSD-AD",
      mandatory: true,
    },
    {
      type: "C",
      measure: "AAB-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "ADD-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "AMR-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "APM-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "APP-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CCP-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CCW-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CDF-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CHL-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CIS-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "CPC-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "DEV-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "FUA-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "FUH-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "FUM-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "IMA-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "LSC-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "LBW-CH",
      mandatory: true,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      mandatory: true,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "OEV-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "OEVP-CH",
    },
    {
      type: "C",
      measure: "PDS-CH",
    },
    {
      type: "C",
      measure: "PPC2-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "PRS-CH",
    },
    {
      type: "C",
      measure: "SFM-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "TFL-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "W30-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "WCC-CH",
      mandatory: true,
    },
    {
      type: "C",
      measure: "WCV-CH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "AIF-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "CBP-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "CDF-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "COL-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "FUA-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "FUH-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "FUM-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "IET-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "IU-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "OUD-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "PCR-HH",
      mandatory: true,
    },
    {
      type: "H",
      measure: "SS-1-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      mandatory: true,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      mandatory: true,
      placeholder: true,
    },
  ],
};
