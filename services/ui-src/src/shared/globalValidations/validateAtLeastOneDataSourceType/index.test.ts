import { testFormData } from "./../testHelpers/_testFormData";
import * as DC from "dataConstants";
import { validateAtLeastOneDataSourceType } from ".";

describe("validateOneDataSourceType", () => {
  let formData: any;
  let errorArray: FormError[];

  const _check_errors = (data: any, numErrors: number) => {
    errorArray = [...validateAtLeastOneDataSourceType(data)];
    expect(errorArray.length).toBe(numErrors);
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
    errorArray = [];
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
});
