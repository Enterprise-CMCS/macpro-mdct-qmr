import { render } from "@testing-library/react";
import { NumberInput } from "components/Inputs/NumberInput";
import { decimalMask } from "components/Inputs/NumberInput";

describe("Test the NumberInput component", () => {
  test("Check that component renders", () => {
    const { getByDisplayValue } = render(
      <NumberInput value="1234" onChange={() => {}} />
    );
    expect(getByDisplayValue("1234")).toBeVisible();
  });

  test("Check that label and helper texts get rendered correctly", () => {
    const { getByText } = render(
      <NumberInput
        value=""
        label="label"
        helperText="helper"
        onChange={() => {}}
      />
    );

    expect(getByText("label")).toBeVisible();
    expect(getByText("helper")).toBeVisible();
  });

  test("Check that the regex works with valid values", () => {
    const value = decimalMask("123.546");
    expect(value).toBe(true);
  });

  test("Check that the regex works with invalid values", () => {
    const value = decimalMask("abcdefg");
    expect(value).toBe(false);
  });

  test("Check that we can set the NumberInput to an error/invalid state", () => {
    const invalidFunc = (value: string | number) => {
      return !value;
    };

    const { getByText } = render(
      <NumberInput value="" isInvalidFunc={invalidFunc} onChange={() => {}} />
    );

    expect(getByText(/An Error Occured/i)).toBeVisible();
  });

  test("Check that percent symbol is rendered correctly", () => {
    const { getByText } = render(
      <NumberInput value="" displayPercent={true} onChange={() => {}} />
    );
    expect(getByText("%")).toBeVisible();
  });
});
