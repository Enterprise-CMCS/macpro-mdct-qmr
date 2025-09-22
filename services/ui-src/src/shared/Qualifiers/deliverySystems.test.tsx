import { render, screen } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { DataDriven } from "shared/types/TypeQualifierForm";
import { DeliverySystems } from "./deliverySystems";
import { UserRoles } from "types";

const mockDataDriven = {
  qualifierHeader: (year: string) => `Mock header for year ${year}`,
  textTable: [["Table 1"], ["Table 2"]],
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
    userRole: "mdctqmr-state-user",
  }),
}));

describe("Test CombinedRatesMeasure", () => {
  it("renders", async () => {
    render(<DeliverySystems data={mockDataDriven} year={mockYear} />);
    expect(screen.getByText("Mock header for year 2024")).toBeVisible();
  });
});

// describe("Test accessibility", () => {
//   it("passes a11y tests", async () => {
//     useApiMock({});
//     const { container } = render(
//       <QueryClientProvider client={queryClient}>
//         <RouterWrappedComp>
//           <CombinedRatesMeasure
//             year={"2024"}
//             measureId={"AAB-AD"}
//             measureName={
//               "Avoidance of Antibiotic Treatment for Acute Bronchitis/Bronchiolitis: Age 18 And Older"
//             }
//           />
//         </RouterWrappedComp>
//       </QueryClientProvider>
//     );
//     expect(await axe(container)).toHaveNoViolations();
//   });
// });
