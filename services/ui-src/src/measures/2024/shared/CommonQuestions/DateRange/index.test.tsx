import { DateRange } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";

describe("DateRange component, adult", () => {
  beforeEach(() => {
    renderWithHookForm(<DateRange type="adult" />);
  });

  it("renders properly", async () => {
    expect(
      screen.getByText(
        "Did your state adhere to Core Set specifications in defining the measurement period for calculating this measure?"
      )
    ).toBeInTheDocument();
  });

  it("renders Adult Measurement Period Table link properly when No is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "No, our state used a different measurement period."
    );
    fireEvent.click(textArea);

    expect(
      screen.getByRole("link", { name: "Measurement Period Table" })
    ).toHaveAttribute(
      "href",
      "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/adult-core-set-reporting-resources/index.html"
    );

    expect(
      screen.getByText(
        "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("does not render suboptions when Yes is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "Yes, our state adhered to Core Set specifications in defining the measurement period for calculating this measure."
    );
    fireEvent.click(textArea);

    expect(
      screen.queryByText(
        "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
      )
    ).toBeNull();
  });
});

describe("DateRange component, child", () => {
  beforeEach(() => {
    renderWithHookForm(<DateRange type="child" />);
  });

  it("renders Child Measurement Period Table link properly when No is clicked", async () => {
    const textArea = await screen.findByLabelText(
      "No, our state used a different measurement period."
    );
    fireEvent.click(textArea);

    expect(
      screen.getByText(
        "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Measurement Period Table" })
    ).toHaveAttribute(
      "href",
      "https://www.medicaid.gov/medicaid/quality-of-care/performance-measurement/adult-and-child-health-care-quality-measures/child-core-set-reporting-resources/index.html"
    );
  });
});

describe("DateRange component, Health Home", () => {
  it("renders Health Home Measurement Period Table link properly when No is clicked", async () => {
    renderWithHookForm(<DateRange type="health" />);

    const textArea = await screen.findByLabelText(
      "No, our state used a different measurement period."
    );
    fireEvent.click(textArea);

    expect(
      screen.getByText(
        "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Measurement Period Table" })
    ).toHaveAttribute(
      "href",
      "https://www.medicaid.gov/state-resource-center/medicaid-state-technical-assistance/health-home-information-resource-center/quality-reporting/index.html"
    );
  });
});
