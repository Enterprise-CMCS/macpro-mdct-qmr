// TODO: Need to write tests for this component

import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { MultiRate } from "./MultiRate";

const TestComponent = () => {
  const rates = [
    {
      label: "test",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  return <MultiRate rates={rates} name="test-component" />;
};

describe("Test the Rate component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {
      defaultValues: {
        "test-component": [
          {
            numerator: "1",
            denominator: "1",
            rate: "1",
          },
        ],
      },
    });
  });

  test("Check that component renders and includes a label when passed optionally", () => {
    expect(screen.getByText(/test/i)).toBeVisible();
    expect(false);
  });
});
