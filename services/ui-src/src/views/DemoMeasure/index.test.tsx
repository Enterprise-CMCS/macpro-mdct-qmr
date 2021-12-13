import { fireEvent, render, screen } from "@testing-library/react";
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
  beforeEach(() => {
    render(
      <RouterWrappedComp>
        <DemoMeasure />
      </RouterWrappedComp>
    );
  });

  it("renders a text area when question 2 is answered yes", async () => {
    fireEvent.click(screen.getByLabelText(/Yes, I am/i));
    fireEvent.click(await screen.findByText("I am reporting provisional data"));

    expect(
      screen.getByLabelText("I am reporting provisional data")
    ).toBeChecked();
    expect(
      await screen.findByLabelText(
        "Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
      )
    ).toBeInTheDocument();
  });

  describe("renders components when question 1 is answered no", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByLabelText(/No, I am not/i));
    });

    it("renders components properly", async () => {
      expect(
        await screen.findByText("Why are you not reporting on this measure?")
      ).toBeInTheDocument();
    });
  });

  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });
});
