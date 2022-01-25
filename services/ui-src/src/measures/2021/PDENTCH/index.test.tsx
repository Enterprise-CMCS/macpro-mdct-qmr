import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { PDENTCH } from ".";

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <PDENTCH
        name="Percentage of Eligibles Who Received Preventive Dental Services"
        year="2021"
      />
    </RouterWrappedComp>
  );
});

describe("Test PDENTCH.tsx", () => {
  it("renders component properly with correct text", () => {
    expect(
      screen.getByText(/To reduce state burden and streamline reporting/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /PDENT-CH - Percentage of Eligibles Who Received Preventive Dental Services/i
      )
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
