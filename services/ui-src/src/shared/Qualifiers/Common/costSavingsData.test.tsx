import { screen } from "@testing-library/react";
import { CostSavingsData } from "./costSavingsData";
import * as CUI from "@chakra-ui/react";
import { renderWithHookForm } from "utils";

describe("Test CostSavingsData Component", () => {
  it("Test CostSavingsData render", () => {
    renderWithHookForm(
      <CUI.List>
        <CostSavingsData year={"2025"} />
      </CUI.List>
    );

    expect(screen.getByText("Cost Savings Data")).toBeVisible();
    expect(
      screen.getByRole("textbox", { name: "yearlyCostSavings" })
    ).toBeVisible();
    expect(
      screen.getByRole("textbox", {
        name: "Please describe your cost savings methodology:",
      })
    ).toBeVisible();
    expect(
      screen.getByRole("button", {
        name: "file upload icon Drag & drop or browse Maximum file size of 80MB.",
      })
    ).toBeVisible();
  });
});
