import * as CUI from "@chakra-ui/react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { Audit } from "./";
import { useApiMock } from "utils/testUtils/useApiMock";
import { measureDescriptions } from "measures/measureDescriptions";

const useGetMeasuresValues = {
  isLoading: false,
  error: undefined,
  isError: undefined,
  data: {
    Items: [
      {
        autoCompleted: false,
        coreSet: "ACS",
        createdAt: 1642167976771,
        lastAltered: 1642167976771,
        compoundKey: "AL2024ACSAAB-AD",
        measure: "AAB-AD",
        description: measureDescriptions[2024]["AAB-AD"],
        state: "AL",
        status: "incomplete",
        year: 2024,
      },
    ],
  },
};

describe("Test Audit Component", () => {
  describe("Test no data", () => {
    it("Check that Audit does not render", () => {
      useGetMeasuresValues.isLoading = true;
      const emptyData = { useGetMeasuresValues: useGetMeasuresValues };
      useApiMock(emptyData);
      renderWithHookForm(
        <CUI.OrderedList>
          <Audit type={"AD"} year={"2025"} />
        </CUI.OrderedList>
      );
      expect(screen.queryByText("Audit or Validation of Measures")).toBeNull();
      expect(
        screen.queryByText(
          "Were any of the Core Set measures audited or validated?"
        )
      ).toBeNull();
      expect(
        screen.queryByRole("radio", {
          name: "Yes, some of the Core Set measures have been audited or validated",
        })
      ).toBeNull();
      expect(
        screen.queryByRole("radio", {
          name: "No, none of the Core Set measures have been audited or validated",
        })
      ).toBeNull();
    });
  });
  describe("Test with data", () => {
    beforeEach(() => {
      useGetMeasuresValues.isLoading = false;
      const apiData = { useGetMeasuresValues: useGetMeasuresValues };
      useApiMock(apiData);
      renderWithHookForm(
        <CUI.OrderedList>
          <Audit type={"AD"} year={"2025"} />
        </CUI.OrderedList>
      );
    });
    it("Check that Audit renders", () => {
      expect(
        screen.getByText("Audit or Validation of Measures")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Were any of the Core Set measures audited or validated?"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", {
          name: "Yes, some of the Core Set measures have been audited or validated",
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("radio", {
          name: "No, none of the Core Set measures have been audited or validated",
        })
      ).toBeInTheDocument();
    });

    it("Check radio buttons are clickable", () => {
      const yesBtn = screen.getByRole("radio", {
        name: "Yes, some of the Core Set measures have been audited or validated",
      });
      const noBtn = screen.getByRole("radio", {
        name: "No, none of the Core Set measures have been audited or validated",
      });

      //click the yes button
      expect(yesBtn).not.toBeChecked();
      fireEvent.click(
        screen.getByText(
          "Yes, some of the Core Set measures have been audited or validated"
        )
      );
      //test add another
      expect(yesBtn).toBeChecked();
      fireEvent.click(screen.getByText("+ Add Another"));

      //test remove another
      fireEvent.click(screen.getByLabelText("Remove Audit Item"));

      //click the no button
      expect(noBtn).not.toBeChecked();
      fireEvent.click(
        screen.getByText(
          "No, none of the Core Set measures have been audited or validated"
        )
      );
      expect(noBtn).toBeChecked();
    });
  });
});
