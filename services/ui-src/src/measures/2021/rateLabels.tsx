import { cleanString } from "utils/cleanString";

const twentyTwentyOneMeasures = [
  "ADD-CH",
  "AIF-HH",
  "AMB-CH",
  "AMB-HH",
  "AMM-AD",
  "AMR-AD",
  "AMR-CH",
  "APM-CH",
  "APP-CH",
  "AUD-CH",
  "BCS-AD",
  "CBP-AD",
  "CBP-HH",
  "CCP-AD",
  "CCP-CH",
  "CCS-AD",
  "CCW-AD",
  "CCW-CH",
  "CDF-AD",
  "CDF-CH",
  "CDF-HH",
  "CHL-AD",
  "CHL-CH",
  "CIS-CH",
  "COB-AD",
  "DEV-CH",
  "FUA-AD",
  "FUA-HH",
  "FUH-AD",
  "FUH-CH",
  "FUH-HH",
  "FUM-AD",
  "FVA-AD",
  "HVL-AD",
  "HPC-AD",
  "HPCMI-AD",
  "IET-AD",
  "IET-HH",
  "IMA-CH",
  "IU-HH",
  "MSC-AD",
  "OHD-AD",
  "OUD-AD",
  "OUD-HH",
  "PC01-AD",
  "PCR-AD",
  "PCR-HH",
  "PPC-AD",
  "PPC-CH",
  "PQI01-AD",
  "PQI05-AD",
  "PQI08-AD",
  "PQI15-AD",
  "PQI92-HH",
  "SAA-AD",
  "SFM-CH",
  "SSD-AD",
  "W30-CH",
  "WCC-CH",
  "WCV-CH",
];

export const createRateLabels = () => {
  let result: any = {};
  twentyTwentyOneMeasures.forEach(async (m) => {
    const qualifiers: any = await import(
      "./" + m.replace("-", "") + "/data"
    ).then((module) => ({ default: module.qualifiers }));
    const categories: any = await import(
      "./" + m.replace("-", "") + "/data"
    ).then((module) => ({ default: module.categories }));

    result[m] = {
      qualifiers: qualifiers.default?.map((q: any) => ({
        id: q,
        label: q,
      })),
      categories: categories.default?.map((c: any) => ({
        id: cleanString(c),
        label: c,
      })),
    };
  });
  console.log({ result });
};

export const rateLabels = {
  "PC01-AD": {
    qualifiers: [
      {
        id: "Women with elective vaginal deliveries or elective cesarean sections ≥ 37 and <39 weeks",
        label:
          "Women with elective vaginal deliveries or elective cesarean sections ≥ 37 and <39 weeks",
      },
    ],
    categories: [],
  },
  "AIF-HH": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Ages 65 to 74",
        label: "Ages 65 to 74",
      },
      {
        id: "Ages 75 to 84",
        label: "Ages 75 to 84",
      },
      {
        id: "Age 85 and older",
        label: "Age 85 and older",
      },
      {
        id: "Total",
        label: "Total",
      },
    ],
    categories: [],
  },
  "IET-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [
      {
        id: "InitiationofAODTreatmentAlcoholAbuseorDependence",
        label: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentAlcoholAbuseorDependence",
        label: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        id: "InitiationofAODTreatmentOpioidAbuseorDependence",
        label: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentOpioidAbuseorDependence",
        label: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        id: "InitiationofAODTreatmentOtherDrugAbuseorDependence",
        label: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentOtherDrugAbuseorDependence",
        label: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        id: "InitiationofAODTreatmentTotalAODAbuseorDependence",
        label: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentTotalAODAbuseorDependence",
        label: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
      },
    ],
  },
  "IET-HH": {
    qualifiers: [
      {
        id: "Ages 13 to 17",
        label: "Ages 13 to 17",
      },
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Total (age 13 and older)",
        label: "Total (age 13 and older)",
      },
    ],
    categories: [
      {
        id: "InitiationofAODTreatmentAlcoholAbuseorDependence",
        label: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentAlcoholAbuseorDependence",
        label: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
      },
      {
        id: "InitiationofAODTreatmentOpioidAbuseorDependence",
        label: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentOpioidAbuseorDependence",
        label: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
      },
      {
        id: "InitiationofAODTreatmentOtherDrugAbuseorDependence",
        label: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentOtherDrugAbuseorDependence",
        label: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
      },
      {
        id: "InitiationofAODTreatmentTotalAODAbuseorDependence",
        label: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
      },
      {
        id: "EngagementofAODTreatmentTotalAODAbuseorDependence",
        label: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
      },
    ],
  },
  "HPC-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Ages 65 to 75",
        label: "Ages 65 to 75",
      },
    ],
    categories: [],
  },
  "AMB-CH": {
    qualifiers: [
      {
        id: "< Age 1",
        label: "< Age 1",
      },
      {
        id: "Ages 1 to 9",
        label: "Ages 1 to 9",
      },
      {
        id: "Ages 10 to 19",
        label: "Ages 10 to 19",
      },
      {
        id: "Ages unknown",
        label: "Ages unknown",
      },
      {
        id: "Total (Ages <1 to 19)",
        label: "Total (Ages <1 to 19)",
      },
    ],
    categories: [],
  },
  "AMB-HH": {
    qualifiers: [
      {
        id: "Ages 0 to 17",
        label: "Ages 0 to 17",
      },
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Ages unknown",
        label: "Ages unknown",
      },
      {
        id: "Total (All Ages)",
        label: "Total (All Ages)",
      },
    ],
    categories: [],
  },
  "AMM-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64 - testing labels",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [
      {
        id: "EffectiveAcutePhaseTreatment",
        label: "Effective Acute Phase Treatment",
      },
      {
        id: "EffectiveContinuationPhaseTreatment",
        label: "Effective Continuation Phase Treatment",
      },
    ],
  },
  "AMR-AD": {
    qualifiers: [
      {
        id: "Ages 19 to 50",
        label: "Ages 19 to 50",
      },
      {
        id: "Ages 51 to 64",
        label: "Ages 51 to 64",
      },
      {
        id: "Total (Ages 19 to 64)",
        label: "Total (Ages 19 to 64)",
      },
    ],
    categories: [],
  },
  "AMR-CH": {
    qualifiers: [
      {
        id: "Ages 5 to 11",
        label: "Ages 5 to 11",
      },
      {
        id: "Ages 12 to 18",
        label: "Ages 12 to 18",
      },
      {
        id: "Total (Ages 5 to 18)",
        label: "Total (Ages 5 to 18)",
      },
    ],
    categories: [],
  },
  "APM-CH": {
    qualifiers: [
      {
        id: "Ages 1 to 11",
        label: "Ages 1 to 11",
      },
      {
        id: "Ages 12 to 17",
        label: "Ages 12 to 17",
      },
      {
        id: "Total (Ages 1 to 17)",
        label: "Total (Ages 1 to 17)",
      },
    ],
    categories: [
      {
        id: "BloodGlucose",
        label: "Blood Glucose",
      },
      {
        id: "Cholesterol",
        label: "Cholesterol",
      },
      {
        id: "BloodGlucoseandCholesterol",
        label: "Blood Glucose and Cholesterol",
      },
    ],
  },
  "APP-CH": {
    qualifiers: [
      {
        id: "Ages 1 to 11",
        label: "Ages 1 to 11",
      },
      {
        id: "Ages 12 to 17",
        label: "Ages 12 to 17",
      },
      {
        id: "Total (Ages 1 to 17)",
        label: "Total (Ages 1 to 17)",
      },
    ],
    categories: [],
  },
  "BCS-AD": {
    qualifiers: [
      {
        id: "Ages 50 to 64",
        label: "Ages 50 to 64",
      },
      {
        id: "Ages 65 to 74",
        label: "Ages 65 to 74",
      },
    ],
    categories: [],
  },
  "AUD-CH": {
    qualifiers: [
      {
        id: "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age",
        label:
          "Percentage of newborns who did not pass hearing screening and have an audiological diagnosis no later than 3 months of age",
      },
    ],
    categories: [],
  },
  "CBP-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Ages 65 to 85",
        label: "Ages 65 to 85",
      },
    ],
    categories: [],
  },
  "CCP-AD": {
    qualifiers: [
      {
        id: "Three Days Postpartum Rate",
        label: "Three Days Postpartum Rate",
      },
      {
        id: "Sixty Days Postpartum Rate",
        label: "Sixty Days Postpartum Rate",
      },
    ],
    categories: [
      {
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        label: "Most effective or moderately effective method of contraception",
      },
      {
        id: "LongactingreversiblemethodofcontraceptionLARC",
        label: "Long-acting reversible method of contraception (LARC)",
      },
    ],
  },
  "CBP-HH": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Ages 65 to 85",
        label: "Ages 65 to 85",
      },
      {
        id: "Total (Ages 18 to 85)",
        label: "Total (Ages 18 to 85)",
      },
    ],
    categories: [],
  },
  "CCP-CH": {
    qualifiers: [
      {
        id: "Three Days Postpartum Rate",
        label: "Three Days Postpartum Rate",
      },
      {
        id: "Sixty Days Postpartum Rate",
        label: "Sixty Days Postpartum Rate",
      },
    ],
    categories: [
      {
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        label: "Most effective or moderately effective method of contraception",
      },
      {
        id: "LongactingreversiblemethodofcontraceptionLARC",
        label: "Long-acting reversible method of contraception (LARC)",
      },
    ],
  },
  "CCS-AD": {
    qualifiers: [
      {
        id: "Percentage of women ages 21 to 64 screened",
        label: "Percentage of women ages 21 to 64 screened",
      },
    ],
    categories: [],
  },
  "CCW-CH": {
    qualifiers: [
      {
        id: "Most effective or moderately effective method of contraception",
        label: "Most effective or moderately effective method of contraception",
      },
      {
        id: "Long-acting reversible method of contraception (LARC)",
        label: "Long-acting reversible method of contraception (LARC)",
      },
    ],
    categories: [],
  },
  "CDF-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "CCW-AD": {
    qualifiers: [
      {
        id: "All Women Ages 21 to 44",
        label: "All Women Ages 21 to 44",
      },
    ],
    categories: [
      {
        id: "Mosteffectiveormoderatelyeffectivemethodofcontraception",
        label: "Most effective or moderately effective method of contraception",
      },
      {
        id: "LongactingreversiblemethodofcontraceptionLARC",
        label: "Long-acting reversible method of contraception (LARC)",
      },
    ],
  },
  "CDF-CH": {
    qualifiers: [
      {
        id: "Ages 12 to 17",
        label: "Ages 12 to 17",
      },
    ],
    categories: [],
  },
  "CDF-HH": {
    qualifiers: [
      {
        id: "Ages 12 to 17",
        label: "Ages 12 to 17",
      },
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Total (Age 12 and older)",
        label: "Total (Age 12 and older)",
      },
    ],
    categories: [],
  },
  "CHL-AD": {
    qualifiers: [
      {
        id: "Ages 21 to 24",
        label: "Ages 21 to 24",
      },
    ],
    categories: [],
  },
  "CHL-CH": {
    qualifiers: [
      {
        id: "Ages 16 to 20",
        label: "Ages 16 to 20",
      },
    ],
    categories: [],
  },
  "CIS-CH": {
    qualifiers: [
      {
        id: "DTaP",
        label: "DTaP",
      },
      {
        id: "IPV",
        label: "IPV",
      },
      {
        id: "MMR",
        label: "MMR",
      },
      {
        id: "HiB",
        label: "HiB",
      },
      {
        id: "Hep B",
        label: "Hep B",
      },
      {
        id: "VZV",
        label: "VZV",
      },
      {
        id: "PCV",
        label: "PCV",
      },
      {
        id: "Hep A",
        label: "Hep A",
      },
      {
        id: "RV",
        label: "RV",
      },
      {
        id: "Flu",
        label: "Flu",
      },
      {
        id: "Combo 2",
        label: "Combo 2",
      },
      {
        id: "Combo 3",
        label: "Combo 3",
      },
      {
        id: "Combo 4",
        label: "Combo 4",
      },
      {
        id: "Combo 5",
        label: "Combo 5",
      },
      {
        id: "Combo 6",
        label: "Combo 6",
      },
      {
        id: "Combo 7",
        label: "Combo 7",
      },
      {
        id: "Combo 8",
        label: "Combo 8",
      },
      {
        id: "Combo 9",
        label: "Combo 9",
      },
      {
        id: "Combo 10",
        label: "Combo 10",
      },
    ],
    categories: [],
  },
  "COB-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "DEV-CH": {
    qualifiers: [
      {
        id: "Children screened by 12 months of age",
        label: "Children screened by 12 months of age",
      },
      {
        id: "Children screened by 24 months of age",
        label: "Children screened by 24 months of age",
      },
      {
        id: "Children screened by 36 months of age",
        label: "Children screened by 36 months of age",
      },
      {
        id: "Children Total",
        label: "Children Total",
      },
    ],
    categories: [],
  },
  "FUA-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [
      {
        id: "Followupwithin30daysofEDvisit",
        label: "Follow-up within 30 days of ED visit",
      },
      {
        id: "Followupwithin7daysofEDvisit",
        label: "Follow-up within 7 days of ED visit",
      },
    ],
  },
  "FUA-HH": {
    qualifiers: [
      {
        id: "Ages 13 to 17",
        label: "Ages 13 to 17",
      },
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Total",
        label: "Total",
      },
    ],
    categories: [
      {
        id: "Followupwithin30daysofEDvisit",
        label: "Follow-up within 30 days of ED visit",
      },
      {
        id: "Followupwithin7daysofEDvisit",
        label: "Follow-up within 7 days of ED visit",
      },
    ],
  },
  "FUH-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [
      {
        id: "FollowUpwithin30daysafterdischarge",
        label: "Follow-Up within 30 days after discharge",
      },
      {
        id: "FollowUpwithin7daysafterdischarge",
        label: "Follow-Up within 7 days after discharge",
      },
    ],
  },
  "FUH-CH": {
    qualifiers: [
      {
        id: "Ages 6 to 17",
        label: "Ages 6 to 17",
      },
    ],
    categories: [
      {
        id: "FollowUpwithin30daysafterdischarge",
        label: "Follow-Up within 30 days after discharge",
      },
      {
        id: "FollowUpwithin7daysafterdischarge",
        label: "Follow-Up within 7 days after discharge",
      },
    ],
  },
  "FUH-HH": {
    qualifiers: [
      {
        id: "Ages 6 to 17",
        label: "Ages 6 to 17",
      },
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Total (Age 6 and older)",
        label: "Total (Age 6 and older)",
      },
    ],
    categories: [
      {
        id: "Followupwithin30daysafterdischarge",
        label: "Follow-up within 30 days after discharge",
      },
      {
        id: "Followupwithin7daysafterdischarge",
        label: "Follow-up within 7 days after discharge",
      },
    ],
  },
  "FVA-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
    ],
    categories: [],
  },
  "HVL-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "FUM-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [
      {
        id: "30dayfollowupafterEDvisitformentalillness",
        label: "30-day follow-up after ED visit for mental illness",
      },
      {
        id: "7dayfollowupafterEDvisitformentalillness",
        label: "7-day follow-up after ED visit for mental illness",
      },
    ],
  },
  "ADD-CH": {
    qualifiers: [
      {
        id: "Initiation Phase",
        label: "Initiation Phase",
      },
      {
        id: "Continuation and Maintenance (C&M) Phase",
        label: "Continuation and Maintenance (C&M) Phase",
      },
    ],
    categories: [],
  },
  "IU-HH": {
    qualifiers: [
      {
        id: "Ages 0 to 17",
        label: "Ages 0 to 17",
      },
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Ages unknown",
        label: "Ages unknown",
      },
      {
        id: "Total",
        label: "Total",
      },
    ],
    categories: [
      {
        id: "Inpatient",
        label: "Inpatient",
      },
      {
        id: "Maternity",
        label: "Maternity",
      },
      {
        id: "MentalandBehavioralDisorders",
        label: "Mental and Behavioral Disorders",
      },
      {
        id: "Surgery",
        label: "Surgery",
      },
      {
        id: "Medicine",
        label: "Medicine",
      },
    ],
  },
  "HPCMI-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Ages 65 to 75",
        label: "Ages 65 to 75",
      },
    ],
    categories: [],
  },
  "MSC-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [
      {
        id: "AdvisingSmokersandTobaccoUserstoQuit",
        label: "Advising Smokers and Tobacco Users to Quit",
      },
      {
        id: "DiscussingCessationMedications",
        label: "Discussing Cessation Medications",
      },
      {
        id: "DiscussingCessationStrategies",
        label: "Discussing Cessation Strategies",
      },
      {
        id: "PercentageofCurrentSmokersandTobaccoUsers",
        label: "Percentage of Current Smokers and Tobacco Users",
      },
    ],
  },
  "OHD-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "IMA-CH": {
    qualifiers: [
      {
        id: "Meningococcal",
        label: "Meningococcal",
      },
      {
        id: "Tdap",
        label: "Tdap",
      },
      {
        id: "Human Papillomavirus (HPV)",
        label: "Human Papillomavirus (HPV)",
      },
      {
        id: "Combination 1 (Meningococcal, Tdap)",
        label: "Combination 1 (Meningococcal, Tdap)",
      },
      {
        id: "Combination 2 (Meningococcal, Tdap, HPV)",
        label: "Combination 2 (Meningococcal, Tdap, HPV)",
      },
    ],
    categories: [],
  },
  "OUD-HH": {
    qualifiers: [
      {
        id: "Total Rate",
        label: "Total Rate",
      },
      {
        id: "Buprenorphine",
        label: "Buprenorphine",
      },
      {
        id: "Oral naltrexone",
        label: "Oral naltrexone",
      },
      {
        id: "Long-acting, injectable naltrexone",
        label: "Long-acting, injectable naltrexone",
      },
      {
        id: "Methadone",
        label: "Methadone",
      },
    ],
    categories: [],
  },
  "PCR-AD": {
    qualifiers: [
      {
        id: "Count of Index Hospital Stays",
        label: "Count of Index Hospital Stays",
      },
      {
        id: "Count of Observed 30-Day Readmissions",
        label: "Count of Observed 30-Day Readmissions",
      },
      {
        id: "Observed Readmission Rate",
        label: "Observed Readmission Rate",
      },
      {
        id: "Count of Expected 30-Day Readmissions",
        label: "Count of Expected 30-Day Readmissions",
      },
      {
        id: "Expected Readmission Rate",
        label: "Expected Readmission Rate",
      },
      {
        id: "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
        label:
          "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
      },
      {
        id: "Count of Beneficiaries in Medicaid Population",
        label: "Count of Beneficiaries in Medicaid Population",
      },
      {
        id: "Number of Outliers",
        label: "Number of Outliers",
      },
      {
        id: "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
        label:
          "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
      },
    ],
    categories: [],
  },
  "OUD-AD": {
    qualifiers: [
      {
        id: "Total Rate",
        label: "Total Rate",
      },
      {
        id: "Buprenorphine",
        label: "Buprenorphine",
      },
      {
        id: "Oral naltrexone",
        label: "Oral naltrexone",
      },
      {
        id: "Long-acting, injectable naltrexone",
        label: "Long-acting, injectable naltrexone",
      },
      {
        id: "Methadone",
        label: "Methadone",
      },
    ],
    categories: [],
  },
  "PCR-HH": {
    qualifiers: [
      {
        id: "Count of Index Hospital Stays",
        label: "Count of Index Hospital Stays",
      },
      {
        id: "Count of Observed 30-Day Readmissions",
        label: "Count of Observed 30-Day Readmissions",
      },
      {
        id: "Observed Readmission Rate",
        label: "Observed Readmission Rate",
      },
      {
        id: "Count of Expected 30-Day Readmissions",
        label: "Count of Expected 30-Day Readmissions",
      },
      {
        id: "Expected Readmission Rate",
        label: "Expected Readmission Rate",
      },
      {
        id: "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
        label:
          "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
      },
      {
        id: "Count of Enrollees in Health Home Population",
        label: "Count of Enrollees in Health Home Population",
      },
      {
        id: "Number of Outliers",
        label: "Number of Outliers",
      },
      {
        id: "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
        label:
          "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
      },
    ],
    categories: [],
  },
  "PPC-AD": {
    qualifiers: [
      {
        id: "Postpartum visit between 7 and 84 days",
        label: "Postpartum visit between 7 and 84 days",
      },
    ],
    categories: [],
  },
  "PPC-CH": {
    qualifiers: [
      {
        id: "Prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
        label:
          "Prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
      },
    ],
    categories: [],
  },
  "PQI01-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "PQI15-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 39",
        label: "Ages 18 to 39",
      },
    ],
    categories: [],
  },
  "PQI05-AD": {
    qualifiers: [
      {
        id: "Ages 40 to 64",
        label: "Ages 40 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "PQI92-HH": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
      {
        id: "Total (Age 18 and older)",
        label: "Total (Age 18 and older)",
      },
    ],
    categories: [],
  },
  "PQI08-AD": {
    qualifiers: [
      {
        id: "Ages 18 to 64",
        label: "Ages 18 to 64",
      },
      {
        id: "Age 65 and older",
        label: "Age 65 and older",
      },
    ],
    categories: [],
  },
  "SAA-AD": {
    qualifiers: [
      {
        id: "Beneficiaries Age 18 and Older",
        label: "Beneficiaries Age 18 and Older",
      },
    ],
    categories: [],
  },
  "SFM-CH": {
    qualifiers: [
      {
        id: "Rate 1 - At Least One Sealant",
        label: "Rate 1 - At Least One Sealant",
      },
      {
        id: "Rate 2 - All Four Molars Sealed",
        label: "Rate 2 - All Four Molars Sealed",
      },
    ],
    categories: [],
  },
  "W30-CH": {
    qualifiers: [
      {
        id: "Rate 1 - Six or more well-child visits in the first 15 months ",
        label: "Rate 1 - Six or more well-child visits in the first 15 months ",
      },
      {
        id: "Rate 2 - Two or more well-child visits for ages 15 months to 30 months",
        label:
          "Rate 2 - Two or more well-child visits for ages 15 months to 30 months",
      },
    ],
    categories: [],
  },
  "SSD-AD": {
    qualifiers: [
      {
        id: "Percentage of Beneficiaries Ages 18 to 64",
        label: "Percentage of Beneficiaries Ages 18 to 64",
      },
    ],
    categories: [],
  },
  "WCC-CH": {
    qualifiers: [
      {
        id: "Ages 3 to 11",
        label: "Ages 3 to 11",
      },
      {
        id: "Ages 12 to 17",
        label: "Ages 12 to 17",
      },
      {
        id: "Total (Ages 3 to 17)",
        label: "Total (Ages 3 to 17)",
      },
    ],
    categories: [
      {
        id: "BodymassindexBMIpercentiledocumentation",
        label: "Body mass index (BMI) percentile documentation",
      },
      {
        id: "CounselingforNutrition",
        label: "Counseling for Nutrition",
      },
      {
        id: "CounselingforPhysicalActivity",
        label: "Counseling for Physical Activity",
      },
    ],
  },
  "WCV-CH": {
    qualifiers: [
      {
        id: "Ages 3 to 11",
        label: "Ages 3 to 11",
      },
      {
        id: "Ages 12 to 17",
        label: "Ages 12 to 17",
      },
      {
        id: "Ages 18 to 21",
        label: "Ages 18 to 21",
      },
      {
        id: "Total (Ages 3 to 21)",
        label: "Total (Ages 3 to 21)",
      },
    ],
    categories: [],
  },
};

export const getCategoriesFromRateLabels = (
  measureId: keyof typeof rateLabels
) => {
  const { categories } = rateLabels[measureId];
  if (categories.length === 0) return [];
  return categories.map((c) => c.label);
};

export const getQualifiersFromRateLabels = (
  measureId: keyof typeof rateLabels
) => {
  const { qualifiers } = rateLabels[measureId];
  return qualifiers.map((q) => q.label);
};

export const getRateIdFromLabel = (
  label: string,
  measureId: keyof typeof rateLabels
) => {
  const measureOptions = [
    ...rateLabels[measureId].qualifiers,
    ...rateLabels[measureId].categories,
  ];
  return measureOptions.find((option) => option.label === label)?.id;
};
