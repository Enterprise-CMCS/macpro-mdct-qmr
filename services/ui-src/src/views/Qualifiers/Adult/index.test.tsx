import { fireEvent, render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { ACSQualifiers } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

jest.mock("hooks/api", () => ({
  useUpdateMeasure: jest.fn(),
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
}));

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
  render(
    <QueryClientProvider client={queryClient}>
      <RouterWrappedComp>
        <ACSQualifiers />
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
      await screen.findByText("No, we calculated all the measure internally.")
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
        "Yes, we did obtained assistance from one or more external contractors in collecting, calculating and/or reporting Core Set data."
      )
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.getByLabelText(
        /Yes, we did obtained assistance from one or more external contractors in collecting, calculating and\/or reporting Core Set data./i
      )
    );
    expect(
      await screen.findByText(/Data Analytics Contractor/i)
    ).toBeInTheDocument();
  });
});
