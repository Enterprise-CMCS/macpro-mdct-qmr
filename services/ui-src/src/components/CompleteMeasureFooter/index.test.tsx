import { render } from "@testing-library/react";
import { CompleteMeasureFooter } from "components/CompleteMeasureFooter";

describe("Test CompleteMeasureFooter", () => {
  test("Check that the Contained Buttons in this footer component render", () => {
    const { getByText } = render(
      <CompleteMeasureFooter
        handleClear={() => {}}
        handleSubmit={() => {}}
        handleValidation={() => {}}
      />
    );

    expect(getByText(/Validate Measure/i)).toBeVisible();
    expect(getByText(/Complete Measure/i)).toBeVisible();
    expect(getByText(/Clear Data/i)).toBeVisible();
  });

  /* TODO: Possibly mock out the functions for each button, in the interim
   it should be safe to assume that tests that rely on these will be substantial.

   Because the functionality is currently in the MeasureWrapper,
   should these tests be written there?
  
   it("Check that the fuctions fire", () => {});
  */
});
