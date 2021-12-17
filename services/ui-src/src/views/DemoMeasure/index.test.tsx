import { fireEvent, render, screen } from "@testing-library/react";
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

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <DemoMeasure />
    </RouterWrappedComp>
  );
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

describe("Test Demo Questions Component", () => {
  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("renders a text area when question 2 is answered yes", async () => {
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
      screen.getByText(/National Committee for Quality Assurance/i)
    );

    expect(
      screen.getByLabelText(/National Committee for Quality Assurance/i)
    ).toBeChecked();

    expect(
      await screen.findByLabelText(
        /Specify the version of HEDIS measurement year used/i
      )
    ).toBeInTheDocument();
  });

  it("should render children when the user clicks into data source options", async () => {
    userEvent.click(screen.getByLabelText(/Administrative Data/i));

    expect(screen.getByLabelText(/Administrative Data/i)).toBeChecked();
    expect(
      await screen.findByText(/What is the Administrative Data Source/i)
    ).toBeInTheDocument();

    userEvent.click(
      screen.getByLabelText(/Medicaid Management Information System/i)
    );
    expect(
      screen.getByLabelText(/Medicaid Management Information System/i)
    ).toBeChecked();
  });

  it("should render additional notes and its children when the user clicks into its options", async () => {
    userEvent.type(
      screen.getByLabelText(
        /Please add any additional notes or comments on the measure not otherwise captured above/i
      ),
      "hello"
    );

    expect(
      screen.getByLabelText(
        /Please add any additional notes or comments on the measure not otherwise captured above/i
      )
    ).toHaveValue("hello");
  });

  it("should render children when the user clicks into data source options", async () => {
    userEvent.click(
      screen.getByLabelText(
        /Yes, we combined rates from multiple reporting units to create a State-Level rate./i
      )
    );

    expect(
      screen.getByLabelText(
        /Yes, we combined rates from multiple reporting units to create a State-Level rate./i
      )
    ).toBeChecked();
    expect(
      await screen.findByText(
        /The rates are weighted based on another weighting factor./i
      )
    ).toBeInTheDocument();

    userEvent.click(
      screen.getByLabelText(
        /The rates are weighted based on another weighting factor./i
      )
    );

    expect(
      screen.getByLabelText(/Describe the other weighting factor/i)
    ).toBeInTheDocument();
  });
});
