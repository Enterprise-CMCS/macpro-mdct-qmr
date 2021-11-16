import { render } from "@testing-library/react";
import DemoComponents from "components/DemoComponents";
import userEvent from "@testing-library/user-event";

describe("Test the DemoComponents component", () => {
  test("Check that we can set the textarea to an error/invalid state", () => {
    const { getByText, getByLabelText } = render(<DemoComponents />);

    expect(getByText(/An Error Occured/i)).toBeVisible();

    userEvent.type(getByLabelText(/test text area/i), "testing text area");

    expect(getByLabelText(/test text area/i)).toHaveValue("testing text area");
  });
});
