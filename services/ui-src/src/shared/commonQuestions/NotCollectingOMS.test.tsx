import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NotCollectingOMS } from "./NotCollectingOMS";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

describe("NotCollectingOMS component", () => {
  beforeEach(() => {
    mockGetMeasureYear.mockReturnValue(2024);
    renderWithHookForm(<NotCollectingOMS year="2024" />);
  });

  it("component renders", () => {
    expect(
      screen.getByText(
        "CMS is not collecting stratified data for this measure for FFY 2024 Core Set Reporting."
      )
    ).toBeInTheDocument();
  });
});
