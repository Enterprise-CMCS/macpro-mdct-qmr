import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterWrappedComp } from "utils/testing";
import { DemoMeasure } from "views";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
    coreSetId: "ACS",
    measureId: "AIF-HH",
  }),
}));

describe("Test Demo Questions Component", () => {
  it("renders a text area when question 2 is answered yes", async () => {
    render(
      <RouterWrappedComp>
        <DemoMeasure />
      </RouterWrappedComp>
    );
    userEvent.click(screen.getByText("I am reporting provisional data"));
    expect(
      screen.getByLabelText("I am reporting provisional data")
    ).toBeChecked();
    expect(
      await screen.findByLabelText(
        "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
      )
    ).toBeInTheDocument();
  });

  it("should renders measurement specification and its children should behave correctly when options are selected", async () => {
    userEvent.click(
      screen.getByText(
        /Measurement Specification National Committee for Quality Assurance/i
      )
    );

    expect(
      screen.getByLabelText(
        /Measurement Specification National Committee for Quality Assurance/i
      )
    ).toBeChecked();

    expect(
      await screen.findByLabelText(
        /Specify the version of HEDIS measurement year used/i
      )
    ).toBeInTheDocument();
  });
});

test("Check that the nav renders", () => {
  const { getByTestId } = render(
    <RouterWrappedComp>
      <DemoMeasure />
    </RouterWrappedComp>
  );

  expect(getByTestId("state-layout-container")).toBeVisible();
});
