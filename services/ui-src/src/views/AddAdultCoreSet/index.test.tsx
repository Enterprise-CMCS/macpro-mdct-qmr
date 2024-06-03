import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterWrappedComp } from "utils/testing";
import { AddAdultCoreSet } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import { CoreSetAbbr, UserRoles } from "types";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2024",
    state: "OH",
  }),
}));

const mockMutate = jest.fn((_variables: CoreSetAbbr, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onSuccess();
});

const queryClient = new QueryClient();

describe("Test Add Adult Core Set Component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { userState: "OH", userRole: UserRoles.STATE_USER };
    });
    const apiData: any = {
      useAddCoreSetValues: {
        mutate: mockMutate,
      },
    };
    useApiMock(apiData);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddAdultCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
  });

  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("Renders the correct adult components", () => {
    expect(
      screen.getByText(/How are you reporting Adult Core Set measures/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Remember to complete all Adult Core Set Questions and Adult Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
  });

  it("Select radio option adult core set seperate", async () => {
    const reportingSeparateRadio = screen.getByText(
      "Reporting Medicaid and CHIP measures in separate Core Sets"
    );
    fireEvent.click(reportingSeparateRadio);
    const createBtn = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(createBtn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("Select radio option adult core set combined", async () => {
    const reportingSeparateRadio = screen.getByText(
      "Reporting Medicaid and CHIP measures in combined Core Sets"
    );
    fireEvent.click(reportingSeparateRadio);
    const createBtn = screen.getByRole("button", { name: /Create/i });
    fireEvent.click(createBtn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it("Form properly interactable", () => {
    userEvent.click(
      screen.getByText(
        /Reporting Medicaid and CHIP measures in separate Core Sets/i
      )
    );

    expect(
      screen.getByLabelText(
        /Reporting Medicaid and CHIP measures in separate Core Sets/i
      )
    ).toBeChecked();
  });

  it("Form properly interactable, combined selection", () => {
    userEvent.click(
      screen.getByText(
        /Reporting Medicaid and CHIP measures in combined Core Sets/i
      )
    );

    expect(
      screen.getByLabelText(
        /Reporting Medicaid and CHIP measures in combined Core Sets/i
      )
    ).toBeChecked();
  });

  test("Unauthorized state user sees unauthorized message", () => {
    mockUseUser.mockImplementation(() => {
      return { userState: "DC", userRole: UserRoles.STATE_USER };
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddAdultCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
    expect(
      screen.getByText(/You are not authorized to view this page/i)
    ).toBeInTheDocument();
  });
});
