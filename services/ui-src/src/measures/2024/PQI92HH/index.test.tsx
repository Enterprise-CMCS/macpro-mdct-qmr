import { screen, waitFor, act } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "components/MeasureWrapper";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import Measures from "measures";
import { Suspense } from "react";
import { MeasuresLoading } from "views";
import { measureDescriptions } from "measures/measureDescriptions";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { validationFunctions } from "./validation";
import fireEvent from "@testing-library/user-event";
import {
  mockValidateAndSetErrors,
  clearMocks,
  validationsMockObj as V,
} from "measures/2024/shared/util/validationsMock";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "PQI92-HH";
const coreSet = "HHCS";
const state = "DC";
const year = 2024;
const description = measureDescriptions[`${year}`][measureAbbr];
const apiData: any = {};

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

describe(`Test FFY ${year} ${measureAbbr}`, () => {
  let component: JSX.Element;
  beforeEach(() => {
    clearMocks();
    apiData.useGetMeasureValues = {
      data: {
        Item: {
          compoundKey: `${state}${year}${coreSet}${measureAbbr}`,
          coreSet,
          createdAt: 1642517935305,
          description,
          lastAltered: 1642517935305,
          lastAlteredBy: "undefined",
          measure: measureAbbr,
          state,
          status: "incomplete",
          year,
          data: {},
        },
      },
      isLoading: false,
      refetch: jest.fn(),
      isError: false,
      error: undefined,
    };

    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });

    const measure = createElement(Measures[year][measureAbbr]);
    component = (
      <Suspense fallback={MeasuresLoading()}>
        <RouterWrappedComp>
          <MeasureWrapper
            measure={measure}
            name={description}
            year={`${year}`}
            measureId={measureAbbr}
          />
        </RouterWrappedComp>
      </Suspense>
    );
  });

  it("measure should render", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("measure-wrapper-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(measureAbbr + " - " + description));
    });
  });

  /**
   * Render the measure and confirm that all expected components exist.
   * */
  it("Always shows Are you reporting question", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("reporting"));
  });

  it("shows corresponding questions if yes to reporting then ", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("status-of-data")).toBeInTheDocument();
    expect(
      screen.queryByTestId("measurement-specification")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Agency for Healthcare Research and Quality (AHRQ)")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("data-source")).toBeInTheDocument();
    expect(screen.queryByTestId("date-range")).toBeInTheDocument();
    expect(
      screen.queryByTestId("definition-of-population")
    ).toBeInTheDocument();
  });

  it("does not show corresponding questions if no to reporting then ", async () => {
    apiData.useGetMeasureValues.data.Item.data = notReportingData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("status-of-data")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("measurement-specification")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("data-source")).not.toBeInTheDocument();
    expect(screen.queryByTestId("date-range")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("definition-of-population")
    ).not.toBeInTheDocument();
  });

  it("when primary measure is selected, performance measure section is available and correctly calculates rates", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    fireEvent.click(
      screen.getByLabelText("Agency for Healthcare Research and Quality (AHRQ)")
    );

    // check custom PM rate calcuation
    expect(screen.queryByTestId("performance-measure")).toBeInTheDocument();
    const numeratorTextBox = screen.queryAllByLabelText("Numerator")[0];
    const denominatorTextBox = screen.queryAllByLabelText("Denominator")[0];
    fireEvent.type(numeratorTextBox, "4");
    fireEvent.type(denominatorTextBox, "3");

    const rateTextBox = screen.queryAllByLabelText("Rate")[0];
    expect(rateTextBox).toHaveDisplayValue("133333.3");

    const numeratorTextBox1 = screen.queryAllByLabelText("Numerator")[1];
    const denominatorTextBox1 = screen.queryAllByLabelText("Denominator")[1];
    fireEvent.type(numeratorTextBox1, "1");
    fireEvent.type(denominatorTextBox1, "1");

    const rateTextBox1 = screen.queryAllByLabelText("Rate")[1];
    expect(rateTextBox1).toHaveDisplayValue("100000.0");

    const numeratorTextBox2 = screen.queryAllByLabelText("Numerator")[2];
    const denominatorTextBox2 = screen.queryAllByLabelText("Denominator")[2];
    const rateTextBox2 = screen.queryAllByLabelText("Rate")[2];
    expect(numeratorTextBox2).toHaveDisplayValue("5");
    expect(denominatorTextBox2).toHaveDisplayValue("4");
    expect(rateTextBox2).toHaveDisplayValue("125000.0");
  });

  it("shows corresponding components and hides others when primary measure is NOT selected", async () => {
    apiData.useGetMeasureValues.data.Item.data = OPMData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("OPM"));
    expect(screen.queryByTestId("performance-measure")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("deviation-from-measure-specification")
    ).not.toBeInTheDocument();
  });

  /** Validations Test
   *
   * Confirm that correct functions are called. Comprehensive testing of the validations is done in specific test files
   * for each validation function. See globalValidations directory.
   */
  it("(Not Reporting) validationFunctions should call all expected validation functions", async () => {
    mockValidateAndSetErrors(validationFunctions, notReportingData); // trigger validations
    expect(V.validateReasonForNotReporting).toHaveBeenCalled();
    expect(V.validateAtLeastOneRateComplete).not.toHaveBeenCalled();
    expect(V.validateDualPopInformationPM).not.toHaveBeenCalled();
    expect(V.validateNumeratorsLessThanDenominatorsPM).not.toHaveBeenCalled();
    expect(V.validateRateNotZeroPM).not.toHaveBeenCalled();
    expect(V.validateRateZeroPM).not.toHaveBeenCalled();
    expect(
      V.validateRequiredRadioButtonForCombinedRates
    ).not.toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSourceType).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDeviationFieldFilled).not.toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).not.toHaveBeenCalled();
    expect(V.validateRateZeroOMS).not.toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).not.toHaveBeenCalled();
    expect(V.validateTotalNDR).not.toHaveBeenCalled();
    expect(V.validateOMSTotalNDR).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDeliverySystem).not.toHaveBeenCalled();
    expect(V.validateFfsRadioButtonCompletion).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDefinitionOfPopulation).not.toHaveBeenCalled();
  });

  it("(Completed) validationFunctions should call all expected validation functions", async () => {
    mockValidateAndSetErrors(validationFunctions, completedMeasureData); // trigger validations
    expect(V.validateReasonForNotReporting).not.toHaveBeenCalled();

    expect(V.validateAtLeastOneRateComplete).toHaveBeenCalled();
    expect(V.validateNumeratorsLessThanDenominatorsPM).not.toHaveBeenCalled();
    expect(V.validateRateNotZeroPM).toHaveBeenCalled();
    expect(V.validateRateZeroPM).toHaveBeenCalled();
    expect(V.validateRequiredRadioButtonForCombinedRates).toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSourceType).toHaveBeenCalled();
    expect(V.validateAtLeastOneDeviationFieldFilled).toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).not.toHaveBeenCalled();
    expect(V.validateRateZeroOMS).toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).toHaveBeenCalled();
    expect(V.validateTotalNDR).toHaveBeenCalled();
    expect(V.validateOMSTotalNDR).toHaveBeenCalled();
    expect(V.validateAtLeastOneDeliverySystem).toHaveBeenCalled();
    expect(V.validateFfsRadioButtonCompletion).toHaveBeenCalled();
    expect(V.validateAtLeastOneDefinitionOfPopulation).toHaveBeenCalled();
  });

  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    await act(async () => {
      const { container } = renderWithHookForm(component);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

const notReportingData = {
  DidReport: "no",
};

const OPMData = { MeasurementSpecification: "Other", DidReport: "yes" };

const completedMeasureData = {
  PerformanceMeasure: {
    rates: {
      singleCategory: [
        {
          label: "Ages 18 to 64",
          rate: "100000.0",
          numerator: "55",
          denominator: "55",
        },
        {
          label: "Ages 65 and older",
          rate: "100000.0",
          numerator: "55",
          denominator: "55",
        },
        {
          label: "Total",
          isTotal: true,
          rate: "100000.0",
          numerator: "110",
          denominator: "110",
        },
      ],
    },
  },
  MeasurementSpecification: "AHRQ",
  DidReport: "yes",
};
