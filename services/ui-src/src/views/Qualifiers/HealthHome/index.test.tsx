import { fireEvent, render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { HHCSQualifiers } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
    coreSetId: "ACS",
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

describe("test audit or validation component", () => {
  it("renders components properly", async () => {
    expect(
      await screen.findByText(
        "Yes, some of the Core Set measures have been audited or validated"
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("No, we calculated all the measures internally.")
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByLabelText(
        /Yes, some of the Core Set measures have been audited or validated/i
      )
    );
    expect(await screen.findByText(/Select All/i)).toBeInTheDocument();
  });
});

describe("test external ontractor component", () => {
  it("renders components properly", async () => {
    expect(
      await screen.findByText(
        "Yes, we did obtain assistance from one or more external contractors in collecting, calculating, and/or reporting Core Set data."
      )
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.getByLabelText(
        /Yes, we did obtain assistance from one or more external contractors in collecting, calculating, and\/or reporting Core Set data./i
      )
    );
    expect(
      await screen.findByText(/Data Analytics Contractor/i)
    ).toBeInTheDocument();
  });
});
