import { render } from "@testing-library/react";
import { NumberInput } from "components/Inputs/NumberInput";

describe("Test the NumberInput component", () => {
  test("Check that component renders", () => {
    const { getByText } = render(<NumberInput value="123" onChange={() => {}} />);
    expect(getByText("123")).toBeVisible();
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
});
