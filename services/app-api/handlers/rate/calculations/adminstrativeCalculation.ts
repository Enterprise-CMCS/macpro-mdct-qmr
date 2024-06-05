class Calculation {
  formulas: Function[] | undefined;
  dataSource: string[] | undefined;
  measure: string | undefined;
}

interface Calculation {
  getRate: () => number;
}

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

export const adminstrativeCalculation = (measure: string, rates: any[]) => {
  const measureConstant = measure.split("-")[0];
  const formula: Function =
    administrativeFormula?.[measureConstant] ?? administrativeFormula.default;

  let ratesList: any[] = [];

  rates.forEach((rate) => {
    ratesList.push(...Object.values(rate).flat());
  });
  const uid: any[] = ratesList
    .filter(
      (value, index, array) =>
        array.findIndex((item) => item.uid === value.uid) === index
    )
    .map((item) => item.uid);
  const sumList: any[] = uid.map((id) =>
    ratesList.filter((rate) => rate.uid === id)
  );

  const total: any[] = sumList.map((list: any[]) =>
    list.reduce((prev, curr) => {
      const numerator = Number(prev.numerator) + Number(curr.numerator);
      const denominator = Number(prev.denominator) + Number(curr.denominator);
      const rate = formula(numerator, denominator);
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

  return { coreSet: "total", rates: total };
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
