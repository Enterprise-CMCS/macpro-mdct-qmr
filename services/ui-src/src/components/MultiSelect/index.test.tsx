import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

const TestComponent = () => {
  return (
    <QMR.MultiSelect
      name="multiSelect"
      multiSelectList={[
        {
          label: "AMM-AD - Antidepressant Medication Management",
          value: "AMM-AD",
          isChecked: false,
          isVisible: true,
        },
        {
          label: "AMR-AD - Asthma Medication Ratio: Ages 19 to 64",
          value: "AMR-AD",
          isChecked: true,
          isVisible: true,
        },
        {
          label: "BCS-AD - Breast Cancer Screening",
          value: "BCS-AD",
          isChecked: true,
          isVisible: true,
        },
      ]}
    />
  );
};

describe("Test the MultiSelect component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {
      defaultValues: {
        "test-component": "Other",
      },
    });
  });

  test("Check whether the component renders", () => {
    expect(screen.getByText(/Select All/i)).toBeInTheDocument();
  });

  test("Check whether the checkAll feature works", () => {
    const checkAll = screen.getByDisplayValue("selectAll") as HTMLInputElement;
    const checkboxAmmAd = screen.getByDisplayValue(
      "AMM-AD"
    ) as HTMLInputElement;
    const checkboxAmrAd = screen.getByDisplayValue(
      "AMR-AD"
    ) as HTMLInputElement;
    const checkboxBcsAd = screen.getByDisplayValue(
      "BCS-AD"
    ) as HTMLInputElement;
    fireEvent.click(checkAll);
    expect(checkboxAmmAd.checked).toEqual(true);
    expect(checkboxAmrAd.checked).toEqual(true);
    expect(checkboxBcsAd.checked).toEqual(true);
  });

  test("Check whether checking all checkboxes if checked, checks on the checkAll element automatically", () => {
    const checkboxAmmAd = screen.getByDisplayValue(
      "AMM-AD"
    ) as HTMLInputElement;
    fireEvent.click(checkboxAmmAd);
    const checkAll = screen.getByDisplayValue("selectAll") as HTMLInputElement;
    expect(checkAll.checked).toEqual(true);
  });

  test("Check whether filter works", () => {
    const filterInput = screen.getByPlaceholderText(
      "Search by Measure..."
    ) as HTMLInputElement;
    userEvent.type(filterInput, "AMM");
    expect(
      screen.getByText(/AMR/i).parentElement?.parentElement?.parentElement
    ).not.toBeVisible();
  });
});
