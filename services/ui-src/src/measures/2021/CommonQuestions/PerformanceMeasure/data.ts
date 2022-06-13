export interface PerformanceMeasureData {
  qualifiers?: string[]; // age ranges, etc
  categories?: string[]; //performance measure descriptions
  customPrompt?: string; // Default: "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
  questionText?: string[];
  questionListItems?: string[];
  questionListTitles?: string[];
  questionSubtext?: string[];
  questionSubtextTitles?: string[];
}

/** Example data built from IETAD */
export const exampleData: PerformanceMeasureData = {
  questionText: [
    "The percentage of beneficiaries age 18 and Older with a new episode of alcohol or other drug (AOD) abuse or dependence who received the following",
  ],
  questionListItems: [
    "Initiation of AOD Treatment: Percentage of beneficiaries who initiate treatment through an inpatient AOD admission, outpatient visit, intensive outpatient encounter, or partial hospitalization, telehealth, or medication assisted treatment within 14 days of the diagnosis.",
    "Engagement of AOD Treatment: Percentage of beneficiaries who initiated treatment and who were engaged in ongoing AOD treatment within 34 days of the initiation visit.",
  ],
  qualifiers: ["Ages 18 to 64", "Age 65 and older"],
  categories: [
    "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
    "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
    "Initiation of AOD Treatment: Opioid Abuse or Dependence",
    "Engagement of AOD Treatment: Opioid Abuse or Dependence",
    "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
    "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
    "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
    "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
  ],
};
