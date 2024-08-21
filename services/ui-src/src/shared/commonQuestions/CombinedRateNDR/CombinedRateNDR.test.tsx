import { CombinedRateNDR } from "./CombinedRateNDR";
import { render, screen } from "@testing-library/react";
import { DataSource } from "types";

const adminDataSource = {
  DataSource: [DataSource.Administrative],
  DataSourceSelections: {
    AdministrativeData0: {
      selected: ["MedicaidManagementInformationSystemMMIS"],
    },
  },
  requiresWeightedCalc: false,
  isUnusableForCalc: false,
};

const hybridDataSource = {
  DataSource: [DataSource.Hybrid],
  DataSourceSelections: {
    HybridAdministrativeandMedicalRecordsData0: {
      selected: ["MedicaidManagementInformationSystemMMIS"],
    },
    HybridAdministrativeandMedicalRecordsData1: {
      selected: ["Paper"],
    },
  },
  requiresWeightedCalc: true,
  isUnusableForCalc: false,
};

const nonApplicableDataSource = {
  DataSource: [DataSource.Administrative],
  DataSourceSelections: {
    AdministrativeData0: {
      selected: ["MedicaidManagementInformationSystemMMIS"],
    },
  },
  requiresWeightedCalc: false,
  isUnusableForCalc: true,
};

const completeRate = {
  uid: "SU6HXz.kINeRZ",
  label: "Ages 18 to 64",
  Medicaid: {
    numerator: 9,
    denominator: 50,
    rate: 18,
  },
  CHIP: {
    numerator: 2,
    denominator: 20,
    rate: 10,
  },
  Combined: {
    numerator: 11,
    denominator: 70,
    rate: 15.7,
  },
};

const completeWeightedRate = {
  uid: "SU6HXz.kINeRZ",
  label: "Ages 18 to 64",
  Medicaid: {
    numerator: 9,
    denominator: 50,
    population: 200,
    weightedRate: 12,
  },
  CHIP: {
    numerator: 2,
    denominator: 20,
    population: 100,
    weightedRate: 3.3,
  },
  Combined: {
    population: 300,
    weightedRate: 15.3,
  },
};

const incompleteRate = {
  uid: "SU6HXz.kINeRZ",
  label: "Ages 18 to 64",
  Medicaid: {},
  CHIP: {},
  Combined: {},
};

describe("Combined Rate NDR tables", () => {
  it("Should display weighted rate for hybrid-sourced data", () => {
    const year = "2024";
    const measure = "AAB-AD";
    const payload = {
      DataSources: {
        Medicaid: hybridDataSource,
        CHIP: adminDataSource,
      },
      Rates: [completeWeightedRate],
      AdditionalValues: [],
    };

    render(<CombinedRateNDR {...{ payload, year, measure }} />);

    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(screen.getByText("Measure-Eligible Population")).toBeInTheDocument();
    expect(screen.getByText("Weighted Rate")).toBeInTheDocument();
  });

  it("Should not display weighted rate for admin-sourced data", () => {
    const year = "2024";
    const measure = "AAB-AD";
    const payload = {
      DataSources: {
        Medicaid: adminDataSource,
        CHIP: adminDataSource,
      },
      Rates: [completeRate],
      AdditionalValues: [],
    };

    render(<CombinedRateNDR {...{ payload, year, measure }} />);

    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(
      screen.queryByText("Measure-Eligible Population")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Weighted Rate")).not.toBeInTheDocument();
  });

  it("Should display appropriate text for missing values", () => {
    const year = "2024";
    const measure = "AAB-AD";
    const payload = {
      DataSources: {
        Medicaid: adminDataSource,
        CHIP: nonApplicableDataSource,
      },
      Rates: [incompleteRate],
      AdditionalValues: [],
    };

    const props = { payload, year, measure };
    const { container } = render(<CombinedRateNDR {...props} />);

    const tableCells = [...container.querySelectorAll("table tr")].map((row) =>
      [...row.querySelectorAll("th, td")].map((cell) => cell.textContent)
    );

    // First, confirm the column headers & row headers are what we expect
    expect(tableCells[0][1]).toBe("Medicaid");
    expect(tableCells[0][2]).toBe("Separate CHIP");
    expect(tableCells[0][3]).toBe("Combined Rate");
    expect(tableCells[1][0]).toBe("Numerator");
    expect(tableCells[2][0]).toBe("Denominator");
    expect(tableCells[3][0]).toBe("Rate");

    // The Medicaid measure's numerator was not reported
    expect(tableCells[1][1]).toBe("Not Reported");
    // The CHIP measure wasn't usable for combined calculations
    expect(tableCells[1][2]).toBe("Not Applicable");
    // The combined numerator is simply absent
    expect(tableCells[1][3]).toBe("");

    // For rates, the default text is always a dash
    expect(tableCells[3][1]).toBe("-");
    expect(tableCells[3][2]).toBe("-");
    expect(tableCells[3][3]).toBe("-");
  });

  it("Should sort rates to match the individual measure pages", () => {
    const year = "2024";
    const measure = "AAB-AD";
    const payload = {
      DataSources: {
        Medicaid: adminDataSource,
        CHIP: adminDataSource,
      },
      Rates: [
        {
          ...completeRate,
          uid: "SU6HXz.EreZBY",
          label: "Ages 65 and Older",
        },
        {
          ...completeRate,
          uid: "SU6HXz.kINeRZ",
          label: "Ages 18 to 64",
        },
      ],
      AdditionalValues: [],
    };

    const props = { payload, year, measure };
    const { container } = render(<CombinedRateNDR {...props} />);

    const tableHeadings = container.querySelectorAll("section h2");
    expect(tableHeadings[0]).toHaveTextContent("Ages 18 to 64");
    expect(tableHeadings[1]).toHaveTextContent("Ages 65 and Older");
  });
});
