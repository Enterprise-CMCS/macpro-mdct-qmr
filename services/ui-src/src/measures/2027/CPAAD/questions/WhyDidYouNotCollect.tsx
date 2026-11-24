import * as QMR from "components";
import * as DC from "dataConstants";

export const WhyDidYouNotCollect = () => {
  return (
    <QMR.CoreQuestionWrapper
      testid="why-did-you-not-collect"
      label="Why did you not collect this measure?"
    >
      <QMR.Checkbox
        key={DC.WHY_DID_YOU_NOT_COLLECT}
        name={DC.WHY_DID_YOU_NOT_COLLECT}
        helperText="Select all that apply:"
        renderHelperTextAbove
        options={[
          {
            displayValue: `Service not covered`,
            value: "ServiceNotCovered",
          },
          {
            displayValue: `Population not covered`,
            value: "PopulationNotCovered",
            children: [
              <QMR.RadioButton
                key={DC.AMOUNT_OF_POP_NOT_COVERED}
                name={DC.AMOUNT_OF_POP_NOT_COVERED}
                options={[
                  {
                    displayValue: "Entire population not covered",
                    value: "EntirePopulationNotCovered",
                  },
                  {
                    displayValue: "Partial population not covered",
                    value: "PartialPopulationNotCovered",
                    children: [
                      <QMR.TextArea
                        label="Explain the partial population not covered:"
                        key={DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION}
                        name={DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: `Data not available`,
            value: "DataNotAvailable",
            children: [
              <QMR.Checkbox
                key={DC.WHY_IS_DATA_NOT_AVAILABLE}
                name={DC.WHY_IS_DATA_NOT_AVAILABLE}
                label="Why is data not available?"
                renderHelperTextAbove
                helperText="Select all that apply:"
                options={[
                  {
                    displayValue: "Budget constraints",
                    value: "BudgetConstraints",
                  },
                  {
                    displayValue: "Staff Constraints",
                    value: "StaffConstraints",
                  },
                  {
                    displayValue: "Data inconsistencies/Accuracy",
                    value: "DataInconsistenciesAccuracyIssues",
                    children: [
                      <QMR.TextArea
                        label="Explain the Data inconsistencies/Accuracy issues:"
                        key={DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES}
                        name={DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES}
                      />,
                    ],
                  },
                  {
                    displayValue: "Data source not easily accessible",
                    value: "DataSourceNotEasilyAccessible",
                    children: [
                      <QMR.Checkbox
                        label="Select all that apply:"
                        key={DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE}
                        name={DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE}
                        options={[
                          {
                            displayValue: "Requires medical record review",
                            value: "RequiresMedicalRecordReview",
                          },
                          {
                            displayValue:
                              "Requires data linkage which does not currently exist",
                            value: "RequireDataLinkage",
                          },
                          {
                            displayValue: "Other",
                            value: "Other",
                            children: [
                              <QMR.TextArea
                                label="Explain:"
                                key={DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER}
                                name={
                                  DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER
                                }
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Information not collected",
                    value: "InformationNotCollected",
                    children: [
                      <QMR.Checkbox
                        label="Select all that apply:"
                        key={DC.INFO_NOT_COLLECTED}
                        name={DC.INFO_NOT_COLLECTED}
                        options={[
                          {
                            displayValue:
                              "Not Collected by Provider (Hospital/Health Plan)",
                            value: "NotCollectedByProviderHospitalHealthPlan",
                          },
                          {
                            displayValue: "Other",
                            value: "Other",
                            children: [
                              <QMR.TextArea
                                label="Explain:"
                                key={DC.INFO_NOT_COLLECTED_OTHER}
                                name={DC.INFO_NOT_COLLECTED_OTHER}
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Other",
                    value: "Other",
                    children: [
                      <QMR.TextArea
                        label="Explain:"
                        key={DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER}
                        name={DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER}
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: "Small sample size",
            value: "SmallSampleSize",
            children: [
              <QMR.NumberInput
                key={DC.SMALL_SAMPLE_SIZE}
                name={DC.SMALL_SAMPLE_SIZE}
                label="Enter specific sample size:"
                mask={/^[0-9]*$/i}
              />,
            ],
          },
          {
            displayValue: "Other",
            value: "Other",
            children: [
              <QMR.TextArea
                label="Explain:"
                key={DC.WHY_DID_YOU_NOT_COLLECT_OTHER}
                name={DC.WHY_DID_YOU_NOT_COLLECT_OTHER}
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
