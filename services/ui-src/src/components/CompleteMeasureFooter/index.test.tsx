import { render, screen } from "@testing-library/react";
import { CompleteMeasureFooter } from "components/CompleteMeasureFooter";
import config from "config";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

const mockGetMeasureYear = getMeasureYear as jest.Mock;

describe("Test CompleteMeasureFooter", () => {
  beforeEach(() => {
    mockGetMeasureYear.mockReturnValue(2025);
  });

  test("Check that the Contained Buttons in this footer component render", () => {
    config.BRANCH_NAME = "test";

    render(
      <CompleteMeasureFooter
        handleClear={jest.fn()}
        handleSubmit={jest.fn()}
        handleValidation={jest.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "Validate Measure" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Complete Measure" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Clear Data" })
    ).toBeInTheDocument();
  });

  test("That the Clear Data button does not appear in production environment", () => {
    config.BRANCH_NAME = "production";

    render(
      <CompleteMeasureFooter
        handleClear={jest.fn()}
        handleSubmit={jest.fn()}
        handleValidation={jest.fn()}
      />
    );

    expect(
      screen.queryByRole("button", { name: "Clear Data" })
    ).not.toBeInTheDocument();
  });

  test("buttons run validate, submit, and clear functions", () => {
    config.BRANCH_NAME = "test";
    const mockClear = jest.fn();
    const mockSubmit = jest.fn();
    const mockValidate = jest.fn();

    render(
      <CompleteMeasureFooter
        handleClear={mockClear}
        handleSubmit={mockSubmit}
        handleValidation={mockValidate}
      />
    );

    screen.getByRole("button", { name: "Clear Data" }).click();
    expect(mockClear.mock.calls.length).toEqual(1);

    screen.getByRole("button", { name: "Complete Measure" }).click();
    expect(mockSubmit.mock.calls.length).toEqual(1);

    screen.getByRole("button", { name: "Validate Measure" }).click();
    expect(mockValidate.mock.calls.length).toEqual(1);
  });

  test("disabled buttons appear in their disabled state", () => {
    config.BRANCH_NAME = "test";

    const mockSubmit = jest.fn;

    render(
      <CompleteMeasureFooter
        handleClear={jest.fn()}
        handleSubmit={mockSubmit}
        handleValidation={jest.fn()}
        disabled={true}
      />
    );

    const renderedFooter = screen.getByTestId("complete-measure-footer");

    expect(renderedFooter).toBeInTheDocument();

    const validate = screen.getByRole("button", { name: "Validate Measure" });
    const complete = screen.getByRole("button", { name: "Complete Measure" });
    const clear = screen.getByRole("button", { name: "Clear Data" });

    expect(validate).toHaveAttribute("disabled");
    expect(complete).toHaveAttribute("disabled");
    expect(clear).toHaveAttribute("disabled");
  });

  test("disabled buttons do not run validate, submit, or clear functions", () => {
    config.BRANCH_NAME = "test";
    const mockClear = jest.fn();
    const mockSubmit = jest.fn();
    const mockValidate = jest.fn();

    render(
      <CompleteMeasureFooter
        handleClear={mockClear}
        handleSubmit={mockSubmit}
        handleValidation={mockValidate}
        disabled={true}
      />
    );

    screen.getByRole("button", { name: "Clear Data" }).click();
    expect(mockClear.mock.calls.length).toEqual(0);

    screen.getByRole("button", { name: "Complete Measure" }).click();
    expect(mockSubmit.mock.calls.length).toEqual(0);

    screen.getByRole("button", { name: "Validate Measure" }).click();
    expect(mockValidate.mock.calls.length).toEqual(0);
  });

  test("renders updated copy for 2026", () => {
    config.BRANCH_NAME = "test";
    mockGetMeasureYear.mockReturnValue(2026);

    render(
      <CompleteMeasureFooter
        handleClear={jest.fn()}
        handleSubmit={jest.fn()}
        handleValidation={jest.fn()}
      />
    );

    expect(
      screen.getByText(
        "Select “Validate Measure” to check for any errors present in the measure prior to completion"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Select “Complete Measure” to mark the measure as complete and ready for CMS review"
      )
    ).toBeInTheDocument();
  });

  test("renders legacy copy before 2026", () => {
    config.BRANCH_NAME = "test";
    mockGetMeasureYear.mockReturnValue(2025);

    render(
      <CompleteMeasureFooter
        handleClear={jest.fn()}
        handleSubmit={jest.fn()}
        handleValidation={jest.fn()}
      />
    );

    expect(
      screen.getByText(
        'Please select "Validate Measure" to check any error present on the measure prior to completion'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete the measure and mark it for submission to CMS for review"
      )
    ).toBeInTheDocument();
  });
});
