import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useApiMock } from "utils/testUtils/useApiMock";
import { BrowserRouter } from "react-router-dom";

const mockedNavigate = jest.fn();
const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2025",
    state: "DC",
    coreSetId: "ACSM",
  }),
  useLocation: () => ({
    pathname: "/WA/2025/ACSM",
  }),
  useNavigate: () => mockedNavigate,
}));

describe("Test CoreSet.tsx", () => {
  beforeEach(() => {
    useApiMock({});
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CoreSet />
        </QueryClientProvider>
      </BrowserRouter>
    );
  });

  describe("Test coreset component", () => {
    test("Check that the nav renders", () => {
      expect(screen.getByTestId("state-layout-container")).toBeVisible();
    });

    it("renders the child measure table data components", async () => {
      expect(
        screen.getByText("Complete core set qualifier questions")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Enter the Adult core set qualifier questions before completing the measures below."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Enter Qualifier Questions" })
      ).toBeInTheDocument();

      expect(
        screen.getByText("Complete the below measures")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Complete all Adult Core Set Questions: Medicaid to submit 2025"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit Core Set" })
      ).toBeInTheDocument();
    });
  });
});
