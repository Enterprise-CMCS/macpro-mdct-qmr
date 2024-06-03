import fireEvent from "@testing-library/user-event";
import { Reporting } from "./Reporting";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test Reporting component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <Reporting
        measureName="My Test Measure"
        reportingYear="2021"
        measureAbbreviation="MTM"
      />
    );
  });

  it("component renders", () => {
    expect(
      screen.getByText("Are you reporting on this measure?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Yes, I am reporting My Test Measure (MTM) for FFY 2021 quality measure reporting."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "No, I am not reporting My Test Measure (MTM) for FFY 2021 quality measure reporting."
      )
    ).toBeInTheDocument();
  });

  it("Why are you not reporting shows when no is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "No, I am not reporting My Test Measure (MTM) for FFY 2021 quality measure reporting."
    );
    fireEvent.click(textArea);
    expect(
      screen.getByText("Why are you not reporting on this measure?")
    ).toBeInTheDocument();
  });
});

describe("Test Reporting component on a Health Home Measure", () => {
  beforeEach(() => {
    renderWithHookForm(
      <Reporting
        measureName="My Test Measure"
        reportingYear="2021"
        measureAbbreviation="MTM"
        healthHomeMeasure
      />
    );
  });

  it("component renders", () => {
    expect(
      screen.getByText("Are you reporting on this measure?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Yes, I am reporting My Test Measure (MTM) for FFY 2021 quality measure reporting."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "No, I am not reporting My Test Measure (MTM) for FFY 2021 quality measure reporting."
      )
    ).toBeInTheDocument();
  });

  it("Why are you not reporting shows when no is clicked with Helath Home options", async () => {
    const textArea = await screen.findByLabelText(
      "No, I am not reporting My Test Measure (MTM) for FFY 2021 quality measure reporting."
    );
    fireEvent.click(textArea);
    expect(
      screen.getByText("Why are you not reporting on this measure?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Continuous enrollment requirement not met due to start date of SPA"
      )
    ).toBeInTheDocument();
  });
});
