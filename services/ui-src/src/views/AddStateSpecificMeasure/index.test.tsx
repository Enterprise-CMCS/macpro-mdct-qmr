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
  it("renders the nav", () => {
    expect(screen.getByTestId("state-layout-container")).toBeVisible();
  });
  it("renders correctly", () => {
    expect(screen.getByText(/Add State-Specific Measures/i)).toBeVisible();
    expect(screen.getByText(/Health Home Core Set Details/i)).toBeVisible();
  });

  describe("Add and Remove buttons", () => {
    it("renders the Add button", () => {
      expect(screen.getByText(/\+ Add Another/i)).toBeVisible();
      expect(screen.getByText(/\+ Add Another/i)).toBeEnabled();
    });

    it("renders the remove button", () => {
      expect(screen.getByText(/Remove/i)).toBeVisible();
      expect(screen.getByText(/Remove/i)).toBeDisabled();
    });

    it("renders the SSM form", () => {
      screen.getByText(/\+ Add Another/i).click();
      expect(screen.getByText(/Name the measure/i)).toBeVisible();

      expect(screen.getByLabelText("Name the measure")).toBeVisible();
      expect(screen.getByLabelText("Name the measure")).toBeEnabled();

      expect(
        screen.getByLabelText("Please provide a description of the measure")
      ).toBeVisible();
      expect(
        screen.getByLabelText("Please provide a description of the measure")
      ).toBeEnabled();
    });

    it("allows a maximum of 5 new SSMs", () => {
      for (let i = 0; i < 4; i++) {
        screen.getByText(/\+ Add Another/i).click();
      }

      expect(screen.getByText(/\+ Add Another/i)).toBeEnabled();
      screen.getByText(/\+ Add Another/i).click();
      expect(screen.getByText(/\+ Add Another/i)).toBeDisabled();
    });
  });
});
