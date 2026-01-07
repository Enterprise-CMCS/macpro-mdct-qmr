import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { AutocompletedMeasureTemplate } from ".";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

beforeEach(() => {
  mockGetMeasureYear.mockReturnValue(2021);
  render(
    <RouterWrappedComp>
      <AutocompletedMeasureTemplate
        year="2021"
        name={"test title"}
        measureId={"LBW-CH"}
      />
    </RouterWrappedComp>
  );
});

describe("Test AutocompletedMeasureTemplate.tsx", () => {
  it("renders component properly with correct test text", () => {
    expect(screen.getByText(/test title/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        /Percentage of live births that weighed less than 2,500 grams at birth during the measurement year./i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "To reduce state burden and streamline reporting, CMS will calculate this measure for states using state natality data obtained through the Centers for Disease Control and Prevention Wide-ranging Online Data for Epidemiologic Research (CDC WONDER)."
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/Back to Core Set Measures/i)).toBeInTheDocument();
  });
});
