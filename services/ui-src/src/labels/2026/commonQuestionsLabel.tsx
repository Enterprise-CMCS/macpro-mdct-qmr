import * as DC from "dataConstants";

export const commonQuestionsLabel = {
  AdditionalNotes: {
    header: "Additional Notes/Comments on the measure (optional)",
    section: {
      isNotReportingText:
        "Please add any additional notes or comments on the measure not otherwise captured above:",
      isReportingText:
        "Please add any additional notes or comments on the measure not otherwise captured above (<em>text in this field is included in publicly-reported state-specific comments</em>):",
    },
  },
  DataSource: {
    ehrSrc: "Optional - Describe the data source(s) used:",
    describeDataSrc:
      "Describe the data source (<em>text in this field is included in publicly-reported state-specific comments</em>):",
    describeOptionalDataSrc: "Optional - Describe the data source(s) used:",
    srcExplanation: "Data Source Explanation",
    srcExplanationText:
      "For each data source selected above, describe which reporting entities used each data source (e.g., health plans, FFS). If the data source differed across health plans or delivery systems, identify the number of plans or delivery systems that used each data source (<em>text in this field is included in publicly-reported state-specific comments</em>).",
    otherDataSourceWarning:
      "If you report using Other Data Source, CMS will not be able to produce a combined Medicaid & CHIP rate for public reporting. If the information reported in the Data Source field is accurate, please continue reporting this measure.",
  },
  DataSourceCahps: {
    describeDataSrc:
      "Describe the data source (<em>text in this field is included in publicly-reported state-specific comments</em>):",
    otherDataSourceWarning:
      "If you report using Other Data Source, CMS will not be able to produce a combined Medicaid & CHIP rate for public reporting. If the information reported in the Data Source field is accurate, please continue reporting this measure.",
  },
  DefinitionsOfPopulation: {
    defineDenomOther:
      "Define the other denominator population (<em>text in this field is included in publicly-reported state-specific comments</em>):",
    measureEligiblePopDenom: {
      question: {
        default:
          "Does this denominator represent your total measure-eligible population as defined by the technical specifications for this measure? This includes beneficiaries who move between programs (Medicaid and CHIP), plans, or delivery systems during the measurement year but met continuous enrollment requirements at the state level.",
        HHCS: "Does this denominator represent your total measure-eligible population as defined by the technical specifications for this measure? This includes enrollees who move between health home providers, plans, or delivery systems during the measurement year but met continuous enrollment requirements at the state level.",
      },
      optionYes:
        "Yes, this denominator includes the total measure-eligible population as defined by the Technical Specifications for this measure.",
      optionNo:
        "No, this denominator does not include the total measure-eligible population as defined by the Technical Specifications for this measure.",
    },
    explainExcludedPop:
      "Explain which populations are excluded and why (<em>text in this field is included in publicly-reported state-specific comments</em>):",
    specSizeOfPop:
      "Specify the size of the excluded measure-eligible population:",
    deliverySysOther:
      "Describe the Other Delivery System represented in the denominator (<em>text in this field is included in publicly-reported state-specific comments</em>):",
    coreSetSpecificOptions: {
      ACSM: {
        options: [
          {
            displayValue: "Medicaid (Title XIX)",
            value: DC.DENOMINATOR_INC_MEDICAID_POP,
          },
          {
            displayValue: "Title XXI-funded Medicaid Expansion CHIP",
            value: DC.DENOMINATOR_INC_MEDICAID_EXPANSION,
          },
          {
            displayValue:
              "Individuals Dually Eligible for Medicare and Medicaid",
            value: DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator. For example, if your data include Medicaid (Title XIX) beneficiaries, Title XXI-funded Medicaid Expansion CHIP beneficiaries, and individuals dually eligible for Medicare and Medicaid, select:",
      },
      CCSM: {
        options: [
          {
            displayValue: "Medicaid (Title XIX)",
            value: DC.DENOMINATOR_INC_MEDICAID_POP,
          },
          {
            displayValue: "Title XXI-funded Medicaid Expansion CHIP",
            value: DC.DENOMINATOR_INC_MEDICAID_EXPANSION,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator. For example, if your data include both Medicaid (Title XIX) and Title XXI-funded Medicaid Expansion CHIP beneficiaries, select both:",
      },
      ACSC: {
        options: [
          {
            displayValue: "Separate CHIP (Title XXI)",
            value: DC.DENOMINATOR_INC_CHIP,
          },
          {
            displayValue:
              "Individuals Dually Eligible for Medicare and Separate CHIP",
            value: DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator. For example, if your data include both Separate CHIP (Title XXI) beneficiaries and individuals dually eligible for Medicare and Separate CHIP, select:",
      },
      CCSC: {
        options: [
          {
            displayValue: "Separate CHIP (Title XXI)",
            value: DC.DENOMINATOR_INC_CHIP,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator.",
      },
      ACS: {
        options: [
          {
            displayValue: "Medicaid (Title XIX)",
            value: DC.DENOMINATOR_INC_MEDICAID_POP,
          },
          {
            displayValue: "Title XXI-funded Medicaid Expansion CHIP",
            value: DC.DENOMINATOR_INC_MEDICAID_EXPANSION,
          },
          {
            displayValue:
              "Individuals Dually Eligible for Medicare and Medicaid",
            value: DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator. For example, if your data include Medicaid (Title XIX) beneficiaries, Title XXI-funded Medicaid Expansion CHIP beneficiaries, and individuals dually eligible for Medicare and Medicaid, select:",
      },
      CCS: {
        options: [
          {
            displayValue: "Medicaid (Title XIX)",
            value: DC.DENOMINATOR_INC_MEDICAID_POP,
          },
          {
            displayValue: "Title XXI-funded Medicaid Expansion CHIP",
            value: DC.DENOMINATOR_INC_MEDICAID_EXPANSION,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator. For example, if your data include both Medicaid (Title XIX) and Title XXI-funded Medicaid Expansion CHIP beneficiaries, select both:",
      },
      HHCS: {
        options: [
          {
            displayValue: "Medicaid (Title XIX)",
            value: DC.DENOMINATOR_INC_MEDICAID_POP,
          },
          {
            displayValue:
              "Individuals Dually Eligible for Medicare and Medicaid",
            value: DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
          },
        ],
        helpText:
          "Please select all populations that are included in the denominator. For example, if your data include both Medicaid (Title XIX) enrollees and individuals dually eligible for Medicare and Medicaid, select:",
      },
    },
  },
  DateRange: {
    header: "Date Range",
    desc: "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”",
    link: [
      "Information for each measure is available in the ",
      "Measurement Period Table",
      " resource.",
    ],
  },
  DeviationFromMeasureSpecification: {
    header: "Variations from Measure Specifications",
    section:
      "Did your calculation of the measure vary from the measure specification in any way?",
    helper:
      "For example: variation from measure specification might include different methodology, timeframe, or reported age groups.",
    optionsText: "Select and explain the variation(s):",
    options: [
      {
        displayValue:
          "Yes, the calculation of the measure varies from the measure specification.",
        value: DC.YES,
      },
      {
        displayValue:
          "No, the calculation of the measure does not vary from the measure specification in any way.",
        value: DC.NO,
      },
    ],
    deviationReason:
      "Explain the variation(s) (<em>text in this field is included in publicly-reported state-specific comments</em>):",
  },
  MeasureSpecifications: {
    measureSpecYesNo: true,
    otherMeasurementSpecWarning:
      "If you report using Other specifications, CMS will not be able to publicly report the performance rate. In addition, the rate will not be used to calculate a combined Medicaid and CHIP rate. If the information reported in the Specifications field is accurate, please continue reporting this measure.",
  },
  OptionalMeasureStratification: {
    section:
      "If this measure is also reported by additional classifications/sub-categories, e.g. racial, ethnic, sex, or geography, complete the following as applicable. If your state reported classifications/sub-categories other than those listed below, or reported different rate sets, please click on “Add Another Sub-Category” to add Additional/Alternative Classification/Sub-categories as needed. Please note that CMS may add in additional categories for language and disability status in future reporting years.",
    additionalContext:
      "If the state would like to provide additional context about the reported stratified data, including stratification categories, please add notes below (optional)",
  },
  PerformanceMeasure: {
    phe: "CMS recognizes that social distancing will make onsite medical chart reviews inadvisable during the COVID-19 pandemic. As such, hybrid measures that rely on such techniques will be particularly challenging during this time. CMS encourages states that can collect information safely to continue reporting the measures they have reported in the past.",
  },
};

export default commonQuestionsLabel;
