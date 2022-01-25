import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { LRCDCH } from ".";

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <LRCDCH name="Low-Risk Cesarean Delivery" year="2021" measureId="test" />
    </RouterWrappedComp>
  );
});

describe("Test LRCDCH.tsx", () => {
  it("renders component properly with correct text", () => {
    expect(
      screen.getByText(
        /births delivered by cesarean during the measurement year/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/To reduce state burden and streamline reporting/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/LRCD-CH - Low-Risk Cesarean Delivery/i)
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
