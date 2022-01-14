import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

jest.mock("hooks/api", () => ({
  useGetMeasure: jest.fn().mockReturnValue({
    data: {
      Item: [
        {
          compoundKey: "OH2021ACS",
          coreSet: "CSQ",
          createdAt: 1641161901553,
          lastAltered: 1641161901553,
          lastAlteredBy: "STATE_USER_QMR",
          state: "OH",
          submitted: false,
          year: 2021,
        },
      ],
    },
    isLoading: false,
    error: undefined,
  }),
  useGetMeasures: jest.fn().mockReturnValue({
    isLoading: false,
    error: undefined,
    isError: undefined,
    data: {
      Item: [
        {
          compoundKey: "AL2021ACSIET-AD",
          coreSet: "ACS",
          createdAt: 1642167976771,
          description:
            "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
          lastAltered: 1642167976771,
          measure: "IET-AD",
          state: "AL",
          status: "incomplete",
          year: 2021,
        },
      ],
    },
  }),
}));

describe("Test CoreSet.tsx", () => {
  beforeEach(() => {
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

      expect(screen.getByText(/Reporting FFY 2021/i)).toBeInTheDocument();
    });
  });
});
