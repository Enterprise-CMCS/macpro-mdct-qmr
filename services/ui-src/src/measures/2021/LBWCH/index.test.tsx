import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { LBWCH } from ".";

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <LBWCH
        name="Live Births Weighing Less Than 2,500 Grams"
        year="2021"
        measureId="test"
      />
    </RouterWrappedComp>
  );
});

describe("Test LBWCH.tsx", () => {
  it("renders component properly with correct text", () => {
    expect(
      screen.getByText(
        /Percentage of live births that weighed less than 2,500 grams/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/To reduce state burden and streamline reporting/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/LBW-CH - Live Births Weighing Less Than 2,500 Grams/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /States are not asked to report data for this measure for FFY 2021 Core Set/i
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/Print/i)).toBeInTheDocument();

    expect(screen.getByText(/Back to Core Set Measures/i)).toBeInTheDocument();
  });
});
