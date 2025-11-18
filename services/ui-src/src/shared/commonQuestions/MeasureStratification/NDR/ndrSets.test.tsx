import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NDRSetsAccordion } from "./ndrSets";
import { usePerformanceMeasureContext } from "shared/commonQuestions/OptionalMeasureStrat/context";
import { getCatQualLabels } from "measures/2026/rateLabelText";
import { data as IU_Data } from "measures/2026/IUHH/data";
import { data as AIF_Data } from "measures/2026/AIFHH/data";
import { CategoryLabelData } from "shared/types";

usePerformanceMeasureContext;
jest.mock("shared/commonQuestions/OptionalMeasureStrat/context", () => ({
  ...jest.requireActual("shared/commonQuestions/OptionalMeasureStrat/context"),
  usePerformanceMeasureContext: jest.fn(),
}));

const mockValues = {
  componentFlag: "DEFAULT",
  categories: [{ id: "cat-1", label: "cat 1", text: "cat 1" }],
  qualifiers: [{ id: "qual 1", label: "qual 1", text: "qual 1" }],
};

const performanceMeasureArray = [
  [
    {
      uid: "cat-1.qual 1",
      label: "qual 1",
      rate: "33.3",
      numerator: "2",
      denominator: "3",
    },
  ],
];

const OPM = [
  {
    rate: [
      {
        denominator: "3",
        numerator: "2",
        rate: "66.7",
      },
    ],
    description: "mock-rate",
  },
];

const AIFHHPerformanceMeasureArray = [
  [
    {
      fields: [
        {
          uid: "Number of Enrollee Months",
          value: "2",
          label: "Number of Enrollee Months",
        },
        {
          uid: "Number of Short-Term Admissions",
          value: "3",
          label: "Number of Short-Term Admissions",
        },
        {
          uid: "Short-Term Admissions per 1,000 Enrollee Months",
          value: "1500.0",
          label: "Short-Term Admissions per 1,000 Enrollee Months",
        },
        {
          uid: "Number of Medium-Term Admissions",
          value: "4",
          label: "Number of Medium-Term Admissions",
        },
        {
          uid: "Medium-Term Admissions per 1,000 Enrollee Months",
          value: "2000.0",
          label: "Medium-Term Admissions per 1,000 Enrollee Months",
        },
        {
          uid: "Number of Long-Term Admissions",
          value: "5",
          label: "Number of Long-Term Admissions",
        },
        {
          uid: "Long-Term Admissions per 1,000 Enrollee Months",
          value: "2500.0",
          label: "Long-Term Admissions per 1,000 Enrollee Months",
        },
      ],
      label: "Ages 18 to 64",
    },
  ],
];

describe("Test NDRSets component", () => {
  it("Test Default NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      performanceMeasureArray,
    });
    renderWithHookForm(<NDRSetsAccordion name={"default"} />);

    expect(
      screen.getByRole("textbox", {
        name: "default.rates.cat-1.qual 1.0.numerator",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "default.rates.cat-1.qual 1.0.denominator",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "default.rates.cat-1.qual 1.0.rate",
      })
    ).toBeVisible();
  });
  it("Test AIF NDRSet", () => {
    const { qualifiers, inputFieldNames } = AIF_Data.performanceMeasure;

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      categories: [],
      qualifiers,
      componentFlag: "AIF",
      AIFHHPerformanceMeasureArray,
      inputFieldNames,
    });
    renderWithHookForm(<NDRSetsAccordion name={"aif"} />);

    inputFieldNames?.forEach((names) => {
      expect(
        screen.getByRole("textbox", {
          name: names.label,
        })
      ).toBeVisible();
    });
  });
  it("Test IU NDRSet", () => {
    const { categories, qualifiers } = getCatQualLabels("IU-HH");
    const { inputFieldNames } = IU_Data.performanceMeasure;

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      categories: (categories as CategoryLabelData[]).filter(
        (cat) => !cat.excludeFromOMS
      ),
      qualifiers,
      componentFlag: "IU",
      inputFieldNames,
      calcTotal: true,
    });
    renderWithHookForm(<NDRSetsAccordion name={"iu"} />);

    inputFieldNames?.forEach((names) => {
      expect(
        screen.getByRole("textbox", {
          name: names.label,
        })
      ).toBeVisible();
    });
  });
  it("Test PCR NDRSet", () => {
    const { categories, qualifiers } = getCatQualLabels("PCR-AD");

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      componentFlag: "PCR",
      categories,
      qualifiers,
    });
    renderWithHookForm(<NDRSetsAccordion name={"pcr"} />);

    const qualIndex = [0, 1, 3, 6, 7];
    qualIndex.forEach((index) => {
      expect(
        screen.getByRole("textbox", {
          name: qualifiers[index].text,
        })
      ).toBeVisible();
    });
  });
  it("Test Other Performance Measure NDRSet", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      OPM,
    });
    renderWithHookForm(<NDRSetsAccordion name={"opm"} />);

    expect(
      screen.getByRole("textbox", {
        name: "opm.rates.OPM.OPM_mockrate.0.numerator",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "opm.rates.OPM.OPM_mockrate.0.denominator",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "opm.rates.OPM.OPM_mockrate.0.rate",
      })
    ).toBeVisible();
  });
});
