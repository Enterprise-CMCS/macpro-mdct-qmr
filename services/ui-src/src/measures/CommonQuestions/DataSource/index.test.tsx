import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { DataDrivenTypes } from "../types";
import { DataSource } from "./index";
import * as DC from "dataConstants";

const dataSourceData: DataDrivenTypes.DataSource = {
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
});
