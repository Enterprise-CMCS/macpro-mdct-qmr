import { render } from "@testing-library/react";
import { NumberInput } from "components/Inputs/NumberInput";
import { truncate } from "fs";

describe("Test the NumberInput component", () => {
  test("Check that component renders", () => {
    const { getByDisplayValue } = render(
    <NumberInput 
    value="1234" 
    onChange={() => {}}
    />);
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

  test("Check that we can set the NumberInput to an error/invalid state", () => {
    const invalidFunc = (value: string) => {
      return !value;
    };

    const { getByText } = render(
      <NumberInput value="" isInvalidFunc={invalidFunc} onChange={() => {}} />
    );

    expect(getByText(/An Error Occured/i)).toBeVisible();
  });

  test("Check that percent symbol is rendered correctly", () => {
    const { getByText } = render(
      <NumberInput
        value=""
        displayPercent={true}
        onChange={() => {}}
      />
    );
    expect(getByText("%")).toBeVisible();
  });
});
