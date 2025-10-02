import {
  exampleData,
  PerformanceMeasureData,
} from "shared/commonQuestions/PerformanceMeasure/data";
import { data as PCRData } from "measures/2025/PCRAD/data";
import { data as CBPdata } from "measures/2025/CBPAD/data";
import fireEvent from "@testing-library/user-event";
import { PerformanceMeasure } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import { PCRRate } from "components";
import { LabelData } from "utils";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel2025 from "labels/2025/commonQuestionsLabel";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

jest.mock("hooks/api/usePathParams", () => ({
  ...jest.requireActual("hooks/api/usePathParams"),
  usePathParams: jest.fn().mockReturnValue({
    state: "DC",
    year: "2025",
    coreSet: "HHCS",
    measureId: "PCR-HH",
  }),
}));

interface Props {
  component?: RateComp | undefined;
  calcTotal: boolean;
  data: PerformanceMeasureData;
  rateReadOnly: undefined | boolean;
  hybridMeasure: undefined | boolean;
}

const renderComponent = ({
  component,
  calcTotal,
  data,
  rateReadOnly,
  hybridMeasure,
}: Props) =>
  renderWithHookForm(
    <SharedContext.Provider value={commonQuestionsLabel2025}>
      <PerformanceMeasure
        data={data}
        calcTotal={calcTotal}
        RateComponent={component}
        rateReadOnly={rateReadOnly}
        hybridMeasure={hybridMeasure}
      />
    </SharedContext.Provider>
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
      hybridMeasure: undefined,
    };
  });

  test("(QMR.Rate) Ensure component renders", () => {
    renderComponent(props);
    // should render QMR.Rate layout using example data
    expect(screen.getByText(/Performance Measure/i)).toBeVisible();
    expect(screen.getByText(exampleData.questionText![0])).toBeVisible();
    expect(screen.getByText(exampleData.questionListItems![0])).toBeVisible();
    expect(screen.getByText(exampleData.questionListItems![1])).toBeVisible();
    for (const label of exampleData.qualifiers!)
      expect(screen.queryAllByText(label.label).length).toBe(
        exampleData.categories!.length
      );
    for (const label of exampleData.categories!)
      expect(screen.getByText(label.label)).toBeVisible();

    const numeratorTextBox = screen.queryAllByLabelText("Numerator")[0];
    const denominatorTextBox = screen.queryAllByLabelText("Denominator")[0];
    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("100.0");

    // rates should be editable by default
    fireEvent.type(rateTextBox, "99.9");
    expect(rateTextBox).toHaveDisplayValue("99.9");

    // last NDR in categroy should not total
    const lastNumeratorTextBox = screen.queryAllByLabelText("Numerator")[1];
    const lastDenominatorTextBox = screen.queryAllByLabelText("Denominator")[1];
    const lastRateTextBox = screen.queryAllByLabelText("Rate")[1];
    expect(lastNumeratorTextBox).toHaveDisplayValue("");
    expect(lastDenominatorTextBox).toHaveDisplayValue("");
    expect(lastRateTextBox).toHaveDisplayValue("");
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
    PCRData.performanceMeasure.qualifiers =
      PCRData.performanceMeasure.qualifiers!.map((qual: LabelData) => ({
        id: qual.id,
        text: `qual ${qual.label}`,
        label: `qual ${qual.label}`,
      })); //CHANGED

    props.component = PCRRate;
    props.data = PCRData.performanceMeasure;
    renderComponent(props);

    // should render match PCRRate layout using PCR-XX data
    expect(screen.getByText(/Performance Measure/i)).toBeVisible();
    expect(
      screen.getByText(PCRData.performanceMeasure.questionText![0])
    ).toBeVisible();
    expect(
      screen.getByText(PCRData.performanceMeasure.questionListItems![0])
    ).toBeVisible();
    expect(
      screen.getByText(PCRData.performanceMeasure.questionListItems![1])
    ).toBeVisible();
    for (const label of PCRData.performanceMeasure.qualifiers!) {
      expect(screen.getByText(label.label)).toBeVisible();
    }

    // rates should be editable by default
    const numeratorTextBox = screen.getByLabelText(
      PCRData.performanceMeasure.qualifiers[1].label
    );
    const denominatorTextBox = screen.getByLabelText(
      PCRData.performanceMeasure.qualifiers[0].label
    );
    const rateTextBox = screen.getByLabelText(
      PCRData.performanceMeasure.qualifiers[2].label
    );
    fireEvent.type(numeratorTextBox, "123");
    fireEvent.type(denominatorTextBox, "123");
    expect(numeratorTextBox).toHaveDisplayValue("123");
    expect(denominatorTextBox).toHaveDisplayValue("123");
    expect(rateTextBox).toHaveDisplayValue("100.0000");

    fireEvent.type(rateTextBox, "123");
    expect(rateTextBox).toHaveDisplayValue("123");
  });

  test("In 2025, covid text and textbox should not render", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    props.data = CBPdata.performanceMeasure;
    props.hybridMeasure = true;
    renderComponent(props);
    const covidText = screen.queryByLabelText(
      "Describe any COVID-related difficulties encountered while collecting this data:"
    );
    expect(covidText).toBeNull();
  });

  test("In 2024 covid text and textbox should render", () => {
    mockGetMeasureYear.mockReturnValue(2024);
    props.data = CBPdata.performanceMeasure;
    props.hybridMeasure = true;
    renderComponent(props);
    const covidText = screen.getByLabelText(
      "Describe any COVID-related difficulties encountered while collecting this data:"
    );
    expect(covidText).toBeInTheDocument();
  });
});
