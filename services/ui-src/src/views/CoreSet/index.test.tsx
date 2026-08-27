import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
import { BrowserRouter, useParams } from "react-router-dom";

const mockedNavigate = jest.fn();
const queryClient = new QueryClient();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/WA/2025/ACSM",
  }),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn(),
}));
const mockUseParam = useParams as jest.Mock;

const renderComponent = (mockParamValue: {
  year: string;
  state: string;
  coreSetId: string;
}) => {
  mockUseParam.mockReturnValue(mockParamValue);
  useApiMock({});
  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CoreSet />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe("Test CoreSet.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Check that the nav renders", () => {
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "ACSM",
    });
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });
  it("renders the adult measure table data components", () => {
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "ACSM",
    });
    expect(
      screen.getByText("Complete Core Set Qualifier Questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete the Adult Core Set Qualifier Questions before submitting the Core Set report."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Enter Qualifier Questions" })
    ).toBeInTheDocument();

    expect(screen.getByText("Complete the below measures")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete all Adult Core Set Measures: Medicaid to submit the Core Set report."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Core Set" })
    ).toBeInTheDocument();
  });
  it("renders the child measure table data components", () => {
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "CCSM",
    });

    expect(
      screen.getByText("Complete Core Set Qualifier Questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete the Child Core Set Qualifier Questions before submitting the Core Set report."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Enter Qualifier Questions" })
    ).toBeInTheDocument();

    expect(screen.getByText("Complete the below measures")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete all Child Core Set Measures: Medicaid to submit the Core Set report."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Core Set" })
    ).toBeInTheDocument();
  });

  it("renders the child measure table data components", () => {
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "HHCS",
    });

    expect(
      screen.getByText("Complete Core Set Qualifier Questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete the Health Home Core Set Qualifier Questions before submitting the Core Set report."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Enter Qualifier Questions" })
    ).toBeInTheDocument();

    expect(screen.getByText("Complete the below measures")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete all Health Home Core Set Measures to submit the Core Set report."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Core Set" })
    ).toBeInTheDocument();
  });
});
