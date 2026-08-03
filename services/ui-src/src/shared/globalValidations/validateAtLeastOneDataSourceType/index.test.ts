import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateAtLeastOneDataSourceType } from ".";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(() => 2025),
}));

describe("validateOneDataSourceType", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateAtLeastOneDataSourceType(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  const _setOptionalDataSourceSelections = () => {
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      ElectronicHealthRecords: {
        description: undefined,
      },
      ElectronicClinicalDataSystemsECDS: {
        description: undefined,
      },
    };
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
    (getMeasureYear as jest.Mock).mockReturnValue(2025);
  });

  it("When a Data Source option is Selected no validation warning shows", () => {
    formData[DC.DATA_SOURCE] = DC.ADMINISTRATIVE_DATA;
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      AdministrativeData0: {
        selected: ["MedicaidManagementInformationSystemMMIS"],
      },
    };
    _check_errors(formData, 0);
  });
  //This scenario below is actually impossible from a ui perspective I believe
  it("When no Data Source but Data Source Selections are Selected a validation warning shows", () => {
    formData[DC.DATA_SOURCE] = DC.ADMINISTRATIVE_DATA;
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      AdministrativeData0: {
        selected: undefined,
      },
    };
    _check_errors(formData, 1);
  });
  it("When a Data Source Selected array is empty, a validation warning shows", () => {
    formData[DC.DATA_SOURCE] = DC.ADMINISTRATIVE_DATA;
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      AdministrativeData0: {
        selected: [],
      },
    };
    _check_errors(formData, 1);
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DATA_SOURCE] = [];
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      AdministrativeData0: {
        selected: undefined,
      },
    };
    errorArray = [...validateAtLeastOneDataSourceType(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe("You must select a data source");
  });

  it("Error message text should match default errorMessage", () => {
    formData[DC.DATA_SOURCE] = [];
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      OtherDataSource: {
        description: undefined,
      },
    };
    errorArray = [...validateAtLeastOneDataSourceType(formData)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "Please describe the Other Data Source"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    formData[DC.DATA_SOURCE] = [];
    formData[DC.DATA_SOURCE_SELECTIONS] = {
      AdministrativeData0: {
        selected: undefined,
      },
    };
    const errorMessage = "Another one bites the dust.";
    errorArray = [...validateAtLeastOneDataSourceType(formData, errorMessage)];
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });

  it("When data sources with optional descriptions are selected no validation warning shows", () => {
    formData[DC.DATA_SOURCE] = [];
    _setOptionalDataSourceSelections();
    _check_errors(formData, 0);
  });

  it("When two or more data collection methods are selected and explanation is blank, validation warning shows", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2026);
    formData[DC.DATA_SOURCE] = [DC.ADMINISTRATIVE_DATA, DC.HYBRID_DATA];
    _setOptionalDataSourceSelections();
    formData[DC.DATA_SOURCE_DESCRIPTION] = "   ";

    _check_errors(formData, 1);
    expect(errorArray[0].errorLocation).toBe("Data Collection Method");
    expect(errorArray[0].errorMessage).toBe(
      "Please describe which reporting entities used each selected data collection method"
    );
  });

  it("When two or more data sources are selected and explanation is provided, no validation warning shows", () => {
    formData[DC.DATA_SOURCE] = [
      DC.ELECTRONIC_HEALTH_RECORDS,
      DC.ELECTRONIC_CLINIC_DATA_SYSTEMS,
    ];
    _setOptionalDataSourceSelections();
    formData[DC.DATA_SOURCE_DESCRIPTION] =
      "Plan A used EHR and Plan B used ECDS.";

    _check_errors(formData, 0);
  });

  it("When two or more data sources are selected before 2026 and explanation is blank, no data collection method warning shows", () => {
    formData[DC.DATA_SOURCE] = [DC.ADMINISTRATIVE_DATA, DC.HYBRID_DATA];
    _setOptionalDataSourceSelections();
    formData[DC.DATA_SOURCE_DESCRIPTION] = "   ";

    _check_errors(formData, 0);
  });
});
