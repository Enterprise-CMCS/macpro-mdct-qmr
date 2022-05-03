import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { HHCSQualifiers } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "DC",
    coreSetId: "HHCS",
    measureId: "questions",
  }),
}));

beforeEach(() => {
  useApiMock({});
  render(
    <QueryClientProvider client={queryClient}>
      <RouterWrappedComp>
        <HHCSQualifiers />
      </RouterWrappedComp>
    </QueryClientProvider>
  );
});
describe("test header (delivery system) component", () => {
  it("renders header properly", async () => {
    expect(await screen.findByText("Delivery System")).toBeInTheDocument();
  });
});
