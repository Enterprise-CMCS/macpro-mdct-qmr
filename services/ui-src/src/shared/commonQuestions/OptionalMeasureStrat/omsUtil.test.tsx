import { calculateOMSTotal } from "./omsUtil";
import { isLegacyLabel } from "utils";
import { clearMocks } from "shared/util/validationsMock";
import { calculateComplexOMSTotal } from "./omsUtil";

jest.mock("utils", () => ({
  ...jest.requireActual("utils"),
  isLegacyLabel: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));

jest.mock("./context", () => ({
  usePerformanceMeasureContext: jest.fn(),
}));

/*
const TestComponent = ({
  name,
  cleanedCategory,
  componentFlag,
  watchValues,
}: {
  name: string;
  cleanedCategory: string;
  componentFlag: ComponentFlagType;
  watchValues: any;
}) => {
  const { watch, setValue } = useFormContext();
  watch.mockReturnValue(watchValues);

  useTotalAutoCalculation({
    name,
    cleanedCategory,
    componentFlag,
  });

  return <div>Test Component</div>;
}; */

describe("calculateOMSTotal", () => {
  afterEach(() => {
    clearMocks();
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
          fields: [
            { label: "Field 1", value: "10" },
            { label: "Field 2", value: "20" },
          ],
        },
      ],
    },
    qual2: {
      category1: [
        {
          fields: [
            { label: "Field 1", value: "30" },
            { label: "Field 2", value: "40" },
          ],
        },
      ],
    },
    total: {
      category1: [
        {
          fields: [{ label: "Field 1" }, { label: "Field 2" }],
        },
      ],
    },
  };

  it("should calculate totals for IU componentFlag", () => {
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
        { label: "Field 1", value: "40" }, // 10 + 30
        { label: "Field 2", value: "60" }, // 20 + 40
        { label: undefined, value: "4000.0" }, // Calculated rate (1000 * 40 / 10)
        { label: undefined, value: "6000.0" }, // Calculated rate (1000 * 60 / 10)
        { label: undefined, value: "1.5" }, // Calculated rate (60 / 40)
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

/*
describe("useTotalAutoCalculation", () => {
  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      watch: jest.fn(),
      setValue: jest.fn(),
    });

    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      qualifiers: [
        { id: "qual1", label: "Qualifier 1" },
        { id: "qual2", label: "Qualifier 2" },
        { id: "total", label: "Total" },
      ],
      numberOfDecimals: 2,
      rateMultiplicationValue: 100,
    });
  });

  it("should calculate total if fields have changed", () => {
    render(
      <TestComponent
        name="test"
        cleanedCategory="singleCategory"
        componentFlag="DEFAULT"
        watchValues={{
          "test.rates": {
            qual1: {
              singleCategory: [
                { numerator: "10", denominator: "20", rate: "50" },
              ],
            },
            qual2: {
              singleCategory: [
                { numerator: "30", denominator: "40", rate: "75" },
              ],
            },
          },
        }}
      />
    );

    expect(setValueMock).toHaveBeenCalledWith(
      "test.rates.total.singleCategory",
      [
        {
          numerator: "40",
          denominator: "60",
          rate: "66.7",
        },
      ]
    );
  });

 
  it("should not calculate total if fields have not changed", () => {
    const watchOMS = {
      qual1: {
        singleCategory: [{ numerator: "10", denominator: "20", rate: "50" }],
      },
      qual2: {
        singleCategory: [{ numerator: "30", denominator: "40", rate: "75" }],
      },
    };

    watchMock.mockImplementation((callback) => {
      callback(
        { "test.rates": watchOMS },
        { name: "test.rates.qual1.singleCategory", type: "change" }
      );
    });

    act(() => {
      useTotalAutoCalculation({
        name: "test",
        cleanedCategory: "singleCategory",
        componentFlag: "DEFAULT",
      });
    });

    expect(setValueMock).not.toHaveBeenCalled();
  });

  it("should handle IU componentFlag correctly", () => {
    const watchOMS = {
      qual1: {
        singleCategory: [{ fields: [{ value: "10" }, { value: "20" }] }],
      },
      qual2: {
        singleCategory: [{ fields: [{ value: "30" }, { value: "40" }] }],
      },
    };

    watchMock.mockImplementation((callback) => {
      callback(
        { "test.rates": watchOMS },
        { name: "test.rates.qual1.singleCategory", type: "change" }
      );
    });

    act(() => {
      useTotalAutoCalculation({
        name: "test",
        cleanedCategory: "singleCategory",
        componentFlag: "IU",
      });
    });

    expect(setValueMock).toHaveBeenCalled();
  });

  it("should handle AIF componentFlag correctly", () => {
    const watchOMS = {
      qual1: {
        singleCategory: [{ fields: [{ value: "10" }, { value: "20" }] }],
      },
      qual2: {
        singleCategory: [{ fields: [{ value: "30" }, { value: "40" }] }],
      },
    };

    watchMock.mockImplementation((callback) => {
      callback(
        { "test.rates": watchOMS },
        { name: "test.rates.qual1.singleCategory", type: "change" }
      );
    });

    act(() => {
      useTotalAutoCalculation({
        name: "test",
        cleanedCategory: "singleCategory",
        componentFlag: "AIF",
      });
    });

    expect(setValueMock).toHaveBeenCalled();
  });
  }); 
}); */
