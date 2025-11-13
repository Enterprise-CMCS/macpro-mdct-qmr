import * as CUI from "@chakra-ui/react";
import { renderWithHookForm } from "utils";
import { GeneralAge } from "./generalAge";

const data = {
  title: "",
  formData: [],
  questionTitle: "",
  qualifierHeader: (year: string) => {
    return year;
  },
  textTable: [],
  fieldValues: [],
  ageQuestion: { label: "" },
};
describe("Test CostSavingsData Component", () => {
  it("Test CostSavingsData Render", () => {
    renderWithHookForm(
      <CUI.List>
        <GeneralAge data={data} />
      </CUI.List>
    );
  });
});
