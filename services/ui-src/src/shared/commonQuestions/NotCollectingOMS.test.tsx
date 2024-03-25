import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { NotCollectingOMS } from "./NotCollectingOMS";

describe("NotCollectingOMS component", () => {
  beforeEach(() => {
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
