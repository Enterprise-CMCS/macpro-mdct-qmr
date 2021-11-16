import { render } from "@testing-library/react";
import { TextArea } from "components/Inputs/TextArea";

describe("Test the TextArea component", () => {
  test("Check that component renders", () => {
    const { getByText } = render(<TextArea value="test" onChange={() => {}} />);

    expect(getByText("test")).toBeVisible();
  });

  test("Check that label and helper texts get rendered correctly", () => {
    const { getByText } = render(
      <TextArea
        value=""
        label="label"
        helperText="helper"
        onChange={() => {}}
      />
    );

    expect(getByText("label")).toBeVisible();
    expect(getByText("helper")).toBeVisible();
  });

  test("Check that we can set the textarea to an error/invalid state", () => {
    const invalidFunc = (value: string) => {
      return !value;
    };

    const { getByText } = render(
      <TextArea value="" isInvalidFunc={invalidFunc} onChange={() => {}} />
    );

    expect(getByText(/An Error Occured/i)).toBeVisible();
  });
});
