import { ReportType } from "../../types";

interface Measure {
  [year: number]: MeasureMetaData[];
}

export interface MeasureMetaData {
  type: "A" | "C" | "H";
  measure: string;
  autocompleteOnCreation?: boolean;
  placeholder?: boolean;
  reportType?: ReportType;
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
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "FUH-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "FUM-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "HBD-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "MSC-AD",
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "SSD-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "AAB-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "ADD-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "AMB-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "AMR-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "APM-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "APP-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CCP-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CCW-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CDF-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CHL-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CIS-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CPC-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "DEV-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "FUA-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "FUH-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "FUM-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "IMA-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "LSC-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "LBW-CH",
      reportType: ReportType.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      reportType: ReportType.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "OEV-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "PPC2-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "SFM-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "TFL-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "W30-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "WCC-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "WCV-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "AIF-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "AMB-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "CBP-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "CDF-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "COL-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "FUA-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "FUH-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "FUM-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "IET-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "IU-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "OUD-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "PCR-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "PQI92-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "SS-1-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "FUH-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "FUM-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "GSD-AD",
    },
    {
      type: "A",
      measure: "HPCMI-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "HVL-AD",
    },
    {
      type: "A",
      measure: "IET-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "LRCD-AD",
      autocompleteOnCreation: true,
    },
    {
      type: "A",
      measure: "MSC-AD",
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
    },
    {
      type: "A",
      measure: "SSD-AD",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "AAB-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "ADD-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "AMR-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "APM-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "APP-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CCP-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CCW-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CDF-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CHL-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CIS-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "CPC-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "DEV-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "FUA-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "FUH-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "FUM-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "IMA-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "LSC-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "LBW-CH",
      reportType: ReportType.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "LRCD-CH",
      reportType: ReportType.MANDATORY,
      autocompleteOnCreation: true,
    },
    {
      type: "C",
      measure: "OEV-CH",
      reportType: ReportType.MANDATORY,
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
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "PRS-CH",
    },
    {
      type: "C",
      measure: "SFM-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "TFL-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "W30-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "WCC-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "C",
      measure: "WCV-CH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "AIF-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "CBP-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "CDF-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "COL-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "FUA-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "FUH-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "FUM-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "IET-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "IU-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "OUD-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "PCR-HH",
      reportType: ReportType.MANDATORY,
    },
    {
      type: "H",
      measure: "SS-1-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-2-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-3-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-4-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
    {
      type: "H",
      measure: "SS-5-HH",
      reportType: ReportType.MANDATORY,
      placeholder: true,
    },
  ],
};
