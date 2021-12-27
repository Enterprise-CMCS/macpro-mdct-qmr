import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { PDENTCH } from ".";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    year: "2021",
    state: "OH",
    coreSetId: "CCS",
    measureId: "PDENT-CH",
  }),
}));

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <PDENTCH
        name="Percentage of Eligibles Who Received Preventive Dental Services"
        year="2021"
        handleSubmit={() => {}}
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
