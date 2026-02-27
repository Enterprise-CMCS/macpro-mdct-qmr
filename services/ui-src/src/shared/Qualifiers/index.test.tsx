import { screen } from "@testing-library/react";
import { Qualifier } from ".";
import { renderWithHookForm } from "utils";
import { useApiMock } from "utils/testUtils/useApiMock";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn().mockReturnValue({ coreSetId: "ACSC" }),
}));

describe("Test Qualifier", () => {
  beforeEach(() => {
    useApiMock({});
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
});
