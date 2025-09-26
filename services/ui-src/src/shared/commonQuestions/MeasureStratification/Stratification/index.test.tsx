import { render, screen } from "@testing-library/react";
import { Stratification } from ".";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { FormProvider, useForm } from "react-hook-form";
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
    <FormProvider {...form}>
      <form id="uniqueId" onSubmit={form.handleSubmit(jest.fn())}>
        <Stratification {...props} />
      </form>
    </FormProvider>
  );
};

describe("Test Stratification Component", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  test("Renders withouth issue", () => {
    expect(
      screen.getByText("Enter Measure Stratification")
    ).toBeInTheDocument();
  });

  test("Should not have basic accessibility issues", async () => {
    const { container } = render(<TestComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
