/* Seed Data for validation tests*/
export const testFormData = {
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
