import { render, fireEvent, screen } from "@testing-library/react";
import { ContainedButton } from "components/ContainedButton";

describe("Test ContainedButton", () => {
  test("Check that the Contained Button renders", () => {
    const { getByText } = render(
      <ContainedButton buttonText="test1" onClick={() => {}} />
    );

    expect(getByText(/test1/i)).toBeVisible();
  });

  it("Check the button renders an icon correcty", () => {
    const { rerender } = render(
      <ContainedButton buttonText="test3" icon="plus" onClick={() => {}} />
    );

    expect(screen.getByText(/test3/i)).toBeVisible();

    rerender(
      <ContainedButton buttonText="test4" icon="print" onClick={() => {}} />
    );

    expect(screen.getByText(/test4/i)).toBeVisible();
  });

  it("onClick Fire when a new radio option is selected", () => {
    const mockChangeFn = jest.fn();
    const { getByText } = render(
      <ContainedButton buttonText="test4" onClick={mockChangeFn} />
    );

    fireEvent.click(getByText(/test4/i));

    expect(mockChangeFn).toHaveBeenCalled();
  });
});
