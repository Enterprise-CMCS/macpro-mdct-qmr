import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { AddCoreSetCards } from "../AddCoreSetCards";

beforeEach(() => {
  render(
    <RouterWrappedComp>
      <AddCoreSetCards />
    </RouterWrappedComp>
  );
});

describe("Test AddCoreSetCards Component", () => {
  it("renders the add child core set card", async () => {
    expect(
      await screen.findByText(/Need to report on Child data/i)
    ).toBeInTheDocument();
  });

  it("renders the add health homes core set card", async () => {
    expect(
      await screen.findByText(/Need to report on Health homes data/i)
    ).toBeInTheDocument();
  });
});
