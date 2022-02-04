import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import { useCustomRegister } from "hooks/useCustomRegister";
import { Measure } from "../validation/types";
import { createContext, useState, useContext } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  ageGroups: string[];
  deviationConditions?: {};
}

const ageGroups = ["Ages 18 to 64", "Age 65 and older"];
const IndepententAsianOptions = [
  "Asian Indian",
  "Chinese",
  "Filipino",
  "Japanese",
  "Korean",
  "Vietnamese",
  "Other Asian",
];
const IndependentHawaiianOtherPacificOptions = [
  "Native Hawaiian",
  "Guamanian or Chamorro",
  "Samoan",
  "Other Pacific Islander",
];
const IndependentEthnicityOptions = [
  "Mexican, Mexican American, Chicano/a",
  "Puerto Rican",
  "Cuban",
  "Another Hispanic, Latino/a or Spanish origin",
];
const race = [];

export const OMS2 = (data: Measure.Form) => {
  const OPM = data["OtherPerformanceMeasure-Rates"];
  const performanceMeasureArray = [
    data["PerformanceMeasure-AgeRates-Initiation-Alcohol"],
    data["PerformanceMeasure-AgeRates-Engagement-Alcohol"],
    data["PerformanceMeasure-AgeRates-Initiation-Opioid"],
    data["PerformanceMeasure-AgeRates-Engagement-Opioid"],
    data["PerformanceMeasure-AgeRates-Initiation-Other"],
    data["PerformanceMeasure-AgeRates-Engagement-Other"],
    data["PerformanceMeasure-AgeRates-Initiation-Total"],
    data["PerformanceMeasure-AgeRates-Engagement-Total"],
  ];
};

const buildAllTheCheckboxes = (
  allTheData: any,
  OPM: any,
  performanceMeasureArray: any
) => {
  allTheData.forEach((firstLevelCheckbox: any) => {
    firstLevelCheckbox.forEach((secondLevelCheckbox: any) => {
      if (secondLevelCheckbox.isAddAnother) {
        const doTheLogicToAddAnotherThing = "stuff";
      }
    });
  });
};
