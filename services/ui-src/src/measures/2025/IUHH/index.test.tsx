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
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "IU-HH";
const coreSet = "HHCS";
const state = "DC";
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

  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    await act(async () => {
      const { container } = renderWithHookForm(component);
      expect(await axe(container)).toHaveNoViolations();
    });
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
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("status-of-data")).toBeInTheDocument();
    expect(
      screen.queryByTestId("measurement-specification")
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

  it("shows corresponding components and hides others when primary measure is selected", async () => {
    apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.queryByTestId("performance-measure")).toBeInTheDocument();
    expect(
      screen.queryByTestId("deviation-from-measure-specification")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("OPM")).not.toBeInTheDocument();
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
    expect(V.ComplexValidateDualPopInformation).not.toHaveBeenCalled();
    expect(V.ComplexNoNonZeroNumOrDenom).not.toHaveBeenCalled();
    expect(V.validateRateZeroPM).not.toHaveBeenCalled();
    expect(
      V.validateRequiredRadioButtonForCombinedRates
    ).not.toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSourceType).not.toHaveBeenCalled();
    expect(V.validateDeviationTextFieldFilled).not.toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).not.toHaveBeenCalled();
    expect(V.validateRateZeroOMS).not.toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).not.toHaveBeenCalled();
    expect(V.ComplexValidateNDRTotals).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDeliverySystem).not.toHaveBeenCalled();
    expect(V.validateFfsRadioButtonCompletion).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneDefinitionOfPopulation).not.toHaveBeenCalled();
  });

  it("(Completed) validationFunctions should call all expected validation functions", async () => {
    mockValidateAndSetErrors(validationFunctions, completedMeasureData); // trigger validations
    expect(V.validateReasonForNotReporting).not.toHaveBeenCalled();
    expect(V.ComplexAtLeastOneRateComplete).toHaveBeenCalled();
    expect(V.ComplexNoNonZeroNumOrDenom).toHaveBeenCalled();
    expect(V.validateRequiredRadioButtonForCombinedRates).toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSourceType).toHaveBeenCalled();
    expect(V.ComplexValidateNDRTotals).toHaveBeenCalled();
    expect(V.validateAtLeastOneDeliverySystem).toHaveBeenCalled();
    expect(V.validateFfsRadioButtonCompletion).toHaveBeenCalled();
    expect(V.validateAtLeastOneDefinitionOfPopulation).toHaveBeenCalled();
  });
});

const notReportingData = {
  DidReport: "no",
};

const OPMData = { MeasurementSpecification: "Other", DidReport: "yes" };

const completedMeasureData = {
  PerformanceMeasure: {
    rates: {
      Inpatient: [
        {
          fields: [
            {
              value: "1",
              label: "Number of Enrollee Months",
            },
            {
              value: "1",
              label: "Discharges",
            },
            {
              value: "1000.0",
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              value: "1",
              label: "Days",
            },
            {
              value: "1000.0",
              label: "Days per 1,000 Enrollee Months",
            },
            {
              value: "1.0",
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 0 to 17",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 18 to 64",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Age 65 and older",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages unknown",
        },
        {
          fields: [
            {
              value: "1",
              label: "Number of Enrollee Months",
            },
            {
              value: 1,
              label: "Discharges",
            },
            {
              value: "1000.0",
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              value: 1,
              label: "Days",
            },
            {
              value: "1000.0",
              label: "Days per 1,000 Enrollee Months",
            },
            {
              value: "1.0",
              label: "Average Length of Stay",
            },
          ],
          isTotal: true,
          label: "Total",
        },
      ],
      Maternity: [
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 18 to 64",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages unknown",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          isTotal: true,
          label: "Total",
        },
      ],
      Medicine: [
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 0 to 17",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 18 to 64",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Age 65 and older",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages unknown",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          isTotal: true,
          label: "Total",
        },
      ],
      MentalandBehavioralDisorders: [
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 0 to 17",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 18 to 64",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Age 65 and older",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages unknown",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          isTotal: true,
          label: "Total",
        },
      ],
      Surgery: [
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 0 to 17",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages 18 to 64",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Age 65 and older",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          label: "Ages unknown",
        },
        {
          fields: [
            {
              label: "Number of Enrollee Months",
            },
            {
              label: "Discharges",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
            },
            {
              label: "Days",
            },
            {
              label: "Days per 1,000 Enrollee Months",
            },
            {
              label: "Average Length of Stay",
            },
          ],
          isTotal: true,
          label: "Total",
        },
      ],
    },
  },
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};
