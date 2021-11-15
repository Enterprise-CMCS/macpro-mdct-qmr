import { render } from "@testing-library/react";
import { RadioButton } from "components/Inputs/RadioButton";

describe("Test RadioButton", () => {
  test("Check that the Radio Button renders", () => {
    const { getByText } = render(<RadioButton />);

    expect(getByText("Test")).toBeVisible();
  });
});
