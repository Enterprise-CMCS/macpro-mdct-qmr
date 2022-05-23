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
      qualifier.fields.forEach((field: Field, x: number) => {
        if (field?.value) {
          categorySums[x] ??= 0;
          categorySums[x] += parseFloat(field.value);
        }
      });
    }

    // Compare calculated sums to values in Total qualifier
    const categoryTotal = category.slice(-1)[0];
    categoryTotal.fields.forEach((field: Field, x: number) => {
      if (
        rateLocations.includes(x) &&
        ((!field?.value && categorySums[x] !== undefined) ||
          (field?.value && categorySums[x] !== parseFloat(field.value)))
      ) {
        errorArray.push({
          errorLocation: errorLocation,
          errorMessage: `${categories[i]} - ${field.label} - Total is different from the sum of the section`,
        });
      }
    });
  });

  return errorArray;
};
