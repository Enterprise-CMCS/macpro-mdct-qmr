import {
  DataSourceInformationBanner,
  dataSourceSelections,
} from "./DataSourceInformationBanner";
import { render, screen } from "@testing-library/react";
import { CombinedRatesPayload } from "types";

const emptyDataSource = {
  DataSource: [],
  DataSourceSelections: {},
  requiresWeightedCalc: false,
  isUnusableForCalc: false,
  hasECDSDataSource: false,
  hasOtherDataSource: false,
  hasOtherSpecification: false,
};
const emptyPayload = {
  DataSources: {
    Medicaid: emptyDataSource,
    CHIP: emptyDataSource,
  },
  Rates: [],
  AdditionalValues: [],
} as CombinedRatesPayload;

describe("DataSourceInformationBanner", () => {
  it("should render data sources correctly", () => {
    const payload = {
      DataSources: {
        Medicaid: {
          DataSource: ["AdministrativeData", "ElectronicHealthRecords"],
          DataSourceSelections: {
            AdministrativeData0: {
              selected: ["MedicaidManagementInformationSystemMMIS"],
            },
            ElectronicHealthRecords: {
              description: "These are health records stored with electricity",
            },
          },
          requiresWeightedCalc: false,
          isUnusableForCalc: false,
          hasECDSDataSource: false,
          hasOtherDataSource: false,
          hasOtherSpecification: false,
        },
        CHIP: {
          DataSource: ["HybridAdministrativeandMedicalRecordsData"],
          DataSourceSelections: {
            HybridAdministrativeandMedicalRecordsData0: {
              selected: [
                "ImmunizationRegistryImmunizationInformationSystemIIS",
              ],
            },
            HybridAdministrativeandMedicalRecordsData1: {
              selected: ["OtherDataSource"],
            },
            "HybridAdministrativeandMedicalRecordsData1-OtherDataSource": {
              description: "A little bird told me",
            },
          },
          requiresWeightedCalc: true,
          isUnusableForCalc: false,
          hasECDSDataSource: false,
          hasOtherDataSource: false,
          hasOtherSpecification: false,
        },
      },
      Rates: [],
      AdditionalValues: [],
    } as CombinedRatesPayload;
    const props = { payload, year: "2025" };

    const { container } = render(<DataSourceInformationBanner {...props} />);

    const sections = container.querySelectorAll("section");
    expect(sections.length).toBe(2);

    const medicaidSection = sections[0];
    expect(medicaidSection.querySelector("h2")).toHaveTextContent(
      "Medicaid Data Source"
    );
    expect(medicaidSection).toHaveTextContent(/Administrative Data/);
    expect(medicaidSection).toHaveTextContent(
      /Medicaid Management Information System \(MMIS\)/
    );
    expect(medicaidSection).toHaveTextContent(
      /Electronic Health Record \(EHR\) Data/
    );
    expect(medicaidSection).toHaveTextContent(
      /These are health records stored with electricity/
    );

    const chipSection = sections[1];
    expect(chipSection.querySelector("h2")).toHaveTextContent(
      "Separate CHIP Data Source"
    );
    expect(chipSection).toHaveTextContent(
      /Hybrid \(Administrative and Medical Records Data\)/
    );
    expect(chipSection).toHaveTextContent(
      /Immunization Registry\/Immunization Information System \(IIS\)/
    );
    expect(chipSection).toHaveTextContent(
      /Other Data Source - A little bird told me/
    );
  });

  it("should render 'Data Collection Method' for year 2026 and beyond", () => {
    const payload = {
      DataSources: {
        Medicaid: {
          DataSource: ["AdministrativeData"],
          DataSourceSelections: {
            AdministrativeData0: {
              selected: ["MedicaidManagementInformationSystemMMIS"],
            },
          },
          requiresWeightedCalc: false,
          isUnusableForCalc: false,
          hasECDSDataSource: false,
          hasOtherDataSource: false,
          hasOtherSpecification: false,
        },
        CHIP: emptyDataSource,
      },
      Rates: [],
      AdditionalValues: [],
    } as CombinedRatesPayload;
    const props = { payload, year: "2026" };

    const { container } = render(<DataSourceInformationBanner {...props} />);

    const sections = container.querySelectorAll("section");
    const medicaidSection = sections[0];
    expect(medicaidSection.querySelector("h2")).toHaveTextContent(
      "Medicaid Data Collection Method"
    );

    const chipSection = sections[1];
    expect(chipSection.querySelector("h2")).toHaveTextContent(
      "Separate CHIP Data Collection Method"
    );
  });

  it("should render 'Other' instead of 'Other Data Source' for year 2026", () => {
    const payload = {
      DataSources: {
        Medicaid: {
          DataSource: ["OtherDataSource"],
          DataSourceSelections: {
            OtherDataSource: {
              description: "Custom data source description",
            },
          },
          requiresWeightedCalc: false,
          isUnusableForCalc: false,
          hasECDSDataSource: false,
          hasOtherDataSource: false,
          hasOtherSpecification: false,
        },
        CHIP: emptyDataSource,
      },
      Rates: [],
      AdditionalValues: [],
    } as CombinedRatesPayload;
    const props = { payload, year: "2026" };

    const { container } = render(<DataSourceInformationBanner {...props} />);

    const sections = container.querySelectorAll("section");
    const medicaidSection = sections[0];
    // Check that it contains "Other" but not "Other Data Source"
    // The heading with size="sm" doesn't have a specific tag, so we check the text content
    expect(medicaidSection.textContent).toContain("Other");
    expect(medicaidSection.textContent).not.toContain("Other Data Source");
  });

  it("should render 'Other Data Source' for year 2025 and earlier", () => {
    const payload = {
      DataSources: {
        Medicaid: {
          DataSource: ["OtherDataSource"],
          DataSourceSelections: {
            OtherDataSource: {
              description: "Custom data source description",
            },
          },
          requiresWeightedCalc: false,
          isUnusableForCalc: false,
          hasECDSDataSource: false,
          hasOtherDataSource: false,
          hasOtherSpecification: false,
        },
        CHIP: emptyDataSource,
      },
      Rates: [],
      AdditionalValues: [],
    } as CombinedRatesPayload;
    const props = { payload, year: "2025" };

    const { container } = render(<DataSourceInformationBanner {...props} />);

    const sections = container.querySelectorAll("section");
    const medicaidSection = sections[0];
    expect(medicaidSection).toHaveTextContent("Other Data Source");
  });

  it("should render an explanation for why ECDS-sourced data is excluded from the combined rate", () => {
    const payload = {
      ...emptyPayload,
      DataSources: {
        ...emptyPayload.DataSources,
        Medicaid: {
          ...emptyDataSource,
          isUnusableForCalc: true,
          hasECDSDataSource: true,
        },
      },
    };

    const props = { payload };
    render(<DataSourceInformationBanner {...props} />);
    expect(
      screen.getByText(
        /These data were reported using the Electronic Clinical Data System/
      )
    ).toBeInTheDocument();
  });

  it("should not render an explanation for why ECDS-sourced data is excluded, if it wasn't excluded", () => {
    const payload = {
      ...emptyPayload,
      DataSources: {
        ...emptyPayload.DataSources,
        Medicaid: {
          ...emptyDataSource,
          isUnusableForCalc: false,
          hasECDSDataSource: true,
        },
      },
    };

    const props = { payload };
    render(<DataSourceInformationBanner {...props} />);
    expect(
      screen.queryByText(
        /These data were reported using the Electronic Clinical Data System/
      )
    ).not.toBeInTheDocument();
  });

  it("should render an explanation for why Other-sourced data is excluded from the combined rate", () => {
    const payload = {
      ...emptyPayload,
      DataSources: {
        ...emptyPayload.DataSources,
        Medicaid: {
          ...emptyDataSource,
          isUnusableForCalc: true,
          hasOtherDataSource: true,
        },
      },
    };
    const props = { payload };
    render(<DataSourceInformationBanner {...props} />);
    expect(
      screen.getByText(/These data were reported using “Other” Data Source/)
    ).toBeInTheDocument();
  });

  it("should render an explanation for why data with an Other specification is not displayed", () => {
    const payload = {
      ...emptyPayload,
      DataSources: {
        ...emptyPayload.DataSources,
        Medicaid: {
          ...emptyDataSource,
          isUnusableForCalc: true,
          hasOtherSpecification: true,
        },
      },
    };
    const props = { payload };
    render(<DataSourceInformationBanner {...props} />);
    expect(
      screen.getByText(
        /These data were reported using “Other” Specifications. Therefore,/
      )
    ).toBeInTheDocument();
  });

  describe("dataSourceSelections", () => {
    const selections = {
      ElectronicHealthRecords: {
        description: "custom ehr text",
      },
      AdministrativeData0: {
        selected: [
          "MedicaidManagementInformationSystemMMIS",
          "AdministrativeDataOther",
        ],
      },
      "AdministrativeData0-AdministrativeDataOther": {
        description: "custom admin other text",
      },
    };

    it("should return the description of a custom data source", () => {
      const result = dataSourceSelections(
        "ElectronicHealthRecords",
        selections
      );
      expect(result).toEqual(["custom ehr text"]);
    });

    it("should collect values and descriptions for data sources with multiple selections", () => {
      const result = dataSourceSelections("AdministrativeData", selections);
      expect(result).toEqual([
        "Medicaid Management Information System (MMIS)",
        "Administrative Data Other - custom admin other text",
      ]);
    });
  });
});
