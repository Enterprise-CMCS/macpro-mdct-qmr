import { renderWithHookForm } from "utils";
import {
  AddAnotherSection,
  AddAnotherSectionAccordian,
} from "./additionalCategory";

describe("Test AddAnotherSection Component", () => {
  it("Test AddAnotherSection render", () => {
    renderWithHookForm(<AddAnotherSection name={""} parentName={""} />);
  });
});

describe("Test AddAnotherSectionAccordian Component", () => {
  it("Test AddAnotherSectionAccordian render", () => {
    renderWithHookForm(
      <AddAnotherSectionAccordian name={""} parentName={""} />
    );
  });
});
