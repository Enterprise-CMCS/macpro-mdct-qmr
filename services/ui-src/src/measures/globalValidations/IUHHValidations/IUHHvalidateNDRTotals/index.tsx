/* At least one NDR set must be complete (OPM or PM) */
export const IUHHvalidateNDRTotals = (
  categoryArray: any,
  errorLocation: string = "Performance MeasureTotal"
) => {
  let errorArray: any[] = [];

  categoryArray?.forEach((category: any) => {
    let numberOfEnrolleeMonths = 0;
    let discharges = 0;
    let dischargesPerThousandMonths = 0;
    let days = 0;
    let daysPerThousand = 0;
    let averageStays = 0;

    category.forEach((performanceObj: any) => {
      if (!performanceObj.isTotal) {
        numberOfEnrolleeMonths += performanceObj?.numberOfEnrolleeMonths || 0;
        discharges += performanceObj?.discharges || 0;
        dischargesPerThousandMonths +=
          performanceObj?.dischargesPerThousandMonths || 0;
        days += performanceObj?.days || 0;
        daysPerThousand += performanceObj?.daysPerThousand || 0;
        averageStays += performanceObj?.averageStay || 0;
      }
    });

    const totalNDR =
      category.find((cat: any) => cat.isTotal) || category[category.length - 1];

    if (totalNDR?.numberOfEnrolleeMonths !== numberOfEnrolleeMonths) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${category} Number of Enrollee Months must total is different from the sum of the section`,
      });
    }

    if (totalNDR?.discharges !== discharges) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${category} Discharge total is different from the sum of the section`,
      });
    }

    if (totalNDR?.dischargesPerThousandMonths !== dischargesPerThousandMonths) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${category} Discharges per 1,000 Enrollee Months total is different from the sum of the section`,
      });
    }

    if (totalNDR?.days !== days) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${category} Days total is different from the sum of the section`,
      });
    }

    if (totalNDR?.daysPerThousand !== daysPerThousand) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${category} Days per 1,000 Enrollee Months total is different from the sum of the section`,
      });
    }

    if (totalNDR?.averageStays !== averageStays) {
      errorArray.push({
        errorLocation: errorLocation,
        errorMessage: `${category} Average Length of Stay total is different from the sum of the section`,
      });
    }
  });
  return errorArray.length ? errorArray : [];
};
