import { render, fireEvent } from "@testing-library/react";
import { RadioButton, RadioButtonOption } from "components/Inputs/RadioButton";

describe("Test RadioButton", () => {
  test("Check that the Radio Button renders", () => {
    const options: RadioButtonOption[] = [
      {
        displayValue: "Hello World",
        value: 1,
      },
    ];

    const { getByText } = render(
      <RadioButton options={options} onChange={() => {}} value={"1"} />
    );

    expect(getByText(/hello world/i)).toBeVisible();
  });

  it("Check the input(t)ed options render correctly", () => {
    const options: RadioButtonOption[] = [
      {
        displayValue: "First Item",
        value: 1,
      },
      {
        displayValue: "Second Item",
        value: 2,
      },
    ];

    const { getByText } = render(
      <RadioButton options={options} onChange={() => {}} value={""} />
    );

    expect(getByText(/first item/i)).toBeVisible();
    expect(getByText(/second item/i)).toBeVisible();
  });

  it("onChange Fire when a new radio option is selected", () => {
    const mockChangeFn = jest.fn();

    const options: RadioButtonOption[] = [
      {
        displayValue: "First Item",
        value: 1,
      },
      {
        displayValue: "Second Item",
        value: 2,
      },
    ];

    const { getByText } = render(
      <RadioButton options={options} onChange={mockChangeFn} value={"1"} />
    );

    fireEvent.click(getByText(/second item/i));

    expect(mockChangeFn).toHaveBeenCalled();
  });
});
