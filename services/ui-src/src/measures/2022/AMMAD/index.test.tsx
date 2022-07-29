// TODO: Use this file to make a template

import { fireEvent, screen, waitFor } from "@testing-library/react";
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
import { testSnapshot } from "utils/testUtils/testSnapshot";
import { validationFunctions } from "./validation";
import {
  mockValidateAndSetErrors,
  clearMocks,
  validationsMockObj as V,
} from "utils/testUtils/validationsMock";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

// Test Setup
const measureAbbr = "AMM-AD";
const coreSet = "ACS";
const state = "AL";
const year = 2022;
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
      // TODO: : true
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
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
    await waitFor(() => {
      // todo: replace this with the data constant for the label instead of manually entered
      expect(screen.getByText("AMM-AD - Antidepressant Medication Management"));
    });
  });

  /** Snapshot Tests
   *
   * Render the measure and confirm that all expected components exist.
   * */
  it("(No Data) rendered measure should match snapshot", async () => {
    await waitFor(() => {
      testSnapshot({ component: component, apiData: apiData });
    });
  });

  it("(Not Reporting) rendered measure should match snapshot", async () => {
    await waitFor(() => {
      apiData.useGetMeasureValues.data.Item.data = notReportingData;
      testSnapshot({ component: component, apiData: apiData });
    });
  });

  it("(Completed) rendered measure should match snapshot", async () => {
    await waitFor(() => {
      apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
      testSnapshot({ component: component, apiData: apiData });
    });
  });

  /** Validations Test
   *
   * Confirm that correct functions are called. Comprehensive testing of the validations is done in specific test files
   * for each validation function. See globalValidations directory.
   */
  it("(Not Reporting) validationFunctions should call all expected validation functions", async () => {
    mockValidateAndSetErrors(validationFunctions, notReportingData); // trigger validations
    expect(V.validateReasonForNotReporting).not.toHaveBeenCalled();
    expect(V.validateAtLeastOneRateComplete).toHaveBeenCalled();
    expect(V.validateDualPopInformationPM).toHaveBeenCalled();
    expect(V.validateNumeratorsLessThanDenominatorsPM).toHaveBeenCalled();
    expect(V.validateRateNotZeroPM).toHaveBeenCalled();
    expect(V.validateRateZeroPM).toHaveBeenCalled();
    expect(V.validateRequiredRadioButtonForCombinedRates).toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).toHaveBeenCalled();
    expect(V.validateAtLeastOneDeviationFieldFilled).toHaveBeenCalled();
    expect(V.validateOneCatRateHigherThanOtherCatPM).toHaveBeenCalled();
    expect(V.validateOneCatRateHigherThanOtherCatOMS).toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).toHaveBeenCalled();
    expect(V.validateRateZeroOMS).toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).toHaveBeenCalled();
  });

  it("(Completed) validationFunctions should call all expected validation functions", async () => {
    mockValidateAndSetErrors(validationFunctions, completedMeasureData); // trigger validations
    expect(V.validateReasonForNotReporting).not.toHaveBeenCalled();

    expect(V.validateAtLeastOneRateComplete).toHaveBeenCalled();
    expect(V.validateDualPopInformationPM).toHaveBeenCalled();
    expect(V.validateNumeratorsLessThanDenominatorsPM).toHaveBeenCalled();
    expect(V.validateRateNotZeroPM).toHaveBeenCalled();
    expect(V.validateRateZeroPM).toHaveBeenCalled();
    expect(V.validateRequiredRadioButtonForCombinedRates).toHaveBeenCalled();
    expect(V.validateBothDatesCompleted).toHaveBeenCalled();
    expect(V.validateAtLeastOneDataSource).toHaveBeenCalled();
    expect(V.validateAtLeastOneDeviationFieldFilled).toHaveBeenCalled();
    expect(V.validateOneCatRateHigherThanOtherCatPM).toHaveBeenCalled();
    expect(V.validateOneCatRateHigherThanOtherCatOMS).toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).toHaveBeenCalled();
    expect(V.validateRateZeroOMS).toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).toHaveBeenCalled();
  });

  jest.setTimeout(15000);
  it("should not pass a11y tests", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    const badhtml = screen.getByTestId("measure-wrapper-form");
    badhtml.append(document.createElement("button"));
    const results = await axe(badhtml);
    expect(results).not.toHaveNoViolations();
  });

  it("should not allow non state users to edit forms by disabling buttons", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);

    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
    const completeButton = screen.getByText("Complete Measure");
    fireEvent.click(completeButton);
    expect(completeButton).toHaveAttribute("disabled");
  });

  jest.setTimeout(15000);
  it("should pass a11y tests", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    const results = await axe(screen.getByTestId("measure-wrapper-form"));

    expect(results).toHaveNoViolations();
  });
});

// These can be programatically generated
const notReportingData = {};

const completedMeasureData = {
  PerformanceMeasure: {
    rates: {
      EffectiveAcutePhaseTreatment: [
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
    },
  },
  MeasurementSpecification: "NCQA/HEDIS",
  DidReport: "yes",
};
