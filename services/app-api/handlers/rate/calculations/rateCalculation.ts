export abstract class RateCalculation {
  abstract dataSrcMap: any[];

  constructor() {}
  abstract check(arr: any[]): boolean;
  abstract getFormula(measure: string): Function;

  public sum(arr: any[], rateFormula: Function) {
    return arr?.map((rates: any[]) =>
      rates?.reduce((prev, curr) => {
        const numerator =
          Number(prev.numerator ?? 0) + Number(curr.numerator ?? 0);
        const denominator =
          Number(prev.denominator ?? 0) + Number(curr.denominator ?? 0);
        const rate =
          denominator > 0 ? rateFormula(numerator, denominator).toFixed(1) : "";

        return {
          category: prev.category ?? "",
          label: prev.label ?? "",
          numerator: numerator,
          denominator: denominator,
          rate: rate,
          uid: prev?.uid,
        };
      })
    );
  }
  public calculate(measure: string, rates: any[]) {
    const formula: Function = this.getFormula(measure);

    let flattenRates: any[] = [];
    rates.forEach((rate) => {
      flattenRates.push(...Object.values(rate).flat());
    });

    const uid: any[] = flattenRates
      .filter(
        (value, index, array) =>
          array.findIndex((item) => item.uid === value.uid) === index
      )
      .map((item) => item.uid);
    const sumRates: any[] = uid.map((id) =>
      flattenRates.filter((rate) => rate.uid === id)
    );
    const total = this.sum(sumRates, formula);
    return { column: "Combined Rate", rates: total };
  }
}
