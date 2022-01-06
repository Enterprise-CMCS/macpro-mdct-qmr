import { StateHome } from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    year: "2021",
    state: "OH",
  }),
  useNavigate: () => mockedNavigate,
}));

jest.mock("hooks/api", () => ({
  useGetCoreSets: jest.fn().mockReturnValue({
    data: {
      Items: [
        {
          compoundKey: "OH2021ACS",
          coreSet: "ACS",
          createdAt: 1641161901553,
          lastAltered: 1641161901553,
          lastAlteredBy: "STATE_USER_QMR",
          progress: { numAvailable: 32, numComplete: 0 },
          state: "OH",
          submitted: false,
          year: 2021,
        },
      ],
    },
    isLoading: false,
    error: undefined,
  }),
  useDeleteCoreSet: jest.fn(),
}));

beforeEach(() => {
  render(
    <QueryClientProvider client={queryClient}>
      <RouterWrappedComp>
        <StateHome />
      </RouterWrappedComp>
    </QueryClientProvider>
  );
});

describe("Test StateHome", () => {
  test("Check that the Heading renders", () => {
    expect(
      screen.getByText(/Core Set Measures Reporting/i)
    ).toBeInTheDocument();
  });

  test("Check that the Reporting Year renders", () => {
    expect(screen.getByText(/Reporting Year/i)).toBeInTheDocument();
  });

  test("Check that the Adult core set record renders", () => {
    expect(screen.getByText("Adult Core Set Measures")).toBeInTheDocument();
  });

  test("Check that the route is correct when reporting year is changed", () => {
    fireEvent.change(screen.getByTestId("select"), {
      target: { value: "2021" },
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/OH/2021");
  });
});
