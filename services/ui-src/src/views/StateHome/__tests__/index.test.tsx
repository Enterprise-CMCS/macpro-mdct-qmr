import StateHome from "../index";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock, defaultMockValues } from "utils/testUtils/useApiMock";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

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

const testComponent = (
  <QueryClientProvider client={queryClient}>
    <RouterWrappedComp>
      <StateHome />
    </RouterWrappedComp>
  </QueryClientProvider>
);

describe("Test StateHome", () => {
  beforeEach(() => {
    useApiMock({});
    render(testComponent);
  });
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

  test("Check that the banner is displayed when active", () => {
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.description)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultMockValues.useGetBannerValues.data.link)
    ).toBeInTheDocument();
  });
});
describe("Test StateHome accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    useApiMock({});
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Test 2023 state without health home core sets", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({
      year: "2023",
      state: "CA",
    }),
    useNavigate: () => mockedNavigate,
  }));

  beforeEach(() => {
    useApiMock({});
    render(testComponent);
  });
  test("Should not render health home core sets for CA", () => {
    expect(
      screen.queryByText(/Need to report on Health home data/i)
    ).not.toBeInTheDocument();
  });
});
