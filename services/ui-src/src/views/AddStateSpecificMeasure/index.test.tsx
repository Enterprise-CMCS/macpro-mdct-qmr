import { AddStateSpecificMeasure } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { useApiMock } from "utils/testUtils/useApiMock";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "DC",
  }),
}));

beforeEach(() => {
  useApiMock({});
  render(
    <QueryClientProvider client={queryClient}>
      <RouterWrappedComp>
        <AddStateSpecificMeasure />
      </RouterWrappedComp>
    </QueryClientProvider>
  );
});

describe("AddStateSpecificMeasure", () => {
  test("Check that the nav renders", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });
});
