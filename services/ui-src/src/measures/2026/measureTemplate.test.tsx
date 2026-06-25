import { fireEvent, screen, waitFor, act } from "@testing-library/react";
import { createElement, JSX, Suspense } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "components/MeasureWrapper";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import Measures from "measures";
import { MeasuresLoading } from "views";
import { measureDescriptions } from "measures/measureDescriptions";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { validationFunctions } from "./validationTemplate";
import { data as MeasureData } from "./WCVCH/data";
import {
  mockValidateAndSetErrors,
  clearMocks,
  validationsMockObj as V,
} from "shared/util/validationsMock";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
expect.extend(toHaveNoViolations);

import { getMeasureYear } from "utils/getMeasureYear";
jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

describe("Measure Template tests", () => {
  beforeEach(() => {
    clearMocks();
    mockGetMeasureYear.mockReturnValue(2026);
  });

  describe(`Test FFY 2026 WCV-CH`, () => {
    // Test Setup
    const measureAbbr = "WCV-CH";
    const coreSet = "CCSC";
    const state = "AL";
    const year = 2026;
    const description = measureDescriptions[`${year}`][measureAbbr];
    const apiData: any = {};

    let component: JSX.Element;
    beforeEach(() => {
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
      await act(async () => {
        renderWithHookForm(component);
      });
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
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.queryByTestId("reporting"));
    });

    it("shows corresponding questions if yes to reporting then ", async () => {
      apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
      useApiMock(apiData);
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.queryByTestId("status-of-data")).not.toBeInTheDocument();
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
      await act(async () => {
        renderWithHookForm(component);
      });
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
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.queryByTestId("performance-measure")).toBeInTheDocument();
      expect(
        screen.queryByTestId("deviation-from-measure-specification")
      ).toBeInTheDocument();
      expect(screen.queryByTestId("OPM")).not.toBeInTheDocument();
    });

    it("shows corresponding components and hides others when primary measure is NOT selected", async () => {
      apiData.useGetMeasureValues.data.Item.data = OPMData;
      useApiMock(apiData);
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.queryByTestId("OPM"));
      expect(
        screen.queryByTestId("performance-measure")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("deviation-from-measure-specification")
      ).not.toBeInTheDocument();
    });

    it("shows OMS when performance measure data has been entered", async () => {
      apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
      useApiMock(apiData);
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.queryByTestId("OMS"));
    });
    it("does not show OMS when performance measure data has been entered", async () => {
      apiData.useGetMeasureValues.data.Item.data = notReportingData;
      useApiMock(apiData);
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.queryByTestId("OMS")).not.toBeInTheDocument();
    });

    /** Validations Test
     *
     * Confirm that correct functions are called. Comprehensive testing of the validations is done in specific test files
     * for each validation function. See globalValidations directory.
     */
    it("(Not Reporting) validationFunctions should call all expected validation functions", async () => {
      mockValidateAndSetErrors(
        validationFunctions,
        notReportingData,
        MeasureData
      ); // trigger validations
      expect(V.validateReasonForNotReporting).toHaveBeenCalled();
      expect(V.validateAtLeastOneRateComplete).not.toHaveBeenCalled();
      expect(V.validateNumeratorsLessThanDenominatorsPM).not.toHaveBeenCalled();
      expect(V.validateRateNotZeroPM).not.toHaveBeenCalled();
      expect(V.validateRateZeroPM).not.toHaveBeenCalled();
      expect(V.validateBothDatesCompleted).not.toHaveBeenCalled();
      expect(V.validateAtLeastOneDataSource).not.toHaveBeenCalled();
      expect(V.validateAtLeastOneDataSourceType).not.toHaveBeenCalled();
      expect(V.validateDeviationTextFieldFilled).not.toHaveBeenCalled();
      expect(V.validateOneCatRateHigherThanOtherCatPM).not.toHaveBeenCalled();
      expect(V.validateOneCatRateHigherThanOtherCatOMS).not.toHaveBeenCalled();
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
      mockValidateAndSetErrors(
        validationFunctions,
        completedMeasureData,
        MeasureData
      ); // trigger validations
      expect(V.validateReasonForNotReporting).not.toHaveBeenCalled();
      expect(V.validateAtLeastOneRateComplete).toHaveBeenCalled();
      expect(V.validateNumeratorsLessThanDenominatorsPM).toHaveBeenCalled();
      expect(V.validateRateNotZeroPM).toHaveBeenCalled();
      expect(V.validateRateZeroPM).toHaveBeenCalled();
      expect(V.validateBothDatesCompleted).toHaveBeenCalled();
      expect(V.validateAtLeastOneDataSource).toHaveBeenCalled();
      expect(V.validateAtLeastOneDataSourceType).toHaveBeenCalled();
      expect(V.validateDeviationTextFieldFilled).toHaveBeenCalled();
      expect(V.validateOneCatRateHigherThanOtherCatPM).not.toHaveBeenCalled();
      expect(V.validateOneCatRateHigherThanOtherCatOMS).not.toHaveBeenCalled();
      expect(V.validateNumeratorLessThanDenominatorOMS).toHaveBeenCalled();
      expect(V.validateRateZeroOMS).toHaveBeenCalled();
      expect(V.validateRateNotZeroOMS).toHaveBeenCalled();
      expect(V.validateTotalNDR).toHaveBeenCalled();
      expect(V.validateOMSTotalNDR).toHaveBeenCalled();
      expect(V.validateAtLeastOneDeliverySystem).toHaveBeenCalled();
      expect(V.validateFfsRadioButtonCompletion).toHaveBeenCalled();
      expect(V.validateAtLeastOneDefinitionOfPopulation).toHaveBeenCalled();
    });

    it("should not allow non state users to edit forms by disabling buttons", async () => {
      useApiMock(apiData);
      await act(async () => {
        renderWithHookForm(component);
      });
      expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
      const completeButton = screen.getByText("Complete Measure");
      fireEvent.click(completeButton);
      expect(completeButton).toHaveAttribute("disabled");
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
            label: "Ages 3 to 11",
            rate: "100.0",
            numerator: "55",
            denominator: "55",
          },
          {
            label: "Ages 12 to 17",
          },
          {
            label: "Ages 18 to 21",
          },
          {
            label: "Total",
            isTotal: true,
            rate: "100.0",
            numerator: "55",
            denominator: "55",
          },
        ],
      },
    },
    MeasurementSpecification: "NCQA/HEDIS",
    DidReport: "yes",
  };

  describe("Test FFY 2026 BCS-AD", () => {
    const measureAbbr = "BCS-AD";
    const coreSet = "ACS";
    const state = "AL";
    const year = 2026;
    const description = measureDescriptions[`${year}`][measureAbbr];
    const apiData: any = {};

    let component: JSX.Element;
    beforeEach(() => {
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

    const dualEligibleMessage =
      "Information has been included in the Ages 65 to 74 Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing";

    it("shows 'Ages 65 to 74' dual-eligible warning when ages 65-74 data is present and dual-eligible is unchecked", async () => {
      apiData.useGetMeasureValues.data.Item.data = {
        MeasurementSpecification: "NCQA/HEDIS",
        DidReport: "yes",
        PerformanceMeasure: {
          rates: {
            xacc8a: [
              { label: "Ages 42 to 51" },
              {
                label: "Ages 52 to 64",
              },
              {
                label: "Ages 65 to 74",
                numerator: "10",
                denominator: "100",
                rate: "10.0",
              },
            ],
          },
        },
      };
      mockUseUser.mockImplementation(() => ({ isStateUser: true }));
      useApiMock(apiData);
      renderWithHookForm(component);
      await act(() => fireEvent.click(screen.getByText("Validate Measure")));
      // make sure violations are showing
      expect(screen.queryAllByRole("alert")).not.toHaveLength(0);
      // make sure dual eligible message is one of them
      expect(screen.queryByText(dualEligibleMessage)).toBeInTheDocument();
    });

    it("does not show dual-eligible warning when data is only present for ages 52-64", async () => {
      apiData.useGetMeasureValues.data.Item.data = {
        MeasurementSpecification: "NCQA/HEDIS",
        DidReport: "yes",
        PerformanceMeasure: {
          rates: {
            xacc8a: [
              { label: "Ages 42 to 51" },
              {
                label: "Ages 52 to 64",
                numerator: "10",
                denominator: "100",
                rate: "10.0",
              },
              { label: "Ages 65 to 74" },
            ],
          },
        },
      };
      mockUseUser.mockImplementation(() => ({ isStateUser: true }));
      useApiMock(apiData);
      renderWithHookForm(component);
      // make sure there are no violations yet
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      await act(() => fireEvent.click(screen.getByText("Validate Measure")));
      // make sure validations are now showing
      expect(screen.queryAllByRole("alert")).not.toHaveLength(0);
      expect(screen.queryByText(dualEligibleMessage)).not.toBeInTheDocument();
    });
  });
});
