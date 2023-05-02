import * as DC from "dataConstants";
import { testFormData } from "../testHelpers/_testFormData";
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

  it("Should throw error if there are duplicate opm rates", () => {
    formData[DC.OPM_RATES][0][DC.DESCRIPTION] = "18-64";
    formData[DC.OPM_RATES][1][DC.DESCRIPTION] = "18-64";
    const errorMessage = "Measure description must be unique.";
    const errorArray = run_validation(formData);
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(errorMessage);
  });
});
