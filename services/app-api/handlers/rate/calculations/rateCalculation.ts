import { Program, StandardRateShape } from "../../../types";
import { fixRounding } from "../../../utils/constants/math";
import { DataSource, FormattedMeasureData } from "./types";

export abstract class RateCalculation {
  abstract dataSrcMap: { [key in Program]: DataSource[] }[];
  public measure: string;

  constructor(measure: string) {
    this.measure = measure;
  }
  abstract getFormula(measure: string): Function;

  public expandRates(arr: FormattedMeasureData[]) {
    return arr;
  }

  public check(arr: FormattedMeasureData[]): boolean {
    const chipSources =
      arr.find((data) => data.column === "CHIP")?.dataSource.sort() ?? [];
    const medicaidSources =
      arr.find((data) => data.column === "Medicaid")?.dataSource.sort() ?? [];

    this.dataSrcMap.forEach((src) => {
      src.CHIP.sort();
      src.Medicaid.sort();
    });

    // If neither measure has any data source, we will not use this calculation
    if (chipSources.length === 0 && medicaidSources.length === 0) {
      return false;
    }

    return this.dataSrcMap.some((dataSrc) => {
      // we still want to calculate even if only one measure is complete.
      // we need exact matching of the values of data source to the data source map.
      //length is checked for the same amount of items and index is checked to make sure its a match
      const chipSourcesMatch =
        chipSources.length === 0 ||
        (chipSources.length === dataSrc.CHIP.length &&
          dataSrc.CHIP.every(
            (chipSrc, idx) => chipSources.indexOf(chipSrc) === idx
          ));

      const medicaidSourcesMatch =
        medicaidSources.length === 0 ||
        (medicaidSources.length === dataSrc.Medicaid.length &&
          dataSrc.Medicaid.every(
            (medSrc, idx) => medicaidSources.indexOf(medSrc) === idx
          ));
      return chipSourcesMatch && medicaidSourcesMatch;
    });
  }

  public sum(arr: StandardRateShape[][], rateFormula: Function) {
    return arr?.map((rates) =>
      rates?.reduce((prev, curr) => {
        const numerator =
          Number(prev.numerator ?? 0) + Number(curr.numerator ?? 0);
        const denominator =
          Number(prev.denominator ?? 0) + Number(curr.denominator ?? 0);
        const rate =
          denominator > 0
            ? fixRounding(rateFormula(numerator, denominator), 1).toFixed(1) //added for generating trailing zeros
            : "";

        return {
          category: prev.category ?? "",
          label: prev.label ?? "",
          numerator: numerator.toString(),
          denominator: denominator.toString(),
          rate: rate,
          uid: prev?.uid,
        };
      })
    );
  }

  //creates an array where the rates have been grouped by uid, makes it easier for summation
  public groupRates(rates: StandardRateShape[]) {
    //create an array with all the uids
    const uid = rates
      .filter(
        (value, index, array) =>
          array.findIndex((item) => item.uid === value.uid) === index
      )
      .map((item) => item.uid);

    //group the rate by those with the same uid
    return uid.map((id) => rates.filter((rate) => rate.uid === id));
  }

  public calculate(data: FormattedMeasureData[]) {
    const formula: Function = this.getFormula(this.measure);
    const rates = data?.map((item) => item.rates);
    const flattenRates = rates.map((rate) => Object.values(rate)).flat(2);

    const total = this.sum(this.groupRates(flattenRates), formula);
    return { column: "Combined Rate", rates: total };
  }
}
