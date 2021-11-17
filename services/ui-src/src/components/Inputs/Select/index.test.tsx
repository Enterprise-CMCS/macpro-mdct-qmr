import { render, fireEvent } from "@testing-library/react";
import { Select } from "./index";

const options = [
  { displayValue: "option1", value: "option1" },
  { displayValue: "option2", value: "option2" },
  { displayValue: "invalid", value: "invalid" },
];

describe("Test for Select Component", () => {
  it("Renders properly", () => {
    const { getByLabelText } = render(
      <Select
        options={options}
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );

    expect(getByLabelText(/test label/i)).toBeDefined();
  });

  it("Calls onChange method when text changes", () => {
    const mockOnChange = jest.fn();

    const { getByDisplayValue } = render(
      <Select
        options={options}
        label="Test Label"
        value=""
        placeholder="-- select --"
        onChange={mockOnChange}
      />
    );

    const selectInput = getByDisplayValue("-- select --");
    fireEvent.change(selectInput, {
      target: { value: "option1" },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders label and helper text correctly", () => {
    const { getByText } = render(
      <Select
        options={options}
        value=""
        label="label"
        helperText="helper"
        onChange={() => {}}
      />
    );

    expect(getByText("label")).toBeVisible();
    expect(getByText("helper")).toBeVisible();
  });

  it("displays error message when invalid", () => {
    const { getByText } = render(
      <Select
        options={options}
        value=""
        onChange={() => {}}
        errorMessage="there is an error"
        isInvalidFunc={() => true}
      />
    );

    expect(getByText(/there is an error/i)).toBeVisible();
  });
});
