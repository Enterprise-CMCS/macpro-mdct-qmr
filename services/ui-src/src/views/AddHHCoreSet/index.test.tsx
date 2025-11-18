import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { AddHHCoreSet } from ".";
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

describe("Test HealthHome coreset component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { userState: "OH", userRole: UserRoles.STATE_USER };
    });
    useApiMock({});
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddHHCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
  });
  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("renders the correct child components", () => {
    expect(
      screen.getByLabelText(
        /Select the Health Home program you are reporting on/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /remember to complete all Health Home Core Set Questions and Health Home Core Set Measures to submit for CMS review./i
      )
    ).toBeInTheDocument();
  });

  test("Unauthorized state user sees unauthorized message", () => {
    mockUseUser.mockImplementation(() => {
      return { userState: "DC", userRole: UserRoles.STATE_USER };
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <AddHHCoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
    expect(
      screen.getByText(/You are not authorized to view this page/i)
    ).toBeInTheDocument();
  });
});
