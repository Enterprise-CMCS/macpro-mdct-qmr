/**
 * Attention
 * Changing the labels or id's will change how the measure data is shaped and should not be done unless that is the desired result.
 * Changing the text property of these objects will change the text that is displayed to the user.
 */

import { LabelData } from "utils";

export const rawData = {
  "ADD-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Initiation Phase",
        id: "InitiationPhase",
        text: "Initiation Phase",
      },
      {
        label: "Continuation and Maintenance (C&M) Phase",
        id: "ContinuationandMaintenanceCMPhase",
        text: "Continuation and Maintenance (C&M) Phase",
      },
    ],
  },
  "AIF-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Ages 65 to 74",
        id: "Ages65to74",
        text: "Ages 65 to 74",
      },
      {
        label: "Ages 75 to 84",
        id: "Ages75to84",
        text: "Ages 75 to 84",
      },
      {
        label: "Age 85 and older",
        id: "Age85andolder",
        text: "Age 85 and older",
      },
      {
        label: "Total",
        id: "Total",
        text: "Total",
      },
    ],
  },
  "AMB-CH": {
    categories: [],
    qualifiers: [
      {
        label: "< Age 1",
        id: "Age1",
        text: "< Age 1",
      },
      {
        label: "Ages 1 to 9",
        id: "Ages1to9",
        text: "Ages 1 to 9",
      },
      {
        label: "Ages 10 to 19",
        id: "Ages10to19",
        text: "Ages 10 to 19",
      },
      {
        label: "Ages unknown",
        id: "Agesunknown",
        text: "Ages unknown",
      },
      {
        label: "Total (Ages <1 to 19)",
        id: "TotalAges1to19",
        text: "Total (Ages <1 to 19)",
      },
    ],
  },
  "AMB-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 0 to 17",
        id: "Ages0to17",
        text: "Ages 0 to 17",
      },
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Ages unknown",
        id: "Agesunknown",
        text: "Ages unknown",
      },
      {
        label: "Total (All Ages)",
        id: "TotalAllAges",
        text: "Total (All Ages)",
      },
    ],
  },
  "AMM-AD": {
    categories: [
      {
        label: "Effective Acute Phase Treatment",
        id: "EffectiveAcutePhaseTreatment",
        text: "Effective Acute Phase Treatment",
      },
      {
        label: "Effective Continuation Phase Treatment",
        id: "EffectiveContinuationPhaseTreatment",
        text: "Effective Continuation Phase Treatment",
      },
    ],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "AMR-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 19 to 50",
        id: "Ages19to50",
        text: "Ages 19 to 50",
      },
      {
        label: "Ages 51 to 64",
        id: "Ages51to64",
        text: "Ages 51 to 64",
      },
      {
        label: "Total (Ages 19 to 64)",
        id: "TotalAges19to64",
        text: "Total (Ages 19 to 64)",
      },
    ],
  },
  "AMR-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 5 to 11",
        id: "Ages5to11",
        text: "Ages 5 to 11",
      },
      {
        label: "Ages 12 to 18",
        id: "Ages12to18",
        text: "Ages 12 to 18",
      },
      {
        label: "Total (Ages 5 to 18)",
        id: "TotalAges5to18",
        text: "Total (Ages 5 to 18)",
      },
    ],
  },
  "APM-CH": {
    categories: [
      {
        label: "Blood Glucose",
        id: "BloodGlucose",
        text: "Blood Glucose",
      },
      {
        label: "Cholesterol",
        id: "Cholesterol",
        text: "Cholesterol",
      },
      {
        label: "Blood Glucose and Cholesterol",
        id: "BloodGlucoseandCholesterol",
        text: "Blood Glucose and Cholesterol",
      },
    ],
    qualifiers: [
      {
        label: "Ages 1 to 11",
        id: "Ages1to11",
        text: "Ages 1 to 11",
      },
      {
        label: "Ages 12 to 17",
        id: "Ages12to17",
        text: "Ages 12 to 17",
      },
      {
        label: "Total (Ages 1 to 17)",
        id: "TotalAges1to17",
        text: "Total (Ages 1 to 17)",
      },
    ],
  },
  "APP-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 1 to 11",
        id: "Ages1to11",
        text: "Ages 1 to 11",
      },
      {
        label: "Ages 12 to 17",
        id: "Ages12to17",
        text: "Ages 12 to 17",
      },
      {
        label: "Total (Ages 1 to 17)",
        id: "TotalAges1to17",
        text: "Total (Ages 1 to 17)",
      },
    ],
  },
  "AUD-CH": {
    categories: [],
    qualifiers: [
      {
        label:
          "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age",
        id: "Percentageofnewbornswhodidnotpasshearingscreeningandhaveanaudiologicaldiagnosisnolaterthan3monthsofage",
        text: "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age",
      },
    ],
  },
  "BCS-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 50 to 64",
        id: "Ages50to64",
        text: "Ages 50 to 64",
      },
      {
        label: "Ages 65 to 74",
        id: "Ages65to74",
        text: "Ages 65 to 74",
      },
    ],
  },
  "CBP-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Ages 65 to 85",
        id: "Ages65to85",
        text: "Ages 65 to 85",
      },
    ],
  },
  "CBP-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Ages 65 to 85",
        id: "Ages65to85",
        text: "Ages 65 to 85",
      },
      {
        label: "Total (Ages 18 to 85)",
        id: "TotalAges18to85",
        text: "Total (Ages 18 to 85)",
      },
    ],
  },
  "CCP-AD": {
    categories: [
      {
        label: "Most effective or moderately effective method of contraception",
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        text: "Most effective or moderately effective method of contraception",
      },
      {
        label: "Long-acting reversible method of contraception (LARC)",
        id: "LongactingreversiblemethodofcontraceptionLARC",
        text: "Long-acting reversible method of contraception (LARC)",
      },
    ],
    qualifiers: [
      {
        label: "Three Days Postpartum Rate",
        id: "ThreeDaysPostpartumRate",
        text: "Three Days Postpartum Rate",
      },
      {
        label: "Sixty Days Postpartum Rate",
        id: "SixtyDaysPostpartumRate",
        text: "Sixty Days Postpartum Rate",
      },
    ],
  },
  "CCP-CH": {
    categories: [
      {
        label: "Most effective or moderately effective method of contraception",
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        text: "Most effective or moderately effective method of contraception",
      },
      {
        label: "Long-acting reversible method of contraception (LARC)",
        id: "LongactingreversiblemethodofcontraceptionLARC",
        text: "Long-acting reversible method of contraception (LARC)",
      },
    ],
    qualifiers: [
      {
        label: "Three Days Postpartum Rate",
        id: "ThreeDaysPostpartumRate",
        text: "Three Days Postpartum Rate",
      },
      {
        label: "Sixty Days Postpartum Rate",
        id: "SixtyDaysPostpartumRate",
        text: "Sixty Days Postpartum Rate",
      },
    ],
  },
  "CCS-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Percentage of women ages 21 to 64 screened",
        id: "Percentageofwomenages21to64screened",
        text: "Percentage of women ages 21 to 64 screened",
      },
    ],
  },
  "CCW-AD": {
    categories: [
      {
        label: "Most effective or moderately effective method of contraception",
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        text: "Most effective or moderately effective method of contraception",
      },
      {
        label: "Long-acting reversible method of contraception (LARC)",
        id: "LongactingreversiblemethodofcontraceptionLARC",
        text: "Long-acting reversible method of contraception (LARC)",
      },
    ],
    qualifiers: [
      {
        label: "All Women Ages 21 to 44",
        id: "AllWomenAges21to44",
        text: "All Women Ages 21 to 44",
      },
    ],
  },
  "CCW-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Most effective or moderately effective method of contraception",
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        text: "Most effective or moderately effective method of contraception",
      },
      {
        label: "Long-acting reversible method of contraception (LARC)",
        id: "LongactingreversiblemethodofcontraceptionLARC",
        text: "Long-acting reversible method of contraception (LARC)",
      },
    ],
  },
  "CDF-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "CDF-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 12 to 17",
        id: "Ages12to17",
        text: "Ages 12 to 17",
      },
    ],
  },
  "CDF-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 12 to 17",
        id: "Ages12to17",
        text: "Ages 12 to 17",
      },
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Total (Age 12 and older)",
        id: "TotalAge12andolder",
        text: "Total (Age 12 and older)",
      },
    ],
  },
  "CHL-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 21 to 24",
        id: "Ages21to24",
        text: "Ages 21 to 24",
      },
    ],
  },
  "CHL-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 16 to 20",
        id: "Ages16to20",
        text: "Ages 16 to 20",
      },
    ],
  },
  "CIS-CH": {
    categories: [],
    qualifiers: [
      {
        label: "DTaP",
        id: "DTaP",
        text: "DTaP",
      },
      {
        label: "IPV",
        id: "IPV",
        text: "IPV",
      },
      {
        label: "MMR",
        id: "MMR",
        text: "MMR",
      },
      {
        label: "HiB",
        id: "HiB",
        text: "HiB",
      },
      {
        label: "Hep B",
        id: "HepB",
        text: "Hep B",
      },
      {
        label: "VZV",
        id: "VZV",
        text: "VZV",
      },
      {
        label: "PCV",
        id: "PCV",
        text: "PCV",
      },
      {
        label: "Hep A",
        id: "HepA",
        text: "Hep A",
      },
      {
        label: "RV",
        id: "RV",
        text: "RV",
      },
      {
        label: "Flu",
        id: "Flu",
        text: "Flu",
      },
      {
        label: "Combo 2",
        id: "Combo2",
        text: "Combo 2",
      },
      {
        label: "Combo 3",
        id: "Combo3",
        text: "Combo 3",
      },
      {
        label: "Combo 4",
        id: "Combo4",
        text: "Combo 4",
      },
      {
        label: "Combo 5",
        id: "Combo5",
        text: "Combo 5",
      },
      {
        label: "Combo 6",
        id: "Combo6",
        text: "Combo 6",
      },
      {
        label: "Combo 7",
        id: "Combo7",
        text: "Combo 7",
      },
      {
        label: "Combo 8",
        id: "Combo8",
        text: "Combo 8",
      },
      {
        label: "Combo 9",
        id: "Combo9",
        text: "Combo 9",
      },
      {
        label: "Combo 10",
        id: "Combo10",
        text: "Combo 10",
      },
    ],
  },
  "COB-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "DEV-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Children screened by 12 months of age",
        id: "Childrenscreenedby12monthsofage",
        text: "Children screened by 12 months of age",
      },
      {
        label: "Children screened by 24 months of age",
        id: "Childrenscreenedby24monthsofage",
        text: "Children screened by 24 months of age",
      },
      {
        label: "Children screened by 36 months of age",
        id: "Childrenscreenedby36monthsofage",
        text: "Children screened by 36 months of age",
      },
      {
        label: "Children Total",
        id: "ChildrenTotal",
        text: "Children Total",
      },
    ],
  },
  "FUA-AD": {
    categories: [
      {
        label: "Follow-up within 30 days of ED visit",
        id: "Followupwithin30daysofEDvisit",
        text: "Follow-up within 30 days of ED visit",
      },
      {
        label: "Follow-up within 7 days of ED visit",
        id: "Followupwithin7daysofEDvisit",
        text: "Follow-up within 7 days of ED visit",
      },
    ],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "FUA-HH": {
    categories: [
      {
        label: "Follow-up within 30 days of ED visit",
        id: "Followupwithin30daysofEDvisit",
        text: "Follow-up within 30 days of ED visit",
      },
      {
        label: "Follow-up within 7 days of ED visit",
        id: "Followupwithin7daysofEDvisit",
        text: "Follow-up within 7 days of ED visit",
      },
    ],
    qualifiers: [
      {
        label: "Ages 13 to 17",
        id: "Ages13to17",
        text: "Ages 13 to 17",
      },
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Total (Age 13 and older)",
        id: "TotalAge13andolder",
        text: "Total (Age 13 and older)",
      },
    ],
  },
  "FUH-AD": {
    categories: [
      {
        label: "Follow-Up within 30 days after discharge",
        id: "FollowUpwithin30daysafterdischarge",
        text: "Follow-Up within 30 days after discharge",
      },
      {
        label: "Follow-Up within 7 days after discharge",
        id: "FollowUpwithin7daysafterdischarge",
        text: "Follow-Up within 7 days after discharge",
      },
    ],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "FUH-CH": {
    categories: [
      {
        label: "Follow-Up within 30 days after discharge",
        id: "FollowUpwithin30daysafterdischarge",
        text: "Follow-Up within 30 days after discharge",
      },
      {
        label: "Follow-Up within 7 days after discharge",
        id: "FollowUpwithin7daysafterdischarge",
        text: "Follow-Up within 7 days after discharge",
      },
    ],
    qualifiers: [
      {
        label: "Ages 6 to 17",
        id: "Ages6to17",
        text: "Ages 6 to 17",
      },
    ],
  },
  "FUH-HH": {
    categories: [
      {
        label: "Follow-up within 30 days after discharge",
        id: "Followupwithin30daysafterdischarge",
        text: "Follow-up within 30 days after discharge",
      },
      {
        label: "Follow-up within 7 days after discharge",
        id: "Followupwithin7daysafterdischarge",
        text: "Follow-up within 7 days after discharge",
      },
    ],
    qualifiers: [
      {
        label: "Ages 6 to 17",
        id: "Ages6to17",
        text: "Ages 6 to 17",
      },
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Total (Age 6 and older)",
        id: "TotalAge6andolder",
        text: "Total (Age 6 and older)",
      },
    ],
  },
  "FUM-AD": {
    categories: [
      {
        label: "30-day follow-up after ED visit for mental illness",
        id: "30dayfollowupafterEDvisitformentalillness",
        text: "30-day follow-up after ED visit for mental illness",
      },
      {
        label: "7-day follow-up after ED visit for mental illness",
        id: "7dayfollowupafterEDvisitformentalillness",
        text: "7-day follow-up after ED visit for mental illness",
      },
    ],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "FVA-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
    ],
  },
  "HVL-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "HPC-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Ages 65 to 75",
        id: "Ages65to75",
        text: "Ages 65 to 75",
      },
    ],
  },
  "HPCMI-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Ages 65 to 75",
        id: "Ages65to75",
        text: "Ages 65 to 75",
      },
    ],
  },
  "IET-AD": {
    categories: [
      {
        label: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
        id: "InitiationofAODTreatmentAlcoholAbuseorDependence",
        text: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
        id: "EngagementofAODTreatmentAlcoholAbuseorDependence",
        text: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        label: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
        id: "InitiationofAODTreatmentOpioidAbuseorDependence",
        text: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
        id: "EngagementofAODTreatmentOpioidAbuseorDependence",
        text: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        label: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
        id: "InitiationofAODTreatmentOtherDrugAbuseorDependence",
        text: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
        id: "EngagementofAODTreatmentOtherDrugAbuseorDependence",
        text: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        label: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
        id: "InitiationofAODTreatmentTotalAODAbuseorDependence",
        text: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
        id: "EngagementofAODTreatmentTotalAODAbuseorDependence",
        text: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
      },
    ],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "IET-HH": {
    categories: [
      {
        label: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
        id: "InitiationofAODTreatmentAlcoholAbuseorDependence",
        text: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
        id: "EngagementofAODTreatmentAlcoholAbuseorDependence",
        text: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        label: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
        id: "InitiationofAODTreatmentOpioidAbuseorDependence",
        text: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
        id: "EngagementofAODTreatmentOpioidAbuseorDependence",
        text: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        label: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
        id: "InitiationofAODTreatmentOtherDrugAbuseorDependence",
        text: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
        id: "EngagementofAODTreatmentOtherDrugAbuseorDependence",
        text: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        label: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
        id: "InitiationofAODTreatmentTotalAODAbuseorDependence",
        text: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
      },
      {
        label: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
        id: "EngagementofAODTreatmentTotalAODAbuseorDependence",
        text: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
      },
    ],
    qualifiers: [
      {
        label: "Ages 13 to 17",
        id: "Ages13to17",
        text: "Ages 13 to 17",
      },
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Total (age 13 and older)",
        id: "Totalage13andolder",
        text: "Total (age 13 and older)",
      },
    ],
  },
  "IMA-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Meningococcal",
        id: "Meningococcal",
        text: "Meningococcal",
      },
      {
        label: "Tdap",
        id: "Tdap",
        text: "Tdap",
      },
      {
        label: "Human Papillomavirus (HPV)",
        id: "HumanPapillomavirusHPV",
        text: "Human Papillomavirus (HPV)",
      },
      {
        label: "Combination 1 (Meningococcal, Tdap)",
        id: "Combination1MeningococcalTdap",
        text: "Combination 1 (Meningococcal, Tdap)",
      },
      {
        label: "Combination 2 (Meningococcal, Tdap, HPV)",
        id: "Combination2MeningococcalTdapHPV",
        text: "Combination 2 (Meningococcal, Tdap, HPV)",
      },
    ],
  },
  "IU-HH": {
    categories: [
      {
        label: "Inpatient",
        id: "Inpatient",
        text: "Inpatient",
      },
      {
        label: "Maternity",
        id: "Maternity",
        text: "Maternity",
      },
      {
        label: "Mental and Behavioral Disorders",
        id: "MentalandBehavioralDisorders",
        text: "Mental and Behavioral Disorders",
      },
      {
        label: "Surgery",
        id: "Surgery",
        text: "Surgery",
      },
      {
        label: "Medicine",
        id: "Medicine",
        text: "Medicine",
      },
    ],
    qualifiers: [
      {
        label: "Ages 0 to 17",
        id: "Ages0to17",
        text: "Ages 0 to 17",
      },
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Ages unknown",
        id: "Agesunknown",
        text: "Ages unknown",
      },
      {
        label: "Total",
        id: "Total",
        text: "Total",
      },
    ],
  },
  "MSC-AD": {
    categories: [
      {
        label: "Advising Smokers and Tobacco Users to Quit",
        id: "AdvisingSmokersandTobaccoUserstoQuit",
        text: "Advising Smokers and Tobacco Users to Quit",
      },
      {
        label: "Discussing Cessation Medications",
        id: "DiscussingCessationMedications",
        text: "Discussing Cessation Medications",
      },
      {
        label: "Discussing Cessation Strategies",
        id: "DiscussingCessationStrategies",
        text: "Discussing Cessation Strategies",
      },
      {
        label: "Percentage of Current Smokers and Tobacco Users",
        id: "PercentageofCurrentSmokersandTobaccoUsers",
        text: "Percentage of Current Smokers and Tobacco Users",
      },
    ],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "OHD-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "OUD-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Total Rate",
        id: "TotalRate",
        text: "Total Rate",
      },
      {
        label: "Buprenorphine",
        id: "Buprenorphine",
        text: "Buprenorphine",
      },
      {
        label: "Oral naltrexone",
        id: "Oralnaltrexone",
        text: "Oral naltrexone",
      },
      {
        label: "Long-acting, injectable naltrexone",
        id: "Longactinginjectablenaltrexone",
        text: "Long-acting, injectable naltrexone",
      },
      {
        label: "Methadone",
        id: "Methadone",
        text: "Methadone",
      },
    ],
  },
  "OUD-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Total Rate",
        id: "TotalRate",
        text: "Total Rate",
      },
      {
        label: "Buprenorphine",
        id: "Buprenorphine",
        text: "Buprenorphine",
      },
      {
        label: "Oral naltrexone",
        id: "Oralnaltrexone",
        text: "Oral naltrexone",
      },
      {
        label: "Long-acting, injectable naltrexone",
        id: "Longactinginjectablenaltrexone",
        text: "Long-acting, injectable naltrexone",
      },
      {
        label: "Methadone",
        id: "Methadone",
        text: "Methadone",
      },
    ],
  },
  "PC01-AD": {
    categories: [],
    qualifiers: [
      {
        label:
          "Women with elective vaginal deliveries or elective cesarean sections ≥ 37 and <39 weeks",
        id: "Womenwithelectivevaginaldeliveriesorelectivecesareansections37and39weeks",
        text: "Women with elective vaginal deliveries or elective cesarean sections ≥ 37 and <39 weeks",
      },
    ],
  },
  "PCR-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Count of Index Hospital Stays",
        id: "CountofIndexHospitalStays",
        text: "Count of Index Hospital Stays",
      },
      {
        label: "Count of Observed 30-Day Readmissions",
        id: "CountofObserved30DayReadmissions",
        text: "Count of Observed 30-Day Readmissions",
      },
      {
        label: "Observed Readmission Rate",
        id: "ObservedReadmissionRate",
        text: "Observed Readmission Rate",
      },
      {
        label: "Count of Expected 30-Day Readmissions",
        id: "CountofExpected30DayReadmissions",
        text: "Count of Expected 30-Day Readmissions",
      },
      {
        label: "Expected Readmission Rate",
        id: "ExpectedReadmissionRate",
        text: "Expected Readmission Rate",
      },
      {
        label:
          "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
        id: "OERatioCountofObserved30DayReadmissionsCountofExpected30DayReadmissions",
        text: "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
      },
      {
        label: "Count of Beneficiaries in Medicaid Population",
        id: "CountofBeneficiariesinMedicaidPopulation",
        text: "Count of Beneficiaries in Medicaid Population",
      },
      {
        label: "Number of Outliers",
        id: "NumberofOutliers",
        text: "Number of Outliers",
      },
      {
        label:
          "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
        id: "OutlierRateNumberofOutliersCountofBeneficiariesinMedicaidPopulationx1000",
        text: "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
      },
    ],
  },
  "PCR-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Count of Index Hospital Stays",
        id: "CountofIndexHospitalStays",
        text: "Count of Index Hospital Stays",
      },
      {
        label: "Count of Observed 30-Day Readmissions",
        id: "CountofObserved30DayReadmissions",
        text: "Count of Observed 30-Day Readmissions",
      },
      {
        label: "Observed Readmission Rate",
        id: "ObservedReadmissionRate",
        text: "Observed Readmission Rate",
      },
      {
        label: "Count of Expected 30-Day Readmissions",
        id: "CountofExpected30DayReadmissions",
        text: "Count of Expected 30-Day Readmissions",
      },
      {
        label: "Expected Readmission Rate",
        id: "ExpectedReadmissionRate",
        text: "Expected Readmission Rate",
      },
      {
        label:
          "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
        id: "OERatioCountofObserved30DayReadmissionsCountofExpected30DayReadmissions",
        text: "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
      },
      {
        label: "Count of Enrollees in Health Home Population",
        id: "CountofEnrolleesinHealthHomePopulation",
        text: "Count of Enrollees in Health Home Population",
      },
      {
        label: "Number of Outliers",
        id: "NumberofOutliers",
        text: "Number of Outliers",
      },
      {
        label:
          "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
        id: "OutlierRateNumberofOutliersCountofEnrolleesinHealthHomePopulationx1000",
        text: "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
      },
    ],
  },
  "PPC-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Postpartum visit between 7 and 84 days",
        id: "Postpartumvisitbetween7and84days",
        text: "Postpartum visit between 7 and 84 days",
      },
    ],
  },
  "PPC-CH": {
    categories: [],
    qualifiers: [
      {
        label:
          "Prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
        id: "Prenatalcarevisitinthefirsttrimesteronorbeforetheenrollmentstartdateorwithin42daysofenrollmentinMedicaidCHIP",
        text: "Prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
      },
    ],
  },
  "PQI01-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "PQI05-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 40 to 64",
        id: "Ages40to64",
        text: "Ages 40 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "PQI08-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
    ],
  },
  "PQI15-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 39",
        id: "Ages18to39",
        text: "Ages 18 to 39",
      },
    ],
  },
  "PQI92-HH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 18 to 64",
        id: "Ages18to64",
        text: "Ages 18 to 64",
      },
      {
        label: "Age 65 and older",
        id: "Age65andolder",
        text: "Age 65 and older",
      },
      {
        label: "Total (Age 18 and older)",
        id: "TotalAge18andolder",
        text: "Total (Age 18 and older)",
      },
    ],
  },
  "SAA-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Beneficiaries Age 18 and Older",
        id: "BeneficiariesAge18andOlder",
        text: "Beneficiaries Age 18 and Older",
      },
    ],
  },
  "SFM-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Rate 1 - At Least One Sealant",
        id: "Rate1AtLeastOneSealant",
        text: "Rate 1 - At Least One Sealant",
      },
      {
        label: "Rate 2 - All Four Molars Sealed",
        id: "Rate2AllFourMolarsSealed",
        text: "Rate 2 - All Four Molars Sealed",
      },
    ],
  },
  "SSD-AD": {
    categories: [],
    qualifiers: [
      {
        label: "Percentage of Beneficiaries Ages 18 to 64",
        id: "PercentageofBeneficiariesAges18to64",
        text: "Percentage of Beneficiaries Ages 18 to 64",
      },
    ],
  },
  "W30-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Rate 1 - Six or more well-child visits in the first 15 months ",
        id: "Rate1Sixormorewellchildvisitsinthefirst15months",
        text: "Rate 1 - Six or more well-child visits in the first 15 months ",
      },
      {
        label:
          "Rate 2 - Two or more well-child visits for ages 15 months to 30 months",
        id: "Rate2Twoormorewellchildvisitsforages15monthsto30months",
        text: "Rate 2 - Two or more well-child visits for ages 15 months to 30 months",
      },
    ],
  },
  "WCC-CH": {
    categories: [
      {
        label: "Body mass index (BMI) percentile documentation",
        id: "BodymassindexBMIpercentiledocumentation",
        text: "Body mass index (BMI) percentile documentation",
      },
      {
        label: "Counseling for Nutrition",
        id: "CounselingforNutrition",
        text: "Counseling for Nutrition",
      },
      {
        label: "Counseling for Physical Activity",
        id: "CounselingforPhysicalActivity",
        text: "Counseling for Physical Activity",
      },
    ],
    qualifiers: [
      {
        label: "Ages 3 to 11",
        id: "Ages3to11",
        text: "Ages 3 to 11",
      },
      {
        label: "Ages 12 to 17",
        id: "Ages12to17",
        text: "Ages 12 to 17",
      },
      {
        label: "Total (Ages 3 to 17)",
        id: "TotalAges3to17",
        text: "Total (Ages 3 to 17)",
      },
    ],
  },
  "WCV-CH": {
    categories: [],
    qualifiers: [
      {
        label: "Ages 3 to 11",
        id: "Ages3to11",
        text: "Ages 3 to 11",
      },
      {
        label: "Ages 12 to 17",
        id: "Ages12to17",
        text: "Ages 12 to 17",
      },
      {
        label: "Ages 18 to 21",
        id: "Ages18to21",
        text: "Ages 18 to 21",
      },
      {
        label: "Total (Ages 3 to 21)",
        id: "TotalAges3to21",
        text: "Total (Ages 3 to 21)",
      },
    ],
  },
};

type MeasureAbbreviation = keyof typeof rawData;
type RateLabelDataShape = {
  [key in MeasureAbbreviation]: {
    categories: LabelData[];
    qualifiers: LabelData[];
  };
};

export const data: RateLabelDataShape = rawData;

export const getCatQualLabels = (measure: MeasureAbbreviation) => {
  return data[measure];
};
