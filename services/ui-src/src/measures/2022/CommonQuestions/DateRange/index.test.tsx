import { DateRange } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";

describe("DateRange component, adult", () => {
  beforeEach(() => {
    renderWithHookForm(<DateRange type="adult" />);
  });

  it("renders properly", async () => {
    expect(
      screen.getByText(
        "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("renders adult Measurement Period Table link properly", () => {
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/adult-core-set-reporting-resources/index.html"
    );

    expect(
      screen.findByText(
        "More information about the Start and End Date for each measure is available in the Measurement Period Table resource."
      )
    );
  });
});

describe("DateRange component, child", () => {
  it("renders child Measurement Period Table link properly", () => {
    renderWithHookForm(<DateRange type="child" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/child-core-set-reporting-resources/index.html"
    );
  });
});

describe("DateRange component, Health Home", () => {
  it("renders Health Home Measurement Period Table link properly", () => {
    renderWithHookForm(<DateRange type="health" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.medicaid.gov/state-resource-center/medicaid-state-technical-assistance/health-home-information-resource-center/quality-reporting/index.html"
    );
  });
});
