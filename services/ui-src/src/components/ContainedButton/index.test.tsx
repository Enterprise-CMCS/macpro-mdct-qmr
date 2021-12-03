import { render, fireEvent, screen } from "@testing-library/react";
import { ContainedButton } from "components/ContainedButton";

describe("Test ContainedButton", () => {
  test("Check that the Contained Button renders", () => {
    const { getByText } = render(
      <ContainedButton buttonText="test1" onClick={() => {}} />
    );

    expect(getByText(/test1/i)).toBeVisible();
  });

  it("Check that the helper text renders", () => {
    const { getByText } = render(
      <ContainedButton
        buttonText="test2"
        helperText="helper"
        icon="plus"
        onClick={() => {}}
      />
    );

    expect(getByText(/helper/i)).toBeVisible();
  });

  it("Check the button renders an icon correcty", () => {
    const { rerender } = render(
      <ContainedButton buttonText="test3" icon="plus" onClick={() => {}} />
    );

    const container = screen.getByText(/test3/i);
    const plusDataIcon = container.querySelector("[data-icon='plus-circle']");

    expect(plusDataIcon).toBeVisible();

    rerender(
      <ContainedButton buttonText="test3" icon="print" onClick={() => {}} />
    );

    const printDataIcon = container.querySelector("[data-icon='print']");
    expect(printDataIcon).toBeVisible();
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
