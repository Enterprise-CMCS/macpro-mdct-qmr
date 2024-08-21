import {
  DataSourceInformationBanner,
  dataSourceSelections,
  formatCamelCaseWithInitialisms,
} from "./DataSourceInformationBanner";
import { render } from "@testing-library/react";
import { CombinedRatesPayload } from "types";

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
          includesHybrid: false,
          isNotApplicable: false,
        },
        CHIP: {
          DataSource: ["HybridAdministrativeandMedicalRecordsData"],
          DataSourceSelections: {
            HybridAdministrativeandMedicalRecordsData0: {
              selected: ["ImmunizationRegistryImmunizationInformationSystemIIS"],
            },
            HybridAdministrativeandMedicalRecordsData1: {
              selected: ["OtherDataSource"],
            },
            "HybridAdministrativeandMedicalRecordsData1-OtherDataSource": {
              description: "A little bird told me",
            },
          },
          includesHybrid: true,
          isNotApplicable: false,
        },
      },
      Rates: [],
      AdditionalValues: [],
    } as CombinedRatesPayload;
    const props = { payload };

    const { container } = render(<DataSourceInformationBanner {...props}/>);

    const sections = container.querySelectorAll("section");
    expect(sections.length).toBe(2);

    const medicaidSection = sections[0];
    expect(medicaidSection.querySelector("h2")).toHaveTextContent("Medicaid Data Source");
    expect(medicaidSection).toHaveTextContent(/Administrative Data/);
    expect(medicaidSection).toHaveTextContent(/Medicaid Management Information System \(MMIS\)/);
    expect(medicaidSection).toHaveTextContent(/Electronic Health Record \(EHR\) Data/);
    expect(medicaidSection).toHaveTextContent(/These are health records stored with electricity/);

    const chipSection = sections[1];
    expect(chipSection.querySelector("h2")).toHaveTextContent("Separate CHIP Data Source");
    expect(chipSection).toHaveTextContent(/Hybrid \(Administrative and Medical Records Data\)/);
    expect(chipSection).toHaveTextContent(/Immunization Registry Immunization Information System \(IIS\)/);
    expect(chipSection).toHaveTextContent(/Other Data Source - A little bird told me/);
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

  describe("formatCamelCaseWithInitialisms", () => {
    it("should format data source enumeration values into short names", () => {
      const dataSource = "MedicaidManagementInformationSystemMMIS";
      const shortName = formatCamelCaseWithInitialisms(dataSource);
      expect(shortName).toBe("Medicaid Management Information System (MMIS)");
    });

    it("should add parentheses to user data that contains capital letters", () => {
      const dataSource =
        "AdministrativeDataOther - a Houston, TX filing cabinet";
      const shortName = formatCamelCaseWithInitialisms(dataSource);
      expect(shortName).toBe(
        "Administrative Data Other - a  Houston, (TX) filing cabinet"
      );
    });
  });
});
