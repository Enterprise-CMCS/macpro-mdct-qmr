import { pcrData } from "../../../test-util/testData";
import { PCRCalculation } from "./pcrCalculation";

const totalRates = [
  {
    label: "Count of Index Hospital Stays",
    value: "15",
    uid: "zcwVcA.Z31BMw",
  },
  {
    label: "Count of Observed 30-Day Readmissions",
    value: "13",
    uid: "zcwVcA.KdVD0I",
  },
  {
    label: "Observed Readmission Rate",
    value: "86.6667",
    uid: "zcwVcA.GWePur",
  },
  {
    label: "Count of Expected 30-Day Readmissions",
    value: "4.3444",
    uid: "zcwVcA.ciVWdY",
  },
  {
    label: "Expected Readmission Rate",
    value: "28.9627",
    uid: "zcwVcA.qi3Vd7",
  },
  {
    label:
      "O/E Ratio (Count of Observed 30-Day Readmissions/Count of Expected 30-Day Readmissions)",
    value: "2.9924",
    uid: "zcwVcA.SczxqV",
  },
  {
    label: "Count of Beneficiaries in Medicaid Population",
    value: "32",
    uid: "zcwVcA.Ei65yg",
  },
  { label: "Number of Outliers", value: "25", uid: "zcwVcA.pBILL1" },
  {
    label:
      "Outlier Rate (Number of Outliers/Count of Beneficiaries in Medicaid Population) x 1,000",
    value: "781.3",
    uid: "zcwVcA.Nfe4Cn",
  },
];

//order matters for this operation
describe("Test pcr calculation class", () => {
  it("With both pcr admin data source", () => {
    const pcrCalc = new PCRCalculation("PCR-AD");
    expect(pcrCalc.check(pcrData)).toBe(true);
    const combinedRates = pcrCalc.calculate(pcrData);
    expect(combinedRates.rates).toStrictEqual(totalRates);
  });

  it("With one pcr admin data source filled", () => {
    //remove the second array so that there is only 1 measure to be checked
    pcrData.pop();

    const pcrCalc = new PCRCalculation("PCR-AD");
    expect(pcrCalc.check(pcrData)).toBe(true);
    const combinedRates = pcrCalc.calculate(pcrData);
    //if there is only one data source selected, the combine rates should be that value
    expect(combinedRates.rates).toStrictEqual(pcrData[0].rates["zcwVcA"]);
  });

  it("With no matching pcr data source", () => {
    const pcrCalc = new PCRCalculation("PCR-AD");
    pcrData.map((item) => {
      item.dataSource = [];
    });
    expect(pcrCalc.check(pcrData)).toBe(false);
  });
});
