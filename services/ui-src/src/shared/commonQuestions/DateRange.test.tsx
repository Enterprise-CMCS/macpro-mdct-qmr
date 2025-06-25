import { DateRange } from "./DateRange";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel2022 from "labels/2022/commonQuestionsLabel";
import commonQuestionsLabel2024 from "labels/2024/commonQuestionsLabel";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("../../utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

describe("DateRange component, adult", () => {
  beforeEach(() => {
    mockGetMeasureYear.mockReturnValue(2024);
    renderWithHookForm(
      <SharedContext.Provider
        value={{ ...commonQuestionsLabel2024, year: "2024" }}
      >
        <DateRange type="adult" />
      </SharedContext.Provider>
    );
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
    renderWithHookForm(
      <SharedContext.Provider
        value={{ ...commonQuestionsLabel2024, year: "2024" }}
      >
        <DateRange type="child" />
      </SharedContext.Provider>
    );
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
    renderWithHookForm(
      <SharedContext.Provider
        value={{ ...commonQuestionsLabel2024, year: "2024" }}
      >
        <DateRange type="health" />
      </SharedContext.Provider>
    );

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
      "https://www.medicaid.gov/resources-for-states/medicaid-state-technical-assistance/health-home-information-resource-center/health-home-quality-reporting"
    );
  });
});

describe("DateRange component renders correctly for < 2023", () => {
  beforeEach(() => {
    mockGetMeasureYear.mockReturnValue(2022);
    renderWithHookForm(
      <SharedContext.Provider
        value={{ ...commonQuestionsLabel2022, year: "2022" }}
      >
        <DateRange type="adult" />
      </SharedContext.Provider>
    );
  });

  it("renders properly", async () => {
    expect(
      screen.queryByText(
        "Did your state adhere to Core Set specifications in defining the measurement period for calculating this measure?"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("No, our state used a different measurement period.")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”"
      )
    ).toBeInTheDocument();
  });
});
