import {
  exampleData,
  PerformanceMeasureData,
} from "shared/commonQuestions/PerformanceMeasure/data";
import { data as PCRData } from "measures/2021/PCRAD/data";
import fireEvent from "@testing-library/user-event";
import { PerformanceMeasure } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import { PCRRate } from "components";
import { LabelData } from "utils";

interface Props {
  component?: RateComp | undefined;
  calcTotal: boolean;
  data: PerformanceMeasureData;
  rateReadOnly: undefined | boolean;
}

const renderComponent = ({ component, calcTotal, data, rateReadOnly }: Props) =>
  renderWithHookForm(
    <PerformanceMeasure
      data={data}
      calcTotal={calcTotal}
      RateComponent={component}
      rateReadOnly={rateReadOnly}
    />
  );

// TODO: Mock the datasource change to trigger rate editability
describe("Test the PerformanceMeasure RateComponent prop", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      component: undefined, // QMR.Rate is default
      calcTotal: false,
      data: exampleData,
      rateReadOnly: undefined,
    };
  });

  test("(QMR.Rate) Ensure component renders", () => {
    renderComponent(props);
    // should render QMR.Rate layout using example data
    expect(screen.getByText(/Performance Measure/i)).toBeVisible();
    expect(screen.getByText(exampleData.questionText![0])).toBeVisible();
    expect(screen.getByText(exampleData.questionListItems![0])).toBeVisible();
    expect(screen.getByText(exampleData.questionListItems![1])).toBeVisible();
    for (const qual of exampleData.qualifiers!)
      expect(screen.queryAllByText(qual.label).length).toBe(
        exampleData.categories!.length
      );
    for (const cat of exampleData.categories!)
      expect(screen.getByText(cat.label)).toBeVisible();

    const numeratorTextBox = screen.queryAllByLabelText("Numerator")[0];
    const denominatorTextBox = screen.queryAllByLabelText("Denominator")[0];
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("100.0");

    // rates should be editable by default
    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).toHaveDisplayValue("99.9");

    // last NDR in category should not total
    const lastNumeratorTextBox = screen.queryAllByLabelText("Numerator")[1];
    const lastDenominatorTextBox = screen.queryAllByLabelText("Denominator")[1];
    const lastRateTextBox = screen.queryAllByLabelText("Rate")[1];
    expect(lastNumeratorTextBox).toHaveDisplayValue("");
    expect(lastDenominatorTextBox).toHaveDisplayValue("");
    expect(lastRateTextBox).toHaveDisplayValue("");
  });

  test("(QMR.Rate) Rates should not be editable", () => {
    props.rateReadOnly = true;
    renderComponent(props);

    const numeratorTextBox = screen.queryAllByLabelText("Numerator")[0];
    const denominatorTextBox = screen.queryAllByLabelText("Denominator")[0];
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("100.0");

    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).toHaveDisplayValue("100.0");
  });

  test("(QMR.Rate) Should total in last NDR", () => {
    props.calcTotal = true;
    renderComponent(props);

    const numeratorTextBox = screen.queryAllByLabelText("Numerator")[0];
    const denominatorTextBox = screen.queryAllByLabelText("Denominator")[0];
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(numeratorTextBox).toHaveDisplayValue("123");
    expect(denominatorTextBox).toHaveDisplayValue("123");
    expect(rateTextBox).toHaveDisplayValue("100.0");

    // last NDR set should not total
    const lastNumeratorTextBox = screen.queryAllByLabelText("Numerator")[1];
    const lastDenominatorTextBox = screen.queryAllByLabelText("Denominator")[1];
    const lastRateTextBox = screen.queryAllByLabelText("Rate")[1];
    expect(lastNumeratorTextBox).toHaveDisplayValue("123");
    expect(lastDenominatorTextBox).toHaveDisplayValue("123");
    expect(lastRateTextBox).toHaveDisplayValue("100.0");
  });

  test("(PCR-XX) Ensure component renders", () => {
    // modifying data to be easier to check
    PCRData.qualifiers = PCRData.qualifiers!.map((qual: LabelData) => {
      return { id: qual.id, label: `qual ${qual.label}`, text: qual.text };
    });

    props.component = PCRRate;
    props.data = PCRData;
    renderComponent(props);

    // should render match PCRRate layout using PCR-XX data
    expect(screen.getByText(/Performance Measure/i)).toBeVisible();
    expect(screen.getByText(PCRData.questionText![0])).toBeVisible();
    expect(screen.getByText(PCRData.questionListItems![0])).toBeVisible();
    expect(screen.getByText(PCRData.questionListItems![1])).toBeVisible();
    for (const qual of PCRData.qualifiers!) {
      expect(screen.getByText(qual.label)).toBeVisible();
    }

    // rates should be editable by default
    const numeratorTextBox = screen.getByLabelText(PCRData.qualifiers[1].label);
    const denominatorTextBox = screen.getByLabelText(
      PCRData.qualifiers[0].label
    );
    const rateTextBox = screen.getByLabelText(PCRData.qualifiers[2].label);
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(numeratorTextBox).toHaveDisplayValue("123");
    expect(denominatorTextBox).toHaveDisplayValue("123");
    expect(rateTextBox).toHaveDisplayValue("100.0000");

    fireEvent.type(rateTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("123");
  });

  test("(PCR-XX) Rates should not be editable", () => {
    props.component = PCRRate;
    props.data = PCRData;
    props.rateReadOnly = true;
    renderComponent(props);

    // rates should not be editable
    const numeratorTextBox = screen.queryAllByLabelText(
      PCRData.qualifiers![1].label
    )[0];
    const denominatorTextBox = screen.queryAllByLabelText(
      PCRData.qualifiers![0].label
    )[0];
    const rateTextBox = screen.getByText(
      PCRData.qualifiers![2].label
    ).nextSibling;
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(numeratorTextBox).toHaveDisplayValue("123");
    expect(denominatorTextBox).toHaveDisplayValue("123");
    expect(rateTextBox?.textContent).toEqual("100.0000");
    expect(rateTextBox?.nodeName).toBe("P");
  });
});
