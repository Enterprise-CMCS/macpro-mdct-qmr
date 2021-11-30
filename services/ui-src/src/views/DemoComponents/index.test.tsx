import { render } from "@testing-library/react";
import { DemoComponents } from "./index";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

const WrappedDemoComponents = () => (
  <Router>
    <DemoComponents />
  </Router>
);

describe("Test the DemoComponents component", () => {
  test("Check that we can set the textarea to an error/invalid state", () => {
    const { getByLabelText } = render(<WrappedDemoComponents />);

    userEvent.type(getByLabelText(/test text area/i), "testing text area");

    expect(getByLabelText(/test text area/i)).toHaveValue("testing text area");
  });
});

describe("Test TextInput Component", () => {
  it("renders TextInput on the screen correctly", () => {
    const { getByLabelText } = render(<WrappedDemoComponents />);

    expect(getByLabelText(/label for text input/i)).toBeVisible();
  });

  it("shows error message when more than three characters are types", () => {
    const { getByLabelText, getByText } = render(<WrappedDemoComponents />);

    userEvent.type(
      getByLabelText(/label for text input/i),
      "More than 3 characters"
    );

    expect(getByText(/text is too long/i)).toBeVisible();
  });
});

describe("Test NumberInput Component", () => {
  it("shows Number Input Title", () => {
    const { getByText } = render(<WrappedDemoComponents />);

    expect(
      getByText(/This number input is a percent and allows decimals/i)
    ).toBeVisible();
  });
});

describe("Test Second NumberInput Component", () => {
  it("shows Second Number Input Title", () => {
    const { getByText } = render(<WrappedDemoComponents />);

    expect(getByText(/This number input only allows integers/i)).toBeVisible();
  });

  describe("Test Inputs associated with Rate Component", () => {
    it("shows Describe the rate", () => {
      const { getByText } = render(<WrappedDemoComponents />);

      expect(getByText(/Another Test Label/i)).toBeVisible();
    });

    it("shows Describe the rate", () => {
      const { getByText } = render(<WrappedDemoComponents />);

      expect(getByText(/Another Test Label/i)).toBeVisible();
    });
  });
});
