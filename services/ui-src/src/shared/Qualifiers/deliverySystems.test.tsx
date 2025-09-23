import { render, screen } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
import { DataDriven } from "shared/types/TypeQualifierForm";
import { DeliverySystems } from "./deliverySystems";
import * as CUI from "@chakra-ui/react";

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
    userRole: "mdctqmr-state-user",
  }),
}));

// jest.mock("react-hook-form", () => ({
//   ...jest.requireActual("react-hook-form"),
//   useFieldArray: () => ({
//     fields: [
//       { id: "1", label: "Fee-for-Service", UnderTwentyOne: "" },
//       { id: "2", label: "PCCM", UnderTwentyOne: "" },
//       { id: "3", label: "Managed Care", UnderTwentyOne: "" },
//       { id: "4", label: "Integrated Care Model (ICM)", UnderTwentyOne: "" },
//     ],
//     append: jest.fn(),
//     remove: jest.fn(),
//   }),
//   useWatch: () => [
//     { label: "Fee-for-Service", UnderTwentyOne: "" },
//     { label: "PCCM", UnderTwentyOne: "" },
//     { label: "Managed Care", UnderTwentyOne: "" },
//     { label: "Integrated Care Model (ICM)", UnderTwentyOne: "" },
//   ],
//     useFormContext: () => ({
//     handleSubmit: () => jest.fn(),
//     control: {
//       register: jest.fn(),
//       unregister: jest.fn(),
//       getFieldState: jest.fn(),
//       _names: {
//         array: new Set('test'),
//         mount: new Set('test'),
//         unMount: new Set('test'),
//         watch: new Set('test'),
//         focus: 'test',
//         watchAll: false,
//       },
//       _subjects: {
//         watch: jest.fn(),
//         array: jest.fn(),
//         state: jest.fn(),
//       },
//       _getWatch: jest.fn(),
//       _formValues: ['test'],
//       _defaultValues: ['test'],
//     },
//     getValues: () => {
//       return [];
//     },
//     setValue: () => jest.fn(),
//     formState: () => jest.fn(),
//     watch: () => jest.fn(),
//   }),
//   Controller: () => [],
//   useSubscribe: () => ({
//     r: { current: { subject: { subscribe: () => jest.fn() } } },
//   }),
// }))

describe("Test DeliverySystems", () => {
  it("renders", async () => {
    render(
      <CUI.OrderedList>
        <DeliverySystems data={mockDataDriven} year={mockYear} />
      </CUI.OrderedList>
    );
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
