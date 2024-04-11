import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { AddCoreSetCards } from "../AddCoreSetCards";

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <AddCoreSetCards coreSetsInTable={["CCS", "HHCS"]} />
    </RouterWrappedComp>
  );
});

describe("Test AddCoreSetCards Component", () => {
  it("renders the add child core set card", () => {
    expect(
      screen.getByText(/Need to report on Child data/i)
    ).toBeInTheDocument();
  });

  it("renders the add health home core set card", () => {
    expect(
      screen.getByText(/Need to report on Health home data/i)
    ).toBeInTheDocument();
  });
});
