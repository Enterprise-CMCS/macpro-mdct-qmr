import * as DC from "dataConstants";
import { testFormData } from "measures/2024/shared/globalValidations/testHelpers/_testFormData";
import { validateOPMRates } from ".";

describe("OPM Validation", () => {
  let formData: any;

  const run_validation = (data: any): FormError[] => {
    const OPM = data[DC.OPM_RATES];
    return [...validateOPMRates(OPM)];
  };

  beforeEach(() => {
    formData = JSON.parse(JSON.stringify(testFormData)); // reset data
  });

  it("Should not throw error if there are no duplicates", () => {
    formData[DC.OPM_RATES][0][DC.DESCRIPTION] = "18-30";
    formData[DC.OPM_RATES][1][DC.DESCRIPTION] = "31-64";
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(0);
  });

  it("Should not treat multiple empty descriptions as duplicates", () => {
    formData[DC.OPM_RATES][0][DC.DESCRIPTION] = "";
    formData[DC.OPM_RATES][1][DC.DESCRIPTION] = "";
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(0);
  });
});
