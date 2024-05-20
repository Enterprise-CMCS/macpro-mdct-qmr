import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { AddCoreSetCards } from "../AddCoreSetCards";
import { coreSets } from "shared/coreSetByYear";

describe("Test AddCoreSetCards Component", () => {
  describe("Test no Core Sets", () => {
    it("renders no core sets", () => {
      render(
        <RouterWrappedComp>
          <AddCoreSetCards coreSetCards={[]} />
        </RouterWrappedComp>
      );
      expect(screen.queryByText(/Need to report on Adult data/i)).toBeNull();
      expect(screen.queryByText(/Need to report on Child data/i)).toBeNull();
      expect(
        screen.queryByText(/Need to report on Health home data/i)
      ).toBeNull();
      expect(
        screen.queryByText(
          /Only one group of Adult Core Set Measures can be submitted per FFY/i
        )
      ).toBeNull();
    });
  });
  describe("Test rendered Core Sets", () => {
    beforeEach(() => {
      render(
        <RouterWrappedComp>
          <AddCoreSetCards coreSetCards={coreSets["2022"]} />
        </RouterWrappedComp>
      );
    });

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
    it("renders notice about adult text label", () => {
      expect(
        screen.getByText(
          /Only one group of Adult Core Set Measures can be submitted per FFY/i
        )
      ).toBeInTheDocument();
    });
  });
});

describe("Render no core set", () => {});
