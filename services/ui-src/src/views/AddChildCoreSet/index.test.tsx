import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterWrappedComp } from "utils/testing";
import { AddChildCoreSet } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
import { UserRoles } from "types";
import { useUser } from "hooks/authHooks";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2024",
    state: "OH",
  }),
}));

jest.mock("components/Title", () => ({
  Title: ({ pageTitle }: { pageTitle: string }) => (
    <div data-testid="mock-title">{pageTitle}</div>
  ),
}));

const queryClient = new QueryClient();

describe("Test Add Child Core Set Component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { userState: "OH", userRole: UserRoles.STATE_USER };
    });
    useApiMock({});
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddChildCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
  });

  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("Renders the correct child components", () => {
    expect(
      screen.getByText(/How are you reporting Child Core Set measures/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Remember to complete all Child Core Set Questions and Child Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
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

  test("Unauthorized state user sees unauthorized message", () => {
    mockUseUser.mockImplementation(() => {
      return { userState: "DC", userRole: UserRoles.STATE_USER };
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddChildCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
    expect(
      screen.getByText(/You are not authorized to view this page/i)
    ).toBeInTheDocument();
  });
});
