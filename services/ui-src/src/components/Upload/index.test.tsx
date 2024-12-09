import { screen } from "@testing-library/react";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import { useUser } from "hooks/authHooks";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

describe("Test Upload Component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    renderWithHookForm(
      <QueryClientProvider client={queryClient}>
        <QMR.Upload name="test-component" label="test label" />
      </QueryClientProvider>,
      {
        defaultValues: {
          "test-component": [
            new File([JSON.stringify({ ping: true })], "ping.json", {
              type: "application/json",
            }),
          ],
        },
      }
    );
  });
  test("Check that the Upload Component renders", () => {
    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
  });

  test("Check that the Upload Component renders", () => {
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });

  test("ComponentMask does not render for state user", () => {
    const mask = screen.queryByTestId("component-mask");
    expect(mask).toBeNull();
  });
});

describe("non-state user", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });

    renderWithHookForm(
      <QMR.Upload name="test-component-inactive" label="test label inactive" />,
      {
        defaultValues: {
          "test-component-inactive": [
            new File([JSON.stringify({ ping: true })], "ping.json", {
              type: "application/json",
            }),
          ],
        },
      }
    );
  });

  test("ComponentMask renders for non-state user", () => {
    expect(screen.getByTestId("component-mask")).toBeInTheDocument();
  });
});
