import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
import { BrowserRouter, useParams } from "react-router-dom";

const mockedNavigate = jest.fn();
const mockUseLocation = jest.fn();
const queryClient = new QueryClient();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockUseLocation(),
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
    mockUseLocation.mockReturnValue({ pathname: "/WA/2025/ACSM" });
  });

  it("should render navigation", () => {
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "ACSM",
    });
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });

  it("should clear location state after showing the create-SSM banner, so a refresh won't redisplay it", () => {
    mockUseLocation.mockReturnValue({
      pathname: "/DC/2025/ACSM",
      state: { success: true },
    });
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "ACSM",
    });
    expect(mockedNavigate).toHaveBeenCalledWith("/DC/2025/ACSM", {
      replace: true,
      state: null,
    });
    // is the banner still visible? we hope so.
    expect(
      screen.getByText("New State Specific Measures created")
    ).toBeVisible();
  });

  it("should not navigate when there is no location state to clear", () => {
    renderComponent({
      year: "2025",
      state: "DC",
      coreSetId: "ACSM",
    });
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("should render the adult measure table data components", () => {
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

  it("should render the child measure table data components", () => {
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

  it("should render the child measure table data components", () => {
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
