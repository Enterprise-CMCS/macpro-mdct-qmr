import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterWrappedComp } from "utils/testing";
import { AddHHCoreSet } from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
  }),
}));

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <AddHHCoreSet />
    </RouterWrappedComp>
  );
});

describe("Test HealthHome coreset component", () => {
  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("renders the correct child components", () => {
    expect(
      screen.getByLabelText(/Select the SPA you are reporting on/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Do you want to add State Specific Measures now/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /remember to complete all Health Home Core Set Questions and Health Home Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
  });

  it("should behave correctly with user interaction filling out component", () => {
    userEvent.click(
      screen.getByText(/Yes, I want to add State Specific Measures now/i)
    );

    expect(
      screen.getByLabelText(/Yes, I want to add State Specific Measures now/i)
    ).toBeChecked();
  });
});
