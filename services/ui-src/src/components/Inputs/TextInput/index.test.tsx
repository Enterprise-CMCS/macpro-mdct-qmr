import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextInput } from "./index";

describe("Test for TextInput Component", () => {
  it("Renders properly", () => {
    const { getByLabelText } = render(
      <TextInput label="Test Label" value="" onChange={() => {}} />
    );

    expect(getByLabelText(/test label/i)).toBeDefined();
  });

  it("Calls on change method when text changes", () => {
    const mockOnChange = jest.fn();

    const { getByLabelText } = render(
      <TextInput label="Test Label" value="" onChange={mockOnChange} />
    );

    userEvent.type(getByLabelText(/test label/i), "Hello");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders label and helper text correctly", () => {
    const { getByText } = render(
      <TextInput
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
      <TextInput
        value=""
        onChange={() => {}}
        errorMessage="there is an error"
        isInvalidFunc={() => true}
      />
    );

    expect(getByText(/there is an error/i)).toBeVisible();
  });
});
