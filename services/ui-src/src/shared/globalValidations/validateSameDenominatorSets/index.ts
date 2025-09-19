import { isLegacyLabel } from "utils";
import { OmsValidationCallback } from "../../types/TypeValidations";

export const validateSameDenominatorSets =
  (errorMessage?: string): OmsValidationCallback =>
  ({ rateData, locationDictionary, categories, qualifiers, isOPM, label }) => {
    if (isOPM) return [];
    const errorArray: FormError[] = [];

    for (const qual of qualifiers) {
      for (
        let initiation = 0;
        initiation < categories.length;
        initiation += 2
      ) {
        const engagement = initiation + 1;

        const initRate =
          rateData.rates?.[categories[initiation].id]?.[qual.id]?.[0];
        const engageRate =
          rateData.rates?.[categories[engagement].id]?.[qual.id]?.[0];

        if (
          initRate &&
          initRate.denominator &&
          engageRate &&
          engageRate.denominator &&
          initRate.denominator !== engageRate.denominator
        ) {
          errorArray.push({
            errorLocation: `Optional Measure Stratification: ${locationDictionary(
              [...label, qual.id]
            )}`,
            errorMessage:
              errorMessage ??
              `Denominators must be the same for ${locationDictionary([
                categories[initiation].label,
              ])} and ${locationDictionary([categories[engagement].label])}.`,
          });
        }
      }
    }

    return errorArray;
  };

//Legacy version < 2023. Used in IET-AD & IET-HH
/** For each qualifier the denominators neeed to be the same for both Initiaion and Engagement of the same category. */
export const validateSameDenominatorSetsOMS =
  (errorMessage?: string): OmsValidationCallback =>
  ({ rateData, locationDictionary, categories, qualifiers, isOPM, label }) => {
    if (isOPM) return [];
    const errorArray: FormError[] = [];

    //order gets swapped when >= 2023
    const trueQualifiers = isLegacyLabel() ? qualifiers : categories;
    const trueCategory = isLegacyLabel() ? categories : qualifiers;

    for (const qual of trueQualifiers.map((s) => s.id)) {
      for (
        let initiation = 0;
        initiation < trueCategory.length;
        initiation += 2
      ) {
        const engagement = initiation + 1;
        const initRate =
          rateData.rates?.[qual]?.[trueCategory[initiation].id]?.[0];
        const engageRate =
          rateData.rates?.[qual]?.[trueCategory[engagement].id]?.[0];

        if (
          initRate &&
          initRate.denominator &&
          engageRate &&
          engageRate.denominator &&
          initRate.denominator !== engageRate.denominator
        ) {
          errorArray.push({
            errorLocation: `Optional Measure Stratification: ${locationDictionary(
              [...label, qual]
            )}`,
            errorMessage:
              errorMessage ??
              `Denominators must be the same for ${locationDictionary([
                categories[initiation].label,
              ])} and ${locationDictionary([categories[engagement].label])}.`,
          });
        }
      }
    }

    return errorArray;
  };
