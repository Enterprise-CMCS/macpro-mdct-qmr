import { TopLevelOmsChildren } from "./omsNodeBuilder";
import { renderWithHookForm } from "utils";

describe("Test TopLevelOmsChildren", () => {
  it("Test TopLevelOmsChildren render", () => {
    renderWithHookForm(
      <TopLevelOmsChildren name={""} parentDisplayName={""} id={""} />
    );
  });
});
