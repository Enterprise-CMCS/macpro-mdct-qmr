/* Seed Data for validation tests based off IED-AD */
import { DataDrivenTypes } from "measures/CommonQuestions/types";
import * as DC from "dataConstants";

export const qualifiers = ["Ages 18 to 64", "Age 65 and older"];
export const categories = [
  "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
  "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
  "Initiation of AOD Treatment: Opioid Abuse or Dependence",
  "Engagement of AOD Treatment: Opioid Abuse or Dependence",
  "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
  "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
  "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
  "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
];

export const data: DataDrivenTypes.PerformanceMeasure = {
  questionText: [
    "The percentage of beneficiaries age 18 and Older with a new episode of alcohol or other drug (AOD) abuse or dependence who received the following",
  ],
  questionListItems: [
    "Initiation of AOD Treatment: Percentage of beneficiaries who initiate treatment through an inpatient AOD admission, outpatient visit, intensive outpatient encounter, or partial hospitalization, telehealth, or medication assisted treatment within 14 days of the diagnosis.",
    "Engagement of AOD Treatment: Percentage of beneficiaries who initiated treatment and who were engaged in ongoing AOD treatment within 34 days of the initiation visit.",
  ],
  categories,
  qualifiers,
};

export const dataSourceData: DataDrivenTypes.DataSource = {
  optionsLabel:
    "If reporting entities (e.g., health plans) used different data sources, please select all applicable data sources used below.",
  options: [
    {
      value: DC.ADMINISTRATIVE_DATA,
      subOptions: [
        {
          label: "What is the Administrative Data Source?",
          options: [
            {
              value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
            },
            {
              value: DC.ADMINISTRATIVE_DATA_OTHER,
              description: true,
            },
          ],
        },
      ],
    },
    {
      value: DC.ELECTRONIC_HEALTH_RECORDS,
      description: true,
    },
    {
      value: DC.OTHER_DATA_SOURCE,
      description: true,
    },
  ],
};

// TODO: Ideally this form data would be generated so it reflects the current state of the application
export const IET_AD_data = {
  DidReport: "yes",
  DataStatus: "ReportingFinalData",
  MeasurementSpecification: "NCQA/HEDIS",
  "MeasurementSpecification-HEDISVersion": "HEDIS MY 2020",
  DataSource: ["AdministrativeData"],
  DataSourceSelections: {
    AdministrativeData0: {
      selected: ["MedicaidManagementInformationSystemMMIS"],
    },
  },
  DateRange: {
    startDate: {
      selectedMonth: 1,
      selectedYear: 2021,
    },
    endDate: {
      selectedMonth: 12,
      selectedYear: 2021,
    },
  },
  DefinitionOfDenominator: [
    "DenominatorIncMedicaidPop",
    "DenominatorIncCHIP",
    "DenominatorIncMedicareMedicaidDualEligible",
    "DenominatorIncOther",
  ],
  DenominatorDefineTotalTechSpec: "yes",
  DeliverySysRepresentationDenominator: ["FFS", "PCCM", "MCO-PIHP", "ICM"],
  "DeliverySys-FeeForService": "yes",
  "DeliverySys-PrimaryCareManagement": "yes",
  "DeliverySys-MCO_PIHP": "yes",
  "DeliverySys-IntegratedCareModel": "yes",
  PerformanceMeasure: {
    rates: {
      InitiationofAODTreatmentAlcoholAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "25.0",
          numerator: "1",
          denominator: "4",
        },
        {
          label: "Age 65 and older",
          rate: "25.0",
          numerator: "1",
          denominator: "4",
        },
      ],
      EngagementofAODTreatmentAlcoholAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "50.0",
          numerator: "2",
          denominator: "4",
        },
        {
          label: "Age 65 and older",
          rate: "50.0",
          numerator: "2",
          denominator: "4",
        },
      ],
      InitiationofAODTreatmentOpioidAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "",
          numerator: "",
          denominator: "",
        },
        {
          label: "Age 65 and older",
          rate: "",
          numerator: "",
          denominator: "",
        },
      ],
      EngagementofAODTreatmentOpioidAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "",
          numerator: "",
          denominator: "",
        },
        {
          label: "Age 65 and older",
          rate: "",
          numerator: "",
          denominator: "",
        },
      ],
      InitiationofAODTreatmentOtherDrugAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "",
          numerator: "",
          denominator: "",
        },
        {
          label: "Age 65 and older",
          rate: "",
          numerator: "",
          denominator: "",
        },
      ],
      EngagementofAODTreatmentOtherDrugAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "",
          numerator: "",
          denominator: "",
        },
        {
          label: "Age 65 and older",
          rate: "",
          numerator: "",
          denominator: "",
        },
      ],
      InitiationofAODTreatmentTotalAODAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "",
          numerator: "",
          denominator: "",
        },
        {
          label: "Age 65 and older",
          rate: "",
          numerator: "",
          denominator: "",
        },
      ],
      EngagementofAODTreatmentTotalAODAbuseorDependence: [
        {
          label: "Ages 18 to 64",
          rate: "",
          numerator: "",
          denominator: "",
        },
        {
          label: "Age 65 and older",
          rate: "",
          numerator: "",
          denominator: "",
        },
      ],
    },
  },
  DidCollect: "yes",
  DidCalculationsDeviate: "no",
  OptionalMeasureStratification: {
    options: ["RaceNonHispanic"],
    selections: {
      RaceNonHispanic: {
        options: ["White", "BlackorAfricanAmerican"],
        selections: {
          White: {
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "25.0",
                      numerator: "1",
                      denominator: "4",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "25.0",
                      numerator: "1",
                      denominator: "4",
                    },
                  ],
                },
                Age65andolder: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "50.0",
                      numerator: "2",
                      denominator: "4",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "50.0",
                      numerator: "2",
                      denominator: "4",
                    },
                  ],
                },
              },
            },
            additionalSubCategories: [],
          },
          BlackorAfricanAmerican: {
            rateData: {
              options: ["Ages18to64", "Age65andolder"],
              rates: {
                Ages18to64: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "33.3",
                      numerator: "2",
                      denominator: "6",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "33.3",
                      numerator: "2",
                      denominator: "6",
                    },
                  ],
                },
                Age65andolder: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "50.0",
                      numerator: "3",
                      denominator: "6",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      label:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      rate: "50.0",
                      numerator: "3",
                      denominator: "6",
                    },
                  ],
                },
              },
            },
            additionalSubCategories: [],
          },
        },
        additionalSelections: [],
      },
    },
  },
  "AdditionalNotes-Upload": [],
  "AdditionalNotes-AdditionalNotes": "",
};
