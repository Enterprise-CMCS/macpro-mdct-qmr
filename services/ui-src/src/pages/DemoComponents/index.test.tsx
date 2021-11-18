import { render } from "@testing-library/react";
import { DemoComponents } from "./index";
import userEvent from "@testing-library/user-event";

describe("Test the DemoComponents component", () => {
  test("Check that we can set the textarea to an error/invalid state", () => {
    const { getByText, getByLabelText } = render(<DemoComponents />);

    expect(getByText(/An Error Occured/i)).toBeVisible();

    userEvent.type(getByLabelText(/test text area/i), "testing text area");

    expect(getByLabelText(/test text area/i)).toHaveValue("testing text area");
  });
});

describe("Test TextInput Component", () => {
  it("renders TextInput on the screen correctly", () => {
    const { getByLabelText } = render(<DemoComponents />);

    expect(getByLabelText(/label for text input/i)).toBeVisible();
  });

  it("shows error message when more than three characters are types", () => {
    const { getByLabelText, getByText } = render(<DemoComponents />);

    userEvent.type(
      getByLabelText(/label for text input/i),
      "More than 3 characters"
    );

    expect(getByText(/text is too long/i)).toBeVisible();
  });
});
