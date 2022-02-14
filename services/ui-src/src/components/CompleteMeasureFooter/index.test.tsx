import { render, screen } from "@testing-library/react";
import { CompleteMeasureFooter } from "components/CompleteMeasureFooter";
import config from "config";

describe("Test CompleteMeasureFooter", () => {
  test("Check that the Contained Buttons in this footer component render", () => {
    config.BRANCH_NAME = "test";

    render(
      <CompleteMeasureFooter
        handleClear={() => {}}
        handleSubmit={() => {}}
        handleValidation={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: "Validate Measure" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete Measure" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear Data" })
    ).toBeInTheDocument();
  });

  test("That the Clear Data button does not appear in prod environment", () => {
    config.BRANCH_NAME = "prod";

    render(
      <CompleteMeasureFooter
        handleClear={() => {}}
        handleSubmit={() => {}}
        handleValidation={() => {}}
      />
    );

    expect(
      screen.queryByRole("button", { name: "Clear Data" })
    ).not.toBeInTheDocument();
  });

  /* TODO: Possibly mock out the functions for each button, in the interim
   it should be safe to assume that tests that rely on these will be substantial.

   Because the functionality is currently in the MeasureWrapper,
   should these tests be written there?
  
   it("Check that the fuctions fire", () => {});
  */
});
