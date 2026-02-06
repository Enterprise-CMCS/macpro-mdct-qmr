import { screen } from "@testing-library/react";
import { MeasureStrat } from ".";
import { renderWithHookForm } from "utils";
import { useApiMock } from "utils/testUtils/useApiMock";
import SharedContext from "shared/SharedContext";
import { commonQuestionsLabel as commonQuestionsLabels2026 } from "labels/2026/commonQuestionsLabel";
import userEvent from "@testing-library/user-event";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useWatch: jest.fn().mockReturnValue({
    OptionalMeasureStratification: { version: undefined, selections: [] },
  }),
}));

describe("Test MeasureStratification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useApiMock({});

    renderWithHookForm(
      <SharedContext.Provider
        value={{ ...commonQuestionsLabels2026, year: 2026 }}
      >
        <MeasureStrat data={[]} measureName="" />
      </SharedContext.Provider>
    );
  });
  test("Test MeasureStratification render", () => {
    expect(
      screen.getByText(
        "Which race and ethnicity standards would your state like to use for 2026 Core Sets reporting?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "1997 OMB minimum race and ethnicity standards, as specified in the 2011 HHS standards",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "I am not reporting stratified data for this measure",
      })
    ).toBeInTheDocument();
  });

  test("Test data is reset when switching Stratification versions", () => {
    const radioA = screen.getByRole("radio", {
      name: "1997 OMB minimum race and ethnicity standards, as specified in the 2011 HHS standards",
    });
    const radioB = screen.getByRole("radio", {
      name: "2024 OMB Statistical Policy Directive No. 15 race and ethnicity standards",
    });
    const radioC = screen.getByRole("radio", {
      name: "I am not reporting stratified data for this measure",
    });
    expect(radioA).not.toBeChecked();
    userEvent.click(radioA);
    expect(radioA).toBeChecked();
    userEvent.click(radioB);
    expect(radioB).toBeChecked();
    userEvent.click(radioC);
    expect(radioC).toBeChecked();
  });
});
