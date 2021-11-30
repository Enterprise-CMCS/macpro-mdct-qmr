import { render, fireEvent } from "@testing-library/react";
import * as QMR from "components";
import * as Inputs from "components/Inputs";

describe("Test Checkbox", () => {
  const options: QMR.CheckboxOption[] = [
    {
      displayValue: "Medicaid Management Information System (MMIS)",
      value: "Medicaid Management Information System (MMIS)",
    },
    {
      displayValue: "Other",
      value: "Other",
      children: [
        <Inputs.TextInput
          label="Describe the data source:"
          key="test"
          formLabelProps={{
            fontWeight: "normal",
            fontSize: "normal",
          }}
          value={""}
          onChange={() => {}}
        />,
      ],
    },
  ];

  test("Check that the Checkbox renders", () => {
    const { getByText } = render(
      <QMR.Checkbox
        options={options}
        onChange={() => {}}
        value={[]}
        label="What is the Adminstrative Data Source?"
      />
    );

    expect(getByText(/What is the Adminstrative Data Source?/i)).toBeVisible();
  });

  it("Check the input(t)ed options render correctly", () => {
    const { getByText } = render(
      <QMR.Checkbox options={options} onChange={() => {}} value={[]} />
    );

    expect(
      getByText(/Medicaid Management Information System \(MMIS\)/i)
    ).toBeVisible();
    expect(getByText(/Other/i)).toBeVisible();
  });

  it("onChange Fire when a new radio option is selected", () => {
    const mockChangeFn = jest.fn();
    const { getByText } = render(
      <QMR.Checkbox options={options} onChange={mockChangeFn} value={[]} />
    );

    fireEvent.click(getByText(/Other/i));

    expect(mockChangeFn).toHaveBeenCalled();
  });
});
