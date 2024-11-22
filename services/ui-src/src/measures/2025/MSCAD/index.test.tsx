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
import {
  mockValidateAndSetErrors,
  clearMocks,
  validationsMockObj as V,
} from "shared/util/validationsMock";
import { toHaveNoViolations, axe } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "MSC-AD";
const coreSet = "ACS";
const state = "AL";
const year = 2025;
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
    await waitFor(() => {
      expect(screen.queryByTestId("measure-wrapper-form")).toBeInTheDocument();
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
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("status-of-data")).toBeInTheDocument();
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
    expect(screen.queryByTestId("data-source")).not.toBeInTheDocument();
    expect(screen.queryByTestId("date-range")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("definition-of-population")
    ).not.toBeInTheDocument();
  });

  it("shows corresponding components and hides others when primary measure is selected", async () => {
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("performance-measure")).toBeInTheDocument();
    expect(screen.queryByTestId("OPM")).not.toBeInTheDocument();
  });

  it("shows corresponding components and hides others when primary measure is NOT selected", async () => {
    apiData.useGetMeasureValues.data.Item.data = OPMData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("OPM"));
    expect(screen.queryByTestId("performance-measure")).not.toBeInTheDocument();
  });

  it("shows OMS when performance measure data has been entered", async () => {
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("OMS"));
  });
  it("does not show OMS when performance measure data has been entered", async () => {
    apiData.useGetMeasureValues.data.Item.data = notReportingData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("OMS")).not.toBeInTheDocument();
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
    expect(V.validateBothDatesCompleted).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSourceType).not.toHaveBeenCalled();
    expect(V.validateDeviationTextFieldFilled).not.toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).not.toHaveBeenCalled();
    expect(V.validateRateZeroOMS).not.toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDeliverySystem).not.toHaveBeenCalled();
    expect(V.validateFfsRadioButtonCompletion).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDefinitionOfPopulation).not.toHaveBeenCalled();
  });

  it("(Completed) validationFunctions should call all expected validation functions", async () => {
    mockValidateAndSetErrors(validationFunctions, completedMeasureData); // trigger validations
    expect(V.validateReasonForNotReporting).not.toHaveBeenCalled();

    expect(V.validateAtLeastOneRateComplete).toHaveBeenCalled();
    expect(V.validateDualPopInformationPM).toHaveBeenCalled();
    expect(V.validateNumeratorsLessThanDenominatorsPM).toHaveBeenCalled();
    expect(V.validateRateNotZeroPM).toHaveBeenCalled();
    expect(V.validateRateZeroPM).toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSourceType).toHaveBeenCalled();
    expect(V.validateDeviationTextFieldFilled).toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).toHaveBeenCalled();
    expect(V.validateRateZeroOMS).toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).toHaveBeenCalled();
    expect(V.validateAtLeastOneDeliverySystem).toHaveBeenCalled();
    expect(V.validateFfsRadioButtonCompletion).toHaveBeenCalled();
    expect(V.validateAtLeastOneDefinitionOfPopulation).toHaveBeenCalled();
  });

  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    await act(async () => {
      const results = await axe(screen.getByTestId("measure-wrapper-form"));
      expect(results).toHaveNoViolations();
    });
  });
});

const notReportingData = {
  DidCollect: "no",
  DidReport: "no",
  HowDidYouReport: "yes",
};

const OPMData = { MeasurementSpecification: "Other", DidReport: "yes" };

const completedMeasureData = {
  PerformanceMeasure: {
    rates: {
      DiscussingCessationMedications: [
        {
          label: "Ages 18 to 64",
        },
        {
          label: "Age 65 and older",
        },
      ],
      AdvisingSmokersandTobaccoUserstoQuit: [
        {
          label: "Ages 18 to 64",
          rate: "100.0",
          numerator: "55",
          denominator: "55",
        },
        {
          label: "Age 65 and older",
        },
      ],
      DiscussingCessationStrategies: [
        {
          label: "Ages 18 to 64",
        },
        {
          label: "Age 65 and older",
        },
      ],
      PercentageofCurrentSmokersandTobaccoUsers: [
        {
          label: "Ages 18 to 64",
        },
        {
          label: "Age 65 and older",
        },
      ],
    },
  },
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};
