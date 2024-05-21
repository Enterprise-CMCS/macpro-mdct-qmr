import { ndrFormula } from "types";
import { LabelData } from "utils";

export interface PerformanceMeasureData {
  qualifiers?: LabelData[]; // age ranges, etc
  categories?: LabelData[]; //performance measure descriptions
  measureName?: string;
  inputFieldNames?: LabelData[];
  ndrFormulas?: ndrFormula[];
  customPrompt?: string; // Default: "Enter a number for the numerator and the denominator. Rate will auto-calculate:"
  questionText?: string[];
  questionListItems?: string[];
  questionItem?: string;
  questionListOrderedItems?: string[];
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
  qualifiers: [
    {
      label: "Ages 18 to 64",
      text: "Ages 18 to 64",
      id: "Ages18to64",
    },
    {
      label: "Age 65 and older",
      text: "Age 65 and older",
      id: "Age65andolder",
    },
  ],
  categories: [
    {
      label: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
      text: "Initiation of AOD Treatment: Alcohol Abuse or Dependence",
      id: "InitiationofAODTreatmentAlcoholAbuseorDependence",
    },
    {
      label: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
      text: "Engagement of AOD Treatment: Alcohol Abuse or Dependence",
      id: "EngagementofAODTreatmentAlcoholAbuseorDependence",
    },
    {
      label: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
      text: "Initiation of AOD Treatment: Opioid Abuse or Dependence",
      id: "InitiationofAODTreatmentOpioidAbuseorDependence",
    },
    {
      label: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
      text: "Engagement of AOD Treatment: Opioid Abuse or Dependence",
      id: "EngagementofAODTreatmentOpioidAbuseorDependence",
    },
    {
      label: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
      text: "Initiation of AOD Treatment: Other Drug Abuse or Dependence",
      id: "InitiationofAODTreatmentOtherDrugAbuseorDependence",
    },
    {
      label: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
      text: "Engagement of AOD Treatment: Other Drug Abuse or Dependence",
      id: "EngagementofAODTreatmentOtherDrugAbuseorDependence",
    },
    {
      label: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
      text: "Initiation of AOD Treatment: Total AOD Abuse or Dependence",
      id: "InitiationofAODTreatmentTotalAODAbuseorDependence",
    },
    {
      label: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
      text: "Engagement of AOD Treatment: Total AOD Abuse or Dependence",
      id: "EngagementofAODTreatmentTotalAODAbuseorDependence",
    },
  ],
};
