import { CostSavingsData } from "./costSavingsData";
import * as CUI from "@chakra-ui/react";
import { renderWithHookForm } from "utils";

describe("Test CostSavingsData Component", () => {
  it("Test CostSavingsData Render", () => {
    renderWithHookForm(
      <CUI.List>
        <CostSavingsData year={"2025"} />
      </CUI.List>
    );
  });
});
