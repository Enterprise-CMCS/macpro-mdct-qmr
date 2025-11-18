import { screen } from "@testing-library/react";
import { TotalNDRSets } from "./totalNDRSets";
import { renderWithHookForm } from "utils";

jest.mock("../context", () => ({
  ...jest.requireActual("../context"),
  usePerformanceMeasureContext: () => {
    return {
      componentFlag: "PCR",
      qualifiers: [
        { id: "mock-id", label: "qual 1" },
        { id: "mock-total", label: "Total" },
      ],
      categories: [],
    };
  },
}));

describe("Test TotalNDRSets component", () => {
  it("Test TotalNDRSets Render", () => {
    renderWithHookForm(<TotalNDRSets componentFlag="DEFAULT" name="total" />);

    expect(
      screen.getByRole("textbox", {
        name: "total.rates.singleCategory.mock-total.0.numerator",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "total.rates.singleCategory.mock-total.0.denominator",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "total.rates.singleCategory.mock-total.0.rate",
      })
    ).toBeVisible();
  });
});
