import { NotCollectingOMS } from ".";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("NotCollectingOMS component", () => {
  beforeEach(() => {
    renderWithHookForm(<NotCollectingOMS />);
  });

  it("component renders", () => {
    expect(
      screen.getByText(
        "CMS is not collecting stratified data for this measure for FFY 2023 Core Set Reporting."
      )
    ).toBeInTheDocument();
  });
});
