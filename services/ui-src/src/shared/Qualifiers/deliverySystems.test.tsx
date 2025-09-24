import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataDriven } from "shared/types/TypeQualifierForm";
import { DeliverySystems } from "./deliverySystems";
import * as CUI from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

const mockDataDriven = {
  title: "Test Title",
  questionTitle: "Test Question Title",
  qualifierHeader: (year: string) => `Mock header for year ${year}`,
  textTable: [["Medicaid", "Under Age 21"]],
  fieldValues: ["UnderTwentyOne"],
  formData: {
    PercentageEnrolledInEachDeliverySystem: [
      {
        label: "Fee-for-Service",
        UnderTwentyOne: "",
      },
      {
        label: "PCCM",
        UnderTwentyOne: "",
      },
      {
        label: "Managed Care",
        UnderTwentyOne: "",
      },
      {
        label: "Integrated Care Model (ICM)",
        UnderTwentyOne: "",
      },
    ],
  },
} as DataDriven;

const mockYear = "2024";

jest.mock("hooks/authHooks", () => ({
  useUser: () => ({
    userRole: "mcdtqmr-state-user",
  }),
}));

const MockForm = () => {
  const form = useForm({
    shouldFocusError: false,
    defaultValues: {
      PercentageEnrolledInEachDeliverySystem:
        mockDataDriven.formData.PercentageEnrolledInEachDeliverySystem,
    },
  });
  return (
    <FormProvider {...form}>
      <form id="uniqueId" onSubmit={form.handleSubmit(jest.fn())}>
        <CUI.OrderedList>
          <DeliverySystems data={mockDataDriven} year={mockYear} />
        </CUI.OrderedList>
      </form>
    </FormProvider>
  );
};

describe("Test DeliverySystems", () => {
  it("renders for state user", async () => {
    render(<MockForm />);
    expect(screen.getByText("Mock header for year 2023")).toBeVisible();
  });

  it("calculates and displays totals correctly", async () => {
    render(<MockForm />);
    const inputs = screen.getAllByPlaceholderText("");
    await userEvent.type(inputs[0], "10.5");
    await userEvent.type(inputs[1], "20.5");
    expect(screen.getByDisplayValue("31.0")).toBeInTheDocument();
  });

  it("handles adding a row", async () => {
    render(<MockForm />);
    const inputsBefore = screen.getAllByPlaceholderText("");
    expect(inputsBefore).toHaveLength(4);
    const addButton = screen.getByText("+ Add Another");
    await userEvent.click(addButton);
    const inputsAfter = screen.getAllByPlaceholderText("");
    expect(inputsAfter).toHaveLength(5);
  });
});
