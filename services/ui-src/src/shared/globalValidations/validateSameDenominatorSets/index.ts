import { isLegacyLabel } from "utils";
import { OmsValidationCallback } from "../../types/TypeValidations";
import { FormError } from "error";

/** For each qualifier the denominators neeed to be the same for both Initiaion and Engagement of the same category. */
export const validateSameDenominatorSetsOMS =
  (errorMessage?: string): OmsValidationCallback =>
  ({ rateData, locationDictionary, categories, qualifiers, isOPM, label }) => {
    if (isOPM) return [];
    const errorArray: FormError[] = [];

    for (const qual of qualifiers.map((s) => s.id)) {
      for (
        let initiation = 0;
        initiation < categories.length;
        initiation += 2
      ) {
        const engagement = initiation + 1;
        const initRate = isLegacyLabel()
          ? rateData.rates?.[qual]?.[categories[initiation].id]?.[0]
          : rateData.rates?.[categories[initiation].id]?.[qual]?.[0];
        const engageRate = isLegacyLabel()
          ? rateData.rates?.[qual]?.[categories[engagement].id]?.[0]
          : rateData.rates?.[categories[engagement].id]?.[qual]?.[0];

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
