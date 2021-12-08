import { render, screen } from "@testing-library/react";
import * as QMR from "components";
import { TestWrapper } from "components/TestWrapper";
import { useCustomRegister } from "hooks/useCustomRegister";

const DemoComponent = () => {
  return (
    <TestWrapper>
      <Upload />
    </TestWrapper>
  );
};

const Upload = () => {
  return (
    <QMR.Upload {...useCustomRegister("test-component")} label="test label" />
  );
};

describe("Test Upload Component", () => {
  test("Check that the Upload Component renders", () => {
    render(<DemoComponent />);

    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
  });

  test("Check that the Upload Component renders", () => {
    render(<DemoComponent />);

    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });
});
