import fireEvent from "@testing-library/user-event";
import { OtherPerformanceMeasure } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import { DataDrivenTypes } from "../types";

interface Props {
  rateAlwaysEditable?: boolean;
  rateMultiplicationValue?: number;
  allowNumeratorGreaterThanDenominator?: boolean;
  data?: DataDrivenTypes.PerformanceMeasure;
  RateComponent?: RateComp | undefined;
}

const renderComponet = ({ RateComponent, data, rateAlwaysEditable }: Props) =>
  renderWithHookForm(
    <OtherPerformanceMeasure
      rateAlwaysEditable={rateAlwaysEditable}
      data={data}
      RateComponent={RateComponent}
    />
  );

describe("Test the OtherPerformanceMeasure RateComponent prop", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      RateComponent: undefined, // QMR.Rate is default
      data: undefined,
      rateAlwaysEditable: undefined,
    };
  });

  test("Component renders", () => {
    renderComponet(props);
    // should render QMR.Rate layout using example data
    expect(screen.getByText(/Other Performance Measure/i)).toBeVisible();
    expect(screen.getByText("Describe the Rate:")).toBeVisible();

    const numeratorTextBox = screen.getByLabelText("Numerator");
    const denominatorTextBox = screen.getByLabelText("Denominator");
    const rateTextBox = screen.getByLabelText("Rate");
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("100.0");

    // rates should be editable by default
    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).toHaveDisplayValue("99.9");
  });

  test("Added Rates can be deleted", () => {
    const labelText =
      "For example, specify the age groups and whether you are reporting on a certain indicator:";
    renderComponet(props);
    const addRate = screen.getByText("+ Add Another");
    fireEvent.click(addRate);
    const deleteAddedRate = screen.getByTestId("delete-wrapper");
    const rateTextBox = screen.getAllByLabelText("Rate")[0];
    fireEvent.type(rateTextBox, "123");
    fireEvent.click(deleteAddedRate);
    const rateHeaders = screen.getAllByLabelText(labelText);
    expect(rateHeaders).toHaveLength(1);
  });
});
