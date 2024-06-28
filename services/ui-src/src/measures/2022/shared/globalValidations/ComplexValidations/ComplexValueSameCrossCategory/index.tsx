import { LabelData, cleanString } from "utils";

export const ComplexValueSameCrossCategoryOMS = (
  rateData: any,
  categories: LabelData[],
  qualifiers: LabelData[],
  errorLocation: string
) => {
  // Using a subset of rateData as iterator to be sure that Total
  // is always at the end of the category array.
  const qualifierObj = { ...rateData };
  delete qualifierObj["Total"];
  const totalData = rateData["Total"]; // quick reference variable

  const qualifierLabels: any = {};
  for (const q of qualifiers) {
    const qCleaned = q.id;
    qualifierLabels[qCleaned] = q;
  }
  const cleanedCategories = categories.map((cat) => cat.id);

  // build performanceMeasureArray
  let performanceMeasureArray = [];
  for (const cat of cleanedCategories) {
    let row = [];
    for (const q in qualifierObj) {
      const qual = qualifierObj[q]?.[cat]?.[0];
      if (qual) {
        qual.label = qualifierLabels[q];
        row.push(qual);
      }
    }
    // only need to add total data if other data exists
    if (row.length > 0) {
      const catTotal = { ...totalData[cat][0] };
      catTotal.label = "Total";
      row.push(catTotal);
      performanceMeasureArray.push(row);
    }
  }

  // if (performanceMeasureArray)
  let errorArray: any[] = ComplexValueSameCrossCategory({
    rateData: performanceMeasureArray,
    OPM: undefined,
    errorLocation,
  });
  return errorArray;
};

interface Props {
  rateData: any;
  OPM: any;
  fieldIndex?: number;
  fieldLabel?: string;
  errorLocation?: string;
}

/*
 * Validate that the value of a given field with a given qualifier is consistent
 * across all measurement categories.
 *
 * Ex - "Number of Enrollee Months" in Inpatient ages 0-17 === Medicine ages 0-17
 */
export const ComplexValueSameCrossCategory = ({
  rateData,
  OPM,
  fieldIndex = 0,
  fieldLabel = "Number of Enrollee Months",
  errorLocation = "Performance Measure/Other Performance Measure",
}: Props) => {
  let errorArray: any[] = [];
  if (!OPM) {
    const tempValues: {
      [cleanedQualifier: string]: {
        value: string;
        label: string;
        error?: boolean;
      };
    } = {};
    for (const category of rateData) {
      for (const qualifier of category.slice(0, -1)) {
        const cleanQual = cleanString(qualifier.label);
        if (tempValues[cleanQual]?.value) {
          if (
            qualifier.fields[fieldIndex]?.value &&
            tempValues[cleanQual].value !== qualifier.fields[fieldIndex]?.value
          ) {
            // Set an error if the qualifier does not match tempValues
            tempValues[cleanQual].error = true;
          }
        } else {
          // Set tempValues[cleanQual] to be used in future checks against other qualifiers
          tempValues[cleanQual] = {
            value: qualifier.fields[fieldIndex]?.value,
            label: qualifier.label,
          };
        }
      }
    }

    // Using tempValues as a reference prevents multiple error messages per qualifier
    for (const tempValue in tempValues) {
      if (tempValues[tempValue]?.error) {
        errorArray.push({
          errorLocation,
          errorMessage: `Value of "${fieldLabel}" in ${tempValues[tempValue].label} must be the same across all measurement categories.`,
        });
      }
    }
  }
  return errorArray;
};
