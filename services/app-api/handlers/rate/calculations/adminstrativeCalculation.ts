import { DataSourceCalcuation } from "./dataSourceCalculation";

// class AdminstrativeCal extends DataSourceCalcuation{
//     formulas: Function[] = [()), formulaAMB,]

//     constructor(measure:string){
//         super(measure);
//     }
// }

const dataSource = [
  {
    Medcaid: "Adminstrative",
    CHIP: "Adminstrative",
  },
  {
    Medcaid: "Adminstrative",
    CHIP: "EHR",
  },
  {
    Medcaid: "EHR",
    CHIP: "EHR",
  },
  {
    Medcaid: "EHR",
    CHIP: "Adminstrative",
  },
  {
    Medcaid: ["Adminstrative", "EHR"],
    CHIP: "Adminstrative",
  },
];

const sum = (arr: any[], rateFormula: Function) => {
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
};

export const adminstrativeCalculation = (measure: string, rates: any[]) => {
  const formula: Function = GetFormula(measure);

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

const GetFormula = (measure: string) => {
  const abbr = measure.slice(0, 3);
  switch (abbr) {
    case "AMB":
      return (numerator: number, denominator: number) =>
        (numerator / denominator) * 1000;
    case "PQI":
      return (numerator: number, denominator: number) =>
        (numerator / denominator) * 100000;
    case "AAB":
      return (numerator: number, denominator: number) =>
        (1 - numerator / denominator) * 100;
    default:
      return (numerator: number, denominator: number) =>
        (1 - numerator / denominator) * 100;
  }
};
