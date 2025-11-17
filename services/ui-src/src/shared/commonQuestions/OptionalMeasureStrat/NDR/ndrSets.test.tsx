import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NDRSets } from "./ndrSets";
import { usePerformanceMeasureContext } from "../context";
import { getCatQualLabels } from "measures/2022/rateLabelText";

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  isLegacyLabel: () => {
    return true;
  },
  getLabelText: () => {
    return { "qual 1": "qual 1" };
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
          label: "Number of Enrollee Months",
        },
        {
          uid: "Discharges",
          label: "Discharges",
        },
        {
          uid: "Discharges per 1,000 Enrollee Months",
          label: "Discharges per 1,000 Enrollee Months",
        },
        {
          uid: "Days",
          label: "Days",
        },
        {
          uid: "Days per 1,000 Enrollee Months",
          label: "Days per 1,000 Enrollee Months",
        },
        {
          uid: "Average Length of Stay",
          label: "Average Length of Stay",
        },
      ],
      label: "Ages 18 to 64",
    },
  ],
];

const mockValues = {
  componentFlag: "DEFAULT",
  categories: [{ id: "cat-1", label: "cat 1", text: "cat 1" }],
  qualifiers: [{ id: "Ages18to64", label: "qual 1", text: "qual 1" }],
  inputFieldNames: [
    {
      id: "Number of Enrollee Months",
      label: "Number of Enrollee Months",
      text: "Number of Enrollee Months",
    },
  ],
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
      expect(
        screen.getByRole("textbox", {
          name: "default.rates.Ages18to64.cat-1.0.numerator",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("textbox", {
          name: "default.rates.Ages18to64.cat-1.0.denominator",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("textbox", {
          name: "default.rates.Ages18to64.cat-1.0.rate",
        })
      ).toBeVisible();
    });
  });
  it("Test AIF NDRSet render", async () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      categories: [],
      componentFlag: "AIF",
      AIFHHPerformanceMeasureArray,
    });
    renderWithHookForm(<NDRSets name={"aif"} />);

    fireEvent.click(screen.getByRole("checkbox", { name: "qual 1" }));

    await waitFor(() => {
      expect(
        screen.getByRole("textbox", {
          name: "Number of Enrollee Months",
        })
      ).toBeVisible();
    });
  });
  it("Test IU NDRSet render", () => {
    const { categories, qualifiers } = getCatQualLabels("IU-HH");

    mockValues.componentFlag = "IU";
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      categories,
      qualifiers,
      componentFlag: "IU",
      IUHHPerformanceMeasureArray,
    });
    renderWithHookForm(<NDRSets name={"iu"} />);

    screen.debug();
  });
  it("Test PCR NDRSet render", () => {
    const { qualifiers } = getCatQualLabels("PCR-AD");

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockValues,
      componentFlag: "PCR",
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
      expect(
        screen.getByRole("textbox", {
          name: "opm.rates.mockrate.OPM.0.numerator",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("textbox", {
          name: "opm.rates.mockrate.OPM.0.denominator",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("textbox", {
          name: "opm.rates.mockrate.OPM.0.rate",
        })
      ).toBeVisible();
    });
  });
});
