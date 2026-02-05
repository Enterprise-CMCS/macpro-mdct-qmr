import { render, screen, fireEvent } from "@testing-library/react";
import { Stratification } from ".";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { FormProvider, useForm } from "react-hook-form";
import SharedContext from "shared/SharedContext";
import { commonQuestionsLabel as commonQuestionsLabels2025 } from "labels/2025/commonQuestionsLabel";
expect.extend(toHaveNoViolations);

const props = {
  year: 2025,
  omsData: [
    {
      addMore: true,
      addMoreSubCatFlag: false,
      id: "test-id",
      label: "Race",
      options: [
        {
          flagSubcat: true,
          id: "test-subcat-id",
          label: "Asian",
          options: [
            {
              id: "test-subcat-subcat-id",
              label: "Korean",
              flabSubCat: false,
            },
          ],
        },
      ],
    },
  ],
  coreset: "Adult",
  qualifiers: [
    {
      id: "test-qualifier-id",
      label: "Test Qualifier",
      text: "Test Qualifier Text",
    },
  ],
  categories: [
    {
      id: "test-category-id",
      label: "Test Category",
      text: "Test Category Text",
    },
  ],
  rateAlwaysEditable: true,
};

const TestComponent = () => {
  const form = useForm({
    shouldFocusError: false,
    defaultValues: {
      MeasurementSpecification: "Other",
    },
  });
  return (
    <SharedContext.Provider value={commonQuestionsLabels2025}>
      <FormProvider {...form}>
        <form id="uniqueId" onSubmit={form.handleSubmit(jest.fn())}>
          <Stratification {...props} />
        </form>
      </FormProvider>
    </SharedContext.Provider>
  );
};

describe("Test Stratification Component", () => {
  test("Renders without issue", () => {
    render(<TestComponent />);
    expect(
      screen.getByText("Enter Measure Stratification")
    ).toBeInTheDocument();
  });

  test("Oms checkbox functionality", () => {
    render(<TestComponent />);
    expect(screen.queryByText("Korean")).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByText(
        "No, we are reporting disaggregated data for Asian subcategories."
      )
    );
    expect(screen.queryByText("Korean")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Clear"));
    expect(screen.queryByText("Korean")).not.toBeInTheDocument();
  });

  test("Should not have basic accessibility issues", async () => {
    const { container } = render(<TestComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
