const testCases = {
  FilledOnlyNumerator: {
    DidReport: "yes",
    DataStatus: "ReportingFinalData",
    MeasurementSpecification: "NCQA/HEDIS",
    DataSource: ["AdministrativeData"],
    MeasurementPeriodAdhereToCoreSetSpecification: "yes",
    DefinitionOfDenominator: ["DenominatorIncMedicaidPop"],
    DenominatorDefineTotalTechSpec: "yes",
    DeliverySysRepresentationDenominator: ["FFS"],
    "MeasurementSpecification-HEDISVersion": "HEDIS MY 2023",
    PerformanceMeasure: {
      rates: {
        ZCy3XP: [
          {
            label: "Ages 3 months to 17 years",
            uid: "ZCy3XP.xS5HMm",
            numerator: "5",
          },
        ],
      },
    },
    DataSourceSelections: {
      AdministrativeData0: {
        selected: ["MedicaidManagementInformationSystemMMIS"],
      },
    },
    "DeliverySys-FeeForService": "yes",
  },
  AfterDeletingDenominator: {
    DidReport: "yes",
    DataStatus: "ReportingFinalData",
    MeasurementSpecification: "NCQA/HEDIS",
    "MeasurementSpecification-HEDISVersion": "HEDIS MY 2023",
    DataSource: ["AdministrativeData"],
    DataSourceSelections: {
      AdministrativeData0: {
        selected: ["MedicaidManagementInformationSystemMMIS"],
      },
    },
    MeasurementPeriodAdhereToCoreSetSpecification: "yes",
    DefinitionOfDenominator: ["DenominatorIncMedicaidPop"],
    DenominatorDefineTotalTechSpec: "yes",
    DeliverySysRepresentationDenominator: ["FFS"],
    "DeliverySys-FeeForService": "yes",
    PerformanceMeasure: {
      rates: {
        ZCy3XP: [
          {
            label: "Ages 3 months to 17 years",
            uid: "ZCy3XP.xS5HMm",
            rate: "",
            numerator: "5",
            denominator: "",
          },
        ],
      },
    },
    OptionalMeasureStratification: {
      selections: {},
    },
  },
  WithAdminOtherDSDescription: {
    DidReport: "yes",
    DataStatus: "ReportingFinalData",
    MeasurementSpecification: "NCQA/HEDIS",
    "MeasurementSpecification-HEDISVersion": "HEDIS MY 2023",
    DataSource: ["AdministrativeData"],
    DataSourceSelections: {
      AdministrativeData0: {
        selected: [
          "MedicaidManagementInformationSystemMMIS",
          "AdministrativeDataOther",
        ],
      },
      "AdministrativeData0-AdministrativeDataOther": {
        description: "This is the description of my Admin Data Other source",
      },
    },
    MeasurementPeriodAdhereToCoreSetSpecification: "yes",
    DefinitionOfDenominator: ["DenominatorIncMedicaidPop"],
    DenominatorDefineTotalTechSpec: "yes",
    DeliverySysRepresentationDenominator: ["FFS"],
    "DeliverySys-FeeForService": "yes",
    PerformanceMeasure: {
      rates: {
        ZCy3XP: [
          {
            label: "Ages 3 months to 17 years",
            uid: "ZCy3XP.xS5HMm",
            rate: "",
            numerator: "5",
            denominator: "",
          },
        ],
      },
    },
    OptionalMeasureStratification: {
      selections: {},
    },
  },
  WithOtherOtherDS: {
    DidReport: "yes",
    DataStatus: "ReportingFinalData",
    MeasurementSpecification: "NCQA/HEDIS",
    "MeasurementSpecification-HEDISVersion": "HEDIS MY 2023",
    DataSource: ["AdministrativeData", "OtherDataSource"],
    DataSourceSelections: {
      AdministrativeData0: {
        selected: [
          "MedicaidManagementInformationSystemMMIS",
          "AdministrativeDataOther",
        ],
      },
      "AdministrativeData0-AdministrativeDataOther": {
        description: "This is the description of my Admin Data Other source",
      },
      OtherDataSource: {
        description: "An OTHER other data source is now included",
      },
    },
    MeasurementPeriodAdhereToCoreSetSpecification: "yes",
    DefinitionOfDenominator: ["DenominatorIncMedicaidPop"],
    DenominatorDefineTotalTechSpec: "yes",
    DeliverySysRepresentationDenominator: ["FFS"],
    "DeliverySys-FeeForService": "yes",
    PerformanceMeasure: {
      rates: {
        ZCy3XP: [
          {
            label: "Ages 3 months to 17 years",
            uid: "ZCy3XP.xS5HMm",
            rate: "",
            numerator: "5",
            denominator: "",
          },
        ],
      },
    },
    OptionalMeasureStratification: {
      selections: {},
    },
  },
  WithOtherSpecification: {
    DidReport: "yes",
    DataStatus: "ReportingFinalData",
    MeasurementSpecification: "Other",
    DataSource: ["AdministrativeData"],
    DataSourceSelections: {
      AdministrativeData0: {
        selected: ["MedicaidManagementInformationSystemMMIS"],
      },
    },
    MeasurementPeriodAdhereToCoreSetSpecification: "yes",
    DefinitionOfDenominator: ["DenominatorIncMedicaidPop"],
    DenominatorDefineTotalTechSpec: "yes",
    DeliverySysRepresentationDenominator: ["FFS"],
    "DeliverySys-FeeForService": "yes",
    OptionalMeasureStratification: {
      selections: {},
    },
    "MeasurementSpecification-OtherMeasurementSpecificationDescription":
      "We made up our own spec this year, for funsies",
    "OtherPerformanceMeasure-Rates": [
      {
        rate: [
          {
            denominator: "",
            numerator: "",
            rate: "",
          },
        ],
        description: "",
      },
    ],
  },
  WithECDSAndEHR: {
    DidReport: "yes",
    DataStatus: "ReportingFinalData",
    MeasurementSpecification: "NCQA/HEDIS",
    DataSource: [
      "AdministrativeData",
      "ElectronicClinicalDataSystemsECDS",
      "ElectronicHealthRecords",
      "OtherDataSource",
    ],
    MeasurementPeriodAdhereToCoreSetSpecification: "yes",
    DefinitionOfDenominator: ["DenominatorIncMedicaidPop"],
    DenominatorDefineTotalTechSpec: "yes",
    DeliverySysRepresentationDenominator: ["FFS"],
    "MeasurementSpecification-HEDISVersion": "HEDIS MY 2023",
    PerformanceMeasure: {
      rates: {
        ugoYfe: [
          {
            label: "Initiation Phase",
            uid: "ugoYfe.UYSXR5",
            numerator: "6",
            denominator: "7",
            rate: "85.7",
          },
          // TODO NOTE! Neither numerator nor denominator nor rate exists.
          {
            label: "Continuation and Maintenance (C&M) Phase",
            uid: "ugoYfe.jfj0f8",
          },
        ],
      },
    },
    DataSourceSelections: {
      AdministrativeData0: {
        selected: ["MedicaidManagementInformationSystemMMIS"],
      },
      ElectronicClinicalDataSystemsECDS: {
        description: "This is the ECDS description, yo",
      },
      ElectronicHealthRecords: {
        description: "Throw in an EHR description while we're at it",
      },
      OtherDataSource: {
        description: "And an other other why not",
      },
    },
    "DeliverySys-FeeForService": "yes",
    OptionalMeasureStratification: {},
  },
  WhatIsCahps: {
    measure: "FVA-AD",
    data: {
      "AdditionalNotes-Upload": [],
      DateRange: {
        endDate: { selectedMonth: 3, selectedYear: 2021 },
        startDate: { selectedMonth: 2, selectedYear: 2021 },
      },
      PerformanceMeasure: {
        rates: {
          singleCategory: [
            {
              label: "Ages 18 to 64",
              rate: "66.7",
              numerator: "4",
              denominator: "6",
            },
          ],
        },
      },
      OptionalMeasureStratification: {},
      MeasurementSpecification: "NCQA/HEDIS",
      DidReport: "yes",
      DataSource: "CAHPS 5.1H",
    },
    lastAltered: 1660232236976,
    reporting: "yes",
    status: "incomplete",
    year: 2021,
    createdAt: 1655995030929,
    compoundKey: "MD2021ACSFVA-AD",
    coreSet: "ACS",
    lastAlteredBy: "State QMR",
    state: "MD",
  },
};
