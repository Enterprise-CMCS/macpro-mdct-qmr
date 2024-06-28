/**
 * Attention
 * Changing the labels or id's will change how the measure data is shaped and should not be done unless that is the desired result.
 * Changing the text property of these objects will change the text that is displayed to the user.
 */

import { LabelData, cleanString } from "utils";

export const data = {
    "AAB-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and Older",
                "text": "Age 65 and Older",
                "id": "Age65andOlder"
            }
        ],
        "categories": []
    },
    "ADD-CH": {
        "qualifiers": [
            {
                "label": "Initiation Phase",
                "text": "Initiation Phase",
                "id": "InitiationPhase"
            },
            {
                "label": "Continuation and Maintenance (C&M) Phase",
                "text": "Continuation and Maintenance (C&M) Phase",
                "id": "ContinuationandMaintenanceCMPhase"
            }
        ],
        "categories": []
    },
    "AIF-HH": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Ages 65 to 74",
                "text": "Ages 65 to 74",
                "id": "Ages65to74"
            },
            {
                "label": "Ages 75 to 84",
                "text": "Ages 75 to 84",
                "id": "Ages75to84"
            },
            {
                "label": "Age 85 and older",
                "text": "Age 85 and older",
                "id": "Age85andolder"
            },
            {
                "label": "Total",
                "text": "Total",
                "id": "Total"
            }
        ],
        "categories": []
    },
    "AMB-CH": {
        "qualifiers": [
            {
                "label": "< Age 1",
                "text": "< Age 1",
                "id": "Age1"
            },
            {
                "label": "Ages 1 to 9",
                "text": "Ages 1 to 9",
                "id": "Ages1to9"
            },
            {
                "label": "Ages 10 to 19",
                "text": "Ages 10 to 19",
                "id": "Ages10to19"
            },
            {
                "label": "Ages unknown",
                "text": "Ages unknown",
                "id": "Agesunknown"
            },
            {
                "label": "Total (Ages <1 to 19)",
                "text": "Total (Ages <1 to 19)",
                "id": "TotalAges1to19"
            }
        ],
        "categories": []
    },
    "AMB-HH": {
        "qualifiers": [
            {
                "label": "Ages 0 to 17",
                "text": "Ages 0 to 17",
                "id": "Ages0to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Ages unknown",
                "text": "Ages unknown",
                "id": "Agesunknown"
            },
            {
                "label": "Total (All Ages)",
                "text": "Total (All Ages)",
                "id": "TotalAllAges"
            }
        ],
        "categories": []
    },
    "AMM-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": [
            {
                "label": "Effective Acute Phase Treatment",
                "text": "Effective Acute Phase Treatment",
                "id": "EffectiveAcutePhaseTreatment"
            },
            {
                "label": "Effective Continuation Phase Treatment",
                "text": "Effective Continuation Phase Treatment",
                "id": "EffectiveContinuationPhaseTreatment"
            }
        ]
    },
    "AMR-AD": {
        "qualifiers": [
            {
                "label": "Ages 19 to 50",
                "text": "Ages 19 to 50",
                "id": "Ages19to50"
            },
            {
                "label": "Ages 51 to 64",
                "text": "Ages 51 to 64",
                "id": "Ages51to64"
            },
            {
                "label": "Total (Ages 19 to 64)",
                "text": "Total (Ages 19 to 64)",
                "id": "TotalAges19to64"
            }
        ],
        "categories": []
    },
    "AMR-CH": {
        "qualifiers": [
            {
                "label": "Ages 5 to 11",
                "text": "Ages 5 to 11",
                "id": "Ages5to11"
            },
            {
                "label": "Ages 12 to 18",
                "text": "Ages 12 to 18",
                "id": "Ages12to18"
            },
            {
                "label": "Total (Ages 5 to 18)",
                "text": "Total (Ages 5 to 18)",
                "id": "TotalAges5to18"
            }
        ],
        "categories": []
    },
    "APM-CH": {
        "qualifiers": [
            {
                "label": "Ages 1 to 11",
                "text": "Ages 1 to 11",
                "id": "Ages1to11"
            },
            {
                "label": "Ages 12 to 17",
                "text": "Ages 12 to 17",
                "id": "Ages12to17"
            },
            {
                "label": "Total (Ages 1 to 17)",
                "text": "Total (Ages 1 to 17)",
                "id": "TotalAges1to17"
            }
        ],
        "categories": [
            {
                "label": "Blood Glucose",
                "text": "Blood Glucose",
                "id": "BloodGlucose"
            },
            {
                "label": "Cholesterol",
                "text": "Cholesterol",
                "id": "Cholesterol"
            },
            {
                "label": "Blood Glucose and Cholesterol",
                "text": "Blood Glucose and Cholesterol",
                "id": "BloodGlucoseandCholesterol"
            }
        ]
    },
    "APP-CH": {
        "qualifiers": [
            {
                "label": "Ages 1 to 11",
                "text": "Ages 1 to 11",
                "id": "Ages1to11"
            },
            {
                "label": "Ages 12 to 17",
                "text": "Ages 12 to 17",
                "id": "Ages12to17"
            },
            {
                "label": "Total (Ages 1 to 17)",
                "text": "Total (Ages 1 to 17)",
                "id": "TotalAges1to17"
            }
        ],
        "categories": []
    },
    "BCS-AD": {
        "qualifiers": [
            {
                "label": "Ages 50 to 64",
                "text": "Ages 50 to 64",
                "id": "Ages50to64"
            },
            {
                "label": "Ages 65 to 74",
                "text": "Ages 65 to 74",
                "id": "Ages65to74"
            }
        ],
        "categories": []
    },
    "CBP-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Ages 65 to 85",
                "text": "Ages 65 to 85",
                "id": "Ages65to85"
            }
        ],
        "categories": []
    },
    "CBP-HH": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Ages 65 to 85",
                "text": "Ages 65 to 85",
                "id": "Ages65to85"
            },
            {
                "label": "Total (Ages 18 to 85)",
                "text": "Total (Ages 18 to 85)",
                "id": "TotalAges18to85"
            }
        ],
        "categories": []
    },
    "CCP-AD": {
        "qualifiers": [
            {
                "label": "Three Days Postpartum Rate",
                "text": "Three Days Postpartum Rate",
                "id": "ThreeDaysPostpartumRate"
            },
            {
                "label": "Sixty Days Postpartum Rate",
                "text": "Sixty Days Postpartum Rate",
                "id": "SixtyDaysPostpartumRate"
            }
        ],
        "categories": [
            {
                "label": "Most effective or moderately effective method of contraception",
                "text": "Most effective or moderately effective method of contraception",
                "id": "Mosteffectiveormoderatelyeffectivemethodofcontraception"
            },
            {
                "label": "Long-acting reversible method of contraception (LARC)",
                "text": "Long-acting reversible method of contraception (LARC)",
                "id": "LongactingreversiblemethodofcontraceptionLARC"
            }
        ]
    },
    "CCP-CH": {
        "qualifiers": [
            {
                "label": "Three Days Postpartum Rate",
                "text": "Three Days Postpartum Rate",
                "id": "ThreeDaysPostpartumRate"
            },
            {
                "label": "Sixty Days Postpartum Rate",
                "text": "Sixty Days Postpartum Rate",
                "id": "SixtyDaysPostpartumRate"
            }
        ],
        "categories": [
            {
                "label": "Most effective or moderately effective method of contraception",
                "text": "Most effective or moderately effective method of contraception",
                "id": "Mosteffectiveormoderatelyeffectivemethodofcontraception"
            },
            {
                "label": "Long-acting reversible method of contraception (LARC)",
                "text": "Long-acting reversible method of contraception (LARC)",
                "id": "LongactingreversiblemethodofcontraceptionLARC"
            }
        ]
    },
    "CCS-AD": {
        "qualifiers": [
            {
                "label": "Percentage of women ages 21 to 64 screened",
                "text": "Percentage of women ages 21 to 64 screened",
                "id": "Percentageofwomenages21to64screened"
            }
        ],
        "categories": []
    },
    "CCW-AD": {
        "qualifiers": [
            {
                "label": "All Women Ages 21 to 44",
                "text": "All Women Ages 21 to 44",
                "id": "AllWomenAges21to44"
            }
        ],
        "categories": [
            {
                "label": "Most effective or moderately effective method of contraception",
                "text": "Most effective or moderately effective method of contraception",
                "id": "Mosteffectiveormoderatelyeffectivemethodofcontraception"
            },
            {
                "label": "Long-acting reversible method of contraception (LARC)",
                "text": "Long-acting reversible method of contraception (LARC)",
                "id": "LongactingreversiblemethodofcontraceptionLARC"
            }
        ]
    },
    "CCW-CH": {
        "qualifiers": [
            {
                "label": "Most effective or moderately effective method of contraception",
                "text": "Most effective or moderately effective method of contraception",
                "id": "Mosteffectiveormoderatelyeffectivemethodofcontraception"
            },
            {
                "label": "Long-acting reversible method of contraception (LARC)",
                "text": "Long-acting reversible method of contraception (LARC)",
                "id": "LongactingreversiblemethodofcontraceptionLARC"
            }
        ],
        "categories": []
    },
    "CDF-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "CDF-CH": {
        "qualifiers": [
            {
                "label": "Ages 12 to 17",
                "text": "Ages 12 to 17",
                "id": "Ages12to17"
            }
        ],
        "categories": []
    },
    "CDF-HH": {
        "qualifiers": [
            {
                "label": "Ages 12 to 17",
                "text": "Ages 12 to 17",
                "id": "Ages12to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Total (Age 12 and older)",
                "text": "Total (Age 12 and older)",
                "id": "TotalAge12andolder"
            }
        ],
        "categories": []
    },
    "CHL-AD": {
        "qualifiers": [
            {
                "label": "Ages 21 to 24",
                "text": "Ages 21 to 24",
                "id": "Ages21to24"
            }
        ],
        "categories": []
    },
    "CHL-CH": {
        "qualifiers": [
            {
                "label": "Ages 16 to 20",
                "text": "Ages 16 to 20",
                "id": "Ages16to20"
            }
        ],
        "categories": []
    },
    "CIS-CH": {
        "qualifiers": [
            {
                "label": "DTaP",
                "text": "DTaP",
                "id": "DTaP"
            },
            {
                "label": "IPV",
                "text": "IPV",
                "id": "IPV"
            },
            {
                "label": "MMR",
                "text": "MMR",
                "id": "MMR"
            },
            {
                "label": "HiB",
                "text": "HiB",
                "id": "HiB"
            },
            {
                "label": "Hep B",
                "text": "Hep B",
                "id": "HepB"
            },
            {
                "label": "VZV",
                "text": "VZV",
                "id": "VZV"
            },
            {
                "label": "PCV",
                "text": "PCV",
                "id": "PCV"
            },
            {
                "label": "Hep A",
                "text": "Hep A",
                "id": "HepA"
            },
            {
                "label": "RV",
                "text": "RV",
                "id": "RV"
            },
            {
                "label": "Flu",
                "text": "Flu",
                "id": "Flu"
            },
            {
                "label": "Combo 3",
                "text": "Combo 3",
                "id": "Combo3"
            },
            {
                "label": "Combo 7",
                "text": "Combo 7",
                "id": "Combo7"
            },
            {
                "label": "Combo 10",
                "text": "Combo 10",
                "id": "Combo10"
            }
        ],
        "categories": []
    },
    "COB-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "COL-AD": {
        "qualifiers": [
            {
                "label": "Ages 50 to 64",
                "text": "Ages 50 to 64",
                "id": "Ages50to64"
            },
            {
                "label": "Ages 65 to 75",
                "text": "Ages 65 to 75",
                "id": "Ages65to75"
            }
        ],
        "categories": []
    },
    "COL-HH": {
        "qualifiers": [
            {
                "label": "Ages 50 to 64",
                "text": "Ages 50 to 64",
                "id": "Ages50to64"
            },
            {
                "label": "Ages 65 to 75",
                "text": "Ages 65 to 75",
                "id": "Ages65to75"
            }
        ],
        "categories": []
    },
    "DEV-CH": {
        "qualifiers": [
            {
                "label": "Children screened by 12 months of age",
                "text": "Children screened by 12 months of age",
                "id": "Childrenscreenedby12monthsofage"
            },
            {
                "label": "Children screened by 24 months of age",
                "text": "Children screened by 24 months of age",
                "id": "Childrenscreenedby24monthsofage"
            },
            {
                "label": "Children screened by 36 months of age",
                "text": "Children screened by 36 months of age",
                "id": "Childrenscreenedby36monthsofage"
            },
            {
                "label": "Children Total",
                "text": "Children Total",
                "id": "ChildrenTotal"
            }
        ],
        "categories": []
    },
    "FUA-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": [
            {
                "label": "Follow-up within 30 days of ED visit",
                "text": "Follow-up within 30 days of ED visit",
                "id": "Followupwithin30daysofEDvisit"
            },
            {
                "label": "Follow-up within 7 days of ED visit",
                "text": "Follow-up within 7 days of ED visit",
                "id": "Followupwithin7daysofEDvisit"
            }
        ]
    },
    "FUA-CH": {
        "qualifiers": [
            {
                "label": "Ages 13 to 17",
                "text": "Ages 13 to 17",
                "id": "Ages13to17"
            }
        ],
        "categories": [
            {
                "label": "Follow-up within 30 days of ED visit",
                "text": "Follow-up within 30 days of ED visit",
                "id": "Followupwithin30daysofEDvisit"
            },
            {
                "label": "Follow-up within 7 days of ED visit",
                "text": "Follow-up within 7 days of ED visit",
                "id": "Followupwithin7daysofEDvisit"
            }
        ]
    },
    "FUA-HH": {
        "qualifiers": [
            {
                "label": "Ages 13 to 17",
                "text": "Ages 13 to 17",
                "id": "Ages13to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Total (Age 13 and older)",
                "text": "Total (Age 13 and older)",
                "id": "Total"
            }
        ],
        "categories": [
            {
                "label": "Follow-up within 30 days of ED visit",
                "text": "Follow-up within 30 days of ED visit",
                "id": "Followupwithin30daysofEDvisit"
            },
            {
                "label": "Follow-up within 7 days of ED visit",
                "text": "Follow-up within 7 days of ED visit",
                "id": "Followupwithin7daysofEDvisit"
            }
        ]
    },
    "FUH-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": [
            {
                "label": "Follow-Up within 30 days after discharge",
                "text": "Follow-Up within 30 days after discharge",
                "id": "FollowUpwithin30daysafterdischarge"
            },
            {
                "label": "Follow-Up within 7 days after discharge",
                "text": "Follow-Up within 7 days after discharge",
                "id": "FollowUpwithin7daysafterdischarge"
            }
        ]
    },
    "FUH-CH": {
        "qualifiers": [
            {
                "label": "Ages 6 to 17",
                "text": "Ages 6 to 17",
                "id": "Ages6to17"
            }
        ],
        "categories": [
            {
                "label": "Follow-Up within 30 days after discharge",
                "text": "Follow-Up within 30 days after discharge",
                "id": "FollowUpwithin30daysafterdischarge"
            },
            {
                "label": "Follow-Up within 7 days after discharge",
                "text": "Follow-Up within 7 days after discharge",
                "id": "FollowUpwithin7daysafterdischarge"
            }
        ]
    },
    "FUH-HH": {
        "qualifiers": [
            {
                "label": "Ages 6 to 17",
                "text": "Ages 6 to 17",
                "id": "Ages6to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Total (Age 6 and older)",
                "text": "Total (Age 6 and older)",
                "id": "TotalAge6andolder"
            }
        ],
        "categories": [
            {
                "label": "Follow-up within 30 days after discharge",
                "text": "Follow-up within 30 days after discharge",
                "id": "Followupwithin30daysafterdischarge"
            },
            {
                "label": "Follow-up within 7 days after discharge",
                "text": "Follow-up within 7 days after discharge",
                "id": "Followupwithin7daysafterdischarge"
            }
        ]
    },
    "FUM-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": [
            {
                "label": "30-day follow-up after ED visit for mental illness",
                "text": "30-day follow-up after ED visit for mental illness",
                "id": "30dayfollowupafterEDvisitformentalillness"
            },
            {
                "label": "7-day follow-up after ED visit for mental illness",
                "text": "7-day follow-up after ED visit for mental illness",
                "id": "7dayfollowupafterEDvisitformentalillness"
            }
        ]
    },
    "FUM-CH": {
        "qualifiers": [
            {
                "label": "Ages 6 to 17",
                "text": "Ages 6 to 17",
                "id": "Ages6to17"
            }
        ],
        "categories": [
            {
                "label": "30-day follow-up after ED visit for mental illness",
                "text": "30-day follow-up after ED visit for mental illness",
                "id": "30dayfollowupafterEDvisitformentalillness"
            },
            {
                "label": "7-day follow-up after ED visit for mental illness",
                "text": "7-day follow-up after ED visit for mental illness",
                "id": "7dayfollowupafterEDvisitformentalillness"
            }
        ]
    },
    "FUM-HH": {
        "qualifiers": [
            {
                "label": "Ages 6 to 17",
                "text": "Ages 6 to 17",
                "id": "Ages6to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Total (Age 6 and older)",
                "text": "Total (Age 6 and older)",
                "id": "TotalAge6andolder"
            }
        ],
        "categories": [
            {
                "label": "30-day follow-up after ED visit for mental illness",
                "text": "30-day follow-up after ED visit for mental illness",
                "id": "30dayfollowupafterEDvisitformentalillness"
            },
            {
                "label": "7-day follow-up after ED visit for mental illness",
                "text": "7-day follow-up after ED visit for mental illness",
                "id": "7dayfollowupafterEDvisitformentalillness"
            }
        ]
    },
    "FVA-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            }
        ],
        "categories": []
    },
    "HPC-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Ages 65 to 75",
                "text": "Ages 65 to 75",
                "id": "Ages65to75"
            }
        ],
        "categories": []
    },
    "HPCMI-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Ages 65 to 75",
                "text": "Ages 65 to 75",
                "id": "Ages65to75"
            }
        ],
        "categories": []
    },
    "HVL-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "IET-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": [
            {
                "label": "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                "id": "InitiationofAODTreatmentAlcoholAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                "id": "EngagementofAODTreatmentAlcoholAbuseorDependence"
            },
            {
                "label": "Initiation of AOD Treatment: Opioid Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Opioid Abuse or Dependence",
                "id": "InitiationofAODTreatmentOpioidAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Opioid Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Opioid Abuse or Dependence",
                "id": "EngagementofAODTreatmentOpioidAbuseorDependence"
            },
            {
                "label": "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
                "id": "InitiationofAODTreatmentOtherDrugAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
                "id": "EngagementofAODTreatmentOtherDrugAbuseorDependence"
            },
            {
                "label": "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
                "id": "InitiationofAODTreatmentTotalAODAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
                "id": "EngagementofAODTreatmentTotalAODAbuseorDependence"
            }
        ]
    },
    "IET-HH": {
        "qualifiers": [
            {
                "label": "Ages 13 to 17",
                "text": "Ages 13 to 17",
                "id": "Ages13to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Total (age 13 and older)",
                "text": "Total (age 13 and older)",
                "id": "Totalage13andolder"
            }
        ],
        "categories": [
            {
                "label": "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
                "id": "InitiationofAODTreatmentAlcoholAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
                "id": "EngagementofAODTreatmentAlcoholAbuseorDependence"
            },
            {
                "label": "Initiation of AOD Treatment: Opioid Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Opioid Abuse or Dependence",
                "id": "InitiationofAODTreatmentOpioidAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Opioid Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Opioid Abuse or Dependence",
                "id": "EngagementofAODTreatmentOpioidAbuseorDependence"
            },
            {
                "label": "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
                "id": "InitiationofAODTreatmentOtherDrugAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
                "id": "EngagementofAODTreatmentOtherDrugAbuseorDependence"
            },
            {
                "label": "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
                "text": "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
                "id": "InitiationofAODTreatmentTotalAODAbuseorDependence"
            },
            {
                "label": "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
                "text": "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
                "id": "EngagementofAODTreatmentTotalAODAbuseorDependence"
            }
        ]
    },
    "IMA-CH": {
        "qualifiers": [
            {
                "label": "Meningococcal",
                "text": "Meningococcal",
                "id": "Meningococcal"
            },
            {
                "label": "Tdap",
                "text": "Tdap",
                "id": "Tdap"
            },
            {
                "label": "Human Papillomavirus (HPV)",
                "text": "Human Papillomavirus (HPV)",
                "id": "HumanPapillomavirusHPV"
            },
            {
                "label": "Combination 1 (Meningococcal, Tdap)",
                "text": "Combination 1 (Meningococcal, Tdap)",
                "id": "Combination1MeningococcalTdap"
            },
            {
                "label": "Combination 2 (Meningococcal, Tdap, HPV)",
                "text": "Combination 2 (Meningococcal, Tdap, HPV)",
                "id": "Combination2MeningococcalTdapHPV"
            }
        ],
        "categories": []
    },
    "IU-HH": {
        "qualifiers": [
            {
                "label": "Ages 0 to 17",
                "text": "Ages 0 to 17",
                "id": "Ages0to17"
            },
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Ages unknown",
                "text": "Ages unknown",
                "id": "Agesunknown"
            },
            {
                "label": "Total",
                "text": "Total",
                "id": "Total"
            }
        ],
        "categories": [
            {
                "label": "Inpatient",
                "text": "Inpatient",
                "id": "Inpatient"
            },
            {
                "label": "Maternity",
                "text": "Maternity",
                "id": "Maternity"
            },
            {
                "label": "Mental and Behavioral Disorders",
                "text": "Mental and Behavioral Disorders",
                "id": "MentalandBehavioralDisorders"
            },
            {
                "label": "Surgery",
                "text": "Surgery",
                "id": "Surgery"
            },
            {
                "label": "Medicine",
                "text": "Medicine",
                "id": "Medicine"
            }
        ]
    },
    "MSC-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": [
            {
                "label": "Advising Smokers and Tobacco Users to Quit",
                "text": "Advising Smokers and Tobacco Users to Quit",
                "id": "AdvisingSmokersandTobaccoUserstoQuit"
            },
            {
                "label": "Discussing Cessation Medications",
                "text": "Discussing Cessation Medications",
                "id": "DiscussingCessationMedications"
            },
            {
                "label": "Discussing Cessation Strategies",
                "text": "Discussing Cessation Strategies",
                "id": "DiscussingCessationStrategies"
            },
            {
                "label": "Percentage of Current Smokers and Tobacco Users",
                "text": "Percentage of Current Smokers and Tobacco Users",
                "id": "PercentageofCurrentSmokersandTobaccoUsers"
            }
        ]
    },
    "OEV-CH": {
        "qualifiers": [
            {
                "label": "Age <1",
                "text": "Age <1",
                "id": "Age1"
            },
            {
                "label": "Ages 1 to 2",
                "text": "Ages 1 to 2",
                "id": "Ages1to2"
            },
            {
                "label": "Ages 3 to 5",
                "text": "Ages 3 to 5",
                "id": "Ages3to5"
            },
            {
                "label": "Ages 6 to 7",
                "text": "Ages 6 to 7",
                "id": "Ages6to7"
            },
            {
                "label": "Ages 8 to 9",
                "text": "Ages 8 to 9",
                "id": "Ages8to9"
            },
            {
                "label": "Ages 10 to 11",
                "text": "Ages 10 to 11",
                "id": "Ages10to11"
            },
            {
                "label": "Ages 12 to 14",
                "text": "Ages 12 to 14",
                "id": "Ages12to14"
            },
            {
                "label": "Ages 15 to 18",
                "text": "Ages 15 to 18",
                "id": "Ages15to18"
            },
            {
                "label": "Ages 19 to 20",
                "text": "Ages 19 to 20",
                "id": "Ages19to20"
            },
            {
                "label": "Total ages <1 to 20",
                "text": "Total ages <1 to 20",
                "id": "Totalages1to20"
            }
        ],
        "categories": []
    },
    "OHD-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "OUD-AD": {
        "qualifiers": [
            {
                "label": "Total Rate",
                "text": "Total Rate",
                "id": "TotalRate"
            },
            {
                "label": "Buprenorphine",
                "text": "Buprenorphine",
                "id": "Buprenorphine"
            },
            {
                "label": "Oral naltrexone",
                "text": "Oral naltrexone",
                "id": "Oralnaltrexone"
            },
            {
                "label": "Long-acting, injectable naltrexone",
                "text": "Long-acting, injectable naltrexone",
                "id": "Longactinginjectablenaltrexone"
            },
            {
                "label": "Methadone",
                "text": "Methadone",
                "id": "Methadone"
            }
        ],
        "categories": []
    },
    "OUD-HH": {
        "qualifiers": [
            {
                "label": "Total Rate",
                "text": "Total Rate",
                "id": "TotalRate"
            },
            {
                "label": "Buprenorphine",
                "text": "Buprenorphine",
                "id": "Buprenorphine"
            },
            {
                "label": "Oral naltrexone",
                "text": "Oral naltrexone",
                "id": "Oralnaltrexone"
            },
            {
                "label": "Long-acting, injectable naltrexone",
                "text": "Long-acting, injectable naltrexone",
                "id": "Longactinginjectablenaltrexone"
            },
            {
                "label": "Methadone",
                "text": "Methadone",
                "id": "Methadone"
            }
        ],
        "categories": []
    },
    "PCR-AD": {
        "qualifiers": [
            {
                "label": "Count of Index Hospital Stays",
                "text": "Count of Index Hospital Stays",
                "id": "CountofIndexHospitalStays"
            },
            {
                "label": "Count of Observed 30-Day Readmissions",
                "text": "Count of Observed 30-Day Readmissions",
                "id": "CountofObserved30DayReadmissions"
            },
            {
                "label": "Observed Readmission Rate",
                "text": "Observed Readmission Rate",
                "id": "ObservedReadmissionRate"
            },
            {
                "label": "Count of Expected 30-Day Readmissions",
                "text": "Count of Expected 30-Day Readmissions",
                "id": "CountofExpected30DayReadmissions"
            },
            {
                "label": "Expected Readmission Rate",
                "text": "Expected Readmission Rate",
                "id": "ExpectedReadmissionRate"
            },
            {
                "label": "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
                "text": "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
                "id": "OERatioCountofObserved30DayReadmissionsCountofExpected30DayReadmissions"
            },
            {
                "label": "Count of Beneficiaries in Medicaid Population",
                "text": "Count of Beneficiaries in Medicaid Population",
                "id": "CountofBeneficiariesinMedicaidPopulation"
            },
            {
                "label": "Number of Outliers",
                "text": "Number of Outliers",
                "id": "NumberofOutliers"
            },
            {
                "label": "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
                "text": "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
                "id": "OutlierRateNumberofOutliersCountofBeneficiariesinMedicaidPopulationx1000"
            }
        ],
        "categories": []
    },
    "PCR-HH": {
        "qualifiers": [
            {
                "label": "Count of Index Hospital Stays",
                "text": "Count of Index Hospital Stays",
                "id": "CountofIndexHospitalStays"
            },
            {
                "label": "Count of Observed 30-Day Readmissions",
                "text": "Count of Observed 30-Day Readmissions",
                "id": "CountofObserved30DayReadmissions"
            },
            {
                "label": "Observed Readmission Rate",
                "text": "Observed Readmission Rate",
                "id": "ObservedReadmissionRate"
            },
            {
                "label": "Count of Expected 30-Day Readmissions",
                "text": "Count of Expected 30-Day Readmissions",
                "id": "CountofExpected30DayReadmissions"
            },
            {
                "label": "Expected Readmission Rate",
                "text": "Expected Readmission Rate",
                "id": "ExpectedReadmissionRate"
            },
            {
                "label": "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
                "text": "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
                "id": "OERatioCountofObserved30DayReadmissionsCountofExpected30DayReadmissions"
            },
            {
                "label": "Count of Enrollees in Health Home Population",
                "text": "Count of Enrollees in Health Home Population",
                "id": "CountofEnrolleesinHealthHomePopulation"
            },
            {
                "label": "Number of Outliers",
                "text": "Number of Outliers",
                "id": "NumberofOutliers"
            },
            {
                "label": "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
                "text": "Outlier Rate (Number of Outliers/Count of Enrollees in Health Home Population) x 1,000",
                "id": "OutlierRateNumberofOutliersCountofEnrolleesinHealthHomePopulationx1000"
            }
        ],
        "categories": []
    },
    "PPC-AD": {
        "qualifiers": [
            {
                "label": "Postpartum visit between 7 and 84 days",
                "text": "Postpartum visit between 7 and 84 days",
                "id": "Postpartumvisitbetween7and84days"
            }
        ],
        "categories": []
    },
    "PPC-CH": {
        "qualifiers": [
            {
                "label": "Prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
                "text": "Prenatal care visit in the first trimester on or before the enrollment start date or within 42 days of enrollment in Medicaid/CHIP.",
                "id": "Prenatalcarevisitinthefirsttrimesteronorbeforetheenrollmentstartdateorwithin42daysofenrollmentinMedicaidCHIP"
            }
        ],
        "categories": []
    },
    "PQI01-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "PQI05-AD": {
        "qualifiers": [
            {
                "label": "Ages 40 to 64",
                "text": "Ages 40 to 64",
                "id": "Ages40to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "PQI08-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            }
        ],
        "categories": []
    },
    "PQI15-AD": {
        "qualifiers": [
            {
                "label": "Ages 18 to 39",
                "text": "Ages 18 to 39",
                "id": "Ages18to39"
            }
        ],
        "categories": []
    },
    "PQI92-HH": {
        "qualifiers": [
            {
                "label": "Ages 18 to 64",
                "text": "Ages 18 to 64",
                "id": "Ages18to64"
            },
            {
                "label": "Age 65 and older",
                "text": "Age 65 and older",
                "id": "Age65andolder"
            },
            {
                "label": "Total (Age 18 and older)",
                "text": "Total (Age 18 and older)",
                "id": "TotalAge18andolder"
            }
        ],
        "categories": []
    },
    "SAA-AD": {
        "qualifiers": [
            {
                "label": "Beneficiaries Age 18 and Older",
                "text": "Beneficiaries Age 18 and Older",
                "id": "BeneficiariesAge18andOlder"
            }
        ],
        "categories": []
    },
    "SFM-CH": {
        "qualifiers": [
            {
                "label": "Rate 1 - At Least One Sealant",
                "text": "Rate 1 - At Least One Sealant",
                "id": "Rate1AtLeastOneSealant"
            },
            {
                "label": "Rate 2 - All Four Molars Sealed",
                "text": "Rate 2 - All Four Molars Sealed",
                "id": "Rate2AllFourMolarsSealed"
            }
        ],
        "categories": []
    },
    "SSD-AD": {
        "qualifiers": [
            {
                "label": "Percentage of Beneficiaries Ages 18 to 64",
                "text": "Percentage of Beneficiaries Ages 18 to 64",
                "id": "PercentageofBeneficiariesAges18to64"
            }
        ],
        "categories": []
    },
    "TFL-CH": {
        "qualifiers": [
            {
                "label": "Ages 1 to 2",
                "text": "Ages 1 to 2",
                "id": "Ages1to2"
            },
            {
                "label": "Ages 3 to 5",
                "text": "Ages 3 to 5",
                "id": "Ages3to5"
            },
            {
                "label": "Ages 6 to 7",
                "text": "Ages 6 to 7",
                "id": "Ages6to7"
            },
            {
                "label": "Ages 8 to 9",
                "text": "Ages 8 to 9",
                "id": "Ages8to9"
            },
            {
                "label": "Ages 10 to 11",
                "text": "Ages 10 to 11",
                "id": "Ages10to11"
            },
            {
                "label": "Ages 12 to 14",
                "text": "Ages 12 to 14",
                "id": "Ages12to14"
            },
            {
                "label": "Ages 15 to 18",
                "text": "Ages 15 to 18",
                "id": "Ages15to18"
            },
            {
                "label": "Ages 19 to 20",
                "text": "Ages 19 to 20",
                "id": "Ages19to20"
            },
            {
                "label": "Total Ages 1 through 20",
                "text": "Total Ages 1 through 20",
                "id": "TotalAges1through20"
            }
        ],
        "categories": [
            {
                "label": "Dental or oral health services",
                "text": "Dental or oral health services",
                "id": "Dentalororalhealthservices"
            },
            {
                "label": "Dental services",
                "text": "Dental services",
                "id": "Dentalservices"
            },
            {
                "label": "Oral health services",
                "text": "Oral health services",
                "id": "Oralhealthservices"
            }
        ]
    },
    "W30-CH": {
        "qualifiers": [
            {
                "label": "Rate 1 - Six or more well-child visits in the first 15 months ",
                "text": "Rate 1 - Six or more well-child visits in the first 15 months ",
                "id": "Rate1Sixormorewellchildvisitsinthefirst15months"
            },
            {
                "label": "Rate 2 - Two or more well-child visits for ages 15 months to 30 months",
                "text": "Rate 2 - Two or more well-child visits for ages 15 months to 30 months",
                "id": "Rate2Twoormorewellchildvisitsforages15monthsto30months"
            }
        ],
        "categories": []
    },
    "WCC-CH": {
        "qualifiers": [
            {
                "label": "Ages 3 to 11",
                "text": "Ages 3 to 11",
                "id": "Ages3to11"
            },
            {
                "label": "Ages 12 to 17",
                "text": "Ages 12 to 17",
                "id": "Ages12to17"
            },
            {
                "label": "Total (Ages 3 to 17)",
                "text": "Total (Ages 3 to 17)",
                "id": "TotalAges3to17"
            }
        ],
        "categories": [
            {
                "label": "Body mass index (BMI) percentile documentation",
                "text": "Body mass index (BMI) percentile documentation",
                "id": "BodymassindexBMIpercentiledocumentation"
            },
            {
                "label": "Counseling for Nutrition",
                "text": "Counseling for Nutrition",
                "id": "CounselingforNutrition"
            },
            {
                "label": "Counseling for Physical Activity",
                "text": "Counseling for Physical Activity",
                "id": "CounselingforPhysicalActivity"
            }
        ]
    },
    "WCV-CH": {
        "qualifiers": [
            {
                "label": "Ages 3 to 11",
                "text": "Ages 3 to 11",
                "id": "Ages3to11"
            },
            {
                "label": "Ages 12 to 17",
                "text": "Ages 12 to 17",
                "id": "Ages12to17"
            },
            {
                "label": "Ages 18 to 21",
                "text": "Ages 18 to 21",
                "id": "Ages18to21"
            },
            {
                "label": "Total (Ages 3 to 21)",
                "text": "Total (Ages 3 to 21)",
                "id": "TotalAges3to21"
            }
        ],
        "categories": []
    }
}

export const getCatQualLabels = (measure: keyof typeof data) => {
    const qualifiers: LabelData[] = data[measure].qualifiers.map((item) => ({
        id: cleanString(item.label), //for some reason the system would create the id from the label instead of using the id key that existed
        label: item.label,
        text: item.text,
    }));
    const categories: LabelData[] = data[measure].categories.map((item) => ({
        id: cleanString(item.label), //for some reason the system would create the id from the label instead of using the id key that existed
        label: item.label,
        text: item.text,
    }));
  
    return {
      qualifiers,
      categories,
    };
};
