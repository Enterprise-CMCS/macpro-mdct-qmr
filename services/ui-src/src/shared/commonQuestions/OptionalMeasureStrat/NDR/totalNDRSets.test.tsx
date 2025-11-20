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

    ["numerator", "denominator", "rate"].forEach((id) => {
      expect(
        screen.getByRole("textbox", {
          name: `total.rates.singleCategory.mock-total.0.${id}`,
        })
      ).toBeVisible();
    });
  });
});
