import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
const queryClient = new QueryClient();

describe("Test CoreSet.tsx", () => {
  beforeEach(() => {
    useApiMock({});
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <CoreSet />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
  });

  describe("Test coreset component", () => {
    test("Check that the nav renders", () => {
      expect(screen.getByTestId("state-layout-container")).toBeVisible();
    });

    it("renders the child measure table data components", async () => {
      expect(screen.getByText(/Core Set Qualifiers/i)).toBeInTheDocument();

      expect(screen.getByText(/Submit Core Set/i)).toBeInTheDocument();
    });
  });
});
