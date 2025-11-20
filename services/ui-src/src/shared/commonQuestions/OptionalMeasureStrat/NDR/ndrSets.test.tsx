import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NDRSets } from "./ndrSets";
import { usePerformanceMeasureContext } from "../context";
import { getCatQualLabels } from "measures/2022/rateLabelText";
import { data as IU_Data } from "measures/2022/IUHH/data";
import { data as AIF_Data } from "measures/2022/AIFHH/data";

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  isLegacyLabel: () => {
    return true;
  },
}));

jest.mock("../context", () => ({
  ...jest.requireActual("../context"),
  usePerformanceMeasureContext: jest.fn(),
}));

const performanceMeasureArray = [
  [
    {
      label: "qual 1",
      rate: "33.3",
      numerator: "2",
      denominator: "3",
    },
  ],
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

const IUHHPerformanceMeasureArray = [
  [
    {
      fields: [
        {
          uid: "Number of Enrollee Months",
          value: "3",
          label: "Number of Enrollee Months",
        },
        {
          uid: "Discharges",
          value: "4",
          label: "Discharges",
        },
        {
          uid: "Discharges per 1,000 Enrollee Months",
          value: "1333.3",
          label: "Discharges per 1,000 Enrollee Months",
        },
        {
          uid: "Days",
          value: "3",
          label: "Days",
        },
        {
          uid: "Days per 1,000 Enrollee Months",
          value: "1000.0",
          label: "Days per 1,000 Enrollee Months",
        },
        {
          uid: "Average Length of Stay",
          value: "0.8",
          label: "Average Length of Stay",
        },
      ],
      label: "Ages 0 to 17",
    },
  ],
];

const mockValues = {
  componentFlag: "DEFAULT",
  categories: [{ id: "cat-1", label: "cat 1", text: "cat 1" }],
  qualifiers: [{ id: "qual-1", label: "qual 1", text: "qual 1" }],
};

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

describe("Test NDRSets component", () => {
  it("Test Default NDRSet render", async () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      performanceMeasureArray,
    });
    const sets = <NDRSets name={"default"} />;
    renderWithHookForm(sets);

    fireEvent.click(screen.getByRole("checkbox", { name: "qual 1" }));

    await waitFor(() => {
      ["numerator", "denominator", "rate"].forEach((id) => {
        expect(
          screen.getByRole("textbox", {
            name: `default.rates.qual-1.cat-1.0.${id}`,
          })
        ).toBeVisible();
      });
    });
  });
  it("Test AIF NDRSet render", async () => {
    const { qualifiers, inputFieldNames } = AIF_Data.performanceMeasure;

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      componentFlag: "AIF",
      qualifiers,
      categories: [],
      AIFHHPerformanceMeasureArray,
      inputFieldNames,
    });
    renderWithHookForm(<NDRSets name={"aif"} />);

    fireEvent.click(screen.getByRole("checkbox", { name: "Ages 18 to 64" }));

    await waitFor(() => {
      inputFieldNames?.forEach((names) => {
        expect(
          screen.getByRole("textbox", {
            name: names.label,
          })
        ).toBeVisible();
      });
    });
  });
  it("Test IU NDRSet render", async () => {
    const { categories, qualifiers } = getCatQualLabels("IU-HH");
    const { inputFieldNames } = IU_Data.performanceMeasure;

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      componentFlag: "IU",
      categories,
      qualifiers,
      inputFieldNames,
      IUHHPerformanceMeasureArray,
    });
    renderWithHookForm(<NDRSets name={"iu"} />);

    fireEvent.click(screen.getByRole("checkbox", { name: "Ages 0 to 17" }));

    await waitFor(() => {
      inputFieldNames?.forEach((names) => {
        expect(
          screen.getByRole("textbox", {
            name: names.label,
          })
        ).toBeVisible();
      });
    });
  });
  it("Test PCR NDRSet render", () => {
    const { categories, qualifiers } = getCatQualLabels("PCR-AD");

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      componentFlag: "PCR",
      categories,
      qualifiers,
    });
    renderWithHookForm(<NDRSets name={"pcr"} />);

    const qualIndex = [0, 1, 3, 6, 7];
    qualIndex.forEach((index) => {
      expect(
        screen.getByRole("textbox", {
          name: qualifiers[index].text,
        })
      ).toBeVisible();
    });
  });
  it("Test Other Performance Measure NDRSet render", async () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      OPM,
    });
    renderWithHookForm(<NDRSets name={"opm"} />);

    fireEvent.click(screen.getByRole("checkbox", { name: "mock-rate" }));

    await waitFor(() => {
      ["numerator", "denominator", "rate"].forEach((id) => {
        expect(
          screen.getByRole("textbox", {
            name: `opm.rates.mockrate.OPM.0.${id}`,
          })
        ).toBeVisible();
      });
    });
  });
});
