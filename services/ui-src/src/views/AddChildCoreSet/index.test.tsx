import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterWrappedComp } from "utils/testing";
import { AddChildCoreSet } from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
  }),
}));

describe("Test Add Child Core Set Component", () => {
  beforeEach(() => {
    render(
      <RouterWrappedComp>
        <AddChildCoreSet />
      </RouterWrappedComp>
    );
  });

  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("Renders the correct child components", () => {
    expect(
      screen.getByText(/How are you reporting Child Core Set measures/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Remember to complete all Child Core Set Questions and Child Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
  });

  it("Form properly interactable", () => {
    userEvent.click(
      screen.getByText(
        /Reporting Medicaid and CHIP measures in separate core sets/i
      )
    );

    expect(
      screen.getByLabelText(
        /Reporting Medicaid and CHIP measures in separate core sets/i
      )
    ).toBeChecked();
  });
});
