import { CoreSet } from "./index";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";

describe("Test CoreSet.tsx", () => {
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

    it("renders the child measure table data components", () => {
      expect(screen.getByText(/Core Set Qualifiers/i)).toBeInTheDocument();

      expect(screen.getByText(/Submit Core Set/i)).toBeInTheDocument();

      expect(screen.getByText(/Reporting FFY 2021/i)).toBeInTheDocument();
    });
  });
});
