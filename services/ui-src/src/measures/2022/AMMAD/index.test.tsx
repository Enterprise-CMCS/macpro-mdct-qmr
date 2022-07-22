// TODO: Use this file to make a template
import { screen, waitFor } from "@testing-library/react";
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
import fireEvent from "@testing-library/user-event";
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
      // TODO: isStateUser: true
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
      expect(screen.getByText("AMM-AD - Antidepressant Medication Management"));
    });
  });

  /** Snapshot Tests
   *
   * Render the measure and confirm that all expected components exist.
   * */
  it("(No Data) rendered measure should match snapshot", async () => {
    await waitFor(() => {
      testSnapshot({ component, apiData });
    });
  });

  it("(Not Reporting) rendered measure should match snapshot", async () => {
    await waitFor(() => {
      apiData.useGetMeasureValues.data.Item.data = notReportingData;
      testSnapshot({ component, apiData });
      expect(screen.getByText("This is a test of the emergency alert system"));
    });
  });

  it("(Completed) rendered measure should match snapshot", async () => {
    await waitFor(() => {
      apiData.useGetMeasureValues.data.Item.data = completedMeasureData;
      testSnapshot({ component, apiData });
      expect(screen.getByText("This is a test of the emergency alert system"));
      expect(screen.getAllByText("Take me out to the ballgame").length).toBe(4);
    });
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
    expect(V.validateAtLeastOneDeviationFieldFilled).not.toHaveBeenCalled();
    expect(V.validateOneCatRateHigherThanOtherCatPM).not.toHaveBeenCalled();
    expect(V.validateOneCatRateHigherThanOtherCatOMS).not.toHaveBeenCalled();
    expect(V.validateNumeratorLessThanDenominatorOMS).not.toHaveBeenCalled();
    expect(V.validateRateZeroOMS).not.toHaveBeenCalled();
    expect(V.validateRateNotZeroOMS).not.toHaveBeenCalled();
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

  it("Print button renders on page correctly", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("AMM-AD - Antidepressant Medication Management"));
    }).then(() => {
      let windowSpy = jest.spyOn(window, "window", "get");
      fireEvent.click(screen.getByText("Print"));
      expect(windowSpy).toHaveBeenCalled();
    });
  });

  it("should demonstrate this matcher`s usage", async () => {
    useApiMock(apiData);
    renderWithHookForm(component);
    const results = await axe(screen.getByTestId("measure-wrapper-form"));

    expect(results).toHaveNoViolations();
  });

  // behavior for non state user
  // - say 403
  // upload function get called correctly when uploading a file
  // - say it works
  // print button should be able to click for all users
});

// Use axe to run a11y tests - pair up with Daniel for this
// include a11y test

// These can be programatically generated
const notReportingData = {
  SmallSampleSizeLessThan30: "29",
  "AdditionalNotes-AdditionalNotes":
    "This is a test of the emergency alert system",
  WhyIsDataNotAvailable: [
    "BudgetConstraints",
    "StaffConstraints",
    "DataInconsistenciesAccuracyIssues",
    "DataSourceNotEasilyAccessible",
    "InformationNotCollected",
    "Other",
  ],
  InformationNotCollected: [
    "NotCollectedByProviderHospitalHealthPlan",
    "Other",
  ],
  WhyAreYouNotReporting: [
    "ServiceNotCovered",
    "PopulationNotCovered",
    "DataNotAvailable",
    "LimitationWithDatCollecitonReportAccuracyCovid",
    "SmallSampleSizeLessThan30",
    "Other",
  ],
  PartialPopulationNotCoveredExplanation: "Another one bites the dust",
  DataInconsistenciesAccuracyIssues: "dun dun dun",
  "WhyIsDataNotAvailable-Other": "Another one bites the dust",
  LimitationWithDatCollecitonReportAccuracyCovid: "dun dun dun",
  "AdditionalNotes-Upload": [],
  "InformationNotCollected-Other": "dun dun dun",
  AmountOfPopulationNotCovered: "PartialPopulationNotCovered",
  "WhyAreYouNotReporting-Other": "Another one bites the dust",
  DidReport: "no",
  DataSourceNotEasilyAccessible: [
    "RequiresMedicalRecordReview",
    "RequireDataLinkage",
    "Other",
  ],
  "DataSourceNotEasilyAccessible-Other": "Another one bites the dust",
};

const completedMeasureData = {
  "DeliverySys-Other-Percent": "12",
  "DeliverySys-PrimaryCareManagement-No-Percent": "12",
  MeasurementSpecification: "NCQA/HEDIS",
  "DenominatorDefineTotalTechSpec-No-Size": "1234567890",
  ChangeInPopulationExplanation: "dun dun dun",
  "DataStatus-ProvisionalExplanation": "Another one bites the dust",
  "AdditionalNotes-Upload": [],
  "DeliverySys-FeeForService-No-Percent": "12",
  DateRange: {
    endDate: {
      selectedMonth: 12,
      selectedYear: 2021,
    },
    startDate: {
      selectedMonth: 1,
      selectedYear: 2021,
    },
  },
  "DeliverySys-IntegratedCareModel": "no",
  "DeliverySys-Other-NumberOfHealthPlans": "1234567890",
  DenominatorDefineTotalTechSpec: "no",
  DidCalculationsDeviate: "yes",
  "DeliverySys-MCO_PIHP-No-Included": "12",
  DidReport: "yes",
  DataSourceDescription: "Another one bites the dust",
  "DeliverySys-PrimaryCareManagement": "no",
  "DeliverySys-Other": "Another one bites the dust",
  "DeliverySys-FeeForService": "no",
  "CombinedRates-CombinedRates-Other-Explanation": "It was this big",
  "AdditionalNotes-AdditionalNotes":
    "This is a test of the emergency alert system",
  CombinedRates: "yes",
  "DenominatorDefineTotalTechSpec-No-Explanation": "Another one bites the dust",
  PerformanceMeasure: {
    explanation: "Another one bites the dust",
    rates: {
      EffectiveContinuationPhaseTreatment: [
        {
          label: "Ages 18 to 64",
          rate: "50.0",
          numerator: "1",
          denominator: "2",
        },
        {
          label: "Age 65 and older",
          rate: "50.0",
          numerator: "1",
          denominator: "2",
        },
      ],
      EffectiveAcutePhaseTreatment: [
        {
          label: "Ages 18 to 64",
          rate: "50.0",
          numerator: "1",
          denominator: "2",
        },
        {
          label: "Age 65 and older",
          rate: "50.0",
          numerator: "1",
          denominator: "2",
        },
      ],
    },
  },
  Deviations: {
    EffectiveContinuationPhaseTreatment: {
      SelectedOptions: ["Ages18to64", "Age65andolder"],
      Ages18to64: {
        other: "Buy me some peanuts and cracker jacks",
        RateDeviationsSelected: ["numerator", "denominator", "other"],
        numerator: "Take me out to the ballgame",
        denominator: "Take me out to the crowd",
      },
      Age65andolder: {
        other: "Buy me some peanuts and cracker jacks",
        RateDeviationsSelected: ["numerator", "denominator", "other"],
        numerator: "Take me out to the ballgame",
        denominator: "Take me out to the crowd",
      },
    },
    EffectiveAcutePhaseTreatment: {
      SelectedOptions: ["Ages18to64", "Age65andolder"],
      Ages18to64: {
        other: "Buy me some peanuts and cracker jacks",
        RateDeviationsSelected: ["numerator", "denominator", "other"],
        numerator: "Take me out to the ballgame",
        denominator: "Take me out to the crowd",
      },
      Age65andolder: {
        other: "Buy me some peanuts and cracker jacks",
        RateDeviationsSelected: ["numerator", "denominator", "other"],
        numerator: "Take me out to the ballgame",
        denominator: "Take me out to the crowd",
      },
    },
  },
  DeliverySysRepresentationDenominator: [
    "FFS",
    "PCCM",
    "MCO-PIHP",
    "ICM",
    "Other",
  ],
  DefinitionOfDenominator: [
    "DenominatorIncMedicaidPop",
    "DenominatorIncCHIP",
    "DenominatorIncMedicareMedicaidDualEligible",
    "DenominatorIncOther",
  ],
  "DeliverySys-MCO_PIHP-No-Excluded": "1234567890",
  "DeliverySys-IntegratedCareModel-No-Population": "1234567890",
  "MeasurementSpecification-HEDISVersion": "HEDIS MY 2020",
  "DeliverySys-MCO_PIHP-NumberOfPlans": "1234567890",
  DataSource: [
    "AdministrativeData",
    "ElectronicHealthRecords",
    "OtherDataSource",
  ],
  DataSourceSelections: {
    ElectronicHealthRecords: {
      description: "dun dun dun",
    },
    "AdministrativeData0-AdministrativeDataOther": {
      description: "Another one bites the dust",
    },
    OtherDataSource: {
      description: "Another one bites the dust",
    },
    AdministrativeData0: {
      selected: [
        "MedicaidManagementInformationSystemMMIS",
        "AdministrativeDataOther",
      ],
    },
  },
  "DefinitionOfDenominator-Other": "Another one bites the dust",
  OptionalMeasureStratification: {
    options: ["RaceNonHispanic"],
    selections: {
      RaceNonHispanic: {
        options: [
          "White",
          "BlackorAfricanAmerican",
          "AmericanIndianorAlaskaNative",
          "Asian",
          "NativeHawaiianorOtherPacificIslander",
        ],
        selections: {
          AmericanIndianorAlaskaNative: {
            additionalSubCategories: [],
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
                Age65andolder: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
              },
            },
          },
          BlackorAfricanAmerican: {
            additionalSubCategories: [],
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
                Age65andolder: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
              },
            },
          },
          NativeHawaiianorOtherPacificIslander: {
            additionalSubCategories: [],
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
                Age65andolder: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
              },
            },
            aggregate: "YesAggregateData",
          },
          White: {
            additionalSubCategories: [],
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
                Age65andolder: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
              },
            },
          },
          Asian: {
            additionalSubCategories: [],
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
                Age65andolder: {
                  EffectiveContinuationPhaseTreatment: [
                    {
                      label: "Effective Continuation Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                  EffectiveAcutePhaseTreatment: [
                    {
                      label: "Effective Acute Phase Treatment",
                      rate: "50.0",
                      numerator: "1",
                      denominator: "2",
                    },
                  ],
                },
              },
            },
            aggregate: "YesAggregateData",
          },
        },
        additionalSelections: [],
      },
      Ethnicity: {
        additionalSelections: [],
      },
    },
  },
  "DeliverySys-MCO_PIHP": "no",
  DeviationOptions: [
    "EffectiveAcutePhaseTreatment",
    "EffectiveContinuationPhaseTreatment",
  ],
  DataStatus: "ReportingProvisionalData",
  "CombinedRates-CombinedRates": "Combined Weighted Rates Other",
  "DeliverySys-IntegratedCareModel-No-Percent": "12",
};
