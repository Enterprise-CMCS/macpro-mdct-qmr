import * as DC from "dataConstants";
import { DefaultFormDataLegacy as FormData } from "shared/types/FormData";

/* Seed Data for validation tests - Uses DefaultFormData to ensure that our data matches the shape of production data.*/
export const testFormData: FormData = {
  [DC.ADDITIONAL_NOTES]: "",
  [DC.ADDITIONAL_NOTES_UPLOAD]: [],
  [DC.DID_COLLECT]: "yes",
  [DC.DATA_STATUS]: DC.REPORTING_FINAL_DATA,
  [DC.DATA_STATUS_PROVISIONAL_EXPLAINATION]: "",

  [DC.WHY_ARE_YOU_NOT_REPORTING]: [],

  [DC.AMOUNT_OF_POP_NOT_COVERED]: DC.ENTIRE_POP_NOT_COVERED,

  [DC.PARTIAL_POP_NOT_COVERED_EXPLAINATION]: "",

  [DC.WHY_IS_DATA_NOT_AVAILABLE]: [],
  [DC.WHY_IS_DATA_NOT_AVAILABLE_OTHER]: "",
  [DC.DATA_INCONSISTENCIES_ACCURACY_ISSUES]: "",
  [DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE]: [],
  [DC.DATA_SOURCE_NOT_EASILY_ACCESSIBLE_OTHER]: "",
  [DC.INFO_NOT_COLLECTED]: [],
  [DC.INFO_NOT_COLLECTED_OTHER]: "",
  [DC.LIMITATION_WITH_DATA_COLLECTION]: "",
  [DC.SMALL_SAMPLE_SIZE]: "",
  [DC.WHY_ARE_YOU_NOT_REPORTING_OTHER]: "",
  [DC.DID_REPORT]: "yes",
  [DC.COMBINED_RATES]: "yes",
  [DC.COMBINED_RATES_COMBINED_RATES]: DC.COMBINED_NOT_WEIGHTED_RATES,
  [DC.COMBINED_WEIGHTED_RATES_OTHER_EXPLAINATION]: "",
  [DC.DATE_RANGE]: {
    [DC.END_DATE]: { [DC.SELECTED_MONTH]: 1, [DC.SELECTED_YEAR]: 2021 },
    [DC.START_DATE]: { [DC.SELECTED_MONTH]: 12, [DC.SELECTED_YEAR]: 2021 },
  },
  [DC.DEFINITION_OF_DENOMINATOR]: [
    DC.DENOMINATOR_INC_MEDICAID_POP,
    DC.DENOMINATOR_INC_CHIP,
    DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
    DC.DENOMINATOR_INC_OTHER,
  ],
  [DC.DEFINITION_DENOMINATOR_OTHER]: "",
  [DC.CHANGE_IN_POP_EXPLANATION]: "",
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC]: "yes",
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_EXPLAIN]: "",
  [DC.DENOMINATOR_DEFINE_HEALTH_HOME]: "yes",
  [DC.DENOMINATOR_DEFINE_HEALTH_HOME_NO_EXPLAIN]: "",
  [DC.DENOMINATOR_DEFINE_TOTAL_TECH_SPEC_NO_SIZE]: "",
  [DC.DELIVERY_SYS_REPRESENTATION_DENOMINATOR]: [
    DC.FFS,
    DC.PCCM,
    DC.MCO_PIHP,
    DC.ICM,
  ],

  [DC.HYBRID_MEASURE_POPULATION_INCLUDED]: "",
  [DC.HYBRID_MEASURE_SAMPLE_SIZE]: "",
  [DC.DEFINITION_OF_DENOMINATOR_SUBSET_EXPLAIN]: "",
  [DC.DELIVERY_SYS_FFS]: "yes",
  [DC.DELIVERY_SYS_FFS_NO_PERCENT]: "",
  [DC.DELIVERY_SYS_FFS_NO_POP]: "",
  [DC.DELIVERY_SYS_PCCM]: "yes",
  [DC.DELIVERY_SYS_PCCM_NO_PERCENT]: "",
  [DC.DELIVERY_SYS_PCCM_NO_POP]: "",
  [DC.DELIVERY_SYS_MCO_PIHP]: "yes",
  [DC.DELIVERY_SYS_MCO_PIHP_PERCENT]: "",
  [DC.DELIVERY_SYS_MCO_PIHP_NUM_PLANS]: "",
  [DC.DELIVERY_SYS_MCO_PIHP_NO_INC]: "",
  [DC.DELIVERY_SYS_MCO_PIHP_NO_EXCL]: "",
  [DC.DELIVERY_SYS_ICM]: "yes",
  [DC.DELIVERY_SYS_ICM_NO_PERCENT]: "",
  [DC.DELIVERY_SYS_ICM_NO_POP]: "",
  [DC.DELIVERY_SYS_OTHER]: "",
  [DC.DELIVERY_SYS_OTHER_PERCENT]: "",
  [DC.DELIVERY_SYS_OTHER_NUM_HEALTH_PLANS]: "",
  [DC.DELIVERY_SYS_OTHER_POP]: "",

  [DC.MEASUREMENT_SPECIFICATION]: DC.NCQA,

  [DC.MEASUREMENT_SPECIFICATION_HEDIS]: DC.HEDIS_MY_2020,
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION]: "",
  [DC.MEASUREMENT_SPEC_OMS_DESCRIPTION_UPLOAD]: new File([], ""),
  [DC.OPM_EXPLAINATION]: "",
  [DC.OPM_RATES]: [
    {
      [DC.DESCRIPTION]: "Label 1",
      [DC.RATE]: [
        {
          [DC.RATE]: "50.0",
          [DC.NUMERATOR]: "1",
          [DC.DENOMINATOR]: "2",
        },
      ],
    },
    {
      [DC.DESCRIPTION]: "Label 2",
      [DC.RATE]: [
        {
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
    },
  ],
  [DC.OPM_NOTES]: "",
  [DC.OPM_NOTES_TEXT_INPUT]: "",
  [DC.OMS]: {
    [DC.OPTIONS]: ["RaceNonHispanic"],
    [DC.SELECTIONS]: {
      RaceNonHispanic: {
        [DC.OPTIONS]: ["White", "BlackorAfricanAmerican"],
        [DC.SELECTIONS]: {
          White: {
            [DC.RATE_DATA]: {
              [DC.OPTIONS]: ["Ages18to64", "Age65andolder"],
              [DC.RATES]: {
                Ages18to64: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "25.0",
                      [DC.NUMERATOR]: "1",
                      [DC.DENOMINATOR]: "4",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "25.0",
                      [DC.NUMERATOR]: "1",
                      [DC.DENOMINATOR]: "4",
                    },
                  ],
                },
                Age65andolder: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "50.0",
                      [DC.NUMERATOR]: "2",
                      [DC.DENOMINATOR]: "4",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "50.0",
                      [DC.NUMERATOR]: "2",
                      [DC.DENOMINATOR]: "4",
                    },
                  ],
                },
              },
            },
            [DC.SUB_CATS]: [],
          },
          BlackorAfricanAmerican: {
            [DC.RATE_DATA]: {
              [DC.OPTIONS]: ["Ages18to64", "Age65andolder"],
              [DC.RATES]: {
                Ages18to64: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "33.3",
                      [DC.NUMERATOR]: "2",
                      [DC.DENOMINATOR]: "6",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "33.3",
                      [DC.NUMERATOR]: "2",
                      [DC.DENOMINATOR]: "6",
                    },
                  ],
                },
                Age65andolder: {
                  InitiationofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "50.0",
                      [DC.NUMERATOR]: "3",
                      [DC.DENOMINATOR]: "6",
                    },
                  ],
                  EngagementofAODTreatmentAlcoholAbuseorDependence: [
                    {
                      [DC.LABEL]:
                        "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                      [DC.RATE]: "50.0",
                      [DC.NUMERATOR]: "3",
                      [DC.DENOMINATOR]: "6",
                    },
                  ],
                },
              },
            },
            [DC.SUB_CATS]: [],
          },
        },
        [DC.ADDITIONAL_SELECTIONS]: [],
      },
    },
  },
  [DC.PERFORMANCE_MEASURE]: {
    [DC.EXPLAINATION]: "",
    [DC.RATES]: {
      InitiationofAODTreatmentAlcoholAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "25.0",
          [DC.NUMERATOR]: "1",
          [DC.DENOMINATOR]: "4",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "25.0",
          [DC.NUMERATOR]: "1",
          [DC.DENOMINATOR]: "4",
        },
      ],
      EngagementofAODTreatmentAlcoholAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "50.0",
          [DC.NUMERATOR]: "2",
          [DC.DENOMINATOR]: "4",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "50.0",
          [DC.NUMERATOR]: "2",
          [DC.DENOMINATOR]: "4",
        },
      ],
      InitiationofAODTreatmentOpioidAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
      EngagementofAODTreatmentOpioidAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
      InitiationofAODTreatmentOtherDrugAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
      EngagementofAODTreatmentOtherDrugAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
      InitiationofAODTreatmentTotalAODAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
      EngagementofAODTreatmentTotalAODAbuseorDependence: [
        {
          [DC.LABEL]: "Ages 18 to 64",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
        {
          [DC.LABEL]: "Age 65 and older",
          [DC.RATE]: "",
          [DC.NUMERATOR]: "",
          [DC.DENOMINATOR]: "",
        },
      ],
    },
    [DC.PMHYBRIDEXPLANATION]: "",
  },
  [DC.DID_CALCS_DEVIATE]: "no",
  [DC.DEVIATION_OPTIONS]: [],
  [DC.DEVIATIONS]: {},

  [DC.DATA_SOURCE]: [DC.ADMINISTRATIVE_DATA],
  [DC.DATA_SOURCE_SELECTIONS]: {
    [DC.ADMINISTRATIVE_DATA]: {
      [DC.DESCRIPTION]: "",
      [DC.SELECTED]: ["MedicaidManagementInformationSystemMMIS"],
    },
  },
  [DC.DATA_SOURCE_DESCRIPTION]: "",
};
