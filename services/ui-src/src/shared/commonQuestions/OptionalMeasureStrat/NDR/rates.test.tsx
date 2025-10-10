import { renderHook } from "@testing-library/react";
import { isLegacyLabel } from "utils";
import {
  useStandardRateArray,
  useRatesForCompletedPmQualifiers,
  useQualRateArray,
} from "./rates";
import { usePerformanceMeasureContext } from "../context";

// Mock dependencies
jest.mock("components", () => ({
  Rate: jest.fn(() => <div data-testid="rate-component" />),
  ComplexRate: jest.fn(() => <div data-testid="complex-rate-component" />),
}));

jest.mock("utils", () => ({
  isLegacyLabel: jest.fn(),
}));

jest.mock("../context", () => ({
  usePerformanceMeasureContext: jest.fn(),
}));

jest.mock("dataConstants", () => ({
  SINGLE_CATEGORY: "singleCategory",
}));

describe("useStandardRateArray", () => {
  const mockContext = {
    categories: [
      { id: "cat1", label: "Category 1" },
      { id: "cat2", label: "Category 2" },
    ],
    qualifiers: [
      { id: "qual1", label: "Qualifier 1" },
      { id: "qual2", label: "Qualifier 2" },
    ],
    performanceMeasureArray: null,
    IUHHPerformanceMeasureArray: null,
    AIFHHPerformanceMeasureArray: null,
    calcTotal: false,
    rateReadOnly: false,
    measureName: "TestMeasure",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockContext);
  });

  it("should return empty array when no performance measure array exists", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useStandardRateArray("testName"));

    expect(result.current).toEqual([[], []]);
  });

  it("should process legacy labels with standard performance measure", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(true);
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      performanceMeasureArray: [
        [{ rate: "85", uid: "qual1.cat1" }],
        [{ rate: "90", uid: "qual1.cat2" }],
      ],
    });

    const { result } = renderHook(() => useStandardRateArray("testName"));

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toHaveLength(2);
  });

  it("should exclude total qualifier when calcTotal is true", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(true);
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      calcTotal: true,
      qualifiers: [
        { id: "qual1", label: "Qualifier 1" },
        { id: "total", label: "Total" },
      ],
      performanceMeasureArray: [[{ rate: "85" }]],
    });

    const { result } = renderHook(() => useStandardRateArray("testName"));

    // Should only process first qualifier, excluding total
    expect(result.current).toHaveLength(1);
  });

  it("should process non-legacy labels with categories", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(false);
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      performanceMeasureArray: [
        [
          { rate: "85", uid: "cat1.qual1", label: "Q1" },
          { rate: "90", uid: "cat1.qual2", label: "Q2" },
        ],
      ],
    });

    const { result } = renderHook(() => useStandardRateArray("testName"));

    expect(result.current).toHaveLength(2);
  });

  it("should handle IUHH performance measure array", () => {
    (isLegacyLabel as jest.Mock).mockReturnValue(false);
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      IUHHPerformanceMeasureArray: [
        [
          {
            uid: "cat1.qual1",
            label: "Q1",
            fields: [
              {},
              {},
              { value: "10" }, // rate1
              {},
              { value: "20" }, // rate2
              { value: "30" }, // rate3
            ],
          },
        ],
      ],
    });

    const { result } = renderHook(() => useStandardRateArray("testName"));

    expect(result.current).toHaveLength(2);
  });
});

describe("useRatesForCompletedPmQualifiers", () => {
  const mockContext = {
    categories: [{ id: "cat1", label: "Category 1" }],
    qualifiers: [
      { id: "qual1", label: "Qualifier 1" },
      { id: "qual2", label: "Qualifier 2" },
    ],
    calcTotal: false,
    performanceMeasureArray: null,
    AIFHHPerformanceMeasureArray: null,
    rateReadOnly: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockContext);
  });

  it("should only show rates for completed qualifiers", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      performanceMeasureArray: [
        [
          { rate: "85", uid: "cat1.qual1" },
          { rate: null, uid: "cat1.qual2" },
        ],
      ],
    });

    const { result } = renderHook(() =>
      useRatesForCompletedPmQualifiers("testName")
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toHaveLength(1); // qual1 has rate
    expect(result.current[1]).toHaveLength(0); // qual2 has no rate
  });

  it("should handle single category default", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      categories: [],
      performanceMeasureArray: [[{ rate: "85", uid: "singleCategory.qual1" }]],
    });

    const { result } = renderHook(() =>
      useRatesForCompletedPmQualifiers("testName")
    );

    expect(result.current).toHaveLength(2);
  });

  it("should exclude total when calcTotal is true", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      calcTotal: true,
      qualifiers: [
        { id: "qual1", label: "Qualifier 1" },
        { id: "total", label: "Total" },
      ],
      performanceMeasureArray: [[{ rate: "85", uid: "cat1.qual1" }]],
    });

    const { result } = renderHook(() =>
      useRatesForCompletedPmQualifiers("testName")
    );

    expect(result.current).toHaveLength(1);
  });

  it("should handle AIFHH performance measure array", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      AIFHHPerformanceMeasureArray: [
        [
          {
            label: "Test",
            fields: [{}, {}, { value: "10" }, {}, { value: "20" }],
          },
        ],
      ],
      performanceMeasureArray: [[{ rate: null, uid: "cat1.qual1" }]],
    });

    const { result } = renderHook(() =>
      useRatesForCompletedPmQualifiers("testName")
    );

    expect(result.current[0].length).toBeGreaterThan(0);
  });
});

describe("useQualRateArray", () => {
  const mockContext = {
    qualifiers: [
      { id: "qual1", label: "Qualifier 1" },
      { id: "qual2", label: "Qualifier 2" },
    ],
    calcTotal: false,
    performanceMeasureArray: null,
    AIFHHPerformanceMeasureArray: null,
    rateReadOnly: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue(mockContext);
  });

  it("should create rate arrays for each qualifier with rates", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      performanceMeasureArray: [[{ rate: "85" }, { rate: "90" }]],
    });

    const { result } = renderHook(() => useQualRateArray("testName"));

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toHaveLength(1);
    expect(result.current[1]).toHaveLength(1);
  });

  it("should return empty array for qualifiers without rates", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      performanceMeasureArray: [[{ rate: "85" }, { rate: null }]],
    });

    const { result } = renderHook(() => useQualRateArray("testName"));

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toHaveLength(1);
    expect(result.current[1]).toHaveLength(0);
  });

  it("should exclude total when calcTotal is true", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      calcTotal: true,
      qualifiers: [
        { id: "qual1", label: "Qualifier 1" },
        { id: "total", label: "Total" },
      ],
      performanceMeasureArray: [[{ rate: "85" }, { rate: "95" }]],
    });

    const { result } = renderHook(() => useQualRateArray("testName"));

    expect(result.current).toHaveLength(1);
  });

  it("should handle AIFHH performance measure array", () => {
    (usePerformanceMeasureContext as jest.Mock).mockReturnValue({
      ...mockContext,
      AIFHHPerformanceMeasureArray: [
        [
          {
            label: "Test",
            fields: [{}, {}, { value: "10" }],
          },
        ],
      ],
      performanceMeasureArray: [[{ rate: null }]],
    });

    const { result } = renderHook(() => useQualRateArray("testName"));

    expect(result.current.length).toBeGreaterThan(0);
  });

  it("should handle missing performance measure array", () => {
    const { result } = renderHook(() => useQualRateArray("testName"));

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toHaveLength(0);
    expect(result.current[1]).toHaveLength(0);
  });
});
