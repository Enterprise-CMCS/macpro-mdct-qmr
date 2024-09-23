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
