import * as CUI from "@chakra-ui/react";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils";
import { GeneralAge } from "./generalAge";

const data = {
  title: "mock title",
  formData: [],
  questionTitle: "mock question title",
  qualifierHeader: (year: string) => {
    return year;
  },
  textTable: [],
  fieldValues: [],
  ageQuestion: { label: "mock label" },
};

const component = (
  <CUI.List>
    <GeneralAge data={data} />
  </CUI.List>
);
describe("Test GeneralAge Component", () => {
  it("Test GeneralAge Render", () => {
    const { container } = renderWithHookForm(component);

    const textarea = container.querySelector("textarea");
    expect(screen.getByText("mock label")).toBeVisible();
    expect(textarea).toBeVisible();
  });
});
