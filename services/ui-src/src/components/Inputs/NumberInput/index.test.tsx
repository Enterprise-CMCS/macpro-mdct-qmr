import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "components/Inputs/NumberInput";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test the NumberInput component", () => {
  test("Check that component renders", async () => {
    renderWithHookForm(
      <NumberInput label="label" helperText="helper" name="test-component" />,
      {
        defaultValues: { "test-component": "1234" },
      }
    );
    expect(await screen.findByDisplayValue("1234")).toBeInTheDocument();
  });

  test("Check that label and helper texts get rendered correctly", () => {
    renderWithHookForm(
      <NumberInput label="label" helperText="helper" name="test-component" />
    );

    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByText("helper")).toBeInTheDocument();
  });

  test("Check decimal place restriction", async () => {
    renderWithHookForm(
      <NumberInput
        label="label"
        helperText="helper"
        name="test-component"
        maximumDecimal={3}
        allowNegative
      />
    );

    userEvent.type(screen.getByTestId("test-number-input"), "-123.12345", {
      delay: 300,
    });

    await waitFor(
      () => {
        expect(screen.queryByDisplayValue("-123.123")).toBeInTheDocument();
      },
      { timeout: 300 * 11 }
    );
  });

  test("Check that percent symbol is rendered correctly", () => {
    renderWithHookForm(
      <NumberInput
        label="label"
        helperText="helper"
        displayPercent
        name="test-component"
      />
    );
    // const { getByText } = render(<TestComponent renderPercent={true} />);
    expect(screen.getByText("%")).toBeVisible();
  });
});
