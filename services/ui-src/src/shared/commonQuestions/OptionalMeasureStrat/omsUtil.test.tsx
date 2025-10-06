import { calculateOMSTotal } from "./omsUtil";
import { isLegacyLabel } from "utils";
import { calculateComplexOMSTotal } from "./omsUtil";
import { act, renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { usePerformanceMeasureContext } from "./context";
import { useTotalAutoCalculation } from "./omsUtil";

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  isLegacyLabel: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));
const mockedUseFormContext = useFormContext as jest.Mock;

jest.mock("./context", () => ({
  usePerformanceMeasureContext: jest.fn(),
}));
const mockedUsePFContext = usePerformanceMeasureContext as jest.Mock;

describe("calculateOMSTotal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should calculate the total numerator, denominator, and rate correctly (with legacy label)", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(true);
    const result = calculateOMSTotal({
      cleanedCategory: "category1",
      numberOfDecimals: 2,
      qualifiers: [
        { id: "qual1", label: "testlabel1", text: "testtext1" },
        { id: "qual2", label: "testlabel2", text: "testtext2" },
        { id: "total", label: "testlabeltotal", text: "testtexttotal" },
      ],
      rateMultiplicationValue: 100,
      watchOMS: {
        qual1: {
          category1: [{ numerator: "10", denominator: "20", rate: "50" }],
        },
        qual2: {
          category1: [{ numerator: "30", denominator: "40", rate: "75" }],
        },
      },
    });

    expect(result).toEqual({
      numerator: "40",
      denominator: "60",
      rate: "66.7",
    });
  });

  it("should calculate the total numerator, denominator, and rate correctly (with legacy label false)", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(false);
    const result = calculateOMSTotal({
      cleanedCategory: "category1",
      numberOfDecimals: 2,
      qualifiers: [
        { id: "qual1", label: "testlabel1", text: "testtext1" },
        { id: "qual2", label: "testlabel2", text: "testtext2" },
        { id: "total", label: "testlabeltotal", text: "testtexttotal" },
      ],
      rateMultiplicationValue: 100,
      watchOMS: {
        category1: {
          qual1: [{ numerator: "10", denominator: "20", rate: "50" }],
          qual2: [{ numerator: "30", denominator: "40", rate: "75" }],
        },
      },
    });

    expect(result).toEqual({
      numerator: "40",
      denominator: "60",
      rate: "66.7",
    });
  });

  it("should return undefined values if no valid numerator or denominator exists", () => {
    const result = calculateOMSTotal({
      cleanedCategory: "category1",
      numberOfDecimals: 2,
      qualifiers: [
        { id: "qual1", label: "testlabel1", text: "testtext1" },
        { id: "total", label: "testlabeltotal", text: "testtexttotal" },
      ],
      rateMultiplicationValue: 100,
      watchOMS: {
        qual1: { category1: [{}] },
      },
    });

    expect(result).toEqual({
      numerator: undefined,
      denominator: undefined,
      rate: undefined,
    });
  });
});

describe("calculateComplexOMSTotal", () => {
  const qualifiers = [
    { id: "qual1", label: "Qualifier 1", text: "Qualifier 1" },
    { id: "qual2", label: "Qualifier 2", text: "Qualifier 2" },
    { id: "total", label: "Total", text: "Total" },
  ];

  const watchOMS = {
    qual1: {
      category1: [
        {
          label: "Category 1",
          fields: [
            {
              label: "Number of Enrollee Months",
              value: "20",
            },
            {
              label: "Discharges",
              value: "5",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
              value: "250",
            },
            {
              label: "Days",
              value: "5",
            },
            {
              label: "Days per 1,000 Enrollee Months",
              value: "250",
            },
            {
              label: "Average Length of Stay",
              value: "1.0",
            },
          ],
        },
      ],
    },
    qual2: {
      category1: [
        {
          label: "Category Two",
          fields: [
            {
              label: "Number of Enrollee Months",
              value: "30",
            },
            {
              label: "Discharges",
              value: "10",
            },
            {
              label: "Discharges per 1,000 Enrollee Months",
              value: "333",
            },
            {
              label: "Days",
              value: "8",
            },
            {
              label: "Days per 1,000 Enrollee Months",
              value: "266",
            },
            {
              label: "Average Length of Stay",
              value: "2.6",
            },
          ],
        },
      ],
    },
    Total: {
      category1: [
        {
          fields: [
            { label: "Number of Enrollee Months" },
            { label: "Discharges" },
            { label: "Discharges per 1,000 Enrollee Months" },
            { label: "Days" },
            { label: "Days per 1,000 Enrollee Months" },
            { label: "Average Length of Stay" },
          ],
        },
      ],
    },
  };

  it.only("should calculate totals for IU componentFlag", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(true);
    const result = calculateComplexOMSTotal({
      cleanedCategory: "category1",
      qualifiers,
      watchOMS,
      componentFlag: "IU",
      numberOfDecimals: 2,
    });

    console.log("result:, ", result);

    expect(result).toEqual({
      label: "category1",
      fields: [
        { label: "Number of Enrollee Months", value: "50" }, // 20 + 30
        { label: "Discharges", value: "15" }, // 5 + 10
        { label: "Discharges per 1,000 Enrollee Months", value: "583" }, // Calculated rate (1000 * (250+333) / 10)
        { label: "Days", value: "13" }, // Calculated rate (1000 * 60 / 10)
        { label: "Days per 1,000 Enrollee Months", value: "516" },
        { label: "Average Length of Stay", value: "3.6" }, // Calculated rate (60 / 40)
      ],
      isTotal: true,
    });
  });

  it("should calculate totals for AIF componentFlag", () => {
    //(isLegacyLabel as jest.Mock).mockReturnValue(true);
    const result = calculateComplexOMSTotal({
      cleanedCategory: "singleCategory",
      qualifiers,
      watchOMS,
      componentFlag: "AIF",
      numberOfDecimals: 2,
    });

    console.log("result:, ", result);

    expect(result).toEqual({
      label: "singleCategory",
      fields: [
        { label: "Field 1", value: "40" }, // 10 + 30
        { label: "Field 2", value: "60" }, // 20 + 40
        { label: undefined, value: "4000.0" }, // Calculated rate (1000 * 40 / 10)
        { label: undefined, value: "6000.0" }, // Calculated rate (1000 * 60 / 10)
        { label: undefined, value: undefined }, // No value for long term
        { label: undefined, value: "10000.0" }, // Calculated rate (1000 * 100 / 10)
      ],
      isTotal: true,
    });
  });

  it("should return empty fields if no values are provided", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(true);
    const result = calculateComplexOMSTotal({
      cleanedCategory: "singleCategory",
      qualifiers,
      watchOMS: {},
      componentFlag: "IU",
      numberOfDecimals: 2,
    });

    expect(result).toEqual({
      label: "singleCategory",
      fields: [
        { label: "Field 1", value: undefined },
        { label: "Field 2", value: undefined },
      ],
      isTotal: true,
    });
  });
});

describe("useTotalAutoCalculation", () => {
  it("should send updated totals to RHF when relevant form values change", async () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(true);

    // RHF mocking
    const mockUnsubscribe = jest.fn();
    let watchCallback: Function | undefined;
    const mockWatch = jest.fn().mockImplementation((callback) => {
      watchCallback = callback;
      return { unsubscribe: mockUnsubscribe };
    });
    const mockSetValue = jest.fn();
    mockedUseFormContext.mockReturnValue({
      watch: mockWatch,
      setValue: mockSetValue,
    });

    // Performance Measure mocking
    mockedUsePFContext.mockReturnValue({
      qualifiers: [
        { id: "qualifier1", label: "Qualifier One" },
        { id: "qualifier2", label: "Qualifier Two" },
        { id: "Total", label: "Total" },
      ],
      numberOfDecimals: 2,
      rateMultiplicationValue: 1,
    });

    const formValues = {
      mockName: {
        rates: {
          qualifier1: {
            singleCategory: [
              { numerator: "1", denominator: "3", rate: "0.33" },
            ],
          },
          qualifier2: {
            singleCategory: [
              { numerator: "2", denominator: "5", rate: "0.40" },
            ],
          },
          Total: {
            singleCategory: [
              { numerator: "3", denominator: "8", rate: "0.38" },
            ],
          },
        },
      },
    };
    const watchEventInfo = {
      name: "mockName.rates.qualifier1.singleCategory",
      type: "change",
    };

    const renderResult = renderHook(() =>
      useTotalAutoCalculation({
        name: "mockName",
        componentFlag: "DEFAULT",
      })
    );

    expect(mockWatch).toHaveBeenCalledTimes(1);

    await act(() => watchCallback!(formValues, watchEventInfo));
    expect(mockSetValue).not.toHaveBeenCalled();

    formValues.mockName.rates.qualifier1.singleCategory[0].denominator = "10";
    await act(() => watchCallback!(formValues, watchEventInfo));
    expect(mockSetValue).toHaveBeenCalledWith(
      "mockName.rates.Total.singleCategory",
      [{ numerator: "3", denominator: "15", rate: "0.2" }]
    );

    renderResult.unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
