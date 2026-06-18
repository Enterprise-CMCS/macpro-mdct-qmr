import { screen } from "@testing-library/react";
import { Qualifier } from ".";
import { renderWithHookForm } from "utils";
import { useApiMock } from "utils/testUtils/useApiMock";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

jest.mock("react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue({ coreSetId: "ACSC" }),
}));

describe("Test Qualifier", () => {
  beforeEach(() => {
    useApiMock({});
    mockGetMeasureYear.mockReturnValue(2026);
  });
  it("Qualifier renders", () => {
    renderWithHookForm(
      <Qualifier name={"mock-name"} year={"2026"} measureId={"BCS-AD"} />
    );
    expect(
      screen.getByText("Adult Core Set Qualifiers: Separate CHIP")
    ).toBeVisible();
    expect(
      screen.getByText(
        "Please report data on Separate CHIP (Title XXI) for the Adult Core Set on this page. This is not a mandatory requirement."
      )
    ).toBeVisible();
  });

  it("does not render the External Contractor question for 2026", () => {
    renderWithHookForm(
      <Qualifier name={"mock-name"} year={"2026"} measureId={"BCS-AD"} />
    );
    expect(screen.queryByText("External Contractor")).not.toBeInTheDocument();
  });

  it("renders the External Contractor question for years prior to 2026", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    renderWithHookForm(
      <Qualifier name={"mock-name"} year={"2025"} measureId={"BCS-AD"} />
    );
    expect(screen.getByText("External Contractor")).toBeInTheDocument();
  });

  it("does not render the Audit or Validation of Measures question for 2026", () => {
    renderWithHookForm(
      <Qualifier name={"mock-name"} year={"2026"} measureId={"BCS-AD"} />
    );
    expect(
      screen.queryByText("Audit or Validation of Measures")
    ).not.toBeInTheDocument();
  });

  it("renders the Audit or Validation of Measures question for years prior to 2026", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    renderWithHookForm(
      <Qualifier name={"mock-name"} year={"2025"} measureId={"BCS-AD"} />
    );
    expect(
      screen.getByText("Audit or Validation of Measures")
    ).toBeInTheDocument();
  });
});
