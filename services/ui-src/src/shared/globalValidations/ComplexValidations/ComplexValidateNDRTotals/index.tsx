import { LabelData } from "utils";
import * as DC from "dataConstants";
import { ndrFormula } from "types";

interface Qualifier {
  fields: Field[];
  label: string;
}

interface Field {
  label: string;
  value?: string;
}

/* At least one NDR set must be complete (OMS) */
export const ComplexValidateNDRTotalsOMS = (
  rateData: any,
  categories: LabelData[],
  ndrFormulas: ndrFormula[],
  errorLocation: string
) => {
  /*
   * Using a subset of rateData as iterator to be sure that Total
   * is always at the end of the category array.
   */
  const qualifierObj = { ...rateData };
  delete qualifierObj["Total"];
  const totalData = rateData["Total"];
  const categoryID = categories[0]?.id ?? DC.SINGLE_CATEGORY;

  // build performanceMeasureArray
  let performanceMeasureArray = [];
  const cleanedCategories = categories;
  if (cleanedCategories.length > 0) {
    for (const cat of cleanedCategories) {
      let row = [];
      for (const q in qualifierObj) {
        const qual = qualifierObj[q]?.[cat.id]?.[0] ?? {};
        if (qual) {
          row.push(qual);
        }
      }
      if (row) {
        row.push(totalData[cat.id][0]);
        performanceMeasureArray.push(row);
      }
    }
  } else {
    let row = [];
    for (const q in qualifierObj) {
      const qual = qualifierObj[q]?.[categoryID]?.[0] ?? {};
      if (qual) {
        row.push(qual);
      }
    }
    if (row) {
      row.push(totalData[categoryID][0]);
      performanceMeasureArray.push(row);
    }
  }

  let errorArray: any[] = ComplexValidateNDRTotals(
    performanceMeasureArray,
    categories,
    ndrFormulas,
    `${errorLocation}`
  );

  return errorArray;
};

/*
 * Validate Totals have data if qualifiers in section have data
 * and validate Total is equal to the sum of other qualifiers in section
 */
export const ComplexValidateNDRTotals = (
  performanceMeasureArray: any,
  categories: LabelData[],
  ndrFormulas: ndrFormula[],
  errorLocation: string = "Performance Measure Total"
) => {
  let errorArray: any[] = [];
  const rateLocations = ndrFormulas.map((ndr: ndrFormula) => ndr.rateIndex);

  performanceMeasureArray.forEach((category: Qualifier[], i: number) => {
    // Sum all fields for each qualifier
    let categorySums: any[] = [];
    for (const qualifier of category.slice(0, -1)) {
      if (qualifier?.fields?.every((f: Field) => !!f?.value)) {
        qualifier?.fields?.forEach((field: Field, x: number) => {
          if (field?.value) {
            categorySums[x] ??= 0;
            categorySums[x] += parseFloat(field.value);
          }
        });
      }
    }

    // Compare calculated sums to values in Total qualifier
    const categoryTotal = category.slice(-1)[0];
    if (
      categorySums.length > 0 &&
      !categoryTotal?.fields.every(
        (field) => field.value !== undefined && field.value !== ""
      )
    ) {
      errorArray.push({
        errorLocation: `${errorLocation} - ${
          categories[i]?.label ? categories[i].label : ""
        }`,
        errorMessage: `Total ${
          categories[i]?.label ? categories[i].label : ""
        } must contain values if other fields are filled.`,
      });
    } else {
      categoryTotal?.fields?.forEach((field: Field, x: number) => {
        if (
          !rateLocations.includes(x) &&
          field?.value &&
          categorySums[x] !== parseFloat(field.value)
        ) {
          errorArray.push({
            errorLocation: `${errorLocation} - ${
              categories[i]?.label ? categories[i].label : ""
            }`,
            errorMessage: `Total ${
              field.label
            } is not equal to the sum of other "${field.label}" fields in ${
              categories[i]?.label ? categories[i].label : ""
            } section.`,
          });
        }
      });
    }
  });

  return errorArray;
};
