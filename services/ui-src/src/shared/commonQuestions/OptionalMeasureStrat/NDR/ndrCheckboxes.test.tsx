import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import {
  useAgeGroupsCheckboxes,
  useRenderOPMCheckboxOptions,
} from "./ndrCheckboxes";
import { usePerformanceMeasureContext } from "../context";
import {
  useQualRateArray,
  useRatesForCompletedPmQualifiers,
  useStandardRateArray,
} from "./rates";
import { isLegacyLabel, getLabelText } from "utils";

jest.mock("../context");
jest.mock("./rates");
jest.mock("utils");
jest.mock("dataConstants", () => ({
  DATA_SOURCE: "dataSource",
}));

const mockUsePerformanceMeasureContext =
  usePerformanceMeasureContext as jest.MockedFunction<
    typeof usePerformanceMeasureContext
  >;
const mockUseQualRateArray = useQualRateArray as jest.MockedFunction<
  typeof useQualRateArray
>;
const mockUseRatesForCompletedPmQualifiers =
  useRatesForCompletedPmQualifiers as jest.MockedFunction<
    typeof useRatesForCompletedPmQualifiers
  >;
const mockUseStandardRateArray = useStandardRateArray as jest.MockedFunction<
  typeof useStandardRateArray
>;
const mockIsLegacyLabel = isLegacyLabel as jest.MockedFunction<
  typeof isLegacyLabel
>;
const mockGetLabelText = getLabelText as jest.MockedFunction<
  typeof getLabelText
>;

let ageGroupsResult: any;
let opmResult: any;

const AgeGroupsCheckboxesTest = ({ name }: { name: string }) => {
  ageGroupsResult = useAgeGroupsCheckboxes(name);
  return <div data-testid="age-groups-rendered">Ready</div>;
};

const OPMCheckboxesTest = ({ name }: { name: string }) => {
  opmResult = useRenderOPMCheckboxOptions(name);
  return <div data-testid="opm-rendered">Ready</div>;
};

describe("useAgeGroupsCheckboxes", () => {
  const testName = "testField";

  beforeEach(() => {
    jest.clearAllMocks();
    ageGroupsResult = undefined;
    opmResult = undefined;
  });

  describe("Legacy Label Format", () => {
    beforeEach(() => {
      mockIsLegacyLabel.mockReturnValue(true);
      mockGetLabelText.mockReturnValue({
        "Age 0-17": "Ages 0 to 17",
        "Age 18-64": "Ages 18 to 64",
      });
    });

    it("should build checkboxes for categories when they exist", () => {
      const mockCategories = [
        { id: "cat1", label: "Category 1" },
        { id: "cat2", label: "Category 2" },
      ];
      const mockQualifiers = [
        { id: "qual1", label: "Age 0-17" },
        { id: "qual2", label: "Age 18-64" },
      ];
      const mockRates = [
        [<div key="1">Rate1</div>],
        [<div key="2">Rate2</div>],
      ];

      mockUsePerformanceMeasureContext.mockReturnValue({
        categories: mockCategories,
        qualifiers: mockQualifiers,
        calcTotal: false,
        customPrompt: undefined,
      } as any);

      mockUseStandardRateArray.mockReturnValue(mockRates);
      mockUseQualRateArray.mockReturnValue([]);

      renderWithHookForm(<AgeGroupsCheckboxesTest name={testName} />);

      expect(ageGroupsResult).toHaveLength(2);
      expect(mockUseStandardRateArray).toHaveBeenCalledWith(testName);
      expect(ageGroupsResult[0].displayValue).toBe("Ages 0 to 17");
      expect(ageGroupsResult[1].displayValue).toBe("Ages 18 to 64");
    });

    it("should exclude last qualifier when calcTotal is true", () => {
      const mockQualifiers = [
        { id: "qual1", label: "Age 0-17" },
        { id: "qual2", label: "Age 18-64" },
        { id: "total", label: "Total" },
      ];
      const mockRates = [
        [<div key="1">Rate1</div>],
        [<div key="2">Rate2</div>],
        [<div key="3">Rate3</div>],
      ];

      mockUsePerformanceMeasureContext.mockReturnValue({
        categories: [],
        qualifiers: mockQualifiers,
        calcTotal: true,
        customPrompt: undefined,
      } as any);

      mockUseQualRateArray.mockReturnValue(mockRates);

      renderWithHookForm(<AgeGroupsCheckboxesTest name={testName} />);

      expect(ageGroupsResult).toHaveLength(2);
      expect(ageGroupsResult[0].value).toBe("qual1");
      expect(ageGroupsResult[1].value).toBe("qual2");
    });

    it("should only include checkboxes with non-empty rate arrays", () => {
      const mockQualifiers = [
        { id: "qual1", label: "Age 0-17" },
        { id: "qual2", label: "Age 18-64" },
        { id: "qual3", label: "Age 65+" },
      ];
      const mockRates = [
        [<div key="1">Rate1</div>],
        [],
        [<div key="3">Rate3</div>],
      ];

      mockUsePerformanceMeasureContext.mockReturnValue({
        categories: [],
        qualifiers: mockQualifiers,
        calcTotal: false,
        customPrompt: undefined,
      } as any);

      mockUseQualRateArray.mockReturnValue(mockRates);
      renderWithHookForm(<AgeGroupsCheckboxesTest name={testName} />);

      expect(ageGroupsResult).toHaveLength(2);
      expect(ageGroupsResult[0].value).toBe("qual1");
      expect(ageGroupsResult[1].value).toBe("qual3");
    });
  });

  describe("New Label Format", () => {
    beforeEach(() => {
      mockIsLegacyLabel.mockReturnValue(false);
    });

    it("should use standard rates when categories have labels", () => {
      const mockCategories = [
        { id: "cat1", label: "Category 1", text: "Category 1 Text" },
        { id: "cat2", label: "Category 2", text: "Category 2 Text" },
      ];
      const mockRates = [
        [<div key="1">Rate1</div>],
        [<div key="2">Rate2</div>],
      ];

      mockUsePerformanceMeasureContext.mockReturnValue({
        categories: mockCategories,
        qualifiers: [],
        calcTotal: false,
        customPrompt: undefined,
      } as any);

      mockUseStandardRateArray.mockReturnValue(mockRates);

      renderWithHookForm(<AgeGroupsCheckboxesTest name={testName} />);

      expect(ageGroupsResult).toHaveLength(2);
      expect(mockUseStandardRateArray).toHaveBeenCalledWith(testName);
      expect(ageGroupsResult[0].displayValue).toBe("Category 1 Text");
    });
  });

  describe("Data Source Display Logic", () => {
    beforeEach(() => {
      mockIsLegacyLabel.mockReturnValue(false);
    });

    it("should set shouldDisplay to false when data source is Administrative only", () => {
      const mockQualifiers = [{ id: "qual1", label: "", text: "Age Group 1" }];
      const mockRates = [[<div key="1">Rate1</div>]];

      mockUsePerformanceMeasureContext.mockReturnValue({
        categories: [],
        qualifiers: mockQualifiers,
        calcTotal: false,
        customPrompt: undefined,
      } as any);

      mockUseRatesForCompletedPmQualifiers.mockReturnValue(mockRates);

      renderWithHookForm(<AgeGroupsCheckboxesTest name={testName} />, {
        defaultValues: {
          dataSource: ["AdministrativeData"],
        },
      });

      expect(ageGroupsResult[0].children).toHaveLength(3);
      expect(ageGroupsResult[0].children![1].props.hidden).toBe(true);
    });
  });
});

describe("useRenderOPMCheckboxOptions", () => {
  const testName = "testOPMField";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Legacy Label Format", () => {
    beforeEach(() => {
      mockIsLegacyLabel.mockReturnValue(true);
    });

    it("should build OPM checkboxes with legacy structure", () => {
      const mockOPM = [
        { description: "OPM Measure 1" },
        { description: "OPM Measure 2" },
      ];

      mockUsePerformanceMeasureContext.mockReturnValue({
        OPM: mockOPM,
        customPrompt: undefined,
        rateReadOnly: false,
        rateMultiplicationValue: 100,
      } as any);

      renderWithHookForm(<OPMCheckboxesTest name={testName} />);

      expect(opmResult).toHaveLength(2);
      expect(opmResult[0].displayValue).toBe("OPM Measure 1");
      expect(opmResult[1].displayValue).toBe("OPM Measure 2");
    });
  });
  describe("Edge Cases", () => {
    beforeEach(() => {
      mockIsLegacyLabel.mockReturnValue(false);
    });
    it("should handle OPM entries without description", () => {
      const mockOPM = [
        { description: "OPM Measure 1" },
        { description: undefined },
        { description: "OPM Measure 3" },
      ];

      mockUsePerformanceMeasureContext.mockReturnValue({
        OPM: mockOPM,
        customPrompt: undefined,
      } as any);

      renderWithHookForm(<OPMCheckboxesTest name={testName} />);

      expect(opmResult).toHaveLength(2);
      expect(opmResult[0].displayValue).toBe("OPM Measure 1");
      expect(opmResult[1].displayValue).toBe("OPM Measure 3");
    });

    it("should respect data source for display helper text", () => {
      const mockOPM = [{ description: "OPM Measure 1" }];

      mockUsePerformanceMeasureContext.mockReturnValue({
        OPM: mockOPM,
        customPrompt: undefined,
      } as any);

      renderWithHookForm(<OPMCheckboxesTest name={testName} />, {
        defaultValues: {
          dataSource: ["AdministrativeData"],
        },
      });

      expect(opmResult[0].children![1].props.hidden).toBe(true);
    });
  });
});
