export const administrativeFormula: any = {
  default: (numerator: number, denominator: number) =>
    formulaDefault(numerator, denominator),
  AMB: (numerator: number, denominator: number) =>
    formulaAMB(numerator, denominator),
  PQI: (numerator: number, denominator: number) =>
    formulaPQI(numerator, denominator),
  AAB: (numerator: number, denominator: number) =>
    formulaAAB(numerator, denominator),
};

const sum = (arr: any[], rateFormula: Function) => {
  return arr.map((rates: any[]) =>
    rates.reduce((prev, curr) => {
      const numerator = Number(prev.numerator) + Number(curr.numerator);
      const denominator = Number(prev.denominator) + Number(curr.denominator);
      const rate = rateFormula(numerator, denominator).toFixed(1);
      return {
        category: prev.category,
        label: prev.label,
        numerator: numerator,
        denominator: denominator,
        rate: rate,
        uid: prev.uid,
      };
    })
  );
};

export const adminstrativeCalculation = (measure: string, rates: any[]) => {
  const measureConstant = measure.split("-")[0];
  const formula: Function =
    administrativeFormula?.[measureConstant] ?? administrativeFormula.default;

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

  const total = sum(sumRates, formula);
  return { column: "Combined Rate", rates: total };
};

const formulaDefault = (numerator: number, denominator: number) => {
  return (numerator / denominator) * 100;
};

const formulaAMB = (numerator: number, denominator: number) => {
  return (numerator / denominator) * 1000;
};

const formulaPQI = (numerator: number, denominator: number) => {
  return (numerator / denominator) * 100000;
};

const formulaAAB = (numerator: number, denominator: number) => {
  return (1 - numerator / denominator) * 100;
};
