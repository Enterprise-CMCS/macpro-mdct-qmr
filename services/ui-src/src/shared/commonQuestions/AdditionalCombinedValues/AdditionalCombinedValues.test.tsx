import { AdditionalCombinedValues } from "./AdditionalCombinedValues";
import { render, screen } from "@testing-library/react";
import { DataSourcePayload } from "types";

describe("Combined Rates - Additional Values", () => {
  it("Should not render a table when a measure has no non-NDR values", () => {
    const payload = {
      DataSources: {
        Medicaid: {} as DataSourcePayload,
        CHIP: {} as DataSourcePayload,
      },
      Rates: [],
      AdditionalValues: [],
    };
    const props = {
      payload,
      year: "2024",
      measure: "ADD-CH",
    };

    render(<AdditionalCombinedValues {...props} />);

    const columnHeaders = ["Medicaid", "Separate CHIP", "Combined Count"];
    for (let header of columnHeaders) {
      expect(screen.queryByText(header)).not.toBeInTheDocument();
    }
  });

  it("Should render additional values when present", () => {
    const payload = {
      DataSources: {
        Medicaid: {} as DataSourcePayload,
        CHIP: {} as DataSourcePayload,
      },
      Rates: [],
      AdditionalValues: [
        {
          uid: "cat0.qual0",
          label: "Mock Value Label",
          Medicaid: 15,
          CHIP: 10,
          Combined: 25,
        },
      ],
    };
    const props = {
      payload,
      year: "2024",
      measure: "ADD-CH",
    };

    const { container } = render(<AdditionalCombinedValues {...props} />);

    const columnHeaders = ["Medicaid", "Separate CHIP", "Combined Count"];
    for (let header of columnHeaders) {
      expect(screen.getByText(header)).toBeInTheDocument();
    }
    const cells = [...container.querySelectorAll("tbody td")];
    expect(cells[0]).toHaveTextContent("15");
    expect(cells[1]).toHaveTextContent("10");
    expect(cells[2]).toHaveTextContent("25");
  });

  it("Should render appropriate defaults for missing values", () => {
    const payload = {
      DataSources: {
        Medicaid: {} as DataSourcePayload,
        CHIP: { isUnusableForCalc: true } as DataSourcePayload,
      },
      Rates: [],
      AdditionalValues: [
        {
          uid: "cat0.qual0",
          label: "Mock Value Label",
          Medicaid: undefined,
          CHIP: undefined,
          Combined: undefined,
        },
      ],
    };
    const props = {
      payload,
      year: "2024",
      measure: "ADD-CH",
    };

    const { container } = render(<AdditionalCombinedValues {...props} />);

    const cells = container.querySelectorAll("tbody tr td");
    expect(cells[0]).toHaveTextContent("Not Reported"); // Medicaid
    expect(cells[1]).toHaveTextContent("Not Applicable"); // CHIP
    expect(cells[2]).toHaveTextContent(""); // Combined
  });

  it("Should render certain values with trailing zeroes", () => {
    const payload = {
      DataSources: {
        Medicaid: {} as DataSourcePayload,
        CHIP: {} as DataSourcePayload,
      },
      Rates: [],
      AdditionalValues: [
        {
          uid: "cat0.qual0",
          label: "Mock Value Label",
          Medicaid: 1,
          CHIP: 2,
          Combined: 3,
        },
        {
          uid: "zcwVcA.Nfe4Cn",
          label: "Outlier Rate (PCR-AD)",
          Medicaid: 1,
          CHIP: 2,
          Combined: 3,
        },
        {
          uid: "zcwVcA.GWePur",
          label: "Observed Readmission Rate (PCR-AD)",
          Medicaid: 1,
          CHIP: 2,
          Combined: 3,
        },
      ],
    };
    const props = {
      payload,
      year: "2024",
      measure: "PCR-AD",
    };

    const { container } = render(<AdditionalCombinedValues {...props} />);

    const columnHeaders = ["Medicaid", "Separate CHIP", "Combined Count"];
    for (let header of columnHeaders) {
      expect(screen.queryByText(header)).toBeInTheDocument();
    }
    const table = [...container.querySelectorAll("tbody tr")].map((row) =>
      row.querySelectorAll("td")
    );

    // "Normal" values; no special rendering
    expect(table[0][0]).toHaveTextContent("1");
    expect(table[0][1]).toHaveTextContent("2");
    expect(table[0][2]).toHaveTextContent("3");

    // The PCR-AD outlier rate is displayed with 1 decimal place
    expect(table[1][0]).toHaveTextContent("1.0");
    expect(table[1][1]).toHaveTextContent("2.0");
    expect(table[1][2]).toHaveTextContent("3.0");

    // The PCR-AD readmission rates are displayed with 4 decimal places
    expect(table[2][0]).toHaveTextContent("1.0000");
    expect(table[2][1]).toHaveTextContent("2.0000");
    expect(table[2][2]).toHaveTextContent("3.0000");
  });

  it("should look up labels by UID", () => {
    const payload = {
      DataSources: {
        Medicaid: {} as DataSourcePayload,
        CHIP: {} as DataSourcePayload,
      },
      Rates: [],
      AdditionalValues: [
        {
          uid: "zcwVcA.pBILL1",
          label: "mock label - will be overridden",
          Medicaid: 1,
          CHIP: 2,
          Combined: 3,
        },
      ],
    };
    const props = {
      payload,
      year: "2024",
      measure: "PCR-AD",
    };

    render(<AdditionalCombinedValues {...props} />);

    expect(screen.getByText("Number of Outliers")).toBeInTheDocument();
  });
});
