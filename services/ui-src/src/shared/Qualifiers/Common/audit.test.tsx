import * as CUI from "@chakra-ui/react";
import { render, fireEvent, screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { Audit } from "./";
import { useApiMock } from "utils/testUtils/useApiMock";
import { measureDescriptions } from "measures/measureDescriptions";
import userEvent from "@testing-library/user-event";

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
  beforeEach(() => {
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

    expect(yesBtn).not.toBeChecked();
    userEvent.click(yesBtn);
    expect(yesBtn).toBeChecked();

    const addBtn = screen.getByRole("button", {
      name: "+ Add Another",
    });
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    const removeBtn = screen.getByLabelText("Remove Audit Item");
    userEvent.click(removeBtn);

    expect(noBtn).not.toBeChecked();
    userEvent.click(noBtn);
    expect(noBtn).toBeChecked();
  });
});
