import fireEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { WhyAreYouNotReporting } from ".";

describe("WhyAreYouNotReporting component initial appearance", () => {
  beforeEach(() => {
    renderWithHookForm(<WhyAreYouNotReporting />);
  });

  it("renders description text properly", () => {
    expect(
      screen.getByText("Why are you not reporting on this measure?")
    ).toBeInTheDocument();
    expect(screen.getByText("Select all that apply:")).toBeInTheDocument();
  });

  it("renders label text properly", () => {
    verifyOptions();
  });

  it("does not show Health Homes option by default", () => {
    expect(
      screen.queryByLabelText(
        "Continuous enrollment requirement not met due to start date of SPA"
      )
    ).not.toBeInTheDocument();
  });
});

describe(`Subselections`, () => {
  beforeEach(() => {
    renderWithHookForm(<WhyAreYouNotReporting />);
  });

  test("Population not covered", () => {
    fireEvent.click(screen.getByLabelText("Population not covered"));

    expect(
      screen.getByLabelText("Entire population not covered")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Partial population not covered")
    ).toBeInTheDocument();

    expect(
      screen.queryByLabelText("Explain the partial population not covered:")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Partial population not covered"));

    expect(
      screen.getByLabelText("Explain the partial population not covered:")
    ).toBeInTheDocument();
  });

  test("Data not available", () => {
    expect(
      screen.queryByText("Why is data not available?")
    ).not.toBeInTheDocument();

    expect(screen.queryAllByText("Select all that apply:")).toHaveLength(1);

    fireEvent.click(screen.getByLabelText("Data not available"));

    expect(screen.getByText("Why is data not available?")).toBeInTheDocument();
    expect(screen.queryAllByText("Select all that apply:")).toHaveLength(2);

    expect(screen.getByLabelText("Budget constraints")).toBeInTheDocument();
    expect(screen.getByLabelText("Staff Constraints")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Data inconsistencies/Accuracy")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Data inconsistencies/Accuracy"));

    const textArea = screen.getByLabelText(
      "Explain the Data inconsistencies/Accuracy issues:"
    );
    expect(textArea).toBeInTheDocument();

    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });
});

describe("WhyAreYouNotReporting component, Health Homes", () => {
  beforeEach(() => {
    renderWithHookForm(<WhyAreYouNotReporting healthHomeMeasure />);
  });

  it("renders the Health Homes version of the component", () => {
    verifyOptions();
    expect(
      screen.getByLabelText(
        "Continuous enrollment requirement not met due to start date of SPA"
      )
    ).toBeInTheDocument();
  });

  it("displays the correct Health Homes sub-options", () => {
    fireEvent.click(screen.getByLabelText("Data not available"));
    expect(
      screen.getByLabelText("Data not submitted by Providers to State")
    ).toBeInTheDocument();
  });
});

function verifyOptions() {
  expect(screen.getByLabelText("Service not covered")).toBeInTheDocument();
  expect(screen.getByLabelText("Population not covered")).toBeInTheDocument();
  expect(screen.getByLabelText("Data not available")).toBeInTheDocument();
  expect(
    screen.getByLabelText(
      "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic"
    )
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText("Small sample size (less than 30)")
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Other")).toBeInTheDocument();
}
