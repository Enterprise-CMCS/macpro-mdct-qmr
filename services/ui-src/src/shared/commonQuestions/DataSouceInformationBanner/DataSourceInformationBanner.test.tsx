import { dataSourceSelections, formatCamelCaseWithInitialisms } from "./DataSourceInformationBanner";

describe("DataSourceInformationBanner", () => {
  describe("dataSourceSelections", () => {
    const selections = {
      "ElectronicHealthRecords": {
          "description": "custom ehr text"
      },
      "AdministrativeData0": {
          "selected": [
              "MedicaidManagementInformationSystemMMIS",
              "AdministrativeDataOther"
          ]
      },
      "AdministrativeData0-AdministrativeDataOther": {
          "description": "custom admin other text"
      }
    };

    it("should return the description of a custom data source", () => {
      const result = dataSourceSelections("ElectronicHealthRecords", selections);
      expect(result).toEqual(["custom ehr text"]);
    });

    it("should collect values and descriptions for data sources with multiple selections", () => {
      const result = dataSourceSelections("AdministrativeData", selections);
      expect(result).toEqual([
        "MedicaidManagementInformationSystemMMIS",
        "AdministrativeDataOther - custom admin other text",
      ]);
    });
  });

  describe("formatCamelCaseWithInitialisms", () => {
    it("should format data source enumeration values into short names", () => {
      const dataSource = "MedicaidManagementInformationSystemMMIS";
      const shortName = formatCamelCaseWithInitialisms(dataSource);
      expect(shortName).toBe("Medicaid Management Information System (MMIS)");
    });

    it("should not mangle user data that contains capital letters", () => {
      const dataSource = "AdministrativeDataOther - a Houston, TX filing cabinet";
      const shortName = formatCamelCaseWithInitialisms(dataSource);
      // TODO, fix this behavior, and then update this expectation
      expect(shortName).toBe("Administrative Data Other - a  Houston, (TX) filing cabinet");
    });
  });
});
