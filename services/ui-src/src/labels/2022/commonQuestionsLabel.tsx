import * as DC from "dataConstants";

export const commonQuestionsLabel = {
  AdditionalNotes: {
    header: "Additional Notes/Comments on the measure (optional)",
    section: {
      isReportingText:
        "Please add any additional notes or comments on the measure not otherwise captured above:",
      isNotReportingText:
        "Please add any additional notes or comments on the measure not otherwise captured above:",
    },
    upload:
      "If you need additional space to include comments or supplemental information, please attach further documentation below.",
  },
  CombinedRates: {
    header: "Combined Rate(s) from Multiple Reporting Units",
    healthHome: {
      question:
        "Did you combine rates from multiple reporting units (e.g. Health Home Providers) to create a Health Home SPA-Level rate?",
      optionYes:
        "Yes, we combined rates from multiple reporting units to create a Health Home SPA-Level rate.",
      optionNo:
        "No, we did not combine rates from multiple reporting units to create a SPA-Level rate for Health Home measures.",
      notWeightedRate:
        "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a SPA-Level rate.",
      weightedRate:
        "The rates are weighted based on the size of the measure-eligible population for each reporting unit.",
      weightedRateOther:
        "The rates are weighted based on another weighting factor.",
      weightedRateOtherExplain: "Describe the other weighting factor:",
    },
    notHealthHome: {
      question:
        "Did you combine rates from multiple reporting units (e.g. health plans, delivery systems, programs) to create a State-Level rate?",
      optionYes:
        "Yes, we combined rates from multiple reporting units to create a State-Level rate.",
      optionNo:
        "No, we did not combine rates from multiple reporting units to create a State-Level rate.",
      notWeightedRate:
        "The rates are not weighted based on the size of the measure-eligible population. All reporting units are given equal weights when calculating a State-Level rate.",
      weightedRate:
        "The rates are weighted based on the size of the measure-eligible population for each reporting unit.",
      weightedRateOther:
        "The rates are weighted based on another weighting factor.",
      weightedRateOtherExplain: "Describe the other weighting factor:",
    },
  },
  DataSource: {
    describeDataSrc: "Describe the data source:",
    srcExplanation: "Data Source Explanation",
    srcExplanationText:
      "For each data source selected above, describe which reporting entities used each data source (e.g., health plans, FFS). If the data source differed across health plans or delivery systems, identify the number of plans that used each data source:",
  },
  DataSourceCahps: {
    describeDataSrc: "Describe the data source:",
  },
  DefinitionsOfPopulation: {
    defineDenomOther: "Define the other denominator population:",
    explainExcludedPop: "Explain which populations are excluded and why:",
    specSizeOfPop: "Specify the size of the population excluded (optional):",
    deliverySysOther:
      "Describe the Other Delivery System represented in the denominator:",
    changeInPopExplanation:
      "If this measure has been reported by the state previously and there has been a change in the included population, please provide any available context below:",
  },
  DateRange: {
    header: "Date Range",
    desc: "For all measures, states should report start and end dates to calculate the denominator. For some measures, the specifications require a “look-back period” before or after the measurement period to determine eligibility or utilization. The measurement period entered in the Start and End Date fields should not include the “look-back period.”",
    link: [
      "More information about the Start and End Date for each measure is available in the ",
      "Measurement Period Table",
      " resource.",
    ],
  },
  DeviationFromMeasureSpecification: {
    header: "Deviations from Measure Specifications",
    section:
      "Did your calculation of the measure deviate from the measure specification in any way?",
    optionsText: "Select and explain the deviation(s):",
    options: [
      {
        displayValue:
          "Yes, the calculation of the measure deviates from the measure specification.",
        value: DC.YES,
      },
      {
        displayValue:
          "No, the calculation of the measure does not deviate from the measure specification in any way.",
        value: DC.NO,
      },
    ],
    deviationReason:
      "Explain the deviation(s) (<em>text in this field is included in publicly-reported state-specific comments</em>):",
  },
  MeasureSpecifications: {
    measureSpecDescriptor:
      "NCQA, the measure steward, changed its naming convention. HEDIS MY 2020 refers to a different federal fiscal year (FFY) than HEDIS 2020. Please note the FFY Core Set specification below.",
    options: [
      {
        displayValue: "HEDIS MY 2021 (FFY 2022 Core Set Reporting)",
        value: DC.HEDIS_MY_2021,
      },
      {
        displayValue: "HEDIS MY 2020 (FFY 2021 Core Set Reporting)",
        value: DC.HEDIS_MY_2020,
      },
      {
        displayValue: "HEDIS 2020 (FFY 2020 Core Set Reporting)",
        value: DC.HEDIS_2020,
      },
    ],
  },
  OptionalMeasureStratification: {
    section:
      "If this measure is also reported by additional classifications/sub-categories, e.g. racial, ethnic, sex, language, disability status, or geography, complete the following as applicable. If your state reported for classifications/sub-categories other than those listed below, or reported for different rate sets, please click on “Add Another” to add Additional/Alternative Classification/Sub-categories as needed.",
  },
  WhyAreYouNotReporting: {
    limitWithDataCollection:
      "Limitations with data collection, reporting, or accuracy due to the COVID-19 pandemic",
    limitWithDataCollectionDesc:
      "Describe your state's limitations with regard to collection, reporting, or accuracy of data for this measure:",
  },
};

export default commonQuestionsLabel;
