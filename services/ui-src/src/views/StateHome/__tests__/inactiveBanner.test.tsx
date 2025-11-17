import StateHome from "../index";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiMock, defaultMockValues } from "utils/testUtils/useApiMock";
const queryClient = new QueryClient();

jest.mock("components/Title", () => ({
  Title: ({ pageTitle }: { pageTitle: string }) => (
    <div data-testid="mock-title">{pageTitle}</div>
  ),
}));

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({
    year: "2021",
    state: "OH",
  }),
  useNavigate: () => mockedNavigate,
}));

describe("Test StateHome with Inactive Banner", () => {
  test("Check that the banner is not displayed when inactive", () => {
    const inactiveBanner = { ...defaultMockValues.useGetBannerValues };

    inactiveBanner.data.startDate = new Date().getTime() - 360000;
    inactiveBanner.data.endDate = new Date().getTime() - 3600;
    useApiMock({
      useGetBannerValues: { ...inactiveBanner },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <RouterWrappedComp>
          <StateHome />
        </RouterWrappedComp>
      </QueryClientProvider>
    );
    expect(screen.queryByText(inactiveBanner.data.title)).toBeNull();
    expect(screen.queryByText(inactiveBanner.data.description)).toBeNull();
  });
});
