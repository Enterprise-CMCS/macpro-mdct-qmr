import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { NCIDDSAD } from ".";

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <NCIDDSAD name="National Core Indicators Survey" year="2021" />
    </RouterWrappedComp>
  );
});

describe("Test NCIDDSAD.tsx", () => {
  it("renders component properly with correct text", () => {
    expect(
      screen.getByText(
        /provide information on beneficiaries’ experience and self-reported outcomes of long-term/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /To reduce state burden and streamline reporting, CMS will/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/NCIDDS-AD - National Core Indicators Survey/i)
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
