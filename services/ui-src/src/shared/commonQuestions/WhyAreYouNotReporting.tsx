import * as QMR from "components";
import * as DC from "dataConstants";
import { useContext } from "react";
import SharedContext from "shared/SharedContext";
import { featuresByYear } from "utils/featuresByYear";

interface Props {
  coreset?: string;
  removeLessThan30?: boolean;
}

export const WhyAreYouNotReporting = ({ coreset, removeLessThan30 }: Props) => {
  //WIP: using form context to get the labels for this component temporarily.
  const labels: any = useContext(SharedContext);
  const healthHomeMeasure = coreset === "health";

  return (
    <QMR.CoreQuestionWrapper
      testid="why-are-you-not-reporting"
      label="Why are you not reporting on this measure?"
    >
      <QMR.Checkbox
        key={DC.WHY_ARE_YOU_NOT_REPORTING}
        name={DC.WHY_ARE_YOU_NOT_REPORTING}
        helperText="Select all that apply:"
        renderHelperTextAbove
        options={[
          {
            displayValue: `Service not covered`,
            value: DC.SERVICE_NOT_COVERED,
          },
          {
            displayValue: `Population not covered`,
            value: DC.POP_NOT_COVERED,
            children: [
              <QMR.RadioButton
                key={DC.AMOUNT_OF_POP_NOT_COVERED}
                name={DC.AMOUNT_OF_POP_NOT_COVERED}
                options={[
                  {
                    displayValue: "Entire population not covered",
                    value: DC.ENTIRE_POP_NOT_COVERED,
                  },
                  {
                    displayValue: "Partial population not covered",
                    value: DC.PARTIAL_POP_NOT_COVERED,
                    children: [
                      <QMR.TextArea
                        key={DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION}
                        name={DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION}
                        label="Explain the partial population not covered:"
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          {
            displayValue: `Data not available`,
            value: DC.DATA_NOT_AVAILABLE,
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
                    value: DC.BUDGET_CONSTRAINTS,
                  },
                  {
                    displayValue: "Staff Constraints",
                    value: DC.STAFF_CONSTRAINTS,
                  },
                  {
                    displayValue: "Data inconsistencies/Accuracy",
                    value: DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES,
                    children: [
                      <QMR.TextArea
                        key={DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES}
                        name={DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES}
                        label="Explain the Data inconsistencies/Accuracy issues:"
                      />,
                    ],
                  },
                  ...(healthHomeMeasure
                    ? [
                        {
                          displayValue:
                            "Data not submitted by Providers to State",
                          value: DC.DATA_NOT_SUBMITTED_BY_PROVIDERS_TO_STATE,
                        },
                      ]
                    : []),
                  {
                    displayValue: "Data source not easily accessible",
                    value: DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE,
                    children: [
                      <QMR.Checkbox
                        key={DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE}
                        name={DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE}
                        label="Select all that apply:"
                        options={[
                          {
                            displayValue: "Requires medical record review",
                            value: DC.REQUIRES_MEDICAL_RECORD_REVIEW,
                          },
                          {
                            displayValue:
                              "Requires data linkage which does not currently exist",
                            value: DC.REQUIRES_DATA_LINKAGE,
                          },
                          {
                            displayValue: "Other",
                            value: DC.OTHER,
                            children: [
                              <QMR.TextArea
                                key={DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER}
                                name={
                                  DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER
                                }
                                label="Explain:"
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Information not collected",
                    value: DC.INFO_NOT_COLLECTED,
                    children: [
                      <QMR.Checkbox
                        key={DC.INFO_NOT_COLLECTED}
                        name={DC.INFO_NOT_COLLECTED}
                        label="Select all that apply:"
                        options={[
                          {
                            displayValue:
                              "Not Collected by Provider (Hospital/Health Plan)",
                            value: DC.NOT_COLLECTED_BY_PROVIDER,
                          },
                          {
                            displayValue: "Other",
                            value: DC.OTHER,
                            children: [
                              <QMR.TextArea
                                key={DC.INFO_NOT_COLLECTED_OTHER}
                                name={DC.INFO_NOT_COLLECTED_OTHER}
                                label="Explain:"
                              />,
                            ],
                          },
                        ]}
                      />,
                    ],
                  },
                  {
                    displayValue: "Other",
                    value: DC.OTHER,
                    children: [
                      <QMR.TextArea
                        key={DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER}
                        name={DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER}
                        label="Explain:"
                      />,
                    ],
                  },
                ]}
              />,
            ],
          },
          ...(featuresByYear.displayCovidLanguage
            ? [
                {
                  displayValue:
                    labels.WhyAreYouNotReporting?.limitWithDataCollection,
                  value: DC.LIMITATION_WITH_DATA_COLLECTION,
                  children: [
                    <QMR.TextArea
                      key={DC.LIMITATION_WITH_DATA_COLLECTION}
                      name={DC.LIMITATION_WITH_DATA_COLLECTION}
                      label={
                        labels.WhyAreYouNotReporting
                          ?.limitWithDataCollectionDesc
                      }
                    />,
                  ],
                },
              ]
            : []),
          {
            displayValue: `Small sample size ${
              removeLessThan30 ? "" : "(less than 30)"
            }`,
            value: DC.SMALL_SAMPLE_SIZE_LESS,
            children: [
              <QMR.NumberInput
                key={DC.SMALL_SAMPLE_SIZE_LESS}
                name={DC.SMALL_SAMPLE_SIZE_LESS}
                label="Enter specific sample size:"
                mask={removeLessThan30 ? /^[0-9]*$/i : /^([1-2]?\d)?$/i}
              />,
            ],
          },
          ...(healthHomeMeasure
            ? [
                {
                  displayValue:
                    "Continuous enrollment requirement not met due to start date of SPA",
                  value:
                    DC.CONTINUOUS_ENROLLMENT_REQUIREMENT_NOT_MET_DUE_TO_START_DATE_OF_SPA,
                },
              ]
            : []),
          {
            displayValue: "Other",
            value: DC.OTHER,
            children: [
              <QMR.TextArea
                key={DC.WHY_ARE_YOU_NOT_REPORTING_OTHER}
                name={DC.WHY_ARE_YOU_NOT_REPORTING_OTHER}
                label="Explain:"
              />,
            ],
          },
        ]}
      />
    </QMR.CoreQuestionWrapper>
  );
};
