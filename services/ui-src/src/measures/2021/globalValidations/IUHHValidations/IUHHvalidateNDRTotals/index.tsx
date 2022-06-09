import { cleanString } from "utils/cleanString";

interface NDRforumla {
  numerator: number;
  denominator: number;
  rateIndex: number;
}

interface Qualifier {
  fields: Field[];
  label: string;
}

interface Field {
  label: string;
  value?: string;
}

/* At least one NDR set must be complete (OMS) */
export const IUHHvalidateNDRTotalsOMS = (
  rateData: any,
  categories: string[],
  ndrFormulas: NDRforumla[],
  errorLocation: string
) => {
  // Using a subset of rateData as iterator to be sure that Total
  // is always at the end of the category array.
  const qualifierObj = { ...rateData };
  delete qualifierObj["Total"];
  const totalData = rateData["Total"];

  // build performanceMeasureArray
  let performanceMeasureArray = [];
  const cleanedCategories = categories.map((cat) => cleanString(cat));
  for (const cat of cleanedCategories) {
    let row = [];
    for (const q in qualifierObj) {
      const qual = qualifierObj[q]?.[cat]?.[0] ?? {};
      if (qual) {
        row.push(qual);
      }
    }
    if (row.length > 1) {
      row.push(totalData[cat][0]);
      performanceMeasureArray.push(row);
    }
  }

  let errorArray: any[] = IUHHvalidateNDRTotals(
    performanceMeasureArray,
    categories,
    ndrFormulas,
    `${errorLocation}`
  );

  return errorArray;
};

/* At least one NDR set must be complete (OPM or PM) */
export const IUHHvalidateNDRTotals = (
  performanceMeasureArray: any,
  categories: string[],
  ndrFormulas: NDRforumla[],
  errorLocation: string = "Performance Measure Total"
) => {
  let errorArray: any[] = [];
  const rateLocations = ndrFormulas.map((ndr: NDRforumla) => ndr.rateIndex);

  performanceMeasureArray.forEach((category: Qualifier[], i: number) => {
    // Sum all fields for each qualifier
    let categorySums: any[] = [];
    for (const qualifier of category.slice(0, -1)) {
      qualifier?.fields?.forEach((field: Field, x: number) => {
        if (field?.value) {
          categorySums[x] ??= 0;
          categorySums[x] += parseFloat(field.value);
        }
      });
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
        errorLocation: `${errorLocation} - ${categories[i]}`,
        errorMessage: `Total ${categories[i]} must contain values if other fields are filled.`,
      });
    } else {
      categoryTotal?.fields?.forEach((field: Field, x: number) => {
        if (
          !rateLocations.includes(x) &&
          ((!field?.value && categorySums[x] !== undefined) ||
            (field?.value && categorySums[x] !== parseFloat(field.value)))
        ) {
          errorArray.push({
            errorLocation: `${errorLocation} - ${categories[i]}`,
            errorMessage: `Total ${field.label} is not equal to the sum of other "${field.label}" fields in ${categories[i]} section.`,
          });
        }
      });
    }
  });

  return errorArray;
};
