import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe("Test CoreSet.tsx", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      year: "2021",
      state: "OH",
      CoreSet: "Adult",
    }),
  }));

  beforeEach(() => {
    render(
      <RouterWrappedComp>
        <CoreSet />
      </RouterWrappedComp>
    );
  });

  describe("Test coreset component", () => {
    test("Check that the nav renders", () => {
      expect(screen.getByTestId("state-layout-container")).toBeVisible();
    });

    it("renders the correct child measure table data components", () => {
      expect(
        screen.getByText(
          /Complete all Adult Core Set Questions and Adult Core Set Measures to submit FFY 2021/i
        )
      ).toBeInTheDocument();

      expect(screen.getByText(/Submit Measures/i)).toBeInTheDocument();

      expect(screen.getByText(/Reporting FFY 2021/i)).toBeInTheDocument();
    });
  });
});
