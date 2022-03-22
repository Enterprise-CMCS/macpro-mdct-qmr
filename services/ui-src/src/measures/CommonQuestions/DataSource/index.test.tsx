import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { DataDrivenTypes } from "../types";
import { DataSource } from "./index";
import * as DC from "dataConstants";

const dataSourceData: DataDrivenTypes.DataSource = {
  describeMultipleSources: ["Source 1", "Source 2"],
  optionsLabel: "Anything could go here.",
  options: [
    {
      value: DC.ADMINISTRATIVE_DATA,
      subOptions: [
        {
          label: "Anything else could go here.",
          options: [
            {
              value: DC.MEDICAID_MANAGEMENT_INFO_SYSTEM,
            },
            {
              value: DC.ADMINISTRATIVE_DATA_OTHER,
              description: true,
            },
          ],
        },
      ],
    },
    {
      value: DC.ELECTRONIC_HEALTH_RECORDS,
      description: true,
    },
  ],
};

const TestComponent = () => {
  return <DataSource data={dataSourceData} />;
};

describe("Test the global DataSource component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {});
  });

  test("Check that the component renders", () => {
    expect(screen.getByText("Data Source")).toBeVisible();
  });

  test("Check that when provided `describeMultipleSources`, the corresponding text areas appear", () => {
    // Because this is possibly undefined spread doesn't work; Thanks TypeScript!
    const expectedLables =
      dataSourceData.describeMultipleSources?.map((x) => x) ?? [];

    // Text areas should not be visible
    expectedLables.forEach((x) => {
      const label = screen.queryByText(x);
      expect(label).toBeNull();
    });

    // Select checkboxes to reveal the description
    const checkBox1 = screen.getByLabelText(DC.ADMINISTRATIVE_DATA);
    userEvent.click(checkBox1);
    const checkBox2 = screen.getByLabelText(DC.ELECTRONIC_HEALTH_RECORDS);
    userEvent.click(checkBox2);

    // Text areas should be visible
    expectedLables.forEach((x) => {
      const textArea = screen.getByText(x).nextSibling;
      expect(textArea);
    });
  });
});
