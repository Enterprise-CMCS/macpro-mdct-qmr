import { render, screen } from "@testing-library/react";
import { CompleteMeasureFooter } from "components/CompleteMeasureFooter";
import config from "config";

describe("Test CompleteMeasureFooter", () => {
  test("Check that the Contained Buttons in this footer component render", () => {
    config.BRANCH_NAME = "test";

    render(
      <CompleteMeasureFooter
        handleClear={() => {}}
        handleSubmit={() => {}}
        handleValidation={() => {}}
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
        handleClear={() => {}}
        handleSubmit={() => {}}
        handleValidation={() => {}}
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
        handleClear={() => {}}
        handleSubmit={mockSubmit}
        handleValidation={() => {}}
        disabled={true}
      />
    );

    const renderedFooter = screen.getByTestId("complete-measure-footer");

    expect(renderedFooter).toBeInTheDocument();

    const validate = screen.getByRole("button", { name: "Validate Measure" });
    const complete = screen.getByRole("button", { name: "Complete Measure" });
    const clear = screen.getByRole("button", { name: "Clear Data" });

    expect(validate).toHaveAttribute("disabled");
    expect(validate).toHaveStyle("z-index: 1");

    expect(complete).toHaveAttribute("disabled");
    expect(complete).toHaveStyle("z-index: 1");

    expect(clear).toHaveAttribute("disabled");
    expect(clear).toHaveStyle("z-index: 1");
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
});
