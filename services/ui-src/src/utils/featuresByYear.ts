import { getMeasureYear } from "./getMeasureYear";

export const featuresByYear = {
  get hasCombinedRates() {
    return getMeasureYear() >= 2024;
  },
  get hasQualCatLabels() {
    return getMeasureYear() <= 2022;
  },
  get hasMandatoryReporting() {
    return getMeasureYear() >= 2024;
  },
  get pheYear() {
    return getMeasureYear() < 2023;
  },
  get optionalDateRangeTracking() {
    return getMeasureYear() >= 2023;
  },
  get uniqueCoreSetTitles() {
    return getMeasureYear() >= 2024;
  },
  get yearIsNot2025() {
    return getMeasureYear() !== 2025;
  },
  get displayMandatoryColumn() {
    return getMeasureYear() >= 2024;
  },
  get humanReadableTextForMathematica() {
    return getMeasureYear() >= 2023;
  },
  get displayCheckmarkWarning() {
    return getMeasureYear() >= 2023;
  },
  get displayDeviationlanguage() {
    return getMeasureYear() >= 2023;
  },
};
