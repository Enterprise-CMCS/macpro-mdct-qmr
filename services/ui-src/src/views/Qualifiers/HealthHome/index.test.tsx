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
    HHCS: "HHCS_18-0007",
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
describe("test header (This page does not exist) component", () => {
  it("renders This page does not exist properly", async () => {
    expect(
      await screen.findByText("This page does not exist")
    ).toBeInTheDocument();
  });
});
