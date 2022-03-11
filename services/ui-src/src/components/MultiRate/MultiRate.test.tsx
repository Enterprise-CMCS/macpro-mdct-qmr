// TODO: Need to write tests for this component

import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { MultiRate } from "./MultiRate";

const TestComponent = () => {
  const rates = [
    {
      label: "test",
      id: 1,
    },
  ];

  return <MultiRate rates={rates} name="test-component" />;
};

describe("Test the Rate component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />);
  });

  test("Check that component renders and includes a label when passed optionally", () => {
    expect(screen.getByText(/test/i)).toBeVisible();
    expect(false);
  });
});
